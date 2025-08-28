param([string]$TaskName)
if (-not $TaskName) {
    Write-Host "Please provide a task name" -ForegroundColor Red
    Write-Host "Usage: .\claude-start.ps1 <task-name>" -ForegroundColor Yellow
    exit 1
}
.\scripts\connect-cli.ps1 -CliName "claude" -TaskName $TaskName
Write-Host "Claude can now use git commands directly in the terminal" -ForegroundColor Cyan