import type { MetadataRoute } from "next";

const SITE = "https://nasus.digital";

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const ROUTES: Route[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/privacidade", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => {
    const ptUrl = `${SITE}${path}`;
    const enUrl = `${SITE}/en${path}`;

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
