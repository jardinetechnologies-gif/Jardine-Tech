import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Checks, CtaBand, ProductCard } from '@/components/blocks';
import { Arrow } from '@/components/icons';
import { SERVICES, productBySlug, serviceBySlug } from '@/lib/content';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return { title: s.title, description: s.short };
}

export default async function ServiceDetail({ params }: Params) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const idx = SERVICES.findIndex((x) => x.slug === s.slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];
  const prods = s.products.map(productBySlug).filter(Boolean);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <Link href="/services">Services</Link>{' '}
            <span>/</span> <span>{s.title}</span>
          </p>
          <p className="eyebrow">Service {String(idx + 1).padStart(2, '0')}</p>
          <h1>{s.title}</h1>
          <p className="lede">{s.short}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <h2 className="h-sub" style={{ marginBottom: '1.25rem' }}>Overview</h2>
            <div style={{ color: 'var(--ink-2)' }}>
              {s.intro.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link className="btn btn-primary" href={`/quote?service=${s.slug}`}>
                Request a quote for this service <Arrow />
              </Link>
            </div>
          </div>
          <div className="split-media reveal frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/img/${s.image}.webp`} alt={s.title} loading="lazy" decoding="async" width={1100} height={733} />
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <div className="grid g-2">
            <div className="reveal">
              <p className="eyebrow">What is included</p>
              <h2 className="h-sub">Scope of the service</h2>
              <Checks items={s.includes} />
            </div>
            <div className="reveal">
              <p className="eyebrow">Ideal for</p>
              <h2 className="h-sub">Who this is built for</h2>
              <Checks items={s.ideal} />
              <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--line)' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '.75rem' }}>
                  Other services
                </h3>
                <ul>
                  {SERVICES.filter((o) => o.slug !== s.slug).map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/services/${o.slug}`}
                        style={{ display: 'block', padding: '.85rem 0', borderBottom: '1px solid var(--line-soft)', fontSize: 'var(--text-sm)', fontWeight: 500 }}
                      >
                        {o.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow">Related equipment</p>
              <h2 className="h-sec">Products commonly supplied with this service</h2>
            </div>
            <Link className="btn btn-ghost" href="/catalogue">Full catalogue <Arrow /></Link>
          </div>
          <div className="grid g-3 reveal" style={{ marginTop: '3rem' }}>
            {prods.map((p) => <ProductCard key={p!.slug} p={p!} />)}
          </div>
          <p style={{ marginTop: '2.5rem' }}>
            <Link className="link-arrow" href={`/services/${next.slug}`}>
              Next service: {next.title} <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Ready to scope this out?"
        body="Share your requirement and our team will respond with a clear recommendation and an itemised quotation."
      />
    </>
  );
}
