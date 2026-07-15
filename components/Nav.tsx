"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import { assetPath, plainHref } from "@/brand/paths";
import RollText from "./RollText";

export default function Nav() {
  const content = useContent();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8">
        {/* Wordmark original en alta resolución, conservado en todos los breakpoints. */}
        <Link href="/" aria-label="Landing Group — inicio" className="flex items-center">
          <Image
            src={assetPath("/brand/logo-black.png")}
            alt="Landing Group"
            width={1123}
            height={275}
            priority
            unoptimized
            className="h-7 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {content.nav.links.map((link, i) => (
            <a
              key={link.href}
              href={plainHref(link.href)}
              data-choreo
              style={{ ["--beat" as string]: `${1150 + i * 60}ms` }}
              className="group text-[14px] tracking-[0.03em] text-ink/60 transition-colors [font-weight:450] hover:text-ink"
            >
              <RollText text={link.label} />
            </a>
          ))}
        </div>

        <Link
          href={content.nav.cta.href}
          className="btn-fill group rounded-button border border-accent px-5 py-2.5 text-[12px] uppercase tracking-[0.16em] text-accent [font-weight:600] transition-colors [--fill:var(--brand-accent)] hover:text-accent-ink"
        >
          <RollText text={content.nav.cta.label} />
        </Link>
      </nav>
    </header>
  );
}
