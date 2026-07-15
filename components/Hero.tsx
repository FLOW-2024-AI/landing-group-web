"use client";

import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import { plainHref } from "@/brand/paths";
import HeroHeadline from "./HeroHeadline";
import Magnetic from "./Magnetic";
import HeroTiles from "./HeroTiles";
import RollText from "./RollText";
import MarkerStroke from "./MarkerStroke";
import BrandStar from "./BrandStar";

/* Hero fijado ("el pliego cede"). Composición compacta: firma pegada al
   titular, descripción y CTAs cerca, tiles grandes a la derecha. */
export default function Hero() {
  const content = useContent();
  return (
    <section id="hero" className="pliego-hero">
      <div className="pliego-scale flex h-full flex-col justify-center">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-x-10 gap-y-8 px-5 pb-14 pt-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-0 lg:pt-10">
          <div className="relative lg:col-span-2">
            <BrandStar className="star-pop absolute top-4 right-[11%] hidden w-10 sm:block [--beat:1700ms]" />
            <h1 className="display text-[clamp(3.2rem,9vw,7.6rem)] leading-[0.9]">
              <HeroHeadline />
            </h1>
            <p className="script-wipe mt-3 font-script text-[clamp(1.5rem,2.6vw,2.1rem)] leading-none text-accent [--beat:700ms]">
              {content.hero.script}
            </p>
            <MarkerStroke
              shape="underline"
              className="choreo-draw mt-1 h-[10px] w-[min(320px,60vw)] text-sage"
              beat={1350}
            />
          </div>

          <div>
            <p
              data-choreo
              className="max-w-md text-[clamp(1.02rem,1.5vw,1.25rem)] leading-[1.5] text-ink/70 [--beat:850ms]"
            >
              {content.hero.sub}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-6">
              <span data-choreo className="[--beat:950ms]">
                <Magnetic>
                  <a
                    href={plainHref(content.hero.ctaPrimary.href)}
                    className="btn-fill group inline-block rounded-button bg-accent px-7 py-4 text-[12px] uppercase tracking-[0.16em] text-accent-ink [--fill:var(--brand-ink)] [font-weight:600]"
                  >
                    <RollText text={content.hero.ctaPrimary.label} />
                  </a>
                </Magnetic>
              </span>
              <span data-choreo className="[--beat:1030ms]">
                <Link
                  href={content.hero.ctaSecondary.href}
                  className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-accent [font-weight:600]"
                >
                  <RollText text={content.hero.ctaSecondary.label} />
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </span>
            </div>
          </div>

          <HeroTiles />
        </div>
      </div>

      {/* Velo de tinta: el hero queda en sombra bajo el pliego que lo cubre */}
      <div className="pliego-veil" aria-hidden />
    </section>
  );
}
