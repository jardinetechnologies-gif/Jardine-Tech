import { COMPANY } from './content';

export const FORM_EMAIL = process.env.NEXT_PUBLIC_FORM_EMAIL || COMPANY.email;
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${FORM_EMAIL}`;

export type SendMode = 'sent' | 'fallback';

function fieldOf(el: Element) {
  return el.closest('.field');
}

function labelFor(el: HTMLElement & { name?: string }) {
  const wrap = fieldOf(el);
  const lab = wrap ? wrap.querySelector('label') : null;
  const text = lab ? lab.textContent || '' : el.name || '';
  return text.replace('*', '').trim();
}

type Ctl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function controls(form: HTMLFormElement) {
  return Array.from(form.querySelectorAll<Ctl>('input, select, textarea'));
}

/** Marks invalid required fields and focuses the first one. Returns true when valid. */
export function validate(form: HTMLFormElement) {
  let ok = true;
  form.querySelectorAll<Ctl>('[required]').forEach((el) => {
    const wrap = fieldOf(el);
    let valid = el.type === 'checkbox' ? (el as HTMLInputElement).checked : el.value.trim() !== '';
    if (valid && el.type === 'email') {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim());
    }
    if (wrap) wrap.classList.toggle('invalid', !valid);
    if (!valid && ok) { ok = false; el.focus(); }
  });
  return ok;
}

function payloadOf(form: HTMLFormElement) {
  const data: Record<string, string> = {};
  controls(form).forEach((el) => {
    if (!el.name) return;
    if (el.type === 'checkbox') {
      if (el.name === 'consent') data['Consent to contact'] = (el as HTMLInputElement).checked ? 'Yes' : 'No';
      return;
    }
    let val = el.value.trim();
    if (!val) return;
    if (el.tagName === 'SELECT') {
      const sel = el as HTMLSelectElement;
      val = sel.options[sel.selectedIndex].text;
    }
    data[labelFor(el)] = val;
    if (el.type === 'email') data.email = val;
  });
  return data;
}

function plainText(form: HTMLFormElement) {
  const lines: string[] = [];
  controls(form).forEach((el) => {
    if (el.type === 'checkbox') {
      if (el.name === 'consent') lines.push(`Consent to contact: ${(el as HTMLInputElement).checked ? 'Yes' : 'No'}`);
      return;
    }
    let val = el.value.trim();
    if (!val) return;
    if (el.tagName === 'SELECT') {
      const sel = el as HTMLSelectElement;
      val = sel.options[sel.selectedIndex].text;
    }
    lines.push(`${labelFor(el)}: ${val}`);
  });
  return lines.join('\n');
}

export function mailtoFallback(form: HTMLFormElement, subject: string) {
  const href =
    `mailto:${FORM_EMAIL}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(`${plainText(form)}\n\n— Sent from the Jardine Technologies website`)}`;
  window.location.href = href;
}

/**
 * Posts the form to FormSubmit as JSON. Falls back to the visitor's mail client
 * when the service cannot be reached within 12 seconds.
 */
export async function sendForm(form: HTMLFormElement, subject: string, autoresponse: string): Promise<SendMode> {
  const body: Record<string, string> = payloadOf(form);
  body._subject = subject;
  body._template = 'table';
  body._captcha = 'false';
  body._autoresponse = autoresponse;
  body['Submitted from'] = window.location.href;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error('bad status');
    const json = await res.json().catch(() => ({ success: 'true' }));
    const ok = json && (json.success === true || json.success === 'true');
    return ok ? 'sent' : 'fallback';
  } catch {
    return 'fallback';
  } finally {
    clearTimeout(timer);
  }
}
