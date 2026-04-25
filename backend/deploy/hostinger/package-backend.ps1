$ErrorActionPreference = "Stop"

# backend está en <repo>/backend, packages se dejan fuera del repo en proyectos/deploy-packages
$backendRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$repoRoot = Split-Path $backendRoot -Parent
$projectsDir = Split-Path $repoRoot -Parent
$packagesDir = Join-Path $projectsDir "deploy-packages"
$stagingPath = Join-Path $projectsDir ".deploy\juan-dev-api"
$zipPath = Join-Path $packagesDir "juan-dev-backend-api-hostinger.zip"

Set-Location $backendRoot

composer install --no-dev --optimize-autoloader
if ($LASTEXITCODE -ne 0) {
  throw "composer install --no-dev falló con código $LASTEXITCODE"
}

php artisan optimize:clear
if ($LASTEXITCODE -ne 0) {
  throw "php artisan optimize:clear falló con código $LASTEXITCODE"
}

if (Test-Path $stagingPath) {
  Remove-Item $stagingPath -Recurse -Force
}
New-Item -ItemType Directory -Path $stagingPath | Out-Null

robocopy $backendRoot $stagingPath /E /XD .git .github .idea .vscode node_modules tests /XF .env .env.backup .env.production database.sqlite *.log *.zip *.tar.gz | Out-Null
if ($LASTEXITCODE -gt 7) {
  throw "robocopy falló con código $LASTEXITCODE"
}

Copy-Item (Join-Path $PSScriptRoot "api-root.htaccess") (Join-Path $stagingPath ".htaccess") -Force

$sqlite = Join-Path $stagingPath "database\database.sqlite"
if (Test-Path $sqlite) {
  Remove-Item $sqlite -Force
}

if (!(Test-Path $packagesDir)) {
  New-Item -ItemType Directory -Path $packagesDir | Out-Null
}

if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
}

$items = Get-ChildItem $stagingPath -Force
Compress-Archive -Path $items.FullName -DestinationPath $zipPath -Force

Write-Host "ZIP backend listo: $zipPath" -ForegroundColor Green