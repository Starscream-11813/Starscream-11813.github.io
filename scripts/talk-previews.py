"""Generate preview images for the Talks page.

For every talk in _talks/ (commented-out examples are skipped), this writes a
WebP preview of each of its materials to images/talks/<talk>/: a still of the
video and the first page of the slides, poster, and paper. A Google Drive link
uses the still that Drive renders for the file; a PDF on this site is read from
files/; any other PDF (an arXiv paper, say) is downloaded. Each preview's size
goes to _data/talk_previews.yml, so the page reserves its space before it
loads. Existing previews are kept unless --force is given. Run from the
repository root after adding a talk or changing its links (needs Pillow and
PyMuPDF):

    python scripts/talk-previews.py [--force]

Until it is run, a talk simply shows its links without pictures.
"""
import io
import re
import sys
import tempfile
import urllib.request
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SITE = 'https://starscream-11813.github.io/'
MATERIALS = ('video', 'slides', 'poster', 'paper')
MAX_WIDTH, MAX_HEIGHT = 1280, 1100
HEADERS = {'User-Agent': 'Mozilla/5.0 (talk-previews.py)'}


def talks():
    for page in sorted((ROOT / '_talks').glob('*.md')):
        text = page.read_text(encoding='utf-8')
        front = re.match(r'---\n(.*?)\n---', text, re.S)
        if not front:
            continue
        fields = dict(re.findall(r'^(\w+):[ \t]*"?([^"\n]*?)"?[ \t]*$', front.group(1), re.M))
        slug = fields.get('permalink', page.stem).rstrip('/').split('/')[-1]
        yield slug, {m: fields[m] for m in MATERIALS if fields.get(m)}


def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=120) as response:
        return response.read()


def first_page(pdf, scratch):
    """Renders the first page of a PDF given as a path or a URL."""
    if not isinstance(pdf, Path):
        path = Path(scratch) / 'material.pdf'
        path.write_bytes(fetch(pdf))
        pdf = path
    with pymupdf.open(pdf) as document:
        page = document[0]
        zoom = min(MAX_WIDTH / page.rect.width, MAX_HEIGHT / page.rect.height)
        pixmap = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
        return Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)


def preview(url, scratch):
    drive = re.search(r'drive\.google\.com/file/d/([\w-]+)', url)
    if drive:
        return Image.open(io.BytesIO(fetch(f'https://drive.google.com/thumbnail?id={drive.group(1)}&sz=w1600')))
    if url.lower().startswith(SITE + 'files/') or url.startswith('/files/'):
        return first_page(ROOT / 'files' / url.split('/files/', 1)[1], scratch)
    return first_page(url, scratch)


def save(image, target):
    image = image.convert('RGBA')
    image.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.LANCZOS)
    canvas = Image.new('RGB', image.size, 'white')
    canvas.paste(image, mask=image.getchannel('A'))
    target.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(target, 'WEBP', quality=82, method=6)
    return canvas.size


def main():
    force = '--force' in sys.argv[1:]
    sizes = {}
    with tempfile.TemporaryDirectory() as scratch:
        for slug, materials in talks():
            for material, url in materials.items():
                target = ROOT / 'images' / 'talks' / slug / f'{material}.webp'
                if target.exists() and not force:
                    sizes.setdefault(slug, {})[material] = Image.open(target).size
                    continue
                try:
                    sizes.setdefault(slug, {})[material] = save(preview(url, scratch), target)
                    print(f'{slug}: {material} preview written')
                except Exception as error:  # a dead link should not stop the rest
                    print(f'{slug}: no {material} preview ({error})')
    lines = ['# Written by scripts/talk-previews.py: the size of each preview in',
             '# images/talks/<talk>/<material>.webp, as [width, height].']
    for slug in sorted(sizes):
        lines.append(f'{slug}:')
        lines += [f'  {material}: [{w}, {h}]' for material, (w, h) in sizes[slug].items()]
    (ROOT / '_data' / 'talk_previews.yml').write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')


if __name__ == '__main__':
    main()
