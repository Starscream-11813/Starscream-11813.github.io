"""Compose full-resolution publication teasers from unaltered PDF figures.

Requires PyMuPDF, Pillow, and PyYAML. Crops and versioned PDF sources live in
_data/publication_teasers.yml. No figures, axes, legends, or results are redrawn.

    python scripts/publication-teasers.py
    python scripts/thumbnails.py

Pass --source-dir to use already downloaded PDFs named proclaim.pdf, marsgps.pdf,
etc., instead of downloading the pinned versions. --paper rebuilds just one.
"""
import argparse
import re
import tempfile
from pathlib import Path
from urllib.request import urlopen

import pymupdf
import yaml
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
WIDTH = 1800
MARGIN = 64
INK = '#38334c'
MUTED = '#716981'
ACCENT = '#6e65ce'
RULE = '#e5e1ef'


def font(size, bold=False):
    """Segoe UI on Windows; a portable sans-serif elsewhere."""
    candidates = [Path('C:/Windows/Fonts') / ('segoeuib.ttf' if bold else 'segoeui.ttf'),
                  'DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf']
    for candidate in candidates:
        try:
            return ImageFont.truetype(str(candidate), size)
        except OSError:
            continue
    raise RuntimeError('Install Segoe UI or DejaVu Sans before rendering teasers.')


def render_panel(document, panel):
    page = document[panel['page']]
    crop = pymupdf.Rect(panel['crop'])
    if crop.is_empty or not page.rect.contains(crop):
        raise ValueError(f"Invalid crop for {panel['figure']}: {crop}")
    fraction = panel.get('width', 1.0)
    if not 0 < fraction <= 1:
        raise ValueError('Panel width must be between 0 and 1.')
    target_width = round((WIDTH - 2 * MARGIN) * fraction)
    scale = target_width / crop.width
    pixels = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), clip=crop,
                             colorspace=pymupdf.csRGB, alpha=False)
    image = Image.frombytes('RGB', (pixels.width, pixels.height), pixels.samples)
    # Raster bounds may round up one pixel; preserve the figure's proportions.
    if image.width != target_width:
        image = image.resize((target_width, round(image.height * target_width / image.width)),
                             Image.Resampling.LANCZOS)
    return image


def compose(specification, source):
    with pymupdf.open(source) as document:
        panels = [(panel, render_panel(document, panel)) for panel in specification['panels']]
    header_height = 174
    footer_height = 100
    gap = 48
    label_heights = [96 if panel.get('note') else 62 for panel, _ in panels]
    height = MARGIN + header_height + sum(
        label + image.height for label, (_, image) in zip(label_heights, panels)
    ) + gap * (len(panels) - 1) + footer_height
    canvas = Image.new('RGB', (WIDTH, height), 'white')
    draw = ImageDraw.Draw(canvas)
    title_font, subtitle_font = font(72, True), font(32)
    label_font, note_font, source_font = font(34, True), font(28), font(27)
    draw.rounded_rectangle((MARGIN, MARGIN + 8, MARGIN + 8, MARGIN + 119), radius=4, fill=ACCENT)
    draw.text((MARGIN + 32, MARGIN - 4), specification['title'], font=title_font, fill=INK)
    draw.text((MARGIN + 34, MARGIN + 94), specification['subtitle'], font=subtitle_font, fill=MUTED)
    y = MARGIN + header_height
    for index, ((panel, image), label_height) in enumerate(zip(panels, label_heights)):
        if index:
            draw.line((MARGIN, y - 24, WIDTH - MARGIN, y - 24), fill=RULE, width=2)
        draw.text((MARGIN, y), panel['label'], font=label_font, fill=INK)
        figure = panel['figure']
        figure_width = draw.textlength(figure, font=note_font)
        draw.text((WIDTH - MARGIN - figure_width, y + 6), figure, font=note_font, fill=MUTED)
        if panel.get('note'):
            draw.text((MARGIN, y + 46), panel['note'], font=note_font, fill=MUTED)
        y += label_height
        canvas.paste(image, ((WIDTH - image.width) // 2, y))
        y += image.height + gap
    draw.text((MARGIN, height - 66), specification['source'], font=source_font, fill=MUTED)
    target = (ROOT / 'images' / specification['image']).resolve()
    if target.parent != (ROOT / 'images').resolve() or target.suffix != '.png':
        raise ValueError('Teaser output must be a PNG directly in images/.')
    canvas.save(target, 'PNG', optimize=True, dpi=(300, 300))
    print(f'{target.relative_to(ROOT)}: {canvas.width} x {canvas.height}, {target.stat().st_size:,} bytes')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-dir', type=Path)
    parser.add_argument('--paper', action='append', help='Manifest key; repeat to select several papers.')
    args = parser.parse_args()
    specifications = yaml.safe_load((ROOT / '_data/publication_teasers.yml').read_text(encoding='utf-8'))
    keys = args.paper or list(specifications)
    with tempfile.TemporaryDirectory(prefix='publication-teaser-sources-') as temporary:
        for key in keys:
            if not re.fullmatch(r'[a-z0-9_-]+', key) or key not in specifications:
                parser.error(f'Unknown paper: {key}')
            specification = specifications[key]
            source = (args.source_dir or Path(temporary)) / f'{key}.pdf'
            if not args.source_dir:
                url = specification['pdf']
                if not url.startswith('https://arxiv.org/pdf/'):
                    raise ValueError('PDF sources must be versioned arXiv PDFs.')
                with urlopen(url, timeout=60) as response:
                    source.write_bytes(response.read())
            compose(specification, source)


if __name__ == '__main__':
    main()
