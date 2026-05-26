"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/navigation";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/ui/BookButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WA_DISCOVERY } from "@/lib/whatsapp";

const NAV_IDS = [
  { id: "solucao", anchor: "#solucao" },
  { id: "prova", anchor: "#prova" },
  { id: "comoFunciona", anchor: "#como-funciona" },
  { id: "sobre", anchor: "#sobre" },
] as const;

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isEn = locale === "en";

  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const lastY = lastYRef.current;

      if (currentY > lastY && currentY > 100) {
        setHidden(true);
      } else if (currentY < lastY) {
        setHidden(false);
      }

      lastYRef.current = currentY;
    };

    lastYRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_IDS.forEach(({ id }) => {
      const sectionId = id === "comoFunciona" ? "como-funciona" : id;
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function switchLocale() {
    router.replace("/", { locale: isEn ? "pt" : "en" });
  }

  function onLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname);
      }
    }
  }

  return (
    <header
      className={`${styles.header} fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${hidden ? "-translate-y-full md:translate-y-0" : "translate-y-0"}`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 grid grid-cols-[auto_1fr_auto] items-center">
        <Link href="/" aria-label="nasus.digital" className="block" onClick={onLogoClick}>
          <Image
            src="/logo.svg"
            alt="nasus.digital"
            width={490}
            height={258}
            priority
            className="h-12 md:h-16 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-8">
          {NAV_IDS.map(({ id, anchor }) => {
            const isActive = activeId === id;
            const href = pathname === "/" ? anchor : `/${anchor}`;
            return (
              <a
                key={id}
                href={href}
                className={`text-sm transition-colors duration-200 pb-0.5 ${isActive
                  ? "text-accent border-b border-accent"
                  : "text-text-secondary hover:text-text-primary"
                  }`}
              >
                {t(`nav.${id}`)}
              </a>
            );
          })}
          <Link
            href="/blog"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            {t("nav.blog")}
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4 justify-self-end">
          <button
            onClick={switchLocale}
            className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors duration-200"
            aria-label={isEn ? "Mudar para Português" : "Switch to English"}
          >
            {t("langSwitch")}
          </button>
          <span className="hidden md:block w-px h-4 bg-border" aria-hidden="true" />

          {isEn ? (
            <BookButton variant="primary" iconSize={13} className="text-xs px-3 sm:px-4 py-2.5">
              <span className="hidden sm:inline">{t("cta")}</span>
            </BookButton>
          ) : (
            <Button variant="primary" href={WA_DISCOVERY} external className="text-xs px-3 sm:px-4 py-2.5" aria-label={t("cta")}>
              <WhatsAppIcon size={13} />
              <span className="hidden sm:inline">{t("cta")}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
