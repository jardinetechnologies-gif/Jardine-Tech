import Link from 'next/link';
import { BRANDS, PROCESS, categoryBySlug, productImages, type Product, type Service } from '@/lib/content';
import { Arrow, Check } from './icons';

export function Checks({ items }: { items: string[] }) {
  return (
    <ul className="checks">
      {items.map((i) => (
        <li key={i}>
          <Check />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({
  title = 'Tell us what you need. We will handle the rest.',
  body = 'Send us your requirement — a single device, a full rack, or an entire office build — and we will come back with a clear, itemised quotation.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="cta-band section">
      <div className="wrap cta-inner reveal">
        <div>
          <h2>{title}</h2>
          <p style={{ marginTop: '1rem' }}>{body}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link className="btn btn-primary btn-lg" href="/quote">Request a Quote</Link>
          <Link className="btn btn-ghost btn-lg" href="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}

export function ProcessBlock() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="reveal">
          <p className="eyebrow">How we work</p>
          <h2 className="h-sec">One partner, from first requirement to final handover</h2>
          <p className="lede" style={{ marginTop: '1rem' }}>
            Successful technology projects need more than delivering a box. Our services can cover the
            complete technology lifecycle.
          </p>
        </div>
        <ol className="process reveal">
          {PROCESS.map((p, i) => (
            <li className="on" key={p.title}>
              <span className="step-n">{`0${i + 1}`}</span>
              <span className="step-t">{p.title}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', display: 'block', marginTop: '.35rem' }}>
                {p.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function BrandMarquee() {
  const row = BRANDS.map((b) => (
    <li className={`brand-${b.slug}`} key={b.slug}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/img/brands/${b.slug}.svg`} alt={b.name} loading="lazy" decoding="async" width={120} height={34} />
    </li>
  ));
  return (
    <section className="section brands-section" aria-labelledby="brands-h">
      <div className="wrap">
        <div className="reveal">
          <p className="eyebrow">Brands we deal with</p>
          <h2 className="h-sec" id="brands-h">Genuine products from manufacturers you already trust</h2>
          <p className="lede" style={{ marginTop: '1rem', maxWidth: '62ch' }}>
            We source through authorised distribution channels in Malaysia and Dubai, so every unit arrives
            brand new, correctly specified and covered by the manufacturer&rsquo;s own warranty.
          </p>
        </div>
      </div>
      <div className="marquee reveal">
        <div className="marquee-track">
          <ul className="marquee-row">{row}</ul>
          <ul className="marquee-row" aria-hidden="true">{row}</ul>
        </div>
      </div>
      <div className="wrap">
        <p className="brands-note">
          Brand names and logos shown are the property of their respective owners and indicate the product
          lines we supply. Availability varies by market and is confirmed at quotation.
        </p>
      </div>
    </section>
  );
}

export function KvTable({ rows, className = 'spec-table' }: { rows: { label: string; value: string }[]; className?: string }) {
  return (
    <table className={className}>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <th scope="row">{r.label}</th>
            <td>{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link className="tile" href={`/catalogue/${p.slug}`} data-cat={p.cat}>
      <div className="tile-img prod-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={productImages(p)[0]} alt={p.title} loading="lazy" decoding="async" width={1100} height={825} />
      </div>
      <div className="tile-body">
        <span className="tile-kicker">{categoryBySlug(p.cat)?.title}</span>
        <h3>{p.title}</h3>
        <p>{p.short}</p>
        <div className="tile-foot"><span className="link-arrow">View details <Arrow /></span></div>
      </div>
    </Link>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link className="tile" href={`/services/${s.slug}`}>
      <div className="tile-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/img/${s.image}.webp`} alt={s.title} loading="lazy" decoding="async" width={1100} height={825} />
      </div>
      <div className="tile-body">
        <h3>{s.title}</h3>
        <p>{s.short}</p>
        <div className="tile-foot"><span className="link-arrow">Explore service <Arrow /></span></div>
      </div>
    </Link>
  );
}
