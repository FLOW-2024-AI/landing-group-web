import Image from "next/image";
import Link from "next/link";
import { content } from "@/brand/content";
import { assetPath } from "@/brand/paths";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import SplitWords from "./SplitWords";
import RollText from "./RollText";
import MarkerStroke from "./MarkerStroke";

/* Cierre en Deep Ink con subrayado sand — espejo de la última página
   del brand book. El fondo es el asset 25 del banco bajo velo de tinta. */
export default function CtaFinal() {
  return (
    <section id="contacto" className="mx-auto w-full max-w-[1200px] px-5 pb-28 pt-8 sm:px-8">
      <Reveal className="reveal-scale">
        <div className="relative overflow-hidden rounded-card bg-ink px-8 py-20 text-center text-paper sm:px-16 sm:py-28">
          <Image
            src={assetPath("/brand/cta-bg.webp")}
            alt=""
            fill
            sizes="1200px"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-ink/60" aria-hidden />
          <div className="relative z-[1]">
            <h2 className="display mx-auto max-w-4xl text-[clamp(3rem,7.5vw,6.8rem)] leading-[0.92]">
              <SplitWords text={content.cta.title} step={70} />
            </h2>
            <MarkerStroke
              shape="underline"
              auto
              beat={500}
              className="mx-auto mt-4 h-[12px] w-[min(420px,70vw)] text-sand"
            />
            <p className="mx-auto mt-8 max-w-md text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.5] text-paper/80">
              {content.cta.body}
            </p>
            <div className="mt-11">
              <Magnetic strength={0.45}>
                <Link
                  href={content.cta.button.href}
                  className="btn-fill group inline-block rounded-button bg-accent px-8 py-4 text-[12px] uppercase tracking-[0.16em] text-accent-ink [--fill:var(--brand-sage)] [font-weight:600]"
                >
                  <RollText text={content.cta.button.label} />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
