"""Generate the circuit-board traces drawn over the About-page brain.

Writes _data/research_circuits.yml from the layout below. A chip straddles the
midline at the center of the brain, standing in for the corpus callosum: nested
staircases of traces fan out from its pins into both hemispheres, more groups
surface from the midline, and every trace ends in a pad a fixed distance inside
the outline, so the pads stagger along the edge like a real board. The lobe
areas' labels connect to the brain with callout lines drawn by
_includes/research-circuits.html, not with traces, so no label line runs on as
a trace. Run from the repository root after editing the layout, and again after
research-cortex.py:

    python scripts/research-circuits.py

Coordinates use the drawing's 640 x 400 viewBox. A route is a start point plus
compass moves such as [('W', 30), ('SW', 10)]; a diagonal move's number is its
horizontal (and vertical) distance, None means "continue until just inside the
outline", and ('ZIG', count) inserts a serpentine. After the designed traces, a
fill pass grows FILL_TRACES short traces into the remaining gaps (change
FILL_SEED for another arrangement). Creativity and Agentic mirror Reasoning and
Interpretability across the midline. The script reports any two traces that come
too close, since traces on one layer must never touch. Like research-cortex.py,
it needs numpy, scipy, and matplotlib.
"""
import math
import random
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CORTEX = ROOT / '_data' / 'research_cortex.yml'
OUTPUT = ROOT / '_data' / 'research_circuits.yml'

# The chip's body spans x 253-387, y 149-195; pins stick out 5 units. Keep these
# in step with the chip drawn in _includes/research-brain.html.
CHIP_TOP, CHIP_BOTTOM, CHIP_LEFT = 144.0, 200.0, 248.0
TOP_PINS = [272 + 8 * k for k in range(13)]   # x of the pins on the top and bottom
SIDE_PINS = [160, 166, 172, 178, 184]         # y of the pins on the left and right
MIDLINE = 311.0      # Traces surface here, just inside the left hemisphere.
LANE_GAP = 6.0       # Spacing between parallel lanes.
PAD_INSET = 9.0      # Pads sit this far inside the outline.
LABEL_EDGE = 164.0   # Leaders stop just short of the left labels (x = 160).
CLEARANCE = 4.0      # Minimum distance between different traces.
FILL_SEED = 11       # Change for a different arrangement of the filler traces.
FILL_TRACES = 22     # Filler traces grown into the gaps of each hemisphere.

DIRECTIONS = {'E': (1, 0), 'W': (-1, 0), 'N': (0, -1), 'S': (0, 1),
              'NE': (1, -1), 'NW': (-1, -1), 'SE': (1, 1), 'SW': (-1, 1)}
MIRRORED = {'E': 'W', 'W': 'E', 'NE': 'NW', 'NW': 'NE', 'SE': 'SW', 'SW': 'SE', 'N': 'N', 'S': 'S'}


def trace(start, route, pad='ring', leader=False, part=None, bend_via=False, kind=None):
    """One trace; `part` places an inline component that far along the trace."""
    return dict(start=start, route=route, pad=pad, leader=leader, part=part, bend_via=bend_via, kind=kind)


def lanes(start, route, count, **options):
    """Parallel traces along one route, LANE_GAP apart, centered on `start`."""
    return [dict(trace(start, route, **options), offset=(i - (count - 1) / 2) * LANE_GAP) for i in range(count)]


def staircase(pins, edge_y, vertical, first_y, step, leader_last=False, parts=()):
    """Nested L-shaped traces from chip pins: each runs `vertical`, chamfers,
    then runs west; outer pins turn first so the traces never cross."""
    out = []
    diagonal = 'NW' if vertical == 'N' else 'SW'
    sign = 1 if vertical == 'N' else -1
    for k, x in enumerate(pins):
        horizontal_y = first_y + sign * step * (len(pins) - 1 - k)
        turn_y = horizontal_y + sign * 6
        last = k == len(pins) - 1
        out.append(trace((x, edge_y), [(vertical, abs(turn_y - edge_y)), (diagonal, 6), ('W', None)],
                         leader=leader_last and last, part=parts[k] if k < len(parts) else None,
                         bend_via=k % 2 == 1, kind='bus'))
    return out


# Left hemisphere; the right mirrors it. Reasoning sits above the chip and
# Interpretability below. A trace given leader=True would run out of the brain
# to x = LABEL_EDGE; only Social behavior's label hangs from a trace.
LAYOUT = {
    'reasoning': [
        *staircase(TOP_PINS[:6], CHIP_TOP, 'N', 88, 8, parts=(None, None, 0.62)),
        *lanes((CHIP_LEFT, 163), [('W', 12), ('NW', 8), ('W', None)], 2, kind='bus'),
        *lanes((MIDLINE, 77), [('W', 24), ('NW', 10), ('N', None)], 2),
        *lanes((MIDLINE, 50), [('W', 8), ('NW', 6), ('N', None)], 2),
        dict(trace((252, 88), [('N', 12), ('NW', 10), ('N', None)], pad='dot'), branch=True),
    ],
    'interpretability': [
        *staircase(TOP_PINS[:6], CHIP_BOTTOM, 'S', 258, 8, parts=(None, None, 0.6)),
        trace((CHIP_LEFT, 172), [('W', 26), ('ZIG', 5), ('W', None)], kind='bus'),
        *lanes((CHIP_LEFT, 181), [('W', 12), ('SW', 8), ('W', None)], 2, kind='bus', part=0.55),
        *lanes((MIDLINE, 276), [('W', 26), ('SW', 16), ('S', None)], 3),
        dict(trace((250, 258), [('S', 12), ('SW', 8), ('S', None)], pad='dot'), branch=True),
    ],
}
MIRROR_KEYS = {'reasoning': 'creativity', 'interpretability': 'agentic'}
SOCIAL_HUB = (320.0, 300.0)   # Keep in step with Social behavior's hub in research_map.yml.
SOCIAL_LEADER_END = 352.0


def read_outlines():
    text = CORTEX.read_text(encoding='utf-8')
    paths = dict(re.findall(r'^  (left|right): "([^"]+)"', text, re.M))
    return {side: sample_path(paths[side]) for side in ('left', 'right')}


def sample_path(d):
    """Flatten an M/C/Z path into a polygon."""
    values = [float(v) for v in re.findall(r'-?\d+(?:\.\d+)?', d)]
    current = (values[0], values[1])
    points = [current]
    for i in range(2, len(values) - 5, 6):
        c1, c2, end = values[i:i + 2], values[i + 2:i + 4], values[i + 4:i + 6]
        for step in range(1, 9):
            t = step / 8
            u = 1 - t
            points.append(tuple(u ** 3 * current[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t ** 3 * end[k]
                                for k in (0, 1)))
        current = tuple(end)
    return points


def distance_ahead(outline, x, y, ux, uy):
    """How far the ray from (x, y) travels before crossing the outline."""
    best = None
    for (x1, y1), (x2, y2) in zip(outline, outline[1:] + outline[:1]):
        ex, ey = x2 - x1, y2 - y1
        cross = ux * ey - uy * ex
        if abs(cross) < 1e-12:
            continue
        t = ((x1 - x) * ey - (y1 - y) * ex) / cross
        s = ((x1 - x) * uy - (y1 - y) * ux) / cross
        if t > 0.5 and 0 <= s <= 1 and (best is None or t < best):
            best = t
    return best


def walk(start, route, outline):
    """Follow a route; a serpentine swings 4 units either side every 4 units."""
    points = [tuple(map(float, start))]
    heading = (-1, 0)
    for move in route:
        x, y = points[-1]
        if move[0] == 'ZIG':
            hx, hy = heading
            nx, ny = -hy, hx
            side = 1
            points.append((x + nx * 4, y + ny * 4))
            for _ in range(move[1]):
                x, y = points[-1]
                points.append((x + hx * 4, y + hy * 4))
                points.append((points[-1][0] - nx * 8 * side, points[-1][1] - ny * 8 * side))
                side = -side
            x, y = points[-1]
            points.append((x + hx * 4, y + hy * 4))
            points.append((points[-1][0] - nx * 4 * side, points[-1][1] - ny * 4 * side))
            continue
        direction, distance = move
        dx, dy = DIRECTIONS[direction]
        norm = math.hypot(dx, dy)
        heading = (dx / norm, dy / norm)
        if distance is None:
            reach = max(4.0, (distance_ahead(outline, x, y, *heading) or 4.0) - PAD_INSET)
            points.append((x + heading[0] * reach, y + heading[1] * reach))
        else:
            points.append((x + dx * distance, y + dy * distance))
    return points


def offset(points, distance):
    """A parallel copy of a route, shifted sideways, with mitered corners."""
    segments = []
    for (ax, ay), (bx, by) in zip(points, points[1:]):
        length = math.hypot(bx - ax, by - ay)
        ux, uy = (bx - ax) / length, (by - ay) / length
        segments.append(((ax - uy * distance, ay + ux * distance), (bx - uy * distance, by + ux * distance), (ux, uy)))
    shifted = [segments[0][0]]
    for (p, p_end, u), (q, _, v) in zip(segments, segments[1:]):
        cross = u[0] * v[1] - u[1] * v[0]
        if abs(cross) < 1e-9:
            shifted.append(p_end)
            continue
        t = ((q[0] - p[0]) * v[1] - (q[1] - p[1]) * v[0]) / cross
        shifted.append((p[0] + u[0] * t, p[1] + u[1] * t))
    shifted.append(segments[-1][1])
    return shifted


def end_inside(points, outline):
    """Stretch or shorten the last segment to stop just inside the outline."""
    (x0, y0), (x1, y1) = points[-2], points[-1]
    length = math.hypot(x1 - x0, y1 - y0)
    ux, uy = (x1 - x0) / length, (y1 - y0) / length
    reach = max(4.0, (distance_ahead(outline, x0, y0, ux, uy) or length) - PAD_INSET)
    return points[:-1] + [(x0 + ux * reach, y0 + uy * reach)]


def along(points, fraction):
    """The point, and the direction, a fraction of the way along a polyline."""
    lengths = [math.hypot(bx - ax, by - ay) for (ax, ay), (bx, by) in zip(points, points[1:])]
    target = sum(lengths) * fraction
    for (a, b), length in zip(zip(points, points[1:]), lengths):
        if target <= length:
            t = target / length
            return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t), math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))
        target -= length
    return points[-1], 0.0


def build(spec, outline, label_edge):
    points = walk(spec['start'], spec['route'], outline)
    if spec.get('offset'):
        points = offset(points, spec['offset'])
    if spec['leader']:
        # This trace leaves the brain and runs on to the area's label.
        points = points[:-1] + [(label_edge, points[-1][1])]
    else:
        points = end_inside(points, outline)
    built = dict(points=points, kind='leader' if spec['leader'] else (spec['kind'] or 'trace'))
    if spec['kind'] != 'bus' and not spec.get('branch'):
        built['via'] = points[0]
    if spec.get('branch'):
        built['junction'] = points[0]
    if not spec['leader']:
        built['pad'] = spec['pad']
    if spec['bend_via'] and len(points) > 2:
        built['bend_via'] = points[1]
    if spec['part']:
        built['part'] = along(points, spec['part'])
    return built


def mirror_built(built):
    """The same trace reflected across the midline, for the right hemisphere."""
    flip = lambda p: (640 - p[0], p[1])
    out = dict(built, points=[flip(p) for p in built['points']])
    for field in ('via', 'bend_via', 'junction'):
        if field in built:
            out[field] = flip(built[field])
    if 'part' in built:
        (x, y), angle = built['part']
        out['part'] = ((640 - x, y), 180 - angle)
    return out


def mirrored(spec):
    flip = lambda p: (640 - p[0], p[1])
    route = [move if move[0] == 'ZIG' else (MIRRORED[move[0]], move[1]) for move in spec['route']]
    out = dict(spec, start=flip(spec['start']), route=route)
    if 'offset' in spec:
        out['offset'] = -spec['offset']
    return out


def social_traces():
    hub_x, hub_y = SOCIAL_HUB
    return [
        dict(kind='bus', points=[(320.0, CHIP_TOP), (320.0, 22.0)], pad='ring'),
        dict(kind='bus', points=[(320.0, CHIP_BOTTOM), SOCIAL_HUB]),
        dict(kind='trace', points=[SOCIAL_HUB, (hub_x - 10, hub_y), (hub_x - 18, hub_y + 8), (hub_x - 18, hub_y + 18)], pad='ring'),
        dict(kind='trace', points=[SOCIAL_HUB, (hub_x + 10, hub_y), (hub_x + 18, hub_y + 8), (hub_x + 18, hub_y + 18)], pad='ring'),
        dict(kind='leader', points=[SOCIAL_HUB, (hub_x, SOCIAL_LEADER_END)]),
    ]


def grow_fillers(placed, outline, keep_out):
    """Grow short 45-degree traces into the gaps between placed traces.

    Each filler either branches off a long straight run (marked by a junction
    dot) or starts at a via, turns at most 90 degrees in total so it cannot
    cross itself, and stops CLEARANCE short of everything already drawn.
    """
    import numpy as np
    from matplotlib.path import Path as Polygon
    from scipy import ndimage

    cells = 2  # Raster cells per drawing unit.
    shape = (400 * cells, 640 * cells)
    rows, cols = np.mgrid[0:shape[0], 0:shape[1]]
    inside = Polygon(outline).contains_points(np.stack([cols.ravel(), rows.ravel()], 1) / cells).reshape(shape)
    inset = ndimage.distance_transform_edt(inside) / cells
    occupied = np.zeros(shape, bool)

    def draw(points):
        for (ax, ay), (bx, by) in zip(points, points[1:]):
            n = int(max(abs(bx - ax), abs(by - ay)) * cells * 2) + 2
            occupied[np.round(np.linspace(ay, by, n) * cells).astype(int),
                     np.round(np.linspace(ax, bx, n) * cells).astype(int)] = True

    for points in placed:
        draw(points if len(points) > 1 else points * 2)
    for x0, y0, x1, y1 in keep_out:
        occupied[int(y0 * cells):int(y1 * cells), int(x0 * cells):int(x1 * cells)] = True
    clearance = ndimage.distance_transform_edt(~occupied) / cells

    def fits(a, b, skip=0.0):
        length = math.hypot(b[0] - a[0], b[1] - a[1])
        for k in range(int(length * 2) + 1):
            t = k / 2
            if t < skip:
                continue
            x, y = a[0] + (b[0] - a[0]) * t / max(length, 1e-9), a[1] + (b[1] - a[1]) * t / max(length, 1e-9)
            i, j = int(round(y * cells)), int(round(x * cells))
            if x > 306 or inset[i, j] < PAD_INSET or clearance[i, j] < CLEARANCE:
                return False
        return True

    rng = random.Random(FILL_SEED)
    ring = ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE']
    runs = [(a, b) for points in placed for a, b in zip(points, points[1:])
            if math.hypot(b[0] - a[0], b[1] - a[1]) >= 18 and max(a[0], b[0]) < 306]
    fillers = []
    for _ in range(8000):
        if len(fillers) >= FILL_TRACES:
            break
        if rng.random() < 0.55:
            a, b = rng.choice(runs)
            t = rng.uniform(0.3, 0.7)
            start = (round((a[0] + (b[0] - a[0]) * t) * 2) / 2, round((a[1] + (b[1] - a[1]) * t) * 2) / 2)
            along = math.atan2(b[1] - a[1], b[0] - a[0])
            # Leave the parent at 45 or 90 degrees.
            choices = [d for d in ring if abs(math.sin(math.atan2(DIRECTIONS[d][1], DIRECTIONS[d][0]) - along)) > 0.6]
            junction = True
        else:
            start = (float(rng.randint(186, 306)), float(rng.randint(16, 334)))
            choices = ring
            junction = False
            i, j = int(start[1] * cells), int(start[0] * cells)
            if inset[i, j] < PAD_INSET + 3 or clearance[i, j] < CLEARANCE + 2:
                continue
        first = rng.choice(choices)
        heading, rotation, points, length = ring.index(first), 0, [start], 0.0
        for leg in range(rng.choice((2, 3, 3, 4))):
            dx, dy = DIRECTIONS[ring[heading]]
            norm = math.hypot(dx, dy)
            run = 0.0
            target = rng.uniform(8, 24)
            skip = 7.0 if junction and leg == 0 else 0.0
            while run + 1 <= target and fits(points[-1], (points[-1][0] + dx / norm * (run + 1), points[-1][1] + dy / norm * (run + 1)), skip):
                run += 1
            if run < max(5, skip + 3):
                break
            points.append((round((points[-1][0] + dx / norm * run) * 2) / 2, round((points[-1][1] + dy / norm * run) * 2) / 2))
            length += run
            turn = rng.choice((-1, 1))
            if abs(rotation + turn) > 2:
                turn = -turn
            rotation += turn
            heading = (heading + turn) % 8
        if length < 16 or len(points) < 2:
            continue
        draw(points)
        clearance = ndimage.distance_transform_edt(~occupied) / cells
        fillers.append(dict(points=points, junction=junction))
    return fillers


def segment_distance(p, q, r, s):
    def point_segment(px, py, ax, ay, bx, by):
        dx, dy = bx - ax, by - ay
        length = dx * dx + dy * dy
        t = 0 if length == 0 else max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / length))
        return math.hypot(px - ax - t * dx, py - ay - t * dy)
    def crosses(a, b, c, d):
        o = lambda p1, p2, p3: (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0])
        return o(a, b, c) * o(a, b, d) < 0 and o(c, d, a) * o(c, d, b) < 0
    if crosses(p, q, r, s):
        return 0.0
    return min(point_segment(*p, *r, *s), point_segment(*q, *r, *s), point_segment(*r, *p, *q), point_segment(*s, *p, *q))


def check_clearance(regions):
    """Report traces that touch or come too close (branches may meet their parent)."""
    traces = [(key, i, t) for key, items in regions for i, t in enumerate(items)]
    problems = []
    for a in range(len(traces)):
        for b in range(a + 1, len(traces)):
            (ka, ia, ta), (kb, ib, tb) = traces[a], traces[b]
            joined = {tuple(ta['points'][0]), tuple(ta['points'][-1])} & {tuple(p) for p in tb['points']} or \
                {tuple(tb['points'][0]), tuple(tb['points'][-1])} & {tuple(p) for p in ta['points']}
            if joined or ta.get('junction') or tb.get('junction'):
                continue
            gap = min(segment_distance(p, q, r, s) for p, q in zip(ta['points'], ta['points'][1:])
                      for r, s in zip(tb['points'], tb['points'][1:]))
            if gap < CLEARANCE:
                problems.append(f'  {ka}[{ia}] and {kb}[{ib}] are {gap:.1f} apart')
    return problems


def number(value):
    text = f'{value:.1f}'
    return text[:-2] if text.endswith('.0') else text


def point(p):
    return f'[{number(p[0])}, {number(p[1])}]'


def main():
    outlines = read_outlines()
    left = {key: [build(s, outlines['left'], LABEL_EDGE) for s in specs] for key, specs in LAYOUT.items()}
    social = social_traces()
    # The chip, the area hubs, and the gap around Social behavior stay clear.
    keep_out = [(244, 140, 320, 204), (227, 79, 245, 97), (227, 249, 245, 267), (292, 286, 320, 330)]
    placed = [t['points'] for traces in left.values() for t in traces] + [t['points'] for t in social]
    for filler in grow_fillers(placed, outlines['left'], keep_out):
        points = filler['points']
        built = dict(points=points, kind='trace', pad='ring' if len(points) % 2 else 'dot')
        built['junction' if filler['junction'] else 'via'] = points[0]
        left['reasoning' if points[0][1] < CHIP_TOP + 28 else 'interpretability'].append(built)
    regions = []
    for key, traces in left.items():
        regions.append((key, traces))
        regions.append((MIRROR_KEYS[key], [mirror_built(t) for t in traces]))
    regions.append(('social', social))
    problems = check_clearance(regions)
    lines = ['# Generated by scripts/research-circuits.py; edit the layout there and re-run.',
             '# Decorative circuit traces over the brain, separate from the paper links.',
             'regions:']
    order = ['reasoning', 'creativity', 'interpretability', 'agentic', 'social']
    for key, traces in sorted(regions, key=lambda r: order.index(r[0])):
        lines += [f'  - key: {key}', '    traces:']
        for built in traces:
            lines.append('      - d: "M' + 'L'.join(f'{number(x)} {number(y)}' for x, y in built['points']) + '"')
            lines.append(f'        kind: {built["kind"]}')
            for field in ('via', 'bend_via', 'junction'):
                if field in built:
                    lines.append(f'        {field}: {point(built[field])}')
            if 'part' in built:
                (x, y), angle = built['part']
                lines.append(f'        part: [{number(x)}, {number(y)}, {number(angle)}]')
            if built.get('pad'):
                lines.append(f'        pad: {built["pad"]}')
                lines.append(f'        end: {point(built["points"][-1])}')
    OUTPUT.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')
    print(f'Wrote {OUTPUT} ({sum(len(t) for _, t in regions)} traces)')
    if problems:
        print('Traces too close:')
        print('\n'.join(problems))


if __name__ == '__main__':
    main()
