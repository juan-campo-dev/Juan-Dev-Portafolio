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

# Crear ZIP manual con separadores '/' (compat Linux)
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$fs = [System.IO.File]::Open($zipPath, [System.IO.FileMode]::CreateNew)
$archive = New-Object System.IO.Compression.ZipArchive($fs, [System.IO.Compression.ZipArchiveMode]::Create)
$srcLen = ([string]$outPath).Length + 1
Get-ChildItem -LiteralPath $outPath -Recurse -File | ForEach-Object {
  $rel = $_.FullName.Substring($srcLen).Replace('\','/')
  $entry = $archive.CreateEntry($rel, [System.IO.Compression.CompressionLevel]::Optimal)
  $es = $entry.Open(); $fsi = [System.IO.File]::OpenRead($_.FullName)
  $fsi.CopyTo($es); $fsi.Close(); $es.Close()
}
$archive.Dispose(); $fs.Close()

Write-Host "ZIP frontend listo: $zipPath" -ForegroundColor Green