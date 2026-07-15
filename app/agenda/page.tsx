import type { Metadata } from "next";
import { content } from "@/brand/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Scheduler from "@/components/Scheduler";
import AgendaHeader from "@/components/AgendaHeader";
import ContentProvider from "@/components/ContentProvider";
import { getSiteTina } from "@/brand/tina";

export const metadata: Metadata = {
  title: "Agenda una reunión — LANDING GROUP",
  description: content.agenda.intro,
};

export default async function AgendaPage() {
  const tina = await getSiteTina();
  return (
    <ContentProvider tina={tina}>
      <Nav />
      <main className="telon-main">
        <section className="mx-auto w-full max-w-[1200px] px-5 pb-24 pt-32 sm:px-8">
          <AgendaHeader />
          <div className="mt-12">
            <Scheduler />
          </div>
        </section>
      </main>
      <Footer />
    </ContentProvider>
  );
}
