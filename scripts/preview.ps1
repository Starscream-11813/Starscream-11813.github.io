param(
    [int]$Port = 4000,
    [switch]$Drafts,
    [switch]$SkipBundleInstall
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot

function Set-LocalBundleEnvironment {
    $bundleHome = Join-Path $RepoRoot ".bundle"
    $bundleCache = Join-Path $bundleHome "cache"
    $bundlePlugin = Join-Path $bundleHome "plugin"
    $gemSpecCache = Join-Path $bundleHome "gem-spec-cache"

    New-Item -ItemType Directory -Force -Path $bundleHome, $bundleCache, $bundlePlugin, $gemSpecCache | Out-Null

    $env:BUNDLE_USER_HOME = $bundleHome
    $env:BUNDLE_USER_CACHE = $bundleCache
    $env:BUNDLE_USER_CONFIG = Join-Path $bundleHome "config"
    $env:BUNDLE_USER_PLUGIN = $bundlePlugin
    $env:GEM_SPEC_CACHE = $gemSpecCache
}

function Add-KnownRubyToPath {
    if (Get-Command "ruby" -ErrorAction SilentlyContinue) {
        return
    }

    $rubyBin = Get-ChildItem -Path "C:\" -Directory -Filter "Ruby*-x64" -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        ForEach-Object { Join-Path $_.FullName "bin" } |
        Where-Object { Test-Path (Join-Path $_ "ruby.exe") } |
        Select-Object -First 1

    if ($rubyBin) {
        $env:Path = "$rubyBin;$env:Path"
    }
}

function Assert-Command {
    param(
        [string]$Name,
        [string]$InstallHint
    )

    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        Write-Host ""
        Write-Host "Missing dependency: $Name" -ForegroundColor Yellow
        Write-Host $InstallHint
        Write-Host ""
        exit 1
    }
}

function Invoke-Native {
    param(
        [string]$Command,
        [string[]]$Arguments
    )

    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "$Command $($Arguments -join ' ') failed with exit code $LASTEXITCODE"
    }
}

Set-LocalBundleEnvironment
Add-KnownRubyToPath

Assert-Command "ruby" "Install Ruby+Devkit for Windows, then reopen PowerShell and run this script again."
Assert-Command "bundle" "Bundler is required. After Ruby is installed, run: gem install bundler"

Write-Host "Using repository: $RepoRoot"
Write-Host "Preview URL: http://127.0.0.1:$Port"

Invoke-Native "bundle" @("config", "set", "path", "vendor/bundle")

if (-not $SkipBundleInstall) {
    & bundle check
    if ($LASTEXITCODE -ne 0) {
        Invoke-Native "bundle" @("install")
    }
}

$jekyllArgs = @(
    "exec",
    "jekyll",
    "serve",
    "--config",
    "_config.yml,_config.dev.yml",
    "--host",
    "127.0.0.1",
    "--port",
    "$Port",
    "--livereload",
    "--force_polling",
    "--incremental"
)

if ($Drafts) {
    $jekyllArgs += "--drafts"
}

Invoke-Native "bundle" $jekyllArgs
