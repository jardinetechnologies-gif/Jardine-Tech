import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { CtaBand } from '@/components/blocks';
import { Arrow, IconClock, IconMail, IconPhone, IconPin } from '@/components/icons';
import { COMPANY } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact Us — Kuala Lumpur, Malaysia',
  description:
    'Contact Jardine Technologies at Regus Mont Kiara, Solaris Mont Kiara, Kuala Lumpur. Call +60 11-2073 0446 or +254 740 378718, or email Jardinetechnologies@gmail.com.',
};

const MAP_Q =
  'Regus Mont Kiara, Block L, Level 7, Jalan Solaris, Solaris Mont Kiara, 50480 Kuala Lumpur';

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs"><Link href="/">Home</Link> <span>/</span> <span>Contact</span></p>
          <p className="eyebrow">Get in touch</p>
          <h1>Talk to us about your technology requirement</h1>
          <p className="lede">
            Whether you need a single device, a full infrastructure build or advice before you commit to a
            specification, our team is available to help.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid g-2" style={{ alignItems: 'start' }}>
          <div className="reveal">
            <p className="eyebrow">Our office</p>
            <h2 className="h-sub" style={{ marginBottom: '1rem' }}>Jardine Technologies</h2>

            <div className="contact-item">
              <IconPin />
              <div>
                <h3>Address</h3>
                <p>
                  {COMPANY.address_lines.map((l, i) => (
                    <span key={l}>{l}{i < COMPANY.address_lines.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>

            <div className="contact-item">
              <IconMail />
              <div>
                <h3>Email</h3>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </div>
            </div>

            {COMPANY.phones.map((p) => (
              <div className="contact-item" key={p.href}>
                <IconPhone />
                <div>
                  <h3>Phone — {p.label}</h3>
                  <a href={`tel:${p.href}`}>{p.display}</a>
                </div>
              </div>
            ))}

            <div className="contact-item">
              <IconClock />
              <div>
                <h3>Business hours</h3>
                <p>
                  Monday – Friday, 9:00 – 18:00 (MYT / GMT+8)<br />
                  <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>
                    Enquiries from African and Middle East time zones answered daily.
                  </span>
                </p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link className="btn btn-primary" href="/quote">Request a Quote <Arrow /></Link>
              <Link className="btn btn-ghost" href="/catalogue">Browse catalogue</Link>
            </div>
          </div>

          <div className="reveal">
            <div className="form-panel">
              <p className="eyebrow">Send a message</p>
              <h2 className="h-sub" style={{ marginBottom: '1.5rem' }}>General enquiry</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap reveal">
          <iframe
            className="map-embed"
            title="Map showing Jardine Technologies at Regus Mont Kiara, Kuala Lumpur"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${MAP_Q.replace(/ /g, '+').replace(/,/g, '%2C')}&output=embed`}
            style={{ height: 420 }}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
