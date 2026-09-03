import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/QuoteForm';
import { Checks } from '@/components/blocks';
import { IconMail, IconPhone } from '@/components/icons';
import { COMPANY } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Request a Quote — Enterprise IT Supply',
  description:
    'Request an itemised quotation from Jardine Technologies. Tell us your products, services, quantities and delivery destination and our team will respond with specifications, pricing and lead times.',
};

const STEPS = [
  ['Acknowledgement.', 'We confirm receipt and flag anything that needs clarifying.'],
  ['Specification review.', 'Our team validates compatibility, availability and alternatives.'],
  ['Itemised quotation.', 'Products, quantities, warranty, freight terms and lead times in writing.'],
  ['Delivery & deployment.', 'On approval we coordinate supply, logistics and installation.'],
];

export default function QuotePage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs"><Link href="/">Home</Link> <span>/</span> <span>Request a Quote</span></p>
          <p className="eyebrow">Request a quote</p>
          <h1>Tell us the requirement — we will return an itemised quotation</h1>
          <p className="lede">
            The more detail you provide, the more accurate our response. If you are not sure of the
            specification yet, describe the outcome you need and our team will propose one.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid quote-layout">
          <div className="reveal">
            <div className="form-panel">
              <QuoteForm />
            </div>
          </div>

          <aside className="reveal">
            <div className="card" style={{ background: 'var(--cream)', borderColor: 'transparent' }}>
              <p className="eyebrow">What happens next</p>
              <ol style={{ counterReset: 's', display: 'grid', gap: '1.1rem', marginTop: '.5rem' }}>
                {STEPS.map(([t, x], i) => (
                  <li style={{ display: 'flex', gap: '.85rem' }} key={t}>
                    <span className="card-num" style={{ flex: 'none' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>
                      <strong style={{ color: 'var(--ink)' }}>{t}</strong> {x}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card" style={{ marginTop: '1.5rem' }}>
              <p className="eyebrow">Prefer to talk?</p>
              <div className="contact-item" style={{ paddingTop: 0 }}>
                <IconPhone />
                <div>
                  <h3>{COMPANY.phones[0].label}</h3>
                  <a href={`tel:${COMPANY.phones[0].href}`}>{COMPANY.phones[0].display}</a>
                </div>
              </div>
              <div className="contact-item">
                <IconPhone />
                <div>
                  <h3>{COMPANY.phones[1].label}</h3>
                  <a href={`tel:${COMPANY.phones[1].href}`}>{COMPANY.phones[1].display}</a>
                </div>
              </div>
              <div className="contact-item">
                <IconMail />
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </div>
              </div>
            </div>

            <div className="card" style={{ marginTop: '1.5rem' }}>
              <p className="eyebrow">Good to know</p>
              <Checks
                items={[
                  'Genuine products through authorised distribution channels',
                  'Consolidated quotations across multiple manufacturers',
                  'Freight, documentation and customs coordination included',
                  'Volume and project pricing on larger deployments',
                ]}
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
