import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: SITE.url,
          "pt-BR": SITE.url,
        },
      },
    },
    {
      url: `${SITE.url}/design-system`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
