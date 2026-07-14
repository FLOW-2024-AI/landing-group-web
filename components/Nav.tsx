import Image from "next/image";
import Link from "next/link";
import { content } from "@/brand/content";
import { assetPath, plainHref } from "@/brand/paths";
import RollText from "./RollText";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8">
        {/* Monograma en móvil; wordmark vectorial completo desde sm. */}
        <Link href="/" aria-label="Landing Group — inicio" className="flex items-center">
          <Image
            src={assetPath("/brand/la-mark-green.svg")}
            alt=""
            width={47}
            height={32}
            priority
            unoptimized
            className="h-7 w-auto sm:hidden"
          />
          <Image
            src={assetPath("/brand/logo-ink.svg")}
            alt="Landing Group"
            width={180}
            height={42}
            priority
            unoptimized
            className="hidden h-7 w-auto sm:block"
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
