import Link from 'next/link';
import { BrandMarquee, Checks, CtaBand, ProcessBlock, ServiceCard } from '@/components/blocks';
import { Arrow } from '@/components/icons';
import WhyCards from '@/components/WhyCards';
import { CATEGORIES, SECTORS, SERVICES, WHY } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/hero-datacentre.webp" alt="" fetchPriority="high" decoding="async" width={1600} height={1067} />
        </div>
        <div className="wrap hero-inner">
          <p className="eyebrow" style={{ color: '#ff8c9f' }}>Technology. Solutions. Trust.</p>
          <h1>Enterprise technology, <em>sourced and delivered</em> with certainty.</h1>
          <p className="hero-lede">
            Jardine Technologies is a technology solutions and IT supply company based in Malaysia, with a
            strategic supply and distribution network extending through Dubai to markets across Africa.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" href="/quote">Request a Quote <Arrow /></Link>
            <Link className="btn btn-ghost btn-lg" href="/catalogue">Browse the Catalogue</Link>
          </div>
        </div>
        <div className="wrap">
          <dl className="hero-strip">
            <div><dt>08</dt><dd>Specialisation areas</dd></div>
            <div><dt>3</dt><dd>Malaysia · Dubai · Africa</dd></div>
            <div><dt>7</dt><dd>Lifecycle stages covered</dd></div>
            <div><dt>1</dt><dd>Accountable partner</dd></div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <p className="eyebrow">Who we are</p>
            <h2 className="h-sec">More than a supplier — a complete IT solutions partner</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              We deliver reliable, scalable and cost-effective technology to businesses, government
              institutions, NGOs, educational organisations and other enterprises — from a single laptop to
              a complete infrastructure rollout.
            </p>
            <Checks
              items={[
                'Consultation, solution design and product sourcing under one roof',
                'Genuine products through authorised distribution channels',
                'Supply, deployment, infrastructure and ongoing technology support',
                'Recommendations based on performance, compatibility, scalability and budget',
              ]}
            />
            <div style={{ marginTop: '2rem' }}>
              <Link className="btn btn-ghost" href="/about">About Jardine Technologies <Arrow /></Link>
            </div>
          </div>
          <div className="split-media reveal frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/consult.webp" alt="Jardine Technologies consultants reviewing an infrastructure design" loading="lazy" decoding="async" width={1100} height={733} />
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '60ch' }}>
            <p className="eyebrow">What we deliver</p>
            <h2 className="h-sec">A broad portfolio of enterprise and business technology</h2>
            <p className="lede" style={{ marginTop: '1rem' }}>
              Sourced from leading global manufacturers and technology partners, across eight areas of
              specialisation.
            </p>
          </div>
          <div className="grid g-4 reveal" style={{ marginTop: '3rem' }}>
            {CATEGORIES.map((c) => (
              <Link className="tile" key={c.slug} href={`/catalogue#${c.slug}`}>
                <div className="tile-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/img/${c.image}.webp`} alt={c.title} loading="lazy" decoding="async" width={1100} height={825} />
                </div>
                <div className="tile-body">
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="tile-foot"><span className="link-arrow">Browse <Arrow /></span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrandMarquee />

      <section className="section bg-ink">
        <div className="wrap split">
          <div className="split-media reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logistics.webp" alt="Consolidated technology shipments prepared for export" loading="lazy" decoding="async" width={1100} height={733} style={{ borderRadius: 4 }} />
          </div>
          <div className="reveal">
            <p className="eyebrow">Our corridor</p>
            <h2 className="h-sec">Connecting Malaysia, Dubai &amp; Africa</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              Our Dubai supply network lets us source and consolidate products from major international
              manufacturers and distribution channels, while our Malaysian base provides access to a strong
              Asian technology and commercial ecosystem.
            </p>
            <Checks
              items={[
                'Competitive international pricing and multi-brand sourcing',
                'Consolidated shipments with accurate export documentation',
                'Customs, warranty and lead-time coordination handled for you',
                'A clear, dependable supply experience from order to delivery',
              ]}
            />
            <div style={{ marginTop: '2rem' }}>
              <Link className="btn btn-ghost" href="/services/global-logistics-supply">
                How our supply network works <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '52ch' }}>
              <p className="eyebrow">Our services</p>
              <h2 className="h-sec">Complete IT solutions, not just products</h2>
            </div>
            <Link className="btn btn-ghost" href="/services">View all services <Arrow /></Link>
          </div>
          <div className="grid g-3 reveal" style={{ marginTop: '3rem' }}>
            {SERVICES.slice(0, 6).map((s) => <ServiceCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>

      <ProcessBlock />

      <section className="section bg-cream">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '56ch' }}>
            <p className="eyebrow">Why Jardine</p>
            <h2 className="h-sec">Reasons organisations choose us</h2>
          </div>
          <WhyCards items={WHY} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '56ch' }}>
            <p className="eyebrow">Who we serve</p>
            <h2 className="h-sec">Built for organisations with real accountability</h2>
          </div>
          <div className="faq-list reveal" style={{ marginTop: '3rem' }}>
            {SECTORS.map((s, i) => (
              <details className="faq-item" key={s.title} open={i === 0}>
                <summary>
                  <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s.title}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <p>{s.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
