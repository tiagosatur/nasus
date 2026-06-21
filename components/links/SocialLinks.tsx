import { useTranslations } from "next-intl";
import { track } from "@vercel/analytics";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { FacebookIcon } from "@/components/ui/FacebookIcon";

const SOCIALS = [
  { key: "instagram", href: "https://www.instagram.com/nasus.digital/", Icon: InstagramIcon },
  { key: "linkedin", href: "https://www.linkedin.com/company/nasus-digital", Icon: LinkedInIcon },
  { key: "facebook", href: "https://www.facebook.com/agencianasus", Icon: FacebookIcon },
] as const;

/** Linha de redes sociais (entram em onda defasada via useSerpEntrance). */
export function SocialLinks({ locale }: { locale: string }) {
  const t = useTranslations("links");
  return (
    <div data-socials className="flex items-center justify-center gap-[13px] mt-[30px]">
      {SOCIALS.map(({ key, href, Icon }) => {
        const label = t(key);
        return (
          <a
            key={key}
            data-social
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            onClick={() => track("social_click", { target: label, locale })}
            className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-accent/30 text-accent transition-colors duration-200 hover:bg-accent hover:border-accent hover:text-white"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
