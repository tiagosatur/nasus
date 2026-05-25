import { CAL_AUDIT } from "./contact";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

function buildBrandedUrl(): string {
  const url = new URL(CAL_AUDIT);
  url.searchParams.set("primary_color", "7B1F3A");
  url.searchParams.set("text_color", "1C0F14");
  url.searchParams.set("hide_gdpr_banner", "1");
  return url.toString();
}

const CAL_URL = buildBrandedUrl();

export function openCalendly() {
  if (typeof window === "undefined") return;
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CAL_URL });
    return;
  }
  window.open(CAL_URL, "_blank", "noopener,noreferrer");
}
