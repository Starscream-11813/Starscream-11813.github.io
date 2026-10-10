# Publication additions and PDF teasers

Publication entries keep the existing numbered naming convention:
`_publications/14-proclaim.md` and `_publications/15-marsgps.md`, with matching
permalinks. Their `date` is the first arXiv submission date, not the date of a
later revision. Both are under-review preprints. Titles, author order,
contribution markers, abstracts, code links, and citations come from the PDFs.
BibTeX stays in the same three front-matter forms as the earlier entries.

Full-size teaser PNGs live in `images/`, using the existing `_teaser` suffix.
The new teasers combine original figures rendered directly from the papers;
axes, values, labels, and legends are not recreated or modified.

- PROClaim: the courtroom overview (Figure 1), evidence-novelty plot
  (Figure 3a), and cost–accuracy plot (Figure 5).
- MARS-GPS: the pipeline (Figure 1), voting/component ablations (Figure 2),
  and rollout-scaling plot (Figure 3). The two empirical panels are explicitly
  labeled as results on the Geometry3K ablation subset, rather than the full
  test set reported in the abstract.

`_data/publication_teasers.yml` records versioned PDF URLs, zero-based page
indices, and crop rectangles in PDF points. To reproduce the PNGs, install
PyMuPDF, Pillow, and PyYAML, then run from the repository root:

```powershell
python scripts/publication-teasers.py
python scripts/thumbnails.py
```

For existing downloads, pass `--source-dir` with a folder containing PDFs
named `proclaim.pdf` and `marsgps.pdf`. Use `--paper proclaim` or
`--paper marsgps` to rebuild one image. Segoe UI is used for the small image
headings on Windows, with DejaVu Sans as the portable fallback. The original
paper figures retain their own fonts.

The existing thumbnail script creates 560px WebP versions under
`images/publications/` and updates `_data/publication_thumbnails.yml` for layout
reservation. The Publications figure viewer continues to open the full PNGs.

Home-page references stay modular: MARS-GPS is in the `mathematical` topic and
PROClaim in `agentic` in `_data/research_topics.yml`. Those entries feed both
the inline topic menus and the corresponding research-map panels. Compact
publication labels remain in `_data/publication_extras.yml`.
