"""Local browser regression checks (optional: pip install playwright).

Build/serve the development site first, then run:
  python scripts/check-responsive.py --browser msedge
For Playwright's bundled browser use --browser chromium after installing it.
"""

import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright


def in_bounds(page, label):
    widths = page.evaluate('''() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth
    })''')
    assert max(widths['document'], widths['body']) <= widths['viewport'] + 1, (label, widths)
    assert page.locator('.masthead__menu-item--lg').is_visible(), (label, 'missing site title')
    # Check real content edges too, not only the document's scrollable width.
    for box in page.locator('#main, .news, .archive__item .row, .page__footer').all():
        bounds = box.bounding_box()
        if bounds:
            assert bounds['x'] >= -1 and bounds['x'] + bounds['width'] <= widths['viewport'] + 1, (label, bounds)
    main = page.locator('#main, main.publication-project').first.bounding_box()
    footer = page.locator('.page__footer').bounding_box()
    # The desktop theme intentionally retains its legacy absolute footer layout.
    if widths['viewport'] <= 1199:
        assert footer['y'] >= main['y'] + main['height'] - 1, (label, 'footer overlaps content')
        # If the third-party widget has loaded, its background must scale with its markers.
        visitor_map = page.locator('.visitor-map .mapmyvisitors-map')
        if visitor_map.count():
            bounds = visitor_map.bounding_box()
            assert abs(bounds['width'] / bounds['height'] - 2.04) < 0.01, (label, 'cropped visitor map')


def author_links_in_both_themes(page, label):
    links = page.locator('#author-links')
    if not links.count():
        return
    follow = page.locator('.author__urls-wrapper > button')

    def geometry():
        if follow.is_visible() and follow.get_attribute('aria-expanded') != 'true':
            follow.click()
        # Wait for the Follow menu's fade-in before measuring its contents.
        page.wait_for_timeout(250)
        return links.evaluate('''list => [list, ...list.querySelectorAll('li, a')].map(el => {
            const r = el.getBoundingClientRect();
            return [r.x + scrollX, r.y + scrollY, r.width, r.height];
        })''')

    baseline = geometry()
    if follow.is_visible():
        assert baseline[0][2] >= 280, (label, 'Follow menu is too narrow', baseline[0])
    for theme in ['dark', 'light', 'dark', 'light']:
        page.locator('[data-theme-toggle]').click()
        assert page.locator('html').get_attribute('data-theme') == theme
        actual = geometry()
        assert len(actual) == len(baseline)
        for expected_box, actual_box in zip(baseline, actual):
            assert all(abs(a - b) < 0.5 for a, b in zip(expected_box, actual_box)), (
                label, theme, 'author links shift between themes', expected_box, actual_box)
        assert page.locator('#author-links a[href^="mailto:"]').is_visible()
        in_bounds(page, label + ' author links ' + theme)
    if follow.is_visible():
        links.evaluate('list => { list.scrollTop = list.scrollHeight; }')
        panel_box = links.bounding_box()
        last_link_box = links.locator('li').last.bounding_box()
        assert last_link_box['y'] >= panel_box['y'], (label, 'last author link is clipped')
        assert last_link_box['y'] + last_link_box['height'] <= panel_box['y'] + panel_box['height'], (
            label, 'last author link cannot be scrolled into view')
        links.evaluate('list => { list.scrollTop = 0; }')
        page.keyboard.press('Escape')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default='http://localhost:4000')
    parser.add_argument('--browser', default='chromium')
    parser.add_argument('--widths', default='320,375,390,414,600,768,820,900,1024,1180,1199,1200,1280,1440')
    parser.add_argument('--paths', default='/,/publications/,/talks/,/teaching/,/portfolio/,/cv/,/books/')
    parser.add_argument('--screenshots', help='Optional output directory for phone/tablet screenshots')
    args = parser.parse_args()
    screenshots = Path(args.screenshots) if args.screenshots else None
    if screenshots:
        screenshots.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(channel=None if args.browser == 'chromium' else args.browser)
        context = browser.new_context()
        page = context.new_page()
        failures = []
        checked = 0
        for width in map(int, args.widths.split(',')):
            page.set_viewport_size({'width': width, 'height': 900})
            for path in args.paths.split(','):
                label = f'{width}px {path}'
                try:
                    response = page.goto(args.url + path, wait_until='domcontentloaded')
                    assert response.ok, (label, response.status)
                    page.evaluate('document.fonts.ready')
                    page.wait_for_timeout(650)
                    in_bounds(page, label)
                    if width <= 1199:
                        nav = page.locator('#site-nav > button')
                        nav.click()
                        assert nav.get_attribute('aria-expanded') == 'true'
                        assert page.locator('#navigation-links a:visible').count() == 6
                        in_bounds(page, label + ' menu')
                        page.keyboard.press('Escape')
                        assert nav.get_attribute('aria-expanded') == 'false'
                        follow = page.locator('.author__urls-wrapper > button')
                        if follow.count():
                            follow.click()
                            assert follow.get_attribute('aria-expanded') == 'true'
                            assert page.locator('#author-links a[href^="mailto:"]').is_visible()
                            in_bounds(page, label + ' follow')
                            page.keyboard.press('Escape')
                            assert follow.get_attribute('aria-expanded') == 'false'
                        if path == '/publications/':
                            page.locator('.lbl-toggle').first.click()
                            assert page.locator('.toggle').first.is_checked()
                            in_bounds(page, label + ' bibtex')
                            page.locator('.lbl-toggle').first.click()
                        if path == '/talks/':
                            tabs = page.locator('.talk-media').first.locator('[data-talk-target]')
                            for tab in tabs.all():
                                tab.click()
                                assert tab.get_attribute('aria-selected') == 'true'
                                in_bounds(page, label + ' media')
                        page.locator('[data-theme-toggle]').click()
                        assert page.locator('html').get_attribute('data-theme') == 'dark'
                        in_bounds(page, label + ' dark')
                        page.locator('[data-theme-toggle]').click()
                    author_links_in_both_themes(page, label)
                    if screenshots and width in [390, 768, 1024] and path in ['/', '/publications/', '/talks/', '/portfolio/']:
                        page.evaluate('window.scrollTo(0, 0)')
                        name = path.strip('/') or 'home'
                        page.screenshot(path=str(screenshots / f'{name}-{width}.png'), animations='disabled')
                    checked += 1
                    print('PASS', label, flush=True)
                except Exception as error:
                    failures.append((label, str(error)))
                    print('FAIL', label, str(error), flush=True)
                    # Reset theme after a failed case so the next case is independent.
                    page.evaluate("localStorage.setItem('site-theme', 'light')")
        browser.close()
        print(f'{checked} passed; {len(failures)} failed.', flush=True)
        if failures:
            raise SystemExit(1)


if __name__ == '__main__':
    main()
