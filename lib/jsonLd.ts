const SITE = "https://nasus.digital";

const ORG_ID = `${SITE}/#organization`;
const PERSON_ID = `${SITE}/#tiago-satur`;

type LocalizedCopy = {
  orgDescription: string;
  personJobTitle: string;
};

const COPY: Record<"pt" | "en", LocalizedCopy> = {
  pt: {
    orgDescription:
      "Sites institucionais, SEO local e presença contínua no Google para profissionais liberais brasileiros — clínicas de estética, dentistas, advogados e consultores.",
    personJobTitle: "Engenheiro de Software, fundador da Nasus Digital",
  },
  en: {
    orgDescription:
      "Websites, local SEO and continuous Google presence for independent practitioners — aesthetic clinics, dentists, law firms and consultants.",
    personJobTitle: "Software Engineer, founder of Nasus Digital",
  },
};

export function buildSchemas(locale: "pt" | "en") {
  const copy = COPY[locale];
  const urlForLocale = locale === "pt" ? SITE : `${SITE}/en`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Nasus Digital",
    url: SITE,
    logo: `${SITE}/logo.svg`,
    description: copy.orgDescription,
    email: "contato@nasus.digital",
    areaServed: locale === "pt" ? { "@type": "Country", name: "Brasil" } : { "@type": "Country", name: "Brazil" },
    founder: { "@id": PERSON_ID },
    sameAs: ["https://www.linkedin.com/company/nasus-digital"],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Tiago Satur",
    jobTitle: copy.personJobTitle,
    worksFor: { "@id": ORG_ID },
    url: `${urlForLocale}#sobre`,
  };

  return [organization, person];
}
