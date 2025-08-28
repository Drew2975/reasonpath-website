param([string]$TaskName)
if (-not $TaskName) {
    Write-Host "Please provide a task name" -ForegroundColor Red
    Write-Host "Usage: .\codex-start.ps1 <task-name>" -ForegroundColor Yellow
    exit 1
}
.\scripts\connect-cli.ps1 -CliName "codex" -TaskName $TaskName
Write-Host "Codex ready. Use: codex --git-integrated mode" -ForegroundColor Cyan