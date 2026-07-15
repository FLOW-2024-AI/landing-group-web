"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTina } from "tinacms/dist/react";
import { content as staticContent, withAssetPaths, type Content } from "@/brand/content";

/* Proveedor de contenido con edición visual:
   - Sin datos de Tina (build sin credenciales, o fallo del API): sirve el
     contenido estático de content/site.json — el sitio queda idéntico.
   - Con datos de Tina: useTina conecta la página al editor visual; dentro
     del admin, cada tecla del cliente re-renderiza la página EN VIVO.
   Los componentes leen SIEMPRE vía useContent(). */

export type TinaSiteProps = {
  query: string;
  variables: object;
  data: object;
} | null;

const Ctx = createContext<Content>(staticContent);

export function useContent(): Content {
  return useContext(Ctx);
}

export default function ContentProvider({
  tina,
  children,
}: {
  tina: TinaSiteProps;
  children: ReactNode;
}) {
  if (!tina) return <Ctx.Provider value={staticContent}>{children}</Ctx.Provider>;
  return <LiveContent tina={tina}>{children}</LiveContent>;
}

/* Los hooks no pueden ser condicionales: el ramal vivo va en su propio
   componente para que useTina solo exista cuando hay datos de Tina. */
function LiveContent({
  tina,
  children,
}: {
  tina: NonNullable<TinaSiteProps>;
  children: ReactNode;
}) {
  const { data } = useTina(tina as never) as { data: { site?: unknown } };
  const value = data?.site
    ? (withAssetPaths(data.site) as unknown as Content)
    : staticContent;
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
