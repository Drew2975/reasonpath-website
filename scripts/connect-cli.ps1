# Universal CLI Connection Script for Windows
param(
    [Parameter(Mandatory=$true)]
    [string]$CliName,
    
    [Parameter(Mandatory=$true)]
    [string]$TaskName
)

# Check if Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

$RepoUrl = "https://github.com/Drew2975/reasonpath-website.git"

Write-Host "Connecting $CliName to repository..." -ForegroundColor Yellow

# Fetch latest
Write-Host "Fetching latest changes..." -ForegroundColor Yellow
git fetch --all

# Create timestamp
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

# Create unique branch
$Branch = "work/$CliName-$TaskName-$Timestamp"

# Create and checkout branch
git checkout -b $Branch origin/master

# Create workspace file
$AuditPath = "audits\$CliName"
if (-not (Test-Path $AuditPath)) {
    New-Item -ItemType Directory -Path $AuditPath -Force | Out-Null
}

$SessionContent = @"
# CLI Session

**CLI:** $CliName
**Task:** $TaskName
**Branch:** $Branch
**Started:** $(Get-Date)

## Session Log
Session initialized. Ready for work.
"@

$SessionContent | Out-File -FilePath "$AuditPath\session.md" -Encoding UTF8

# Initial commit
git add .
git commit -m "Start $CliName session for $TaskName"

Write-Host "Connected to GitHub" -ForegroundColor Green
Write-Host "Branch: $Branch" -ForegroundColor Green
Write-Host "Ready for $CliName to work on $TaskName" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start your CLI work"
Write-Host "2. Commit frequently: git commit -am 'Your message'"
Write-Host "3. Push when done: git push origin $Branch"