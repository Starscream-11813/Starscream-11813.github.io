# About-page research topic menus

Edit `_data/research_topics.yml` to change the papers in a topic menu. Each
`publication` is the exact `permalink` of an entry in `_publications/`.
Titles and PDF links come from that entry's `title` and `pdfurl` fields.

For example, add a paper under `mathematical.papers`:

```yaml
    - publication: /publications/your-new-paper
      name: Optional short title
```

Omit `name` to use the full title. A paper can appear in several topics.
Entries without a `pdfurl` are omitted from the menu until a PDF is available.

To introduce another topic, add a new key with a `title` and `papers` list,
then place this include in the About text:

```liquid
{% include research-topic.html topic="your-topic-key" text="words in the paragraph" %}
```

If the same topic is used twice on one page, give the second include a unique
`id`, for example `id="mathematical-second"`.

The shared include renders the content, `_sass/_research-topics.scss` controls
appearance, and `assets/js/research-topics.js` handles hover, tap, keyboard
navigation, and viewport positioning. Set `research_topic_menus: true` in a
page's front matter to load the behavior. PDF selections open in a new tab;
without JavaScript, each topic link opens its first publication page instead.

## Interactive research map

The About-page map is configured in `_data/research_map.yml`. It presents
research interests using a brain-inspired drawing, not anatomical claims about
where reasoning or creativity occurs.

Each item in `areas` has a stable `key`, visible `label`, short `summary`, and
`topics` list referencing keys in `_data/research_topics.yml`. Add papers to the
topic data as above; both the inline menus and map use those entries. A paper
listed in multiple topics within one area appears only once in its paper list.
The `x` and `y` values place an area's label as percentages of the drawing,
and `align` says which edge of the label sits there (`end` for labels left of
the brain, `start` for those on the right). `hub` is the area's point on the
brain, in the drawing's 640 x 400 units: paper links meet there, the label's
callout line ends there, and on phones the label itself sits there.

For ongoing work without a publication, use `work_in_progress` with `title`
and `description`. These entries are marked as in progress and do not imply
an available paper or PDF. Once the work has a publication entry, add it to a
topic and remove the corresponding in-progress entry if no longer applicable.

In `relationships`, `from` and `to` refer to area keys. Use `kind: shared`
with a `publication` and optional `name` only for a paper represented in both
areas. Use `kind: conceptual` for a broader connection between research
interests; it does not claim a shared paper or a research result. Keep these
relationships selective so the drawing remains readable.

Reasoning is selected initially. The five research areas are native buttons:
hover and keyboard focus preview their content,
and clicking or tapping selects it in the shared detail panel. PDF links open in
a new tab, and ongoing projects remain descriptive, without fabricated links.

Keyboard visitors can use Left/Right Arrow between regions and Down Arrow to
enter a region's paper links (or its description when there is no PDF). Enter or
Space keeps the current selection; Escape returns to it. The detail panel
reserves the tallest view's height so exploring the map does not move the text
below it, while each visible box fits its own content. Without JavaScript,
the same content remains available as native
expandable sections.

The component is included with `{% include research-map.html %}`; set
`research_map: true` in the page's front matter to load its behavior.
`_includes/research-map.html` renders the controls and paper panels, while
`_includes/research-brain.html` contains the scalable SVG artwork: a top view of
the brain, with circuit-board traces over the organic folds and the area labels
beside it. At its center a chip straddles the midline, standing in for the
corpus callosum that joins the hemispheres. Its label reads "HUMAN × MACHINE"
over "COGNITION" in natural letter spacing; each line, and the hairlines flanking
the caption, are centered on the midline by their measured ink, so the × sits a
little left of center because MACHINE is the longer word. A cooler, more restrained left hemisphere and soft, edgeless color
fields on the right suggest the analytic/creative metaphor without treating it
as literal brain anatomy. Indigo, cyan, violet, lavender, and occasional magenta
accents stay within the site's palette. Gradients and layer styling are
controlled in `_sass/_research-map.scss`; light and dark palettes follow the
site's theme. `assets/js/research-map.js` manages previews and selections. The
component needs no external JavaScript library and honors reduced-motion
preferences.

### Cortex

`_data/research_cortex.yml` holds the hemisphere outlines and gyri. It is
generated by `scripts/research-cortex.py`, which grows a reaction-diffusion
labyrinth across both hemispheres so their folds differ naturally; it needs
numpy, scipy, scikit-image, and matplotlib. The outline follows a dorsal view:
the frontal end (top) tapers, the brain is widest about 60% of the way back,
and the occipital end is broad and blunt. Change `SEED` there for a different
pattern, then re-run the circuit script below, which reads the outlines.

### Circuit traces

Nested staircases of traces fan out from the chip's pins into both
hemispheres, more groups surface at the midline, and a few traces carry inline
components or a serpentine. All turn in 45-degree steps and end in through-hole
pads a fixed distance inside the outline, so the pads stagger along the edge
like a real board. A fill pass then grows short traces into the remaining gaps,
branching off existing traces at junction dots or starting at vias, while
keeping clear of everything already drawn. A thin paper-colored casing lifts
the traces, and active paper links, cleanly above the folds. The traces are
decorative, separate from the data-backed paper links; an area's traces
brighten and its pads glow when it is explored.

Each lobe area's label sits at a corner of the drawing and reaches its hub
through a thin callout: a short horizontal shoulder, then a straight run into
the brain, drawn over the board with a paper-colored casing so it never reads as
one more trace. Social behavior owns the bus along the midline, which passes
through the chip, a hub in the gap between the hemispheres, and the short trace
down to its label. On phones the drawing zooms into the brain, labels sit on
their hubs, and the callouts are hidden.

The layout lives in `scripts/research-circuits.py`, which writes
`_data/research_circuits.yml`; `_includes/research-circuits.html` renders it.
Edit the layout in the script and run `python scripts/research-circuits.py`
from the repository root rather than editing the generated path data; it needs
numpy, scipy, and matplotlib, and warns if any two traces come too close. If you
resize the chip in `_includes/research-brain.html`, update its pin positions in
the script to match. Creativity and Agentic mirror Reasoning and
Interpretability. If you move an area's `hub` in `_data/research_map.yml`, move
its keep-out box in the script's `main()` to match, and keep Social behavior's
hub in step with `SOCIAL_HUB`.

### Motion

Behind the brain, an iridescent liquid aura flows: blurred color pools drift on
cycles of 7 to 11 seconds, a conic sheet turns, and a second sheet turning the
other way shimmers in and out, all seen through the translucent, glassy
hemispheres. Only transforms and opacity animate, so the browser composites it
cheaply, and it moves only while the drawing is on screen.

`assets/js/research-brain.js` adds occasional impulses. Every few seconds a
faint spark travels along one trace, favoring the area being explored, and ends
in a small flash at its pad; a signal leaving the chip sends a faint outline
rippling out from it. Exploring a new area briefly wakes a few of its traces. Impulses are
short Web Animations started by sparse timers, with no continuously running
rendering loop. They pause while the drawing is offscreen or the tab is hidden.
With reduced motion preferred, neither the impulses nor the aura move. Without
JavaScript the drawing is complete, only still.

The visible labels are slim, while their tap targets remain 44 pixels high.
Paper menus use tighter desktop spacing and retain comfortable 44-pixel rows on
touch screens.

Hover colors are local CSS variables on each `.research-map__node`:
`--node-accent` colors the dot, `--node-ink` the readable label,
`--node-border` the outline, and `--node-soft` the surface gradient. Separate
light/dark values keep the accents clear without relying on low-contrast text
or transparent fills over the artwork.
