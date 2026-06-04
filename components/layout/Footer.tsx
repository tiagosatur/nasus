import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

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
              <LinkedInIcon />
            </a>
            <a
              href="https://www.facebook.com/agencianasus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Nasus Digital"
              className="w-8 h-8 rounded-full bg-surface-dark-2 border border-border-dark flex items-center justify-center text-text-inverse-muted hover:bg-accent-on-dark hover:border-accent-on-dark hover:text-text-inverse transition-colors duration-200"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/nasus.digital/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Nasus Digital"
              className="w-8 h-8 rounded-full bg-surface-dark-2 border border-border-dark flex items-center justify-center text-text-inverse-muted hover:bg-accent-on-dark hover:border-accent-on-dark hover:text-text-inverse transition-colors duration-200"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
