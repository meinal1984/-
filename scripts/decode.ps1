param(
  [string]$Input = 'bin/hello.exe.b64',
  [string]$Output = 'bin/hello.exe'
)

if (-not (Test-Path $Input)) {
  Write-Error "Input file not found: $Input"
  exit 1
}

$base64 = Get-Content -Raw -Path $Input
[IO.File]::WriteAllBytes($Output, [Convert]::FromBase64String($base64))
Write-Host "Wrote $Output"
