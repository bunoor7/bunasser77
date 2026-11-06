# studio_setup.ps1 - set up the bunasser77 studio tool layer on Windows (Claude Code).
# Installs missing prerequisites with winget. Since 1.15.0 the tool skills ship inside the
# plugin, so they are NOT copied anywhere unless -LocalSkills is given (that copies them into
# ~/.claude/skills and duplicates them if the plugin is installed too).
#
#   powershell -ExecutionPolicy Bypass -File studio_setup.ps1 -CheckOnly   # report only
#   powershell -ExecutionPolicy Bypass -File studio_setup.ps1              # install missing prerequisites
#   powershell -ExecutionPolicy Bypass -File studio_setup.ps1 -LocalSkills # also copy tool skills locally
#   powershell -ExecutionPolicy Bypass -File studio_setup.ps1 -LocalSkills -Update  # git pull, refresh
#
# ASCII only on purpose: Windows PowerShell 5.1 misreads UTF-8 files without a BOM.

param(
    [switch]$CheckOnly,
    [switch]$Update,
    [switch]$LocalSkills,
    [string]$VendorDir = (Join-Path (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent) '..\vendor'),
    [string]$SkillsDir = (Join-Path $env:USERPROFILE '.claude\skills')
)

$ErrorActionPreference = 'Stop'
$VendorDir = [IO.Path]::GetFullPath($VendorDir)

function Refresh-Path {
    $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
                [Environment]::GetEnvironmentVariable('Path', 'User')
}

# command -> winget id
$prereqs = [ordered]@{
    'git'    = 'Git.Git'
    'node'   = 'OpenJS.NodeJS.LTS'
    'ffmpeg' = 'Gyan.FFmpeg'
    'python' = 'Python.Python.3.12'
    'yt-dlp' = 'yt-dlp.yt-dlp'
    'gh'     = 'GitHub.cli'
}

# repo -> list of @(source folder inside repo, skill name)
$tools = [ordered]@{
    'bradautomates/claude-video' = @{ dir = 'claude-video';    skills = { param($r) ,@(@{ src = "$r\skills\watch"; name = 'watch' }) } }
    'kajisho5/ffmpeg-skill'      = @{ dir = 'ffmpeg-skill';    skills = { param($r) ,@(@{ src = $r; name = 'ffmpeg-skill' }) } }
    'heygen-com/hyperframes'     = @{ dir = 'hyperframes';     skills = { param($r) Get-ChildItem "$r\skills" -Directory | ForEach-Object { @{ src = $_.FullName; name = $_.Name } } } }
    'remotion-dev/skills'        = @{ dir = 'remotion-skills'; skills = { param($r) Get-ChildItem "$r\skills" -Directory | ForEach-Object { @{ src = $_.FullName; name = $_.Name } } } }
}

function Test-Python {
    # The Microsoft Store alias exists but is not a real interpreter.
    try { $v = & python --version 2>$null; return ($LASTEXITCODE -eq 0 -and $v -match 'Python 3') } catch { return $false }
}

Refresh-Path
$missing = @()

Write-Host "== Prerequisites"
foreach ($cmd in $prereqs.Keys) {
    $ok = if ($cmd -eq 'python') { Test-Python } else { [bool](Get-Command $cmd -ErrorAction SilentlyContinue) }
    Write-Host ("  {0,-8} {1}" -f $cmd, $(if ($ok) { 'ok' } else { 'MISSING' }))
    if (-not $ok) { $missing += $cmd }
}

if ($missing -and -not $CheckOnly) {
    foreach ($cmd in $missing) {
        Write-Host "  installing $($prereqs[$cmd]) ..."
        winget install --id $prereqs[$cmd] -e --silent --accept-package-agreements --accept-source-agreements --disable-interactivity | Out-Null
    }
    Refresh-Path
}

if (-not $LocalSkills) {
    Write-Host "== Tool skills: bundled in the bunasser77 plugin (use -LocalSkills to copy them into $SkillsDir)"
    $tools = [ordered]@{}
} else {
    Write-Host "== Tool skills -> $SkillsDir"
    if (-not $CheckOnly) { New-Item -ItemType Directory -Force $VendorDir, $SkillsDir | Out-Null }
}

foreach ($repo in $tools.Keys) {
    $t = $tools[$repo]
    $local = Join-Path $VendorDir $t.dir
    if (-not $CheckOnly) {
        if (-not (Test-Path $local)) {
            git clone --quiet --depth 1 "https://github.com/$repo.git" $local
        } elseif ($Update) {
            git -C $local pull --quiet --ff-only
        }
    }
    if (-not (Test-Path $local)) { Write-Host "  $repo : not downloaded"; continue }

    foreach ($s in (& $t.skills $local)) {
        $target = Join-Path $SkillsDir $s.name
        $exists = Test-Path (Join-Path $target 'SKILL.md')
        if ($CheckOnly) {
            Write-Host ("  {0,-26} {1}" -f $s.name, $(if ($exists) { 'ok' } else { 'MISSING' }))
            continue
        }
        if ($exists -and -not $Update) { continue }
        # /MIR only on -Update, so a refresh drops files removed upstream.
        $mode = if ($Update) { '/MIR' } else { '/E' }
        robocopy $s.src $target $mode /XD .git .github tests .claude .agents node_modules /NFL /NDL /NJH /NJS /NP | Out-Null
        if ($LASTEXITCODE -ge 8) { throw "robocopy failed for $($s.name)" }
        Write-Host "  $($s.name) installed"
    }
}

if ($CheckOnly) {
    if ($missing) { Write-Host "`nMissing prerequisites: $($missing -join ', ')" } else { Write-Host "`nPrerequisites ready." }
} else {
    Write-Host "`nDone. Start a new Claude Code session so new tools are picked up."
    Write-Host "First run of watch asks local vs Gemini; ffmpeg-skill self-check: python <plugin>\ffmpeg-skill\scripts\_contract.py doctor"
}
