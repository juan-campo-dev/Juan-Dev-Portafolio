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

$rootFiles = @(
    "$FrontendPath/.htaccess",
    "$FrontendPath/404.html",
    "$FrontendPath/admin.html",
    "$FrontendPath/admin.txt",
    "$FrontendPath/index.html",
    "$FrontendPath/index.txt"
)
$assetPaths = @(
    "$FrontendPath/_next",
    "$FrontendPath/images",
    "$FrontendPath/cv"
)
$quotedRootFiles = ($rootFiles | ForEach-Object { "'$_'" }) -join " "
$quotedAssetPaths = ($assetPaths | ForEach-Object { "'$_'" }) -join " "
$remoteCommand = "set -e; chmod 755 '$FrontendPath'; for file in $quotedRootFiles; do if [ -e `"`$file`" ]; then chmod 644 `"`$file`"; fi; done; for path in $quotedAssetPaths; do if [ -e `"`$path`" ]; then find `"`$path`" -type d -exec chmod 755 {} \; ; find `"`$path`" -type f -exec chmod 644 {} \; ; fi; done; ls -ld '$FrontendPath' $quotedAssetPaths"

Write-Host "Corrigiendo permisos frontend en Hostinger..." -ForegroundColor Cyan
ssh -p $SshPort "$SshUser@$SshHost" $remoteCommand
if ($LASTEXITCODE -ne 0) {
    throw "No se pudieron corregir los permisos remotos. SSH salio con codigo $LASTEXITCODE."
}
Write-Host "Permisos frontend corregidos." -ForegroundColor Green