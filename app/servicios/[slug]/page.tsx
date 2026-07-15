import { notFound } from "next/navigation";
import { content } from "@/brand/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import ContentProvider from "@/components/ContentProvider";
import { getSiteTina } from "@/brand/tina";

/* Página de profundidad por servicio: el slug y la metadata se resuelven
   en build con el contenido estático; el cuerpo lee el contenido en vivo
   (edición visual del CMS) vía ContentProvider. */
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
  if (!content.services.items.some((s) => s.slug === slug)) notFound();
  const tina = await getSiteTina();

  return (
    <ContentProvider tina={tina}>
      <Nav />
      <ServiceDetail slug={slug} />
      <Footer />
    </ContentProvider>
  );
}
