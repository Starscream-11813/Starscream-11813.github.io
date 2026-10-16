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


def render_panel(document, panel, available_width=WIDTH - 2 * MARGIN):
    page = document[panel['page']]
    crop = pymupdf.Rect(panel['crop'])
    if crop.is_empty or not page.rect.contains(crop):
        raise ValueError(f"Invalid crop for {panel['figure']}: {crop}")
    fraction = panel.get('width', 1.0)
    if not 0 < fraction <= 1:
        raise ValueError('Panel width must be between 0 and 1.')
    target_width = round(available_width * fraction)
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
    # Existing stacked teasers remain unchanged; optional rows support columns.
    rows = specification.get('rows') or [[panel] for panel in specification['panels']]
    gap = 48
    rendered_rows = []
    with pymupdf.open(source) as document:
        for row in rows:
            available = WIDTH - 2 * MARGIN - gap * (len(row) - 1)
            shares = [panel.get('share', 1) for panel in row]
            if not row or available <= 0 or any(share <= 0 for share in shares):
                raise ValueError('Rows need positive column shares and enough space.')
            columns = []
            x = MARGIN
            for index, (panel, share) in enumerate(zip(row, shares)):
                column_width = round(available * share / sum(shares))
                if index == len(row) - 1:
                    column_width = WIDTH - MARGIN - x
                image = render_panel(document, panel, column_width)
                label_height = 96 if panel.get('note') else 62
                columns.append((panel, image, x, column_width, label_height))
                x += column_width + gap
            row_height = max(image.height + label for _, image, _, _, label in columns)
            rendered_rows.append((columns, row_height))
    show_header = specification.get('show_header', True)
    header_height = 174 if show_header else 0
    footer_height = 100
    height = MARGIN + header_height + sum(row_height for _, row_height in rendered_rows)
    height += gap * (len(rendered_rows) - 1) + footer_height
    canvas = Image.new('RGB', (WIDTH, height), 'white')
    draw = ImageDraw.Draw(canvas)
    title_font, subtitle_font = font(72, True), font(32)
    label_font, note_font, source_font = font(34, True), font(28), font(27)
    if show_header:
        draw.rounded_rectangle((MARGIN, MARGIN + 8, MARGIN + 8, MARGIN + 119), radius=4, fill=ACCENT)
        draw.text((MARGIN + 32, MARGIN - 4), specification['title'], font=title_font, fill=INK)
        draw.text((MARGIN + 34, MARGIN + 94), specification['subtitle'], font=subtitle_font, fill=MUTED)
    y = MARGIN + header_height
    for index, (columns, row_height) in enumerate(rendered_rows):
        if index:
            draw.line((MARGIN, y - 24, WIDTH - MARGIN, y - 24), fill=RULE, width=2)
        for panel, image, x, column_width, label_height in columns:
            offset = (row_height - label_height - image.height) // 2 if panel.get('valign') == 'center' else 0
            panel_y = y + offset
            figure = panel['figure']
            figure_width = draw.textlength(figure, font=note_font)
            label_width = draw.textlength(panel['label'], font=label_font)
            if label_width + figure_width + 24 > column_width:
                raise ValueError(f"Panel heading overlaps its figure label: {panel['label']}")
            if panel.get('note') and draw.textlength(panel['note'], font=note_font) > column_width:
                raise ValueError(f"Panel note is too wide: {panel['note']}")
            draw.text((x, panel_y), panel['label'], font=label_font, fill=INK)
            draw.text((x + column_width - figure_width, panel_y + 6), figure, font=note_font, fill=MUTED)
            if panel.get('note'):
                draw.text((x, panel_y + 46), panel['note'], font=note_font, fill=MUTED)
            canvas.paste(image, (x + (column_width - image.width) // 2, panel_y + label_height))
        y += row_height + gap
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
