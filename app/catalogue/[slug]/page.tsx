import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Gallery from '@/components/Gallery';
import { CtaBand, KvTable, ProductCard } from '@/components/blocks';
import { Arrow } from '@/components/icons';
import { COMMERCIAL, PRODUCTS, categoryBySlug, productBySlug, productImages, productRef } from '@/lib/content';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  const cat = categoryBySlug(p.cat);
  return { title: `${p.title} — ${cat?.title ?? 'Catalogue'}`, description: p.short };
}

export default async function ProductDetail({ params }: Params) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();

  const cat = categoryBySlug(p.cat)!;
  const images = productImages(p);

  const glance = [
    { label: 'Category', value: cat.title },
    { label: 'Item reference', value: productRef(p) },
    { label: 'Best suited to', value: p.kicker },
    { label: 'Condition', value: 'Brand new, factory sealed' },
    { label: 'Pricing', value: 'Quoted on request' },
    { label: 'Lead time', value: 'Typically 1-4 weeks' },
  ];

  const highlights = p.features.map((f, i) => ({ label: String(i + 1).padStart(2, '0'), value: f }));

  let related = PRODUCTS.filter((q) => q.cat === p.cat && q.slug !== p.slug).slice(0, 3);
  if (related.length < 3) {
    related = related.concat(
      PRODUCTS.filter((q) => q.slug !== p.slug && !related.includes(q)).slice(0, 3 - related.length),
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <Link href="/catalogue">Catalogue</Link>{' '}
            <span>/</span> <Link href={`/catalogue#${cat.slug}`}>{cat.title}</Link> <span>/</span>{' '}
            <span>{p.title}</span>
          </p>
        </div>
      </section>

      <section className="section product-top-section">
        <div className="wrap product-top">
          <Gallery images={images} title={p.title} />
          <div className="product-summary reveal">
            <span className="tag">{cat.title}</span>
            <h1 className="h-sec" style={{ marginTop: '1rem' }}>{p.title}</h1>
            <p className="lede" style={{ marginTop: '1rem' }}>{p.short}</p>
            <div className="prose" style={{ marginTop: '1.25rem' }}>
              {p.desc.map((x) => <p key={x}>{x}</p>)}
            </div>
            <h2 className="table-h">At a glance</h2>
            <KvTable rows={glance} className="spec-table glance-table" />
            <div className="product-actions">
              <Link className="btn btn-primary btn-lg" href={`/quote?item=${p.slug}`}>Request a Quote <Arrow /></Link>
              <Link className="btn btn-ghost btn-lg" href="/contact">Speak to our team</Link>
            </div>
            <p className="muted" style={{ fontSize: 'var(--text-xs)', marginTop: '1.25rem' }}>
              Configurations, warranty terms and lead times are confirmed at quotation. Genuine products
              supplied through authorised distribution channels.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '60ch' }}>
            <p className="eyebrow">Product information</p>
            <h2 className="h-sec">Full detail, set out plainly</h2>
          </div>
          <div className="grid g-2 tables-grid" style={{ marginTop: '3rem' }}>
            <div className="reveal">
              <h3 className="table-h">Technical specification</h3>
              <KvTable rows={p.specs} />
            </div>
            <div className="reveal">
              <h3 className="table-h">Key highlights</h3>
              <KvTable rows={highlights} className="spec-table num-table" />
              <h3 className="table-h" style={{ marginTop: '2.5rem' }}>Supply, warranty &amp; delivery</h3>
              <KvTable rows={COMMERCIAL} />
            </div>
          </div>
          <div className="form-panel quote-nudge reveal">
            <div>
              <h3>Need a price for this item?</h3>
              <p>
                Tell us quantity, preferred configuration and delivery destination. We will return an
                itemised quotation with lead times.
              </p>
            </div>
            <Link className="btn btn-primary btn-lg" href={`/quote?item=${p.slug}`}>Request a Quote <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">Related items</p>
            <h2 className="h-sec">You may also need</h2>
          </div>
          <div className="grid g-3 reveal" style={{ marginTop: '3rem' }}>
            {related.map((q) => <ProductCard key={q.slug} p={q} />)}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
