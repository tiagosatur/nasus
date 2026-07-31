import type { Metadata } from "next";
import { Cinzel, Jost } from "next/font/google";
import "./proposal.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nasus.digital"),
  title: "Proposta CWBrownerie · Nasus",
  description:
    "Transforme seu site de vitrine em máquina de vendas. Proposta da Nasus para a CWBrownerie.",
  // Proposta semi-privada: fora do índice de busca.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Transforme seu site de vitrine em máquina de vendas",
    description: "Proposta da Nasus para a CWBrownerie.",
    url: "https://nasus.digital/propostas/cwbrownerie-x7k2f9",
    siteName: "Nasus Digital",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/cwbrownerie/cesta.jpg", width: 1213, height: 979 }],
  },
};

export default function PropostaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
