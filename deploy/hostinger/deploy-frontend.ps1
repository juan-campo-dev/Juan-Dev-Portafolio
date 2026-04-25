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

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outPath = Join-Path $repoRoot "out"
$buildScript = Join-Path $PSScriptRoot "build-static.ps1"
$permissionScript = Join-Path $PSScriptRoot "fix-frontend-permissions.ps1"

Set-Location $repoRoot

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
$batchLines = @(
    "cd $FrontendPath",
    "lcd $outPathForSftp",
    "put -r *",
    "put .htaccess",
    "bye"
)

if ($DryRun) {
    Write-Host "Deploy frontend Hostinger (dry-run)." -ForegroundColor Cyan
    Write-Host "Destino: $SshUser@$SshHost`:$FrontendPath" -ForegroundColor Cyan
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

Write-Host "Deploy frontend completo: build, subida y permisos listos." -ForegroundColor Green