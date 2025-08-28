# Conductor Dashboard Script
param(
    [string]$Command,
    [string]$Param1,
    [string]$Param2
)

function Show-Status {
    Write-Host "=== Current Work Branches ===" -ForegroundColor Cyan
    git branch -r | Where-Object { $_ -match "work/" } | ForEach-Object { 
        Write-Host $_.Trim() -ForegroundColor Yellow 
    }
    
    Write-Host "`n=== Recent Commits ===" -ForegroundColor Cyan
    git log --oneline --graph --all --max-count=10
    
    Write-Host "`n=== Local Branch Status ===" -ForegroundColor Cyan
    git branch -v
}

function Assign-Task {
    param($cli, $task)
    if (-not $cli -or -not $task) {
        Write-Host "Usage: conductor assign <cli> <task>" -ForegroundColor Red
        return
    }
    
    Write-Host "Assigning task '$task' to $cli..." -ForegroundColor Yellow
    & ".\scripts\$cli-start.ps1" $task
}

function Merge-Branch {
    param($branch)
    if (-not $branch) {
        Write-Host "Usage: conductor merge <branch-name>" -ForegroundColor Red
        return
    }
    
    Write-Host "Merging $branch to master..." -ForegroundColor Yellow
    git checkout master
    git pull origin master
    git merge $branch --no-ff -m "Merge $branch into master"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Merge successful! Push with: git push" -ForegroundColor Green
    } else {
        Write-Host "Merge conflict! Resolve manually" -ForegroundColor Red
    }
}

function Show-Help {
    Write-Host "Conductor Commands:" -ForegroundColor Cyan
    Write-Host "  .\scripts\conductor.ps1 status        - Show current status" -ForegroundColor White
    Write-Host "  .\scripts\conductor.ps1 assign <cli> <task> - Assign task to CLI" -ForegroundColor White
    Write-Host "  .\scripts\conductor.ps1 merge <branch>      - Merge branch to master" -ForegroundColor White
    Write-Host "  .\scripts\conductor.ps1 cleanup       - List branches safe to delete" -ForegroundColor White
    Write-Host "  .\scripts\conductor.ps1 help          - Show this help" -ForegroundColor White
    Write-Host ""
    Write-Host "Available CLIs: claude, codex, gemini" -ForegroundColor Gray
}

function Cleanup-Branches {
    Write-Host "=== Merged branches (safe to delete) ===" -ForegroundColor Cyan
    git branch --merged master | Where-Object { $_ -match "work/" }
    
    Write-Host "`n=== Unmerged branches (still have work) ===" -ForegroundColor Yellow
    git branch --no-merged master | Where-Object { $_ -match "work/" }
}

# Main command switch
switch ($Command) {
    "status" { Show-Status }
    "assign" { Assign-Task $Param1 $Param2 }
    "merge" { Merge-Branch $Param1 }
    "cleanup" { Cleanup-Branches }
    "help" { Show-Help }
    default { Show-Help }
}