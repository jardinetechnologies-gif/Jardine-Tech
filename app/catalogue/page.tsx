import type { Metadata } from 'next';
import Link from 'next/link';
import CatalogueBrowser from '@/components/CatalogueBrowser';
import { CtaBand } from '@/components/blocks';

export const metadata: Metadata = {
  title: 'Catalogue — Enterprise IT Products & Equipment',
  description:
    'Browse business laptops, servers, networking, cybersecurity appliances, storage, peripherals, software licensing and complete IT infrastructure packages. Request a quote on any item.',
};

export default function CataloguePage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs"><Link href="/">Home</Link> <span>/</span> <span>Catalogue</span></p>
          <p className="eyebrow">Product catalogue</p>
          <h1>Enterprise technology, configured to your requirement</h1>
          <p className="lede">
            Every item below is supplied configurable — processor, memory, capacity, licensing term and
            warranty are specified against your actual workload. Pricing is quoted per project, so select an
            item and request a quote.
          </p>
        </div>
      </section>

      <CatalogueBrowser />

      <CtaBand
        title="Cannot find the exact item?"
        body="Our catalogue is a representative selection. If you need a specific model, brand or configuration, send us the specification and we will source it."
      />
    </>
  );
}
