'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { COMPANY } from '@/lib/content';
import { IconBurger, IconClose } from './icons';

const NAV = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Catalogue', href: '/catalogue' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the drawer on route change or Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const phone = COMPANY.phones[0];

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>Kuala Lumpur, Malaysia &nbsp;·&nbsp; Supply through Dubai &nbsp;·&nbsp; Serving Africa</span>
          <span className="topbar-links">
            <a href={`tel:${phone.href}`}>{phone.display}</a>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </span>
        </div>
      </div>

      <header className="site-header">
        <div className="wrap">
          <Link className="brand" href="/" aria-label="Jardine Technologies — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-logo" src="/img/Technology.png" alt="" decoding="async" width={150} height={58} />
          </Link>

          <nav className={`nav${open ? ' open' : ''}`} id="nav" aria-label="Primary">
            <button className="nav-close" aria-label="Close menu" onClick={() => setOpen(false)}>
              <IconClose />
            </button>
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={isActive(l.href) ? 'active' : undefined}
                aria-current={isActive(l.href) ? 'page' : undefined}
              >
                {l.name}
              </Link>
            ))}
            <Link className="btn btn-primary" href="/quote">Request a Quote</Link>
          </nav>

          <div className="header-cta">
            <Link className="btn btn-primary" href="/quote">Request a Quote</Link>
            <button
              className="burger"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="nav"
              onClick={() => setOpen(true)}
            >
              <IconBurger />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
