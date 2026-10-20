"""Write the self-hosted web fonts in assets/fonts/.

The site's Palatino is whichever well-made Palatino the visitor already has
(Palatino Linotype on Windows, Palatino on macOS and iOS); see
_sass/_fonts.scss. Where there is none (Android, most Linux), it falls back to
TeX Gyre Pagella, a free Palatino with the same letter widths. This writes
Pagella's four faces as WOFF2, each split in two like Google Fonts does: a
small Latin file (Latin-1 and common punctuation) that most pages need, and an
extended one (accented Latin, Greek, symbols) fetched only if a page uses it.

It also trims the two fonts of the site title down to the characters they set:
Libertinus Serif Display for "Syed Rifat Raiyan" (Basic Latin and quotes),
and Kalpurush for the Bangla name, keeping every Bangla character used
anywhere on the site, with all the conjuncts they can form. Re-run it after
adding Bangla text:

    python scripts/web-fonts.py

Needs fontTools and brotli (pip install fonttools brotli). Pagella is read from
a TeX installation (kpsewhich) or downloaded from CTAN; Kalpurush from
assets/fonts/kalpurush.ttf; Libertinus Serif Display is downloaded.
"""
import io
import logging
import re
import shutil
import subprocess
import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / 'assets' / 'fonts'

PAGELLA_FACES = ('regular', 'italic', 'bold', 'bolditalic')
PAGELLA_CTAN = 'https://mirrors.ctan.org/fonts/tex-gyre/opentype/texgyrepagella-{}.otf'
LIBERTINUS_URL = 'https://fonts.cdnfonts.com/s/19340/LibertinusSerifDisplay-Regular.woff'

# The same split as Google Fonts' latin and latin-ext subsets. Keep these in
# step with the unicode-range lines in _sass/_fonts.scss.
LATIN = ('U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,'
         'U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,'
         'U+2212,U+2215,U+FEFF,U+FFFD,U+FB00-FB04')
LATIN_EXT = ('U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,'
             'U+0300-0303,U+0305-0307,U+0309-0328,U+032A-036F,U+0370-03FF,'
             'U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2100-2121,U+2123-218F,'
             'U+2190,U+2192,U+2194-21FF,U+2200-2211,U+2213-2214,U+2216-22FF')
SKIP = ('_site', 'vendor', 'node_modules', 'tmp', '.git', '.sass-cache', '.bundle')
BANGLA = re.compile('[ঀ-৿]')

# fontTools warns about each FontForge timestamp table it drops.
logging.getLogger('fontTools.subset').setLevel(logging.ERROR)


def subsetted(font, unicodes=None, text=None, features=None):
    """A WOFF2 of the font cut down to the given characters. The name table is
    kept whole, so each file still carries its copyright and license."""
    options = subset.Options()
    options.flavor = 'woff2'
    options.name_IDs = ['*']
    options.name_languages = ['*']
    options.notdef_outline = True
    if features is not None:
        options.layout_features = features
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=subset.parse_unicodes(unicodes) if unicodes else [], text=text or '')
    subsetter.subset(font)
    data = io.BytesIO()
    font.flavor = 'woff2'
    font.save(data)
    return data.getvalue()


def write(name, data):
    (FONTS / name).write_bytes(data)
    print(f'  {name}: {len(data) / 1024:.1f} KB')


def download(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def pagella_source(face):
    filename = f'texgyrepagella-{face}.otf'
    kpsewhich = shutil.which('kpsewhich')
    if kpsewhich:
        found = subprocess.run([kpsewhich, filename], capture_output=True, text=True).stdout.strip()
        if found and Path(found).is_file():
            return io.BytesIO(Path(found).read_bytes())
    return io.BytesIO(download(PAGELLA_CTAN.format(face)))


def rename(font, family, face):
    """The GUST Font License asks that changed fonts not keep their names."""
    style = {'regular': 'Regular', 'italic': 'Italic', 'bold': 'Bold', 'bolditalic': 'Bold Italic'}[face]
    names = font['name']
    for record in list(names.names):
        if record.nameID in (1, 3, 4, 6, 16, 17):
            names.removeNames(nameID=record.nameID)
    postscript = f'{family}-{style}'.replace(' ', '')
    names.setName(family, 1, 3, 1, 0x409)
    names.setName(f'{family} {style}', 4, 3, 1, 0x409)
    names.setName(postscript, 6, 3, 1, 0x409)
    names.setName(f'{postscript}; subset of TeX Gyre Pagella', 3, 3, 1, 0x409)


def bangla_text():
    chars = set()
    for path in ROOT.rglob('*'):
        if any(part in SKIP for part in path.relative_to(ROOT).parts):
            continue
        if path.suffix.lower() in ('.html', '.md', '.yml', '.js', '.json') and path.is_file():
            chars.update(BANGLA.findall(path.read_text(encoding='utf-8', errors='ignore')))
    # Joiners steer conjunct formation; the danda and double danda end sentences.
    return ''.join(sorted(chars)) + '‌‍।॥ '


def main():
    print('TeX Gyre Pagella (Palatino fallback)')
    for face in PAGELLA_FACES:
        source = pagella_source(face).getvalue()
        for suffix, unicodes in (('', LATIN), ('-ext', LATIN_EXT)):
            font = TTFont(io.BytesIO(source))
            rename(font, 'Pagella Web', face)
            write(f'pagella-{face}{suffix}.woff2', subsetted(font, unicodes=unicodes))

    print('Libertinus Serif Display (site title)')
    font = TTFont(io.BytesIO(download(LIBERTINUS_URL)))
    write('libertinus-serif-display-title.woff2', subsetted(font, unicodes='U+0020-007E,U+2013-2014,U+2018-201D,U+2026'))

    text = bangla_text()
    print(f'Kalpurush (Bangla name; {len(text.strip())} characters)')
    font = TTFont(FONTS / 'kalpurush.ttf')
    write('kalpurush-name.woff2', subsetted(font, text=text, features=['*']))


if __name__ == '__main__':
    main()
