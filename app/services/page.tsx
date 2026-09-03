import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, ProcessBlock, ServiceCard } from '@/components/blocks';
import { Arrow } from '@/components/icons';
import { SERVICES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Services — IT Consultation, Sourcing, Deployment & Support',
  description:
    'Consultation, solution design, technology sourcing, global logistics, network and server deployment, cybersecurity, storage, licensing and ongoing IT support from Jardine Technologies.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs"><Link href="/">Home</Link> <span>/</span> <span>Services</span></p>
          <p className="eyebrow">Our services</p>
          <h1>Complete IT solutions across the full technology lifecycle</h1>
          <p className="lede">
            Every organisation has different operational requirements, budgets, infrastructure and
            objectives. That is why we take a solution-oriented approach to every project — from
            consultation and design through to deployment and long-term support.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid g-3 reveal">
            {SERVICES.map((s) => <ServiceCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>

      <ProcessBlock />

      <section className="section bg-cream">
        <div className="wrap split">
          <div className="reveal">
            <p className="eyebrow">Our approach</p>
            <h2 className="h-sec">We believe successful projects require more than delivering a box</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              Our team works with clients to identify the right technology, select compatible products,
              develop appropriate configurations and coordinate the supply of the required equipment.
            </p>
            <p style={{ color: 'var(--ink-2)' }}>
              Whether it is a new office network, a server and storage deployment, a cybersecurity
              implementation, an enterprise hardware procurement project or a complete IT infrastructure
              rollout, we aim to provide one reliable technology partner from requirement to delivery.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link className="btn btn-primary" href="/quote">Start with a requirement <Arrow /></Link>
            </div>
          </div>
          <div className="split-media reveal frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/cat-infrastructure.webp" alt="A fully commissioned network rack with structured cabling" loading="lazy" decoding="async" width={1100} height={733} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
