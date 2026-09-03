import type { Metadata } from 'next';
import Link from 'next/link';
import { Checks, CtaBand } from '@/components/blocks';
import WhyCards from '@/components/WhyCards';
import { TEAM, VALUES, WHY } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Us — Technology. Solutions. Trust.',
  description:
    'Jardine Technologies is a Malaysia-based technology solutions and IT supply company with a supply network through Dubai serving markets across Africa. Learn about our mission, vision and values.',
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs"><Link href="/">Home</Link> <span>/</span> <span>About</span></p>
          <p className="eyebrow">Technology. Solutions. Trust.</p>
          <h1>A technology partner built on transparency and reliability</h1>
          <p className="lede">
            Jardine Technologies is a technology solutions and IT supply company based in Malaysia, with a
            strategic supply and distribution network extending through Dubai to markets across Africa.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <p className="eyebrow">About us</p>
            <h2 className="h-sec">Practical, dependable technology built for long-term value</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              We specialise in delivering reliable, scalable and cost-effective technology solutions to
              businesses, government institutions, NGOs, educational organisations and other enterprises.
            </p>
            <p style={{ color: 'var(--ink-2)' }}>
              From individual IT equipment requirements to complete infrastructure projects, we work closely
              with our clients to understand their needs and provide solutions that are practical,
              dependable and built for long-term value.
            </p>
            <p style={{ color: 'var(--ink-2)' }}>
              Our approach goes beyond simply supplying products. We provide complete IT solutions — from
              consultation and product sourcing to supply, deployment, infrastructure and ongoing technology
              support. Whether a client requires a single laptop, a complete server environment, enterprise
              networking infrastructure, cybersecurity solutions, data storage or a large-scale IT
              deployment, our objective is to make the entire process straightforward and dependable.
            </p>
          </div>
          <div className="split-media reveal frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/kl-skyline.webp" alt="The Kuala Lumpur skyline, home of Jardine Technologies" loading="lazy" decoding="async" width={1600} height={1067} />
          </div>
        </div>
      </section>

      <section className="section bg-ink">
        <div className="wrap grid g-2">
          <div className="reveal">
            <p className="eyebrow">Our mission</p>
            <h2 className="h-sub" style={{ marginBottom: '1rem' }}>
              Simplifying technology procurement and deployment
            </h2>
            <p className="lede">
              To empower organisations with reliable, innovative and accessible technology solutions by
              combining global IT products, professional expertise, transparent service and dependable
              supply networks.
            </p>
            <p style={{ color: 'rgba(244,236,227,.65)', fontSize: 'var(--text-sm)' }}>
              We aim to deliver the right solutions at the right value, while building trusted and lasting
              relationships across the markets we serve.
            </p>
          </div>
          <div className="reveal">
            <p className="eyebrow">Our vision</p>
            <h2 className="h-sub" style={{ marginBottom: '1rem' }}>
              A trusted global technology solutions partner
            </h2>
            <p className="lede">
              To connect world-class innovation with businesses and organisations across Africa and beyond —
              recognised for integrity, reliability, innovation, transparency and exceptional service.
            </p>
            <p style={{ color: 'rgba(244,236,227,.65)', fontSize: 'var(--text-sm)' }}>
              We want to create stronger connections between global technology manufacturers and the rapidly
              growing African technology market.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split reverse">
          <div className="reveal">
            <p className="eyebrow">Our corridor</p>
            <h2 className="h-sec">Connecting Malaysia, Dubai &amp; Africa</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              With our company based in Malaysia and supply operations extending through Dubai, we are
              strategically positioned to support customers and projects across African markets.
            </p>
            <p style={{ color: 'var(--ink-2)' }}>
              We understand that international IT procurement can be complex. Availability, shipping,
              product specifications, warranties, lead times, customs and after-sales considerations can all
              affect a project. Our role is to simplify this by coordinating the different elements and
              providing a clear, dependable supply experience.
            </p>
            <Checks
              items={[
                'Malaysian base with access to a strong Asian technology ecosystem',
                'Dubai network for sourcing and consolidating international products',
                'Competitive pricing and access to global technology brands',
                'Reliable logistics into African markets',
              ]}
            />
          </div>
          <div className="split-media reveal frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logistics.webp" alt="Consolidated technology shipments prepared for export" loading="lazy" decoding="async" width={1100} height={733} />
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow">Our values</p>
            <h2 className="h-sec">The principles behind every project</h2>
          </div>
          <div className="stripe-list" style={{ marginTop: '3rem' }}>
            {VALUES.map((v, i) => (
              <div className="stripe reveal" key={v.title}>
                <span className="stripe-n">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{v.title}</h3></div>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '56ch' }}>
            <p className="eyebrow">Why choose Jardine Technologies</p>
            <h2 className="h-sec">What working with us actually means</h2>
          </div>
            <WhyCards items={WHY} />
        </div>
      </section>

      <section className="section bg-cream" id="team">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '56ch' }}>
            <p className="eyebrow">Our team</p>
            <h2 className="h-sec">The people behind every quotation and delivery</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              A compact, hands-on team spanning solution design, procurement, logistics and technical
              services — so the person who scopes your requirement is the same person who sees it delivered.
            </p>
          </div>
          <div className="team-grid">
            {TEAM.map((m) => (
              <article className="team-card reveal" key={m.name}>
                <div className="team-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.photo ? `/img/team/${m.photo}.webp` : '/img/team/avatar-placeholder.svg'}
                    alt={m.photo ? m.name : ''}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="team-body">
                  <h3>{m.name}</h3>
                  <p className="team-role">{m.role}</p>
                  <p className="team-bio">{m.bio}</p>
                  {(m.email || m.linkedin) && (
                    <div className="team-links">
                      {m.email && (
                        <a className="team-link" href={`mailto:${m.email}`} aria-label={`Email ${m.name}`}>Email</a>
                      )}
                      {m.linkedin && (
                        <a className="team-link" href={m.linkedin} target="_blank" rel="noopener" aria-label={`LinkedIn profile of ${m.name}`}>
                          LinkedIn
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap-narrow reveal" style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Building the future through technology</p>
          <h2 className="h-sec" style={{ maxWidth: 'none', marginInline: 'auto' }}>
            Technology should create opportunities, improve efficiency and enable people to achieve more
          </h2>
          <p className="lede" style={{ margin: '1.5rem auto 0' }}>
            From Malaysia to Dubai and across Africa, we are committed to connecting our customers with the
            technology they need to operate, grow, secure and succeed.
          </p>
          <p style={{ marginTop: '2rem', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--crimson)' }}>
            Jardine Technologies — Connecting Businesses to Technology.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
