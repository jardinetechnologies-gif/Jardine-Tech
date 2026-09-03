/*
 * Preview-only progressive-enhancement layer.
 *
 * The static export is hosted under a deep sub-path in the in-thread preview,
 * so the Next.js App Router cannot match the pathname to a generated route and
 * hydration never starts. This script re-implements the interactive behaviour
 * of the client components in plain JS against the same server-rendered markup,
 * so the preview behaves exactly like the hydrated app.
 *
 * It is injected only by scripts/relativize.py (preview builds). Production
 * builds hosted at a domain root hydrate normally and never load this file.
 */
(function () {
  'use strict';

  var EMAIL = 'Jardinetechnologies@gmail.com';
  var ENDPOINT = 'https://formsubmit.co/ajax/' + EMAIL;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- scroll reveal + marquee ---------- */
  function reveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });

    var m = $('.marquee');
    if (m) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { m.classList.toggle('is-running', en.isIntersecting); });
      }, { threshold: 0 }).observe(m);
    }
  }

  /* ---------- mobile drawer ---------- */
  function drawer() {
    var nav = $('#nav');
    var burger = $('.burger');
    var close = $('.nav-close');
    if (!nav || !burger) return;
    function set(open) {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', function () { set(true); });
    if (close) close.addEventListener('click', function () { set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
  }

  /* ---------- product gallery ---------- */
  function gallery() {
    var main = $('#galleryMain');
    var thumbs = $$('.gallery-thumb');
    if (!main || thumbs.length < 2) return;
    thumbs.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        var img = $('img', btn);
        if (!img || btn.classList.contains('is-active')) return;
        main.classList.add('swapping');
        var pre = new Image();
        pre.onload = pre.onerror = function () {
          main.src = img.src;
          main.classList.remove('swapping');
        };
        pre.src = img.src;
        thumbs.forEach(function (b) { b.classList.remove('is-active'); b.removeAttribute('aria-current'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-current', 'true');
        void i;
      });
    });
  }

  /* ---------- catalogue filtering ---------- */
  function catalogue() {
    var grid = $('#productGrid');
    var chips = $$('.filters .chip');
    if (!grid || !chips.length) return;

    var tiles = $$('.tile', grid);
    var count = $('#countNum');
    var empty = $('#emptyState');
    var cats = $$('.grid.g-4 .card').map(function (a) {
      return (a.getAttribute('href') || '').replace('#', '');
    });

    function apply(key, scroll) {
      var shown = 0;
      tiles.forEach(function (t) {
        var hit = key === 'all' || t.getAttribute('data-cat') === key;
        t.style.display = hit ? '' : 'none';
        if (hit) shown++;
      });
      chips.forEach(function (c, i) {
        var k = i === 0 ? 'all' : cats[i - 1];
        c.setAttribute('aria-pressed', k === key ? 'true' : 'false');
      });
      if (count) count.textContent = String(shown);
      if (empty) { if (shown === 0) empty.removeAttribute('hidden'); else empty.setAttribute('hidden', ''); }
      try {
        history.replaceState(null, '', key === 'all' ? window.location.pathname : '#' + key);
      } catch (e) { /* opaque origin */ }
      if (scroll) {
        var anchor = $('#products');
        if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    chips.forEach(function (c, i) {
      c.addEventListener('click', function () { apply(i === 0 ? 'all' : cats[i - 1], false); });
    });
    $$('.grid.g-4 .card').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var slug = (a.getAttribute('href') || '').replace('#', '');
        if (!slug) return;
        e.preventDefault();
        apply(slug, true);
      });
    });

    var hash = (window.location.hash || '').replace('#', '');
    if (hash && cats.indexOf(hash) > -1) apply(hash, true);
  }

  /* ---------- forms ---------- */
  function fieldOf(el) { return el.closest ? el.closest('.field') : null; }

  function labelFor(el) {
    var wrap = fieldOf(el);
    var lab = wrap ? $('label', wrap) : null;
    return ((lab ? lab.textContent : el.name) || '').replace('*', '').trim();
  }

  function controls(form) { return $$('input, select, textarea', form); }

  function validate(form) {
    var ok = true;
    $$('[required]', form).forEach(function (el) {
      var wrap = fieldOf(el);
      var valid = el.type === 'checkbox' ? el.checked : String(el.value).trim() !== '';
      if (valid && el.type === 'email') {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim());
      }
      if (wrap) wrap.classList.toggle('invalid', !valid);
      if (!valid && ok) { ok = false; el.focus(); }
    });
    return ok;
  }

  function collect(form, asText) {
    var data = {};
    var lines = [];
    controls(form).forEach(function (el) {
      if (!el.name) return;
      if (el.type === 'checkbox') {
        if (el.name === 'consent') {
          var v = el.checked ? 'Yes' : 'No';
          data['Consent to contact'] = v;
          lines.push('Consent to contact: ' + v);
        }
        return;
      }
      var val = String(el.value).trim();
      if (!val) return;
      if (el.tagName === 'SELECT') val = el.options[el.selectedIndex].text;
      data[labelFor(el)] = val;
      lines.push(labelFor(el) + ': ' + val);
    });
    return asText ? lines.join('\n') : data;
  }

  function mailto(form, subject) {
    window.location.href =
      'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(collect(form, true) + '\n\n— Sent from the Jardine Technologies website');
  }

  function wireForm(formId, statusId, subjectOf) {
    var form = $('#' + formId);
    var status = $('#' + statusId);
    if (!form) return;

    form.addEventListener('input', function (e) {
      var wrap = fieldOf(e.target);
      if (wrap) wrap.classList.remove('invalid');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;

      var btn = $('button[type="submit"]', form);
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      var body = collect(form, false);
      var subject = subjectOf(form);
      body._subject = subject;
      body._template = 'table';
      body._captcha = 'false';
      body['Submitted from'] = window.location.href;

      var done = false;
      var timer = setTimeout(function () { if (!done) finish('fallback'); }, 12000);

      function finish(mode) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        if (btn) { btn.disabled = false; btn.textContent = label; }
        if (status) {
          status.className = 'form-status show is-' + mode;
          status.removeAttribute('hidden');
          setTimeout(function () { status.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 40);
        }
        if (mode === 'sent') form.reset();
        else mailto(form, subject);
      }

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body)
      })
        .then(function (r) { return r.ok ? r.json().catch(function () { return { success: 'true' }; }) : null; })
        .then(function (j) {
          finish(j && (j.success === true || j.success === 'true') ? 'sent' : 'fallback');
        })
        .catch(function () { finish('fallback'); });
    });
  }

  /* Prefill the quote form from ?item= / ?service=, matching QuoteForm's effect. */
  function prefill() {
    var form = $('#quoteForm');
    if (!form) return;
    var qs = new URLSearchParams(window.location.search);
    var chosen = [];
    [['item', 'q-item'], ['service', 'q-service']].forEach(function (pair) {
      var slug = qs.get(pair[0]);
      var sel = $('#' + pair[1]);
      if (!slug || !sel) return;
      var opt = Array.prototype.filter.call(sel.options, function (o) { return o.value === slug; })[0];
      if (!opt) return;
      sel.value = slug;
      chosen.push(opt.text);
    });
    var details = $('#q-details');
    if (chosen.length && details && !details.value.trim()) {
      details.value = 'I would like a quotation for: ' + chosen.join(' / ') +
        '.\n\nQuantity: \nPreferred configuration: \nDelivery destination: \n';
    }
  }

  function forms() {
    wireForm('quoteForm', 'quoteStatus', function (form) {
      var org = form.elements.namedItem ? form.elements.namedItem('company') : null;
      var name = org && org.value ? org.value.trim() : '';
      return 'Quote request — ' + (name || 'Website');
    });
    wireForm('contactForm', 'contactStatus', function (form) {
      var s = form.elements.namedItem ? form.elements.namedItem('subject') : null;
      var v = '';
      if (s) v = s.tagName === 'SELECT' && s.selectedIndex > -1 ? s.options[s.selectedIndex].text : s.value;
      return 'Website enquiry — ' + ((v || '').trim() || 'General');
    });
  }

  /* ---------- in-page anchor smoothing ---------- */
  function anchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var t = document.getElementById(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function boot() {
    // If React hydration succeeded, the client components already own these
    // behaviours and re-binding would double up handlers.
    if (document.querySelector('.reveal.in') || window.next) return;
    reveal();
    drawer();
    gallery();
    catalogue();
    prefill();
    forms();
    anchors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 400); });
  } else {
    setTimeout(boot, 400);
  }
})();
