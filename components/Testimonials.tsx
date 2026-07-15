"use client";

import Image from "next/image";
import { useContent } from "@/components/ContentProvider";
import { assetPath } from "@/brand/paths";
import Reveal from "./Reveal";
import PlateReveal from "./PlateReveal";

/* Segunda parte del portfolio real. Conservamos el nombre del componente
   para no romper la composición de la home, pero eliminamos testimonios y
   métricas no verificadas: aquí solo se muestran piezas del catálogo. */
const GRID = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
] as const;

export default function Testimonials() {
  const content = useContent();
  const works = content.works.items.slice(5);

  return (
    <section id="casos" className="relative overflow-hidden py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-55"
        style={{ backgroundImage: `url("${assetPath("/brand/texture-paper.webp")}")` }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">
            {content.works.label}
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h2 className="display max-w-3xl text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[0.95]">
              {content.works.title}
            </h2>
            <p className="max-w-md text-[15px] leading-[1.6] text-ink/65 lg:justify-self-end">
              {content.works.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
          {works.map((work, i) => (
            <Reveal key={work.src} className={GRID[i]} delay={(i % 3) * 80}>
              <figure className="group h-full overflow-hidden rounded-card bg-white shadow-lift">
                <PlateReveal beat={(i % 3) * 90} className="relative aspect-[4/3] bg-white">
                  <Image
                    src={work.src}
                    alt={`${work.piece} producido para ${work.brand}`}
                    fill
                    sizes="(max-width: 768px) 92vw, (max-width: 1200px) 55vw, 700px"
                    className="plate-img object-contain p-5 transition-transform duration-700 group-hover:scale-[1.035] sm:p-7"
                  />
                </PlateReveal>
                <figcaption className="border-t border-line px-5 py-5 sm:px-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-[clamp(1.35rem,2.2vw,1.8rem)] leading-none text-ink">
                      {work.brand}
                    </h3>
                    <span className="text-right text-[11px] uppercase tracking-[0.14em] text-accent [font-weight:600]">
                      {work.piece}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl text-[13px] leading-[1.5] text-ink/60">
                    {work.desc}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
