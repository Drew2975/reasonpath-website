param([string]$TaskName)
if (-not $TaskName) {
    Write-Host "Please provide a task name" -ForegroundColor Red
    Write-Host "Usage: .\gemini-start.ps1 <task-name>" -ForegroundColor Yellow
    exit 1
}
.\scripts\connect-cli.ps1 -CliName "gemini" -TaskName $TaskName
Write-Host "Gemini ready. Use: gemini-cli with --repo flag" -ForegroundColor Cyan