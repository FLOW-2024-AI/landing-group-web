import type { Metadata } from "next";
import { Barlow_Condensed, Inter, Caveat } from "next/font/google";
import { content } from "@/brand/content";
import Cursor from "@/components/Cursor";
import PageDirector from "@/components/PageDirector";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://grupolanding.com";

/* Tipografía oficial LANDING GROUP (brand book pág. 18):
   Barlow Condensed SemiBold para titulares, Inter para texto,
   y una manuscrita para el "acento manual". */
const display = Barlow_Condensed({
  variable: "--font-display-face",
  weight: ["500", "600"],
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body-face",
  subsets: ["latin"],
});

const script = Caveat({
  variable: "--font-script-face",
  weight: ["500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${content.brand.name} ${content.brand.group} — ${content.brand.tagline}`,
  description: content.hero.sub,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "merchandising corporativo",
    "merch Perú",
    "eventos BTL",
    "uniformes corporativos",
    "regalos corporativos",
    "Landing Group",
  ],
  openGraph: {
    title: "LANDING GROUP — De la idea a la experiencia.",
    description: content.hero.sub,
    url: "/",
    siteName: "LANDING GROUP",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1729,
        height: 910,
        alt: "LANDING GROUP — De la idea a la experiencia.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LANDING GROUP — De la idea a la experiencia.",
    description: content.hero.sub,
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${script.variable} antialiased`}
    >
      <body>
        {/* Marca .js antes del primer paint: sin JS nada queda oculto */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        {children}
        <Cursor />
        <PageDirector />
      </body>
    </html>
  );
}
