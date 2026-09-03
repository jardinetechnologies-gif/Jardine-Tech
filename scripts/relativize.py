#!/usr/bin/env python3
"""Rewrite root-absolute asset URLs in the static export to relative URLs.

Needed because the Perplexity preview host serves the export from a deep
sub-path. Vercel / any root deployment does not need this step, but relative
URLs are correct there too.
"""
import os
import re
import sys

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', 'out')
OUT = os.path.abspath(OUT)

ROUTES = ('_next/', 'img/', 'favicon.svg', 'services/', 'catalogue/', 'about/', 'contact/', 'quote/')
ATTR = re.compile(r'((?:href|src|srcset|content)=")/(' + '|'.join(re.escape(r) for r in ROUTES) + r')')
HOME = re.compile(r'(href=")/(?=["#])')
# The preview host serves files, not directory indexes, so route links need an
# explicit index.html.
INDEXED = re.compile(r'(href=")((?:services|catalogue|about|contact|quote)(?:/[a-z0-9-]+)?/)?(#[^"]*)?(")')


def add_index(m):
    if not m.group(2):
        return m.group(0)
    return m.group(1) + (m.group(2) or '') + 'index.html' + (m.group(3) or '') + m.group(4)


def rel_for(depth):
    # All pages carry an injected <base> pointing at the export root, so asset
    # and route URLs are written base-relative (no leading slash, no ../).
    return ''


def page_route(rel_html):
    d = os.path.dirname(rel_html)
    return '/' + d.replace(os.sep, '/') if d else '/'


def base_script(depth):
    """Static bootstrap for sub-path hosting.

    A relative <base> resolves against the document URL, so `../` repeated to
    the page's depth always points at the export root however deep the host
    mounts the bundle. It is emitted as a literal tag (not document.write) so
    the browser's speculative preload scanner honours it too.

    The Next.js App Router refuses to hydrate when location.pathname does not
    match a generated route, which is always the case under an unknown host
    prefix, so the preview build also loads a plain-JS enhancement layer that
    re-implements the client-component behaviour against the same markup.
    """
    up = '../' * depth if depth else './'
    return (
        '<base href="%s">'
        '<script>window.TURBOPACK_CHUNK_BASE_PATH=new URL("_next/",document.baseURI).pathname;'
        'window.__JT_BASE=new URL(".",document.baseURI).pathname;</script>'
        '<script defer src="preview-fallback.js"></script>'
    ) % up


PRELOAD = re.compile(r'<link[^>]+rel="(?:preload|modulepreload)"[^>]*>')


html_count = css_count = 0
for root, _dirs, files in os.walk(OUT):
    for name in files:
        path = os.path.join(root, name)
        rel = os.path.relpath(path, OUT)
        depth = rel.count(os.sep)
        if name.endswith('.html'):
            src = open(path, encoding='utf-8').read()
            new = ATTR.sub(lambda m: m.group(1) + rel_for(depth) + m.group(2), src)
            new = HOME.sub(lambda m: m.group(1) + 'index.html', new)
            new = INDEXED.sub(add_index, new)
            # The browser preload scanner ignores <base>, so preloads would be
            # fetched against the document path and 404. Drop them.
            new = PRELOAD.sub('', new)
            inject = base_script(depth)
            if '<head>' in new:
                new = new.replace('<head>', '<head>' + inject, 1)
            else:
                new = inject + new
            if new != src:
                open(path, 'w', encoding='utf-8').write(new)
                html_count += 1
        elif name.endswith('.css'):
            src = open(path, encoding='utf-8').read()
            new = src.replace('url(/img/', 'url(' + rel_for(depth) + 'img/')
            if new != src:
                open(path, 'w', encoding='utf-8').write(new)
                css_count += 1

print('relativized %d html, %d css files' % (html_count, css_count))
