import client from "@/tina/__generated__/client";
import type { TinaSiteProps } from "@/components/ContentProvider";

/* Consulta el documento del sitio en Tina para habilitar la edición
   visual. Si no hay API disponible (build sin credenciales de Tina
   Cloud, o entorno sin el dev server local), devuelve null y el sitio
   se sirve con el contenido estático de content/site.json — idéntico. */
export async function getSiteTina(): Promise<TinaSiteProps> {
  try {
    const res = await client.queries.site({ relativePath: "site.json" });
    console.log("[getSiteTina] OK — conectado a Tina Cloud");
    return { query: res.query, variables: res.variables, data: res.data };
  } catch (e) {
    console.error(
      "[getSiteTina] fallo:",
      e instanceof Error ? e.message : JSON.stringify(e),
    );
    return null;
  }
}
