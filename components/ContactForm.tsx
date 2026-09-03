'use client';

import { useRef, useState } from 'react';
import { COMPANY } from '@/lib/content';
import { mailtoFallback, sendForm, validate, type SendMode } from '@/lib/formsubmit';
import { Arrow } from './icons';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<SendMode | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form || !validate(form)) return;

    const subjectField = form.elements.namedItem('subject') as HTMLInputElement | null;
    const subject = `Website enquiry${subjectField?.value ? ` — ${subjectField.value.trim()}` : ''}`;

    setSending(true);
    const mode = await sendForm(
      form,
      subject,
      'Thank you for contacting Jardine Technologies. We have received your message and our team will get back to you, usually within one business day.',
    );
    setSending(false);

    if (mode === 'sent') form.reset();
    else mailtoFallback(form, subject);

    setStatus(mode);
    setTimeout(() => statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 40);
  }

  const clearInvalid = (e: React.FormEvent) => {
    const wrap = (e.target as HTMLElement).closest('.field');
    if (wrap?.classList.contains('invalid')) wrap.classList.remove('invalid');
  };

  return (
    <>
      <form id="contactForm" ref={formRef} noValidate onSubmit={onSubmit} onInput={clearInvalid}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="c-name">Full name <span className="req">*</span></label>
            <input id="c-name" name="name" type="text" autoComplete="name" required />
            <span className="err">Please enter your name.</span>
          </div>
          <div className="field">
            <label htmlFor="c-company">Organisation</label>
            <input id="c-company" name="company" type="text" autoComplete="organization" />
          </div>
          <div className="field">
            <label htmlFor="c-email">Email <span className="req">*</span></label>
            <input id="c-email" name="email" type="email" autoComplete="email" required />
            <span className="err">Please enter a valid email address.</span>
          </div>
          <div className="field">
            <label htmlFor="c-phone">Phone</label>
            <input id="c-phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="field full">
            <label htmlFor="c-subject">Subject <span className="req">*</span></label>
            <input id="c-subject" name="subject" type="text" required />
            <span className="err">Please add a subject.</span>
          </div>
          <div className="field full">
            <label htmlFor="c-message">Message <span className="req">*</span></label>
            <textarea id="c-message" name="message" required />
            <span className="err">Please tell us how we can help.</span>
          </div>
        </div>

        <button
          className={`btn btn-primary btn-lg${sending ? ' is-loading' : ''}`}
          type="submit"
          disabled={sending}
          style={{ marginTop: '1.5rem' }}
        >
          {sending ? 'Sending…' : <>Send message <Arrow /></>}
        </button>
        <p className="form-note">
          Your message goes straight to our team at {COMPANY.email}. Prefer to write directly? Email us at any time.
        </p>
      </form>

      <div
        className={`form-status${status ? ` show is-${status}` : ''}`}
        id="contactStatus"
        ref={statusRef}
        role="status"
        aria-live="polite"
      >
        <div className="status-sent">
          <h3>Message sent</h3>
          <p>
            Thank you — your message has been delivered to our team at {COMPANY.email}. We reply to
            enquiries within one business day.
          </p>
        </div>
        <div className="status-fallback">
          <h3>Your message is ready to send</h3>
          <p>
            We could not reach our mail service, so we have opened your email client with the details
            filled in. If nothing opened, email us directly at{' '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
