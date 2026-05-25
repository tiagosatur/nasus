import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
  // URL is the single source of truth for locale — no cookie, no Accept-Language redirect
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
