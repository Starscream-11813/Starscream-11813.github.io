"""Generate the About-page brain's organic cortex (top view).

Writes _data/research_cortex.yml: the outline of each hemisphere and the
gyri drawn inside them. The folds come from a Gray-Scott reaction-diffusion
pattern, which forms the labyrinth of a brain's surface, grown once across
both hemispheres so their folds differ naturally. Requires numpy, scipy,
scikit-image, and matplotlib. Run from the repository root:

    python scripts/research-cortex.py

The drawing's viewBox is 640 x 400 and the brain is centered on x = 320.
Change SEED for a different fold pattern; scripts/research-circuits.py reads
the outlines, so re-run it afterwards.
"""
from pathlib import Path

import numpy as np
from matplotlib.path import Path as Polygon
from scipy import ndimage
from skimage.morphology import skeletonize

OUTPUT = Path(__file__).resolve().parent.parent / '_data' / 'research_cortex.yml'
SEED = 8
GRID = 0.7          # Simulation cells per drawing unit; larger means finer folds.
STEPS = 12000
FEED, KILL = 0.037, 0.06  # Gray-Scott parameters in the labyrinth regime.
INSET = 6           # Keep folds this far inside the outline.

# Left hemisphere, clockwise from the front of the midline; the right mirrors it.
# Proportions follow a dorsal view: the frontal end (top) tapers, the brain is
# widest about 60% of the way back, and the occipital end is broad and blunt.
OUTLINE = [(317, 24), (313, 13), (304, 8), (289, 8.5), (273, 14), (253, 24), (233, 40), (221, 56),
           (213, 73), (205, 104), (195, 137), (188, 170), (185.5, 202), (187.5, 222), (193.5, 238),
           (198.5, 254), (205, 270), (215, 286), (228, 302), (247, 318), (267, 328), (289, 334),
           (305, 332.5), (314, 325), (317.5, 310), (318.5, 250), (317, 170), (318.5, 90)]


def closed_spline(points, samples=40):
    """Catmull-Rom spline through the points, as a dense closed polyline."""
    p = np.asarray(points, float)
    out = []
    for i in range(len(p)):
        p0, p1, p2, p3 = p[i - 1], p[i], p[(i + 1) % len(p)], p[(i + 2) % len(p)]
        for t in np.linspace(0, 1, samples, endpoint=False):
            out.append(0.5 * (2 * p1 + (p2 - p0) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t
                              + (3 * p1 - p0 - 3 * p2 + p3) * t ** 3))
    return np.array(out)


def scalloped(points):
    """Add the gentle bulges of gyri along the lateral edge."""
    d = np.diff(np.vstack([points, points[:1]]), axis=0)
    s = np.concatenate([[0], np.cumsum(np.hypot(d[:, 0], d[:, 1]))])[:-1]
    tangent = np.roll(points, -1, 0) - np.roll(points, 1, 0)
    tangent /= np.linalg.norm(tangent, axis=1)[:, None]
    normal = np.stack([tangent[:, 1], -tangent[:, 0]], 1)
    if np.mean(np.sum((points - points.mean(0)) * normal, 1)) < 0:
        normal = -normal
    lateral = np.clip((313 - points[:, 0]) / 6, 0, 1)
    bulge = (np.abs(np.sin(np.pi * s / 38.0)) ** 0.7 - 0.6) * 3.2
    return points + normal * (bulge * lateral)[:, None]


def number(value):
    text = f'{value:.1f}'
    return text[:-2] if text.endswith('.0') else text


def path_data(points, closed, spacing):
    """Resample evenly and convert to a smooth cubic Bezier path."""
    p = np.vstack([points, points[:1]]) if closed else np.asarray(points)
    d = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(p, axis=0).T))])
    n = max(4, int(d[-1] / spacing))
    t = np.linspace(0, d[-1], n, endpoint=not closed)
    q = np.stack([np.interp(t, d, p[:, 0]), np.interp(t, d, p[:, 1])], 1)
    count = len(q)
    parts = [f'M{number(q[0][0])} {number(q[0][1])}']
    for i in range(count if closed else count - 1):
        p0 = q[(i - 1) % count] if closed or i else q[0]
        p1, p2 = q[i], q[(i + 1) % count]
        p3 = q[(i + 2) % count] if closed or i + 2 < count else q[-1]
        c1, c2 = p1 + (p2 - p0) / 6, p2 - (p3 - p1) / 6
        parts.append(f'C{number(c1[0])} {number(c1[1])} {number(c2[0])} {number(c2[1])} {number(p2[0])} {number(p2[1])}')
    return ''.join(parts) + ('Z' if closed else '')


def gray_scott(shape):
    rng = np.random.default_rng(SEED)
    u, v = np.ones(shape), np.zeros(shape)
    seeds = rng.random(shape) < 0.08
    v[seeds] = 0.5
    v = ndimage.gaussian_filter(v, 1.0)
    u = 1 - v
    for _ in range(STEPS):
        reaction = u * v * v
        u += 0.16 * ndimage.laplace(u, mode='nearest') - reaction + FEED * (1 - u)
        v += 0.08 * ndimage.laplace(v, mode='nearest') + reaction - (FEED + KILL) * v
    return v


def chains(skeleton):
    """Split a one-pixel skeleton at its junctions into ordered pixel chains."""
    kernel = np.ones((3, 3), int)
    kernel[1, 1] = 0
    neighbours = ndimage.convolve(skeleton.astype(int), kernel, mode='constant') * skeleton
    branches = skeleton & ~ndimage.binary_dilation(neighbours >= 3, iterations=2)
    labels, count = ndimage.label(branches, structure=np.ones((3, 3)))
    for index in range(1, count + 1):
        pixels = set(zip(*np.nonzero(labels == index)))
        links = {p: [(p[0] + dy, p[1] + dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1)
                     if (dy or dx) and (p[0] + dy, p[1] + dx) in pixels] for p in pixels}
        ends = [p for p in pixels if len(links[p]) == 1]
        order = [ends[0] if ends else next(iter(pixels))]
        seen = {order[0]}
        while True:
            following = [q for q in links[order[-1]] if q not in seen]
            if not following:
                break
            order.append(following[0])
            seen.add(following[0])
        yield np.array(order, float)


def folds(field, hemisphere, origin, upsample=6, minimum=9):
    height, width = field.shape
    rows, cols = np.mgrid[0:height, 0:width]
    points = np.stack([cols.ravel() / GRID + origin[0], rows.ravel() / GRID + origin[1]], 1)
    inside = Polygon(hemisphere).contains_points(points).reshape(field.shape)
    mask = ndimage.distance_transform_edt(inside) / GRID > INSET
    fine = ndimage.zoom(field, upsample, order=3) > 0.2
    fine &= ndimage.zoom(mask.astype(float), upsample, order=1) > 0.5
    fine = ndimage.binary_opening(fine, iterations=2)
    for chain in chains(skeletonize(fine)):
        xy = np.stack([chain[:, 1], chain[:, 0]], 1) / (GRID * upsample) + origin
        if len(xy) > 9:
            xy = np.stack([ndimage.gaussian_filter1d(xy[:, i], 6, mode='nearest') for i in (0, 1)], 1)
        if np.sum(np.hypot(*np.diff(xy, axis=0).T)) >= minimum:
            yield xy


def main():
    left = scalloped(closed_spline(OUTLINE))
    right = left * [-1, 1] + [640, 0]
    origin = np.array([176.0, 4.0])
    field = gray_scott((int(334 * GRID), int(288 * GRID)))
    lines = ['# Generated by scripts/research-cortex.py; re-run it rather than editing.',
             '# Top view of the brain in the 640 x 400 drawing: outlines and gyri.',
             'hemispheres:',
             f'  left: "{path_data(left, True, 6)}"',
             f'  right: "{path_data(right, True, 6)}"',
             'folds:']
    for side, outline in (('left', left), ('right', right)):
        lines.append(f'  {side}:')
        lines += [f'    - "{path_data(fold, False, 7)}"' for fold in folds(field, outline, origin)]
    OUTPUT.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')
    print(f'Wrote {OUTPUT}')


if __name__ == '__main__':
    main()
