"""Trim the site's icon fonts to the icons it uses.

The icons come from four fonts: Font Awesome 4.7 (the `fa fa-*` classes, from
assets/css/font-awesome-4.7.0.min.css), Font Awesome 5 solid and brands (`fas`,
`fab`, in main.css), and Academicons (`ai ai-*`). Together they hold well over
two thousand icons, about 250 KB, for the few dozen the site shows. This finds
every icon name the site's pages, layouts, includes, data, scripts, and styles
mention, looks up its character in each font's own stylesheet, and writes WOFF2
copies of the fonts holding just those characters to assets/fonts/icons/. The
glyphs are the fonts' own, untouched.

Each copy is declared after its full font and limited (unicode-range) to the
characters it holds, so a browser reaches for it first and never downloads the
full font, unless a page uses an icon the copy lacks: then the full font loads
for that icon, so nothing goes missing. Re-run after using new icons, to keep
the savings:

    python scripts/icon-fonts.py

It writes the copies, _sass/_icon-fonts.scss (Font Awesome 5 and Academicons),
and assets/css/font-awesome-4.7.0.min.css (Font Awesome 4.7, from cdnjs). Needs
fontTools and brotli (pip install fonttools brotli) and a network connection.
"""
import io
import logging
import re
import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'fonts' / 'icons'
FA4_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/'
FA5_VARIABLES = ROOT / '_sass' / 'vendor' / 'font-awesome' / '_variables.scss'
FA5_FONTS = {'solid': ROOT / 'assets' / 'fonts' / 'fa-solid-900.woff2',
             'brands': ROOT / 'assets' / 'fonts' / 'fa-brands-400.woff2'}
ACADEMICONS = ROOT / 'assets' / 'academicons-1.9.4'
SCAN = ['_includes', '_layouts', '_pages', '_posts', '_publications', '_talks', '_teaching',
        '_portfolio', '_data', '_sass', 'assets/js', 'assets/css']
SKIP = ('vendor', 'plugins', 'main.min.js', 'font-awesome-4.7.0.min.css', '_icon-fonts.scss', 'academicons')
NAME = re.compile(r'\b(fa|ai)-([a-z0-9]+(?:-[a-z0-9]+)*)')
CONTENT = re.compile(r'content:\s*["\']\\([0-9a-fA-F]{4,5})["\']')

logging.getLogger('fontTools.subset').setLevel(logging.ERROR)


def download(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def used():
    """Icon names (fa-*, ai-*) and raw characters (content: "\\f0e0") in the site's own files."""
    names, chars = {'fa': set(), 'ai': set()}, set()
    files = [p for folder in SCAN for p in (ROOT / folder).rglob('*') if p.is_file()]
    files += [p for p in ROOT.glob('*.*') if p.suffix in ('.md', '.html', '.yml')]
    for path in files:
        if any(part in str(path.relative_to(ROOT)) for part in SKIP):
            continue
        if path.suffix not in ('.html', '.md', '.js', '.yml', '.yaml', '.scss', '.css', '.json'):
            continue
        text = path.read_text(encoding='utf-8', errors='ignore')
        for kind, name in NAME.findall(text):
            names[kind].add(name)
        chars.update(int(code, 16) for code in CONTENT.findall(text))
    return names, chars


def css_map(css, prefix):
    """{name: codepoint} from rules like .fa-github:before,.fa-git:before{content:"\\f09b"}."""
    mapping = {}
    for selectors, code in re.findall(r'([^{}]+)\{\s*content:\s*["\']\\([0-9a-fA-F]+)["\']', css):
        for name in re.findall(r'\.' + prefix + r'-([a-z0-9-]+):+before', selectors):
            mapping[name] = int(code, 16)
    return mapping


def trimmed(font_bytes, codepoints, out_name):
    # Bounding boxes and header flags stay exactly as in the full font: letting
    # fontTools recompute them shifts some icons by a fraction of a pixel.
    font = TTFont(io.BytesIO(font_bytes), recalcBBoxes=False, recalcTimestamp=False)
    flags = font['head'].flags
    cmap = font.getBestCmap()
    keep = sorted(c for c in codepoints if c in cmap)
    options = subset.Options()
    options.flavor = 'woff2'
    options.name_IDs = ['*']
    options.name_languages = ['*']
    options.notdef_outline = True
    options.layout_features = []
    options.recalc_bounds = False
    options.recalc_max_context = False
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=keep)
    subsetter.subset(font)
    font['head'].flags = flags
    data = io.BytesIO()
    font.flavor = 'woff2'
    font.save(data)
    (OUT / out_name).write_bytes(data.getvalue())
    print(f'  {out_name}: {len(keep)} icons, {len(data.getvalue()) / 1024:.1f} KB')
    return keep


def unicode_range(codepoints):
    return ', '.join(f'U+{c:X}' for c in codepoints)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    names, chars = used()

    fa4_css = download(FA4_CDN + 'css/font-awesome.min.css').decode('utf-8')
    fa4 = css_map(fa4_css, 'fa')
    fa5 = {name: int(code, 16) for name, code in re.findall(r'\$fa-var-([a-z0-9-]+):\s*\\([0-9a-fA-F]+);', FA5_VARIABLES.read_text(encoding='utf-8'))}
    ai_css = (ACADEMICONS / 'css' / 'academicons.css').read_text(encoding='utf-8')
    ai = css_map(ai_css, 'ai')

    # Font Awesome 4.7 and 5 share class names, and on some pages one's
    # stylesheet sets the character and the other's font draws it, so each Font
    # Awesome font gets every character either stylesheet gives a used name.
    fa_chars = {fa4[n] for n in names['fa'] if n in fa4} | {fa5[n] for n in names['fa'] if n in fa5} | chars
    ai_chars = {ai[n] for n in names['ai'] if n in ai} | chars

    print('Font Awesome 4.7')
    fa4_keep = trimmed(download(FA4_CDN + 'fonts/fontawesome-webfont.woff2'), fa_chars, 'fontawesome-4.7-icons.woff2')
    print('Font Awesome 5')
    solid_keep = trimmed(FA5_FONTS['solid'].read_bytes(), fa_chars, 'fa-solid-900-icons.woff2')
    brands_keep = trimmed(FA5_FONTS['brands'].read_bytes(), fa_chars, 'fa-brands-400-icons.woff2')
    print('Academicons')
    ai_keep = trimmed((ACADEMICONS / 'fonts' / 'academicons.ttf').read_bytes(), ai_chars, 'academicons-icons.woff2')

    # Font Awesome 4.7's stylesheet, served from the site: its full font stays on
    # cdnjs as the fallback, and the trimmed copy is declared after it.
    fa4_css = fa4_css.replace("url('../fonts/", "url('" + FA4_CDN + "fonts/")
    fa4_css = fa4_css.rstrip() + (
        "\n/* Generated by scripts/icon-fonts.py: the icons the site uses, tried before the full font above. */\n"
        "@font-face{font-family:'FontAwesome';font-weight:normal;font-style:normal;"
        "src:url('../fonts/icons/fontawesome-4.7-icons.woff2') format('woff2');"
        f"unicode-range:{unicode_range(fa4_keep)}}}\n")
    (ROOT / 'assets' / 'css' / 'font-awesome-4.7.0.min.css').write_text(fa4_css, encoding='utf-8', newline='\n')

    # Font Awesome 5 and Academicons, at the end of main.css. Academicons moves
    # here from its own stylesheet; its rules keep their place after the rest.
    ai_rules = ai_css.split('}', 1)[1] if '@font-face' in ai_css.split('}', 1)[0] else ai_css
    ai_rules = re.sub(r'/\*.*?\*/', '', ai_rules, count=1, flags=re.S).strip()
    scss = f"""/* ==========================================================================
   ICON FONTS
   Generated by scripts/icon-fonts.py; re-run it after using a new icon.
   Each font's trimmed copy holds just the icons the site uses and is declared
   after the full font, limited to those characters, so browsers use the copy
   and never fetch the full font unless a page uses some other icon.
   ========================================================================== */

@font-face {{
  font-family: 'Font Awesome 5 Free';
  font-style: normal;
  font-weight: 900;
  src: url('../fonts/icons/fa-solid-900-icons.woff2') format('woff2');
  unicode-range: {unicode_range(solid_keep)};
}}

@font-face {{
  font-family: 'Font Awesome 5 Brands';
  font-style: normal;
  font-weight: normal;
  src: url('../fonts/icons/fa-brands-400-icons.woff2') format('woff2');
  unicode-range: {unicode_range(brands_keep)};
}}

// Academicons 1.9.4 by James Walsh and Katja Bercic (font: SIL OFL 1.1; CSS: MIT).
@font-face {{
  font-family: 'Academicons';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url('../academicons-1.9.4/fonts/academicons.ttf') format('truetype'),
    url('../academicons-1.9.4/fonts/academicons.woff') format('woff');
}}

@font-face {{
  font-family: 'Academicons';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url('../fonts/icons/academicons-icons.woff2') format('woff2');
  unicode-range: {unicode_range(ai_keep)};
}}

{ai_rules}
"""
    (ROOT / '_sass' / '_icon-fonts.scss').write_text(scss, encoding='utf-8', newline='\n')
    print('Wrote _sass/_icon-fonts.scss and assets/css/font-awesome-4.7.0.min.css')
    unknown = sorted(n for n in names['fa'] if n not in fa4 and n not in fa5)
    print('Names that are not icons (sizes, styles, or neither font has them):', ', '.join(unknown))


if __name__ == '__main__':
    main()
