$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$apiPath = Join-Path $repoRoot "app\api"
$apiBackupPath = Join-Path $repoRoot ".static-export-api-backup"
$outPath = Join-Path $repoRoot "out"
$adminHtmlPath = Join-Path $outPath "admin.html"
$adminFolderPath = Join-Path $outPath "admin"
$adminIndexPath = Join-Path $adminFolderPath "index.html"
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

  if (Test-Path $adminHtmlPath) {
    New-Item -ItemType Directory -Path $adminFolderPath -Force | Out-Null
    Copy-Item $adminHtmlPath $adminIndexPath -Force
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