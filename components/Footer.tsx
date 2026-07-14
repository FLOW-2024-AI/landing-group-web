import Image from "next/image";
import { content } from "@/brand/content";
import { assetPath, plainHref } from "@/brand/paths";

/* Módulo institucional final: siempre aparece inmediatamente después del
   CTA con la marca, accesos, redes y datos legales. */
export default function Footer() {
  return (
    <footer id="site-footer" className="telon-footer bg-accent pb-10 pt-24 text-paper">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Image
              src={assetPath("/brand/logo-white-lg.png")}
              alt="Landing Group"
              width={2118}
              height={508}
              unoptimized
              className="h-9 w-auto"
            />
            <p className="display mt-8 max-w-md text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[0.95]">
              De la idea a la experiencia.
            </p>
            <p className="mt-3 font-script text-[1.5rem] leading-none text-sand">
              {content.brand.tagline}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {content.footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-paper/50 [font-weight:600]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={plainHref(link.href)}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="text-[14px] tracking-[0.03em] text-paper/80 transition-colors hover:text-sand"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Wordmark oficial gigante para cerrar la página con la marca. */}
        <Image
          src={assetPath("/brand/logo-white-lg.png")}
          alt=""
          aria-hidden
          width={2118}
          height={508}
          unoptimized
          className="mx-auto mt-20 w-full max-w-[900px] select-none opacity-[0.14]"
        />

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-paper/20 pt-6 text-[12px] tracking-[0.03em] text-paper/60 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {content.brand.legal}
          </span>
          <span>{content.footer.note}</span>
        </div>
      </div>
    </footer>
  );
}
