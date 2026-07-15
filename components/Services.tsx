"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

/* Superficies en la paleta oficial + cabecera fotográfica. Cada tarjeta
   navega a su página de detalle (/servicios/[slug]). La información va
   alineada pareja: número, título y cuerpo arrancan a la misma altura. */
const SURFACE = [
  { bg: "color-mix(in srgb, var(--brand-accent) 8%, var(--brand-white))", accent: "var(--brand-accent)" },
  { bg: "var(--brand-sand)", accent: "var(--brand-ink)" },
  { bg: "color-mix(in srgb, var(--brand-sage) 14%, var(--brand-white))", accent: "var(--brand-sage)" },
  { bg: "var(--brand-white)", accent: "var(--brand-accent)" },
  { bg: "color-mix(in srgb, var(--brand-sand) 45%, var(--brand-white))", accent: "var(--brand-ink)" },
  { bg: "color-mix(in srgb, var(--brand-accent) 14%, var(--brand-white))", accent: "var(--brand-accent)" },
] as const;

export default function Services() {
  const content = useContent();
  const { label, title, items } = content.services;
  return (
    <section id="servicios" className="mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">{label}</p>
        <h2 className="display mt-4 max-w-2xl text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[0.95]">
          {title}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal
            key={item.n}
            className={`reveal-clip ${["reveal-left", "", "reveal-right"][i % 3]}`}
            delay={(i % 3) * 110}
          >
            <Link href={`/servicios/${item.slug}`} className="block h-full">
              <TiltCard className="group h-full">
                <article
                  className="relative flex h-full flex-col overflow-hidden rounded-card"
                  style={{ background: SURFACE[i].bg }}
                >
                  <span className="glare" aria-hidden />
                  <div className="relative h-40 shrink-0 overflow-hidden">
                    <Image
                      src={item.photo}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  {/* bloque de información alineado: mismas alturas en las 6 */}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[12px] tracking-[0.2em] [font-weight:600]" style={{ color: SURFACE[i].accent }}>
                        {item.n}
                      </span>
                      <span
                        aria-hidden
                        className="translate-x-1 text-lg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        style={{ color: SURFACE[i].accent }}
                      >
                        →
                      </span>
                    </div>
                    <h3 className="display mt-4 min-h-[2em] text-[clamp(1.6rem,2.4vw,2rem)] leading-[0.95]">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.5] tracking-[0.01em] text-ink/70">
                      {item.body}
                    </p>
                  </div>
                </article>
              </TiltCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
