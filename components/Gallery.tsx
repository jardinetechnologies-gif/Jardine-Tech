'use client';

import { useState } from 'react';
import { VIEW_LABELS } from '@/lib/content';

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [swapping, setSwapping] = useState(false);

  const select = (i: number) => {
    if (i === active) return;
    setSwapping(true);
    const pre = new Image();
    pre.onload = () => { setActive(i); setSwapping(false); };
    pre.onerror = () => setSwapping(false);
    pre.src = images[i];
  };

  return (
    <div className="gallery reveal" id="gallery">
      <figure className="gallery-main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="galleryMain"
          className={swapping ? 'swapping' : undefined}
          src={images[active]}
          alt={`${title} — ${(VIEW_LABELS[active] || 'view').toLowerCase()}`}
          width={1200}
          height={900}
          fetchPriority="high"
          decoding="async"
        />
      </figure>

      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((src, i) => (
            <button
              type="button"
              key={src}
              className={`gallery-thumb${i === active ? ' is-active' : ''}`}
              aria-label={`Show ${(VIEW_LABELS[i] || 'view').toLowerCase()}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => select(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" decoding="async" width={300} height={225} />
            </button>
          ))}
        </div>
      )}

      <p className="gallery-note">
        {images.length > 1 ? 'Images are' : 'Image is'} representative. Exact model, finish and
        configuration confirmed at quotation.
      </p>
    </div>
  );
}
