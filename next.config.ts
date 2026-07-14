import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // The black "N" is a development-only Next.js indicator, not part of
  // Landing Group's interface. Keep local previews visually clean.
  devIndicators: false,
  // GitHub Pages serves project sites from /<repository>. Static export plus
  // a configurable base path keeps the same code working locally and there.
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Keep development and production artifacts separate. Running `next build`
  // while the local preview is open can otherwise overwrite chunks used by
  // the development server and leave it looking for files that no longer exist.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
