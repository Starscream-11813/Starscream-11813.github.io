param(
    [int]$Port = 4000,
    [int]$LiveReloadPort = 35729
)

$ErrorActionPreference = "Stop"

$ports = @($Port, $LiveReloadPort)
$connections = foreach ($targetPort in $ports) {
    Get-NetTCPConnection -LocalPort $targetPort -State Listen -ErrorAction SilentlyContinue
}

$processIds = $connections |
    Where-Object { $_.OwningProcess } |
    Select-Object -ExpandProperty OwningProcess -Unique

if (-not $processIds) {
    Write-Host "No local Jekyll preview server found on ports $($ports -join ', ')."
    exit 0
}

foreach ($processId in $processIds) {
    Stop-Process -Id $processId -Force
    Write-Host "Stopped preview process $processId."
}
