import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { buildSchemas } from "@/lib/jsonLd";
import "../globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://nasus.digital"),
    alternates: {
      canonical: locale === "pt" ? "/" : "/en",
      languages: {
        pt: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: locale === "en" ? "https://nasus.digital/en" : "https://nasus.digital",
      siteName: "Nasus Digital",
      locale: locale === "en" ? "en_US" : "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const htmlLang = locale === "pt" ? "pt-BR" : "en";

  const isEn = locale === "en";

  const schemas = buildSchemas(isEn ? "en" : "pt");

  return (
    <html
      lang={htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {isEn && (
          <>
            <link rel="preconnect" href="https://calendly.com" />
            <link rel="preconnect" href="https://assets.calendly.com" />
            <link rel="dns-prefetch" href="https://calendly.com" />
            <link
              rel="preload"
              as="script"
              href="https://assets.calendly.com/assets/external/widget.js"
            />
            <link
              rel="stylesheet"
              href="https://assets.calendly.com/assets/external/widget.css"
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col relative">
        <div className="grain" aria-hidden="true" />
        <CustomCursor />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        {isEn && (
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="afterInteractive"
          />
        )}
        <Analytics />
      </body>
    </html>
  );
}
