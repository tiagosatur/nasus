import type { MetadataRoute } from "next";
import { getPostsForSitemap, getCategoriesForSitemap, type SitemapPost } from "@/lib/sanity/queries";

const SITE = "https://nasus.digital";

type StaticRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/**
 * Rotas estáticas conhecidas em build-time (não vêm do CMS).
 * Cada uma é emitida em pt e en, com hreflang apontando para a outra.
 * Prioridade segue a hierarquia esperada pelo Google: home > blog > legais.
 */
const STATIC_ROUTES: StaticRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },
  { path: "/privacidade", priority: 0.3, changeFrequency: "yearly" },
];

/**
 * Monta uma URL absoluta respeitando a config `localePrefix: "as-needed"`
 * do next-intl: pt (default) fica sem prefixo, en recebe `/en`.
 * Centraliza essa lógica para evitar divergência entre entradas do sitemap
 * e o que o middleware do next-intl realmente serve.
 */
function localizedPath(locale: string, path: string): string {
  return locale === "en" ? `${SITE}/en${path}` : `${SITE}${path}`;
}

/**
 * Expande as rotas estáticas em entradas de sitemap, pareando pt ↔ en
 * via hreflang. `x-default` aponta pra pt porque é o idioma padrão do site
 * e o público primário é brasileiro — o Google usa essa pista quando o
 * usuário não tem preferência clara de idioma.
 */
function staticEntries(now: Date): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map(({ path, priority, changeFrequency }) => {
    const ptUrl = localizedPath("pt", path);
    const enUrl = localizedPath("en", path);
    return {
      url: ptUrl,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          "pt-BR": ptUrl,
          en: enUrl,
          "x-default": ptUrl,
        },
      },
    };
  });
}

/**
 * Transforma posts do Sanity em entradas de sitemap.
 *
 * Posts traduzidos compartilham o mesmo `translationKey`, mas têm slugs
 * diferentes em cada idioma (ex.: "como-vender-mais" vs "how-to-sell-more").
 * Agrupamos por translationKey para emitir um par de entradas pt+en com
 * hreflang cruzado, ajudando o Google a entender que são a mesma página
 * em idiomas diferentes (sem isso, ele pode tratá-las como conteúdo
 * duplicado ou perder o link entre versões).
 *
 * Posts sem translationKey (sem tradução publicada) entram como
 * standalone, sem alternates.
 *
 * Usamos `_updatedAt` do Sanity como `lastModified` para que o Google
 * recrawleie quando o conteúdo de fato muda; em pares pt+en, pegamos o
 * mais recente do grupo para manter as duas entradas sincronizadas.
 */
function postEntries(posts: SitemapPost[]): MetadataRoute.Sitemap {
  const byTranslationKey = new Map<string, Record<string, SitemapPost>>();
  const standalone: SitemapPost[] = [];

  for (const post of posts) {
    if (!post.translationKey) {
      standalone.push(post);
      continue;
    }
    const group = byTranslationKey.get(post.translationKey) ?? {};
    group[post.language] = post;
    byTranslationKey.set(post.translationKey, group);
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const post of standalone) {
    const url = localizedPath(post.language, `/blog/${post.slug}`);
    entries.push({
      url,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const group of byTranslationKey.values()) {
    const pt = group["pt"];
    const en = group["en"];
    const lastModified = new Date(
      Math.max(...Object.values(group).map((p) => new Date(p._updatedAt).getTime()))
    );

    const languages: Record<string, string> = {};
    if (pt) languages["pt-BR"] = localizedPath("pt", `/blog/${pt.slug}`);
    if (en) languages["en"] = localizedPath("en", `/blog/${en.slug}`);
    languages["x-default"] = languages["pt-BR"] ?? languages["en"];

    const primary = pt ?? en!;
    entries.push({
      url: localizedPath(primary.language, `/blog/${primary.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    });

    // Quando existe tradução, emite a segunda entrada (en) com os mesmos
    // alternates — o Google recomenda que cada URL no sitemap declare
    // suas próprias variantes hreflang, não apenas a canônica.
    if (pt && en) {
      entries.push({
        url: localizedPath("en", `/blog/${en.slug}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}

/**
 * Páginas de listagem por categoria (`/blog/categoria/[slug]`).
 *
 * Cada categoria existe independente por idioma no Sanity (não há
 * translationKey entre categorias), então não emitimos hreflang —
 * pt e en são tratadas como páginas separadas, o que reflete a realidade
 * (slugs de categoria podem nem ter equivalente no outro idioma).
 *
 * Prioridade 0.5 fica abaixo de posts (0.7) porque categorias são
 * derivadas — o conteúdo de valor está nos posts.
 */
function categoryEntries(categories: Awaited<ReturnType<typeof getCategoriesForSitemap>>): MetadataRoute.Sitemap {
  return categories.map((cat) => ({
    url: localizedPath(cat.language, `/blog/categoria/${cat.slug}`),
    lastModified: new Date(cat._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));
}

/**
 * Entry point que o Next.js chama em build/runtime para gerar
 * `/sitemap.xml`. Busca posts e categorias em paralelo para minimizar
 * latência (são queries independentes ao Sanity).
 *
 * Ordem do array final é a ordem no XML: rotas estáticas primeiro
 * (mais importantes), depois conteúdo dinâmico.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [posts, categories] = await Promise.all([
    getPostsForSitemap(),
    getCategoriesForSitemap(),
  ]);

  return [
    ...staticEntries(now),
    ...postEntries(posts),
    ...categoryEntries(categories),
  ];
}
