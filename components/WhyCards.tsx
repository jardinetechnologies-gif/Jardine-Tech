'use client';

import { useState } from 'react';
import type { Titled } from '@/lib/content';

export default function WhyCards({ items }: { items: Titled[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="why-cards">
      {items.map((item, index) => (
        <button
          className={`why-card${activeIndex === index ? ' is-active' : ''}`}
          key={item.title}
          type="button"
          aria-pressed={activeIndex === index}
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
        >
          <span className="card-num">{String(index + 1).padStart(2, '0')}</span>
          <span className="why-card-title">{item.title}</span>
          <span className="why-card-description">{item.text}</span>
          <span className="why-card-arrow" aria-hidden="true">&#8594;</span>
        </button>
      ))}
    </div>
  );
}
