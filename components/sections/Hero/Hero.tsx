import { getTranslations, getLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/ui/BookButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WA_DISCOVERY } from "@/lib/whatsapp";
import { HeroAnimations } from "./HeroAnimations";
import { SearchMockup } from "./SearchMockup";

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <section
      data-hero-root
      className="relative min-h-dvh flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-28 pb-16"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 10% 0%, rgba(181,82,42,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-6xl mx-auto">
      <p
        data-hero-label
        className="text-xs uppercase tracking-[0.2em] text-text-muted font-mono mb-10 flex items-center gap-3"
        style={{ opacity: 0 }}
      >
        <span className="inline-block w-5 h-px bg-accent" aria-hidden="true" />
        {t("label")}
      </p>

      <div className="grid lg:grid-cols-[68fr_32fr] gap-12 lg:gap-10 items-start">
        <div>
          <h1
            className="leading-[1.05] lg:leading-[0.97] mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 4rem)",
              hyphens: "none",
            }}
          >
            <span data-hero-line1 className="block font-sans font-bold text-text-primary" style={{ opacity: 0 }}>
              {t("line1")}
            </span>
            <span data-hero-line2 className="block font-display italic text-accent" style={{ opacity: 0 }}>
              {t("line2")}
            </span>
          </h1>

          <span
            data-hero-accent
            className="accent-line block my-8 max-w-[160px]"
            aria-hidden="true"
          />

          <p data-hero-sub className="text-text-secondary text-lg md:text-xl max-w-md leading-[1.65] mb-10" style={{ opacity: 0 }}>
            {t("sub")}
          </p>

          <div data-hero-cta className="flex flex-col sm:flex-row gap-3" style={{ opacity: 0 }}>
            {isEn ? (
              <BookButton variant="dark">{t("cta1")}</BookButton>
            ) : (
              <Button variant="dark" href={WA_DISCOVERY} external>
                <WhatsAppIcon />
                {t("cta1")}
              </Button>
            )}
            <Button variant="ghost" href="#como-funciona">
              {t("cta2")}
            </Button>
          </div>
        </div>

        <div data-hero-mockup className="hidden lg:block" style={{ opacity: 0 }}>
          <SearchMockup />
        </div>
      </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] tracking-widest uppercase font-mono text-text-muted">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent" />
      </div>

      <HeroAnimations />
    </section>
  );
}
