$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$apiPath = Join-Path $repoRoot "app\api"
$apiBackupPath = Join-Path $repoRoot ".static-export-api-backup"
$outPath = Join-Path $repoRoot "out"
$htaccessSource = Join-Path $PSScriptRoot "frontend.htaccess"
$htaccessTarget = Join-Path $outPath ".htaccess"

Set-Location $repoRoot

if (Test-Path $apiBackupPath) {
  Remove-Item $apiBackupPath -Recurse -Force
}

try {
  if (Test-Path $apiPath) {
    Move-Item $apiPath $apiBackupPath
  }

  $env:STATIC_EXPORT = "true"
  $env:NEXT_PUBLIC_API_URL = "https://juan-dev.app-dev.icu/api"

  npm run build
  if ($LASTEXITCODE -ne 0) {
    throw "next build falló con código $LASTEXITCODE"
  }

  Copy-Item $htaccessSource $htaccessTarget -Force

  Write-Host "Build listo para FTP: $outPath" -ForegroundColor Green
}
finally {
  if (Test-Path $apiBackupPath) {
    if (Test-Path $apiPath) {
      Remove-Item $apiPath -Recurse -Force
    }
    Move-Item $apiBackupPath $apiPath
  }
}