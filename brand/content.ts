/*
  CONTENIDO — LANDING GROUP
  La fuente de verdad editable vive en content/site.json (la edita el
  cliente vía CMS, ver README). Este módulo solo la carga y aplica
  assetPath a toda ruta de imagen ("/brand/...") para que el sitio
  funcione igual en local y bajo el basePath de GitHub Pages.

  Voz del copy (brand book): clara, segura, específica y sobria.
  "Decimos: producción bajo control, personalización con propósito,
   entregas que representan tu marca. Evitamos: superlativos y clichés."
*/

import site from "../content/site.json";
import { assetPath } from "./paths";

/* Recorre el JSON y envuelve con assetPath cualquier string de imagen */
function withAssetPaths<T>(value: T): T {
  if (typeof value === "string") {
    return (value.startsWith("/brand/") ? assetPath(value) : value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => withAssetPaths(item)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, inner] of Object.entries(value as Record<string, unknown>)) {
      out[key] = withAssetPaths(inner);
    }
    return out as T;
  }
  return value;
}

export const content = withAssetPaths(site);

export type Content = typeof content;
export type ServiceItem = Content["services"]["items"][number];
