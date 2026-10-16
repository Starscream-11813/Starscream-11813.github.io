# Publication additions and PDF teasers

Publication entries keep the existing numbered naming convention:
`_publications/14-proclaim.md`, `_publications/15-marsgps.md`, and
`_publications/16-nonlinearstorytelling.md`, with matching
permalinks. Their `date` is the first arXiv submission date, not the date of a
later revision. All three are under-review preprints. Titles, author order,
contribution markers, abstracts, code links, and citations come from the PDFs.
BibTeX stays in the same three front-matter forms as the earlier entries.

Full-size teaser PNGs live in `images/`, using the existing `_teaser` suffix.
The new teasers combine original figures rendered directly from the papers;
axes, values, labels, and legends are not recreated or modified.
All three omit the redundant publication title/subtitle block while retaining
their figure-specific labels and qualification notes.

- PROClaim: the courtroom overview (Figure 1), evidence-novelty plot
  (Figure 3a), and cost–accuracy plot (Figure 5).
- MARS-GPS: the pipeline (Figure 1), voting/component ablations (Figure 2),
  and rollout-scaling plot (Figure 3). The two empirical panels are explicitly
  labeled as results on the Geometry3K ablation subset, rather than the full
  test set reported in the abstract.
- Stories Out of Order: the opening story-order comparison (Figure 1),
  two-order event illustration (Figure 2), story graph (Figure 3), and
  reader/automated-judge comparison (Figure 5). Figure 1 shares the top row
  with a smaller Figure 5; Figures 2 and 3 remain full-width below. The
  redundant publication title/subtitle block is omitted. The result
  panel is labeled as unadjusted preference rates with ties excluded; it must
  not be described as length-adjusted or as percentages of all judgments.

`_data/publication_teasers.yml` records versioned PDF URLs, zero-based page
indices, and crop rectangles in PDF points. To reproduce the PNGs, install
PyMuPDF, Pillow, and PyYAML, then run from the repository root:

```powershell
python scripts/publication-teasers.py
python scripts/thumbnails.py
```

For existing downloads, pass `--source-dir` with a folder containing PDFs
named `proclaim.pdf`, `marsgps.pdf`, or `nonlinear_storytelling.pdf`. Use
`--paper proclaim`, `--paper marsgps`, or `--paper nonlinear_storytelling`
to rebuild one image. Segoe UI is used for the small image
headings on Windows, with DejaVu Sans as the portable fallback. The original
paper figures retain their own fonts.

Stacked layouts use `panels`. For a compact arrangement, use `rows`, with each
row containing a list of panels. `share` sets relative column widths, and
`valign: center` vertically centers a shorter panel beside a taller one.
`show_header: false` removes the publication title/subtitle block for that
teaser only; entries without this option keep the default header and layout.

The existing thumbnail script creates 560px WebP versions under
`images/publications/` and updates `_data/publication_thumbnails.yml` for layout
reservation. The Publications figure viewer continues to open the full PNGs.

Home-page references stay modular: MARS-GPS is in the `mathematical` topic and
PROClaim in `agentic` in `_data/research_topics.yml`. Stories Out of Order is
in `narrative`, replacing the Creativity panel's in-progress placeholder with
the paper's PDF. Those entries feed both
the inline topic menus and the corresponding research-map panels. Compact
publication labels remain in `_data/publication_extras.yml`.

The new paper uses an asterisk for equal contribution and a dagger for the
corresponding author in its PDF. The website normalizes these to its existing
legend: `†` for equal contribution (Raiyan and Tariquzzaman) and `‡` for the
corresponding author (Ishmam). The author roles themselves are unchanged.
