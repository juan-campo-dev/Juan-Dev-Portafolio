$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$packagesDir = Join-Path (Split-Path $repoRoot -Parent) "deploy-packages"
$zipPath = Join-Path $packagesDir "juan-dev-frontend-hostinger.zip"
$outPath = Join-Path $repoRoot "out"

Set-Location $repoRoot

& (Join-Path $PSScriptRoot "build-static.ps1")

if (!(Test-Path $packagesDir)) {
  New-Item -ItemType Directory -Path $packagesDir | Out-Null
}

if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
}

$items = Get-ChildItem $outPath -Force
Compress-Archive -Path $items.FullName -DestinationPath $zipPath -Force

Write-Host "ZIP frontend listo: $zipPath" -ForegroundColor Green