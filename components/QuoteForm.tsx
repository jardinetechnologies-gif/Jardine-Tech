'use client';

import { useEffect, useRef, useState } from 'react';
import { COUNTRIES } from '@/lib/countries';
import { CATEGORIES, COMPANY, PRODUCTS, SERVICES, productBySlug, serviceBySlug } from '@/lib/content';
import { mailtoFallback, sendForm, validate, type SendMode } from '@/lib/formsubmit';
import { Arrow } from './icons';

export default function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<SendMode | null>(null);
  const [sending, setSending] = useState(false);

  const [item, setItem] = useState('');
  const [service, setService] = useState('');
  const [details, setDetails] = useState('');

  // Prefill from ?item= / ?service= when arriving from a catalogue or service page.
  useEffect(() => {
    // Read the query string directly rather than via useSearchParams, which
    // would force this component to render client-side only and leave the
    // form out of the static export.
    const params = new URLSearchParams(window.location.search);
    const itemSlug = params.get('item') || '';
    const svcSlug = params.get('service') || '';
    const chosen: string[] = [];

    if (itemSlug && productBySlug(itemSlug)) {
      setItem(itemSlug);
      chosen.push(productBySlug(itemSlug)!.title);
    }
    if (svcSlug && serviceBySlug(svcSlug)) {
      setService(svcSlug);
      chosen.push(serviceBySlug(svcSlug)!.title);
    }
    if (chosen.length) {
      setDetails(
        (prev) =>
          prev ||
          `I would like a quotation for: ${chosen.join(' / ')}.\n\nQuantity: \nPreferred configuration: \nDelivery destination: \n`,
      );
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form || !validate(form)) return;

    const org = form.elements.namedItem('company') as HTMLInputElement | null;
    const subject = `Quote request${org?.value ? ` — ${org.value.trim()}` : ''}`;

    setSending(true);
    const mode = await sendForm(
      form,
      subject,
      'Thank you for contacting Jardine Technologies. We have received your quote request and our team will review it and respond with specifications, pricing and lead times, usually within one business day.',
    );
    setSending(false);

    if (mode === 'sent') {
      form.reset();
      setItem('');
      setService('');
      setDetails('');
    } else {
      mailtoFallback(form, subject);
    }

    setStatus(mode);
    setTimeout(() => statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 40);
  }

  const clearInvalid = (e: React.FormEvent) => {
    const wrap = (e.target as HTMLElement).closest('.field');
    if (wrap?.classList.contains('invalid')) wrap.classList.remove('invalid');
  };

  return (
    <>
      <form id="quoteForm" ref={formRef} noValidate onSubmit={onSubmit} onInput={clearInvalid}>
        <p className="eyebrow">1 — Your details</p>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="q-name">Full name <span className="req">*</span></label>
            <input id="q-name" name="name" type="text" autoComplete="name" required />
            <span className="err">Please enter your name.</span>
          </div>
          <div className="field">
            <label htmlFor="q-company">Organisation <span className="req">*</span></label>
            <input id="q-company" name="company" type="text" autoComplete="organization" required />
            <span className="err">Please enter your organisation.</span>
          </div>
          <div className="field">
            <label htmlFor="q-email">Work email <span className="req">*</span></label>
            <input id="q-email" name="email" type="email" autoComplete="email" required />
            <span className="err">Please enter a valid email address.</span>
          </div>
          <div className="field">
            <label htmlFor="q-phone">Phone / WhatsApp <span className="req">*</span></label>
            <input id="q-phone" name="phone" type="tel" autoComplete="tel" required />
            <span className="err">Please enter a contact number.</span>
          </div>
          <div className="field">
            <label htmlFor="q-country">Delivery country <span className="req">*</span></label>
            <select id="q-country" name="country" autoComplete="country-name" defaultValue="" required>
              <option value="">Select delivery country</option>
              {COUNTRIES.map((country) => <option key={country.code} value={country.name}>{country.name}</option>)}
              <option>Other</option>
            </select>
            <span className="err">Please tell us where this is going.</span>
          </div>
          <div className="field">
            <label htmlFor="q-type">Organisation type</label>
            <select id="q-type" name="orgtype" defaultValue="">
              <option value="">Select…</option>
              <option>Business / Enterprise</option>
              <option>Government institution</option>
              <option>NGO / Development organisation</option>
              <option>Educational institution</option>
              <option>Reseller / System integrator</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <p className="eyebrow" style={{ marginTop: '2.5rem' }}>2 — What you need</p>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="q-item">Product of interest</label>
            <select id="q-item" name="item" value={item} onChange={(e) => setItem(e.target.value)}>
              <option value="">Not product specific / multiple items</option>
              {CATEGORIES.map((c) => {
                const items = PRODUCTS.filter((p) => p.cat === c.slug);
                if (!items.length) return null;
                return (
                  <optgroup key={c.slug} label={c.title}>
                    {items.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
                  </optgroup>
                );
              })}
            </select>
            <span className="hint">Selected automatically when you arrive from a catalogue page.</span>
          </div>
          <div className="field">
            <label htmlFor="q-service">Service required</label>
            <select id="q-service" name="service" value={service} onChange={(e) => setService(e.target.value)}>
              <option value="">No specific service</option>
              {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="q-qty">Estimated quantity</label>
            <input id="q-qty" name="quantity" type="text" inputMode="numeric" placeholder="e.g. 25 units" />
          </div>
          <div className="field">
            <label htmlFor="q-budget">Indicative budget</label>
            <input id="q-budget" name="budget" type="text" placeholder="Optional — helps us scope options" />
          </div>
          <div className="field">
            <label htmlFor="q-timeline">Required by</label>
            <select id="q-timeline" name="timeline" defaultValue="">
              <option value="">Select…</option>
              <option>Urgent — within 2 weeks</option>
              <option>Within 1 month</option>
              <option>1–3 months</option>
              <option>3+ months / budgeting stage</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="q-heard">How did you hear about us?</label>
            <input id="q-heard" name="heard" type="text" />
          </div>
          <div className="field full">
            <label htmlFor="q-details">Requirement details <span className="req">*</span></label>
            <textarea
              id="q-details"
              name="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the products, configurations, quantities, sites and any constraints. If you have a bill of materials or tender specification, mention it here and we will request the file."
              required
            />
            <span className="err">Please describe what you need.</span>
          </div>
          <div className="field full">
            <label
              className="check-row"
              htmlFor="q-consent"
              style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400, fontSize: 'var(--text-sm)' }}
            >
              <input id="q-consent" name="consent" type="checkbox" required />
              <span>I agree that Jardine Technologies may contact me about this enquiry. <span className="req">*</span></span>
            </label>
            <span className="err">Please confirm we may contact you.</span>
          </div>
        </div>

        <button
          className={`btn btn-primary btn-lg${sending ? ' is-loading' : ''}`}
          type="submit"
          disabled={sending}
          style={{ marginTop: '1.75rem' }}
        >
          {sending ? 'Sending…' : <>Submit quote request <Arrow /></>}
        </button>
        <p className="form-note">
          Your request is sent straight to our team at {COMPANY.email}. We reply to every enquiry, usually
          within one business day. You can also call us directly on {COMPANY.phones[0].display}.
        </p>
      </form>

      <div
        className={`form-status${status ? ` show is-${status}` : ''}`}
        id="quoteStatus"
        ref={statusRef}
        role="status"
        aria-live="polite"
      >
        <div className="status-sent">
          <h3>Quote request sent</h3>
          <p>
            Thank you — your request has been delivered to {COMPANY.email}. Our team will come back to you
            with an itemised quotation and lead times, usually within one business day.
          </p>
        </div>
        <div className="status-fallback">
          <h3>Your quote request is ready to send</h3>
          <p>
            We could not reach our mail service, so we have opened your email client with the full request
            prepared. If nothing opened, email the details to{' '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or call {COMPANY.phones[0].display}.
          </p>
        </div>
      </div>
    </>
  );
}
