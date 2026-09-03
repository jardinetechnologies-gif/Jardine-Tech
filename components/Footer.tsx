import Link from 'next/link';
import { CATEGORIES, COMPANY, SERVICES, SOCIALS } from '@/lib/content';
import { SocialIcon } from './icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="brand-logo" src="/img/Technology.png" alt="" decoding="async" width={190} height={90} />
            </Link>
            <p style={{ maxWidth: '34ch' }}>
              Technology solutions and IT supply — based in Malaysia, sourcing through Dubai,
              delivering across Africa and beyond.
            </p>
            <h4 className="socials-h">Follow us</h4>
            <div className="socials" role="group" aria-label="Jardine Technologies on social media">
              {SOCIALS.map((s) => (
                <a
                  key={s.slug}
                  className="social"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                >
                  <SocialIcon slug={s.slug} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>
              ))}
              <li><Link href="/services">All services</Link></li>
            </ul>
          </div>

          <div>
            <h4>Catalogue</h4>
            <ul>
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.slug}><Link href={`/catalogue#${c.slug}`}>{c.title}</Link></li>
              ))}
              <li><Link href="/catalogue">Full catalogue</Link></li>
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <address style={{ fontStyle: 'normal', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginBottom: '1rem' }}>
              {COMPANY.address_lines.map((l, i) => (
                <span key={l}>{l}{i < COMPANY.address_lines.length - 1 && <br />}</span>
              ))}
            </address>
            <p style={{ margin: '0 0 .4rem' }}>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </p>
            {COMPANY.phones.map((p) => (
              <p key={p.href} style={{ margin: '0 0 .4rem' }}>
                <a href={`tel:${p.href}`}>{p.display}</a>{' '}
                <span style={{ opacity: 0.5 }}>· {p.label}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jardine Technologies. All rights reserved.</span>
          <span>Connecting Businesses to Technology.</span>
        </div>
      </div>
    </footer>
  );
}
