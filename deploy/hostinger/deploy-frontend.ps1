param(
    [switch]$SkipBuild,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$SshHost = if ($env:JUAN_DEV_SSH_HOST) { $env:JUAN_DEV_SSH_HOST } else { "217.196.54.195" }
$SshPort = if ($env:JUAN_DEV_SSH_PORT) { $env:JUAN_DEV_SSH_PORT } else { "65002" }
$SshUser = if ($env:JUAN_DEV_SSH_USER) { $env:JUAN_DEV_SSH_USER } else { "u201159527" }
$FrontendPath = if ($env:JUAN_DEV_FRONTEND_PATH) {
    $env:JUAN_DEV_FRONTEND_PATH
}
else {
    "/home/u201159527/domains/app-dev.icu/public_html/juan-dev"
}
$SiteUrl = if ($env:JUAN_DEV_FRONTEND_URL) { $env:JUAN_DEV_FRONTEND_URL } else { "https://juan-dev.app-dev.icu" }

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outPath = Join-Path $repoRoot "out"
$buildScript = Join-Path $PSScriptRoot "build-static.ps1"
$permissionScript = Join-Path $PSScriptRoot "fix-frontend-permissions.ps1"

Set-Location $repoRoot

function Format-SftpArgument {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    '"{0}"' -f ($Path -replace '"', '\\"')
}

function Test-FrontendPublish {
    param(
        [Parameter(Mandatory = $true)]
        [string]$BaseUrl
    )

    $headers = @{
        "Cache-Control" = "no-cache"
        "Pragma"        = "no-cache"
    }

    $cacheBust = [Guid]::NewGuid().ToString("n")
    $homeUrl = "$BaseUrl/?deploy=$cacheBust"

    Write-Host "Validando frontend publicado..." -ForegroundColor Cyan

    try {
        $homeResponse = Invoke-WebRequest -Uri $homeUrl -Headers $headers -UseBasicParsing
    }
    catch {
        throw "No se pudo cargar la home publicada en $homeUrl. $($_.Exception.Message)"
    }

    if ([int]$homeResponse.StatusCode -ne 200) {
        throw "La home publicada respondio con estado $($homeResponse.StatusCode)."
    }

    $assetPaths = @(
        [regex]::Matches($homeResponse.Content, '/_next/static/[^"''\\]+') |
        ForEach-Object { $_.Value } |
        Sort-Object -Unique
    )

    if ($assetPaths.Count -eq 0) {
        throw "La home publicada no contiene referencias a /_next/static; no se pudo validar el build desplegado."
    }

    foreach ($assetPath in $assetPaths) {
        $assetUrl = "$BaseUrl$assetPath"

        try {
            $assetResponse = Invoke-WebRequest -Uri $assetUrl -Headers $headers -UseBasicParsing
        }
        catch {
            throw "Asset no disponible despues del deploy: $assetPath. $($_.Exception.Message)"
        }

        if ([int]$assetResponse.StatusCode -ne 200) {
            throw "Asset no disponible despues del deploy: $assetPath respondio con estado $($assetResponse.StatusCode)."
        }
    }

    Write-Host "Validacion HTTP correcta: home y $($assetPaths.Count) assets _next responden 200." -ForegroundColor Green
}

if (!$SkipBuild) {
    & $buildScript
    if ($LASTEXITCODE -ne 0) {
        throw "Build estatico falló con código $LASTEXITCODE."
    }
}

if (!(Test-Path $outPath)) {
    throw "No existe la carpeta de salida: $outPath"
}

$htaccessPath = Join-Path $outPath ".htaccess"
if (!(Test-Path $htaccessPath)) {
    throw "No existe .htaccess en out. Ejecuta el build estatico antes de desplegar."
}

$outPathForSftp = ([string](Resolve-Path $outPath)).Replace("\", "/")
$outEntries = @(Get-ChildItem -LiteralPath $outPath -Force)
$orderedDirectories = @(
    $outEntries |
    Where-Object { $_.PSIsContainer } |
    Sort-Object @{ Expression = {
            if ($_.Name -eq "_next") { 0 }
            elseif ($_.Name -eq "admin") { 2 }
            else { 1 }
        } 
    }, Name
)
$rootAssetFiles = @(
    $outEntries |
    Where-Object {
        -not $_.PSIsContainer -and
        $_.Extension -ne ".html" -and
        $_.Name -ne ".htaccess"
    } |
    Sort-Object Name
)
$rootHtmlFiles = @(
    $outEntries |
    Where-Object { -not $_.PSIsContainer -and $_.Extension -eq ".html" } |
    Sort-Object @{ Expression = { if ($_.Name -eq "index.html") { 1 } else { 0 } } }, Name
)

$batchLines = @(
    "cd $FrontendPath",
    "lcd $outPathForSftp"
)

foreach ($directory in $orderedDirectories) {
    $batchLines += "put -r $(Format-SftpArgument $directory.Name)"
}

foreach ($file in $rootAssetFiles) {
    $batchLines += "put $(Format-SftpArgument $file.Name)"
}

foreach ($file in $rootHtmlFiles) {
    $batchLines += "put $(Format-SftpArgument $file.Name)"
}

$batchLines += "put $(Format-SftpArgument '.htaccess')"
$batchLines += "bye"

if ($DryRun) {
    Write-Host "Deploy frontend Hostinger (dry-run)." -ForegroundColor Cyan
    Write-Host "Destino: $SshUser@$SshHost`:$FrontendPath" -ForegroundColor Cyan
    Write-Host "Validacion HTTP: $SiteUrl" -ForegroundColor Cyan
    Write-Host "Comandos SFTP:" -ForegroundColor Cyan
    $batchLines | ForEach-Object { Write-Host "  $_" }
    Write-Host "Luego ejecutaria: $permissionScript" -ForegroundColor Cyan
    exit 0
}

$batchPath = [System.IO.Path]::GetTempFileName()
try {
    [System.IO.File]::WriteAllLines($batchPath, $batchLines, [System.Text.Encoding]::ASCII)

    Write-Host "Subiendo frontend a Hostinger..." -ForegroundColor Cyan
    $sftpCommand = "sftp -P $SshPort $SshUser@$SshHost < `"$batchPath`""
    cmd.exe /d /c $sftpCommand
    if ($LASTEXITCODE -ne 0) {
        throw "SFTP falló con código $LASTEXITCODE."
    }
}
finally {
    if (Test-Path $batchPath) {
        Remove-Item $batchPath -Force
    }
}

& $permissionScript
if ($LASTEXITCODE -ne 0) {
    throw "No se pudieron normalizar permisos despues del deploy."
}

Test-FrontendPublish -BaseUrl $SiteUrl

Write-Host "Deploy frontend completo: build, subida, permisos y validacion listos." -ForegroundColor Green