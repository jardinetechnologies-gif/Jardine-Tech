'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CATEGORIES, PRODUCTS } from '@/lib/content';
import { ProductCard } from './blocks';
import { Arrow } from './icons';

export default function CatalogueBrowser() {
  const [filter, setFilter] = useState('all');

  // Honour a #category hash arriving from the footer or a category card.
  useEffect(() => {
    const apply = (scroll: boolean) => {
      const hash = (window.location.hash || '').replace('#', '');
      if (hash && hash !== 'products' && CATEGORIES.some((c) => c.slug === hash)) {
        setFilter(hash);
        if (scroll) {
          setTimeout(
            () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
            120,
          );
        }
      }
    };
    apply(true);
    const onHash = () => apply(true);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const shown = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  const choose = (key: string, scroll = false) => {
    setFilter(key);
    if (history.replaceState) {
      history.replaceState(null, '', key === 'all' ? window.location.pathname : `#${key}`);
    }
    if (scroll) {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <p className="eyebrow reveal">Categories</p>
          <div className="grid g-4 reveal">
            {CATEGORIES.map((c, i) => (
              <a
                className="card"
                key={c.slug}
                href={`#${c.slug}`}
                onClick={(e) => { e.preventDefault(); choose(c.slug, true); }}
              >
                <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div
            className="reveal"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1.5rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <div>
              <p className="eyebrow">Browse</p>
              <h2 className="h-sec" id="products">All products &amp; solutions</h2>
            </div>
            <p className="muted" style={{ margin: 0, fontSize: 'var(--text-sm)' }}>
              <span id="countNum">{shown.length}</span> items listed
            </p>
          </div>

          <div className="filters reveal" role="group" aria-label="Filter products by category">
            <button className="chip" type="button" aria-pressed={filter === 'all'} onClick={() => choose('all')}>
              All products
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                className="chip"
                type="button"
                aria-pressed={filter === c.slug}
                onClick={() => choose(c.slug)}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div className="grid g-3" id="productGrid">
            {shown.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>

          <p className="empty" id="emptyState" hidden={shown.length !== 0}>
            No products in this category yet.{' '}
            <Link className="link-arrow" href="/quote">Ask us for a specific item <Arrow /></Link>
          </p>
        </div>
      </section>
    </>
  );
}
