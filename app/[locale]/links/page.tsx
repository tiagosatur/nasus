import type { Metadata } from "next";
import { LinkInBio } from "@/components/links/LinkInBio";

export async function generateMetadata({ params }: PageProps<"/[locale]/links">): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: "Nasus · Links",
    description: isEn
      ? "All Nasus Digital links in one place."
      : "Todos os links da Nasus Digital em um só lugar.",
    // Página utilitária de bio — não indexar nem diluir o site, mas seguir os links
    robots: { index: false, follow: true },
    alternates: { canonical: isEn ? "/en/links" : "/links" },
  };
}

export default async function LinksPage({ params }: PageProps<"/[locale]/links">) {
  const { locale } = await params;
  return <LinkInBio locale={locale} />;
}
