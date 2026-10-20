"""Precompile a self-unpacking "standalone" HTML bundle, such as the IVE-LLM teaser.

Such a bundle carries its React components as JSX and, every time it is shown,
downloads the Babel compiler (about 640 KB) to turn them into JavaScript in the
browser, which takes phones seconds; it also loads React's development builds.
This runs the bundle once in a headless browser, takes the JavaScript Babel
produced (exactly what would run), and writes the bundle back with that code in
place of the JSX, without Babel, and with React's production builds; its WOFF
fonts are stored as WOFF2 (the same fonts, smaller). Nothing else in it
changes, so it looks and behaves the same. Run after replacing the
bundle with a new export (needs Playwright with Microsoft Edge, and a network
connection):

    python scripts/precompile-teaser.py "images/IVE Teaser_standalone.html"
"""
import base64
import gzip
import hashlib
import io
import json
import re
import sys
import urllib.request
from pathlib import Path

from fontTools.ttLib import TTFont
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
REACT = {
    'react.development.js': 'https://unpkg.com/react@{v}/umd/react.production.min.js',
    'react-dom.development.js': 'https://unpkg.com/react-dom@{v}/umd/react-dom.production.min.js',
}


def block(html, kind):
    match = re.search(r'(<script type="__bundler/' + kind + r'">)(.*?)(</script>)', html, re.S)
    return match, json.loads(match.group(2))


def sri(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(request, timeout=60) as response:
        return 'sha384-' + base64.b64encode(hashlib.sha384(response.read()).digest()).decode()


def compiled_modules(path, count):
    """The scripts Babel generated, in the order it ran them."""
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge')
        page = browser.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(path.resolve().as_uri(), wait_until='load')
        page.wait_for_function('''n => window.Babel && [...document.scripts].filter(s => !s.src && !s.type
              && !s.textContent.startsWith('window.__resources')).length >= n''', arg=count, timeout=60000)
        code = page.evaluate('''() => [...document.scripts].filter(s => !s.src && !s.type
              && !s.textContent.startsWith('window.__resources')).map(s => s.textContent)''')
        browser.close()
    if errors:
        raise SystemExit('The bundle reported errors while running: ' + '; '.join(errors))
    return code


def main():
    path = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / 'images' / 'IVE Teaser_standalone.html')
    html = path.read_text(encoding='utf-8')
    manifest_match, manifest = block(html, 'manifest')
    template_match, template = block(html, 'template')

    jsx = re.findall(r'<script type="text/babel" src="([0-9a-f-]{36})"></script>', template)
    if not jsx:
        raise SystemExit('No text/babel scripts: already precompiled?')
    code = compiled_modules(path, len(jsx))
    if len(code) != len(jsx):
        raise SystemExit(f'Expected {len(jsx)} compiled scripts, found {len(code)}.')

    for uuid, source in zip(jsx, code):
        source = re.sub(r'\n?//# sourceMappingURL=data:[^\n]*', '', source).strip() + '\n'
        manifest[uuid] = {'mime': 'application/javascript', 'compressed': True,
                          'data': base64.b64encode(gzip.compress(source.encode('utf-8'), 9)).decode()}
        template = template.replace(f'<script type="text/babel" src="{uuid}"></script>', f'<script src="{uuid}"></script>')

    # Fonts in the older WOFF wrapper become WOFF2: the same font, smaller.
    for uuid, entry in manifest.items():
        if entry['mime'] != 'font/woff' or entry.get('compressed'):
            continue
        font = TTFont(io.BytesIO(base64.b64decode(entry['data'])))
        font.flavor = 'woff2'
        data = io.BytesIO()
        font.save(data)
        entry['mime'] = 'font/woff2'
        entry['data'] = base64.b64encode(data.getvalue()).decode()
        template = re.sub(r'(url\(\\?"?' + uuid + r'\\?"?\)\s*format\()([\'"])woff\2', r'\1\2woff2\2', template)

    template = re.sub(r'\s*<script src="https://unpkg\.com/@babel/standalone@[^"]+"[^>]*></script>', '', template)
    for dev, prod in REACT.items():
        found = re.search(r'<script src="(https://unpkg\.com/(react|react-dom)@([\d.]+)/umd/' + re.escape(dev) + r')"([^>]*)></script>', template)
        if not found:
            continue
        url = prod.format(v=found.group(3))
        template = template.replace(found.group(0), f'<script src="{url}" integrity="{sri(url)}" crossorigin="anonymous"></script>')

    def put(text, match, value):
        return text[:match.start(2)] + json.dumps(value, separators=(',', ':')).replace('</', '<\\u002F') + text[match.end(2):]

    # Replace the later block first, so the earlier one's offsets stay valid.
    first, second = sorted([(manifest_match, manifest), (template_match, template)], key=lambda item: item[0].start())
    html = put(html, second[0], second[1])
    html = put(html, first[0], first[1])
    path.write_text(html, encoding='utf-8', newline='\n')
    print(f'Precompiled {len(jsx)} modules; removed Babel; React production builds. {path.stat().st_size / 1024:.0f} KB')


if __name__ == '__main__':
    main()
