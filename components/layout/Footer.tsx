import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer data-cursor-dark className="bg-surface-dark px-6 md:px-12 lg:px-24 pt-10 pb-8">
      <div className="max-w-6xl mx-auto">

        {/* Top: logo + location */}
        <div className="mb-6">
          <Image
            src="/logo-on-dark.svg"
            alt="nasus.digital"
            width={490}
            height={258}
            className="h-14 w-auto mb-2"
          />
          <p className="text-xs text-text-inverse-muted">{t("location")}</p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-dark pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap text-xs text-text-inverse-muted">
            <span>© {year} Nasus Digital · CNPJ 38.212.417/0001-90</span>
            <span className="hidden sm:inline">·</span>
            <a
              href={`mailto:${t("email")}`}
              className="hover:text-text-inverse transition-colors duration-200"
            >
              {t("email")}
            </a>
            <span className="hidden sm:inline">·</span>
            <Link
              href={locale === "en" ? "/en/privacidade" : "/privacidade"}
              className="hover:text-text-inverse transition-colors duration-200"
            >
              {t("privacy")}
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/company/nasus-digital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn da Nasus Digital"
              className="w-8 h-8 rounded-full bg-surface-dark-2 border border-border-dark flex items-center justify-center text-text-inverse-muted hover:bg-accent-on-dark hover:border-accent-on-dark hover:text-text-inverse transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
