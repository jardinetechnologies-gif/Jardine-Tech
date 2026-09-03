import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: ReactNode;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

/**
 * Drop-in stand-in for `next/link` used only for the sub-path preview build
 * (`PREVIEW_RELATIVE=1 next build`). It renders a plain anchor so every
 * navigation is a normal document request, which keeps the export working when
 * it is hosted under a nested URL prefix. The production build keeps the real
 * `next/link` with client-side routing.
 */
export default function PlainLink({ href, children, prefetch, replace, scroll, ...rest }: Props) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
