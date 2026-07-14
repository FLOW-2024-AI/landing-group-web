import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/brand/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SplitWords from "@/components/SplitWords";
import MarkerStroke from "@/components/MarkerStroke";
import Magnetic from "@/components/Magnetic";
import RollText from "@/components/RollText";
import PlateReveal from "@/components/PlateReveal";
import BrandStar from "@/components/BrandStar";

/* Página de profundidad por servicio: hero fotográfico, qué incluye,
   piezas reales relacionadas y cierre hacia la agenda. */
export function generateStaticParams() {
  return content.services.items.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = content.services.items.find((s) => s.slug === slug);
  return { title: svc ? `${svc.name} — LANDING GROUP` : "Servicio — LANDING GROUP" };
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = content.services.items.find((s) => s.slug === slug);
  if (!svc) notFound();
  const others = content.services.items.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main className="telon-main">
        {/* Hero fotográfico del servicio */}
        <section className="mx-auto w-full max-w-[1200px] px-5 pb-16 pt-24 sm:px-8">
          <Reveal>
            <Link
              href="/#servicios"
              className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-accent [font-weight:600]"
            >
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              Todos los servicios
            </Link>
          </Reveal>
          <div className="relative mt-6 h-[46svh] min-h-[340px] overflow-hidden rounded-card">
            <Image
              src={svc.photo}
              alt=""
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1140px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 p-8 text-paper sm:p-12">
              <p className="text-[12px] uppercase tracking-[0.2em] text-sand [font-weight:600]">
                {content.services.label} · {svc.n}
              </p>
              <h1 className="display mt-3 max-w-3xl text-[clamp(2.8rem,7vw,5.6rem)] leading-[0.92]">
                <SplitWords text={svc.name} step={70} />
              </h1>
            </div>
          </div>
        </section>

        {/* Claim + intro */}
        <section className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <h2 className="display max-w-md text-[clamp(2rem,4vw,3.2rem)] leading-[0.95]">
                {svc.detail.claim}
              </h2>
              <MarkerStroke shape="underline" auto beat={350} className="mt-3 h-[10px] w-[min(260px,50vw)] text-sage" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.6] text-ink/75">
              {svc.detail.intro}
            </p>
          </Reveal>
        </section>

        {/* Qué incluye */}
        <section className="mx-auto w-full max-w-[1200px] px-5 pb-20 sm:px-8">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">
              Qué incluye
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {svc.detail.bullets.map((b, i) => (
              <Reveal key={i} className={i % 2 === 0 ? "reveal-left" : "reveal-right"} delay={(i % 2) * 90}>
                <li className="flex h-full items-start gap-4 rounded-card bg-white p-6 shadow-lift">
                  <BrandStar auto className="mt-0.5 w-5 shrink-0" />
                  <p className="text-[15px] leading-[1.55] text-ink/80">{b}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Piezas reales relacionadas */}
        <section className="mx-auto w-full max-w-[1200px] px-5 pb-20 sm:px-8">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">
              Piezas reales
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {svc.detail.gallery.map((g, i) => (
              <PlateReveal key={g.src} beat={i * 120} className="relative aspect-[4/3] rounded-card bg-white shadow-lift">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 560px"
                  className="plate-img object-contain p-8"
                />
                <span className="absolute inset-x-0 bottom-0 z-[1] px-6 pb-4 text-[12px] tracking-[0.03em] text-ink/60 [font-weight:450]">
                  {g.alt}
                </span>
              </PlateReveal>
            ))}
          </div>
        </section>

        {/* Otros servicios + CTA */}
        <section className="mx-auto w-full max-w-[1200px] px-5 pb-24 sm:px-8">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.2em] text-ink/45 [font-weight:600]">
              También hacemos
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/servicios/${o.slug}`}
                  className="rounded-button border border-line bg-white px-4 py-2.5 text-[12px] uppercase tracking-[0.14em] text-ink/70 transition-colors [font-weight:600] hover:border-accent hover:text-accent"
                >
                  {o.name}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal className="reveal-scale">
            <div className="mt-14 rounded-card bg-accent px-8 py-14 text-center text-accent-ink sm:px-14">
              <h2 className="display mx-auto max-w-2xl text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.95]">
                ¿Lo aterrizamos para tu marca?
              </h2>
              <div className="mt-8">
                <Magnetic strength={0.4}>
                  <Link
                    href="/agenda"
                    className="btn-fill group inline-block rounded-button bg-paper px-8 py-4 text-[12px] uppercase tracking-[0.16em] text-accent [--fill:var(--brand-ink)] [font-weight:600] hover:text-paper"
                  >
                    <RollText text="Agenda una reunión" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
