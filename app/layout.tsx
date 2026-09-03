import type { Metadata } from 'next';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollReveal from '@/components/ScrollReveal';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jardinetechnologies.com'),
  title: {
    default:
      'Jardine Technologies — Enterprise IT Supply & Technology Solutions | Malaysia · Dubai · Africa',
    template: '%s | Jardine Technologies',
  },
  description:
    'Jardine Technologies is a Malaysia-based technology solutions and IT supply company delivering enterprise computing, servers, networking, cybersecurity, storage and complete IT infrastructure across Africa and beyond.',
  icons: { icon: [{ url: '/img/Technology.png', type: 'image/png' }] },
  openGraph: { type: 'website' },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preload" as="image" href="/img/hero-datacentre.webp" fetchPriority="high" />
      </head>
      <body>
        <BackToTop />
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
