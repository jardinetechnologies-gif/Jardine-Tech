import Link from 'next/link';
import { Arrow } from '@/components/icons';

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>We could not find that page</h1>
        <p className="lede">
          The link may be out of date. Browse the catalogue or tell us what you are looking for and we will
          point you to the right item.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link className="btn btn-primary btn-lg" href="/catalogue">Browse the catalogue <Arrow /></Link>
          <Link className="btn btn-ghost btn-lg" href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
