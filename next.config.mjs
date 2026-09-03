/** @type {import('next').NextConfig} */

// Set PREVIEW_RELATIVE=1 only when the export will be hosted under a nested URL
// prefix (as in the in-thread preview). It swaps `next/link` for a plain anchor
// so navigation works without client-side routing; `scripts/relativize.py` then
// rewrites root-absolute asset URLs. A normal `next build` is untouched.
const preview = process.env.PREVIEW_RELATIVE === '1';

const nextConfig = {
  // Static export — produces a plain HTML/CSS/JS bundle in ./out that can be
  // hosted anywhere (Vercel, Netlify, S3, cPanel). Remove `output` if you later
  // want server-rendered routes or API routes.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  ...(preview
    ? { turbopack: { resolveAlias: { 'next/link': './components/PlainLink.tsx' } } }
    : {}),
};

export default nextConfig;
