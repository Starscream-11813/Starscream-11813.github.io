My little corner of the internet.

## Local preview

This is a Jekyll/GitHub Pages site. Use the local preview before pushing changes so you can review the rendered pages at `http://127.0.0.1:4000`.

### One-time setup on Windows

1. Install Ruby+Devkit for Windows from <https://rubyinstaller.org/>.
2. Reopen PowerShell so Ruby is available on your `PATH`.
3. From this repository, run:

```powershell
gem install bundler
.\preview.cmd
```

The script installs the Ruby gems into `vendor/bundle`, builds the site with `_config.yml` plus `_config.dev.yml`, disables analytics for local development, and starts Jekyll with live reload.
The first run can take a few minutes while Bundler downloads the GitHub Pages gems. Generated dependency files stay out of git.

### Daily workflow

```powershell
.\preview.cmd
```

Then open:

```text
http://127.0.0.1:4000
```

Useful options:

```powershell
.\preview.cmd -Port 4001
.\preview.cmd -Drafts
.\build-preview.cmd
.\stop-preview.cmd
```

You can also run the PowerShell scripts directly with execution-policy bypass:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\preview.ps1
```

### Docker alternative

If Docker Desktop is installed, this also works without installing Ruby directly on Windows:

```powershell
docker compose up
```

Then open `http://127.0.0.1:4000`.

The generated preview output lives in `_site/`, which is ignored by git.
