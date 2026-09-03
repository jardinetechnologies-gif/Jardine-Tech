'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Adds the `.in` class to every `.reveal` element as it scrolls into view,
 * and starts/pauses the brand marquee when it is on screen.
 * Re-runs on every route change so client navigation behaves like a fresh load.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));

    const marquee = document.querySelector<HTMLElement>('.marquee');
    let mo: IntersectionObserver | undefined;
    if (marquee) {
      mo = new IntersectionObserver(
        (entries) => entries.forEach((en) => marquee.classList.toggle('is-running', en.isIntersecting)),
        { threshold: 0 },
      );
      mo.observe(marquee);
    }

    return () => {
      io.disconnect();
      mo?.disconnect();
    };
  }, [pathname]);

  return null;
}
