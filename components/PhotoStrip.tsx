import Image from "next/image";
import { content } from "@/brand/content";
import PlateReveal from "./PlateReveal";

/* Trabajos reales del catálogo: tarjetas blancas con el producto grande
   (recorte al objeto). Al hover: zoom del producto + panel con la pieza
   y la calidad con la que se produjo. */
export default function PhotoStrip() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 pb-24 pt-4 sm:px-8">
      <p className="mb-6 text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">
        Selección destacada
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {content.works.items.slice(0, 5).map((work, i) => (
          <figure
            key={work.src}
            className="group transition-transform duration-500 hover:-translate-y-1.5"
          >
            <PlateReveal
              beat={i * 100}
              className="relative aspect-[9/10] rounded-card bg-white shadow-lift"
            >
              {/* wrapper propio para el zoom de hover (no pelea con la placa) */}
              <div className="absolute inset-0 bottom-12 transition-transform duration-700 ease-out group-hover:scale-[1.16]">
                <Image
                  src={work.src}
                  alt={`${work.piece} producido para ${work.brand}`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                  className="plate-img object-contain p-5"
                />
              </div>

              {/* rótulo permanente */}
              <figcaption className="absolute inset-x-0 bottom-0 z-[1] px-4 pb-3.5 transition-opacity duration-300 group-hover:opacity-0">
                <span className="display block text-[15px] leading-none text-ink">
                  {work.brand}
                </span>
                <span className="mt-0.5 block text-[11px] tracking-[0.03em] text-ink/55 [font-weight:450]">
                  {work.piece}
                </span>
              </figcaption>

              {/* panel de detalle al hover: objeto + calidad */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 z-[2] translate-y-full bg-ink/[0.92] p-4 text-paper transition-transform duration-500 ease-out group-hover:translate-y-0"
              >
                <span className="display block text-[15px] leading-none">
                  {work.brand} · {work.piece}
                </span>
                <p className="mt-2 text-[11.5px] leading-[1.45] tracking-[0.01em] text-paper/80">
                  {work.desc}
                </p>
              </div>
            </PlateReveal>
          </figure>
        ))}
      </div>
    </section>
  );
}
