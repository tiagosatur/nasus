import { CAL_AUDIT } from "@/lib/contact";

/**
 * Configuração estrutural dos links secundários (resultados 02–04).
 * Os rótulos vêm do i18n via `key` (`t(key)` / `t(`${key}Sub`)`); aqui ficam
 * só a posição, o destino e o comportamento de navegação.
 */
export type SecondaryLink = {
  key: "site" | "blog" | "call";
  rank: string;
  internal: boolean; // usa <Link> do Next (rota interna)
  newTab: boolean; // abre em nova aba
  arrow: "right" | "out";
  href: (prefix: string) => string;
};

export const SECONDARY_LINKS: SecondaryLink[] = [
  { key: "site", rank: "02", internal: true, newTab: false, arrow: "right", href: (p) => `${p}/` },
  { key: "blog", rank: "03", internal: true, newTab: false, arrow: "right", href: (p) => `${p}/blog` },
  { key: "call", rank: "04", internal: false, newTab: true, arrow: "out", href: () => CAL_AUDIT },
];
