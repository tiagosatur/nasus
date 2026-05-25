import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacidade">): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "en"
        ? "Privacy Policy — Nasus Digital"
        : "Política de Privacidade — Nasus Digital",
    description:
      locale === "en"
        ? "How Nasus Digital collects, uses, and protects your personal data."
        : "Como a Nasus Digital coleta, usa e protege seus dados pessoais.",
  };
}

export default async function PrivacidadePage({
  params,
}: PageProps<"/[locale]/privacidade">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const homeHref = locale === "en" ? "/en" : "/";

  return (
    <main className="min-h-screen bg-bg-primary px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-2xl mx-auto">

        <Link href={homeHref} className="font-display text-xl text-text-primary mb-16 block">
          nasus<span className="text-accent">.</span>digital
        </Link>

        <h1
          className="font-sans font-bold text-text-primary mb-2"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          {t("title")}
        </h1>
        <p className="text-sm text-text-muted font-mono mb-12">
          {t("updated")}
        </p>

        <div className="prose-custom space-y-10 text-text-secondary text-base leading-relaxed">
          {locale === "en" ? <EnContent /> : <PtContent />}
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href={homeHref}
            className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            {t("backLink")}
          </Link>
        </div>

      </div>
    </main>
  );
}

function PtContent() {
  return (
    <>
      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">1. Quem somos</h2>
        <p>
          Nasus Digital, pessoa jurídica de direito privado inscrita no CNPJ sob o nº{" "}
          <strong className="text-text-primary font-semibold">38.212.417/0001-90</strong>,
          com sede em Curitiba, PR, é responsável pelo tratamento dos dados pessoais
          coletados neste site (<strong className="text-text-primary font-semibold">nasus.digital</strong>).
        </p>
        <p className="mt-3">
          Contato: <a href="mailto:contato@nasus.digital" className="text-accent underline">contato@nasus.digital</a>
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">2. Quais dados coletamos</h2>
        <p>
          Ao clicar nos botões de contato deste site, você é direcionado ao WhatsApp com
          uma mensagem pré-preenchida contendo:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Nome e número de telefone associados à sua conta do WhatsApp</li>
          <li>Nome do seu negócio (clínica, consultório ou escritório)</li>
          <li>Cidade de atuação</li>
        </ul>
        <p className="mt-3">
          Não coletamos dados automaticamente por meio de formulários, cookies de
          rastreamento ou pixels de terceiros.
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">3. Para que usamos seus dados</h2>
        <p>Os dados são usados exclusivamente para:</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Entrar em contato com você para realizar o diagnóstico gratuito solicitado</li>
          <li>Apresentar uma proposta de serviços de presença digital</li>
          <li>Prestar os serviços contratados, caso haja contratação</li>
        </ul>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">4. Base legal (LGPD)</h2>
        <p>
          O tratamento se baseia no <strong className="text-text-primary font-semibold">legítimo interesse</strong> do
          titular ao solicitar voluntariamente o contato, e na{" "}
          <strong className="text-text-primary font-semibold">execução de contrato</strong> quando há prestação de serviços.
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">5. Compartilhamento e transferência internacional</h2>
        <p>
          Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros
          para fins comerciais.
        </p>
        <p className="mt-3">
          Ao clicar nos botões de WhatsApp, você é direcionado à plataforma operada
          pela <strong className="text-text-primary font-semibold">Meta Platforms, Inc.</strong> (EUA),
          que atua como processadora independente dos dados trafegados pelo aplicativo.
          Essa transferência internacional está sujeita à política de privacidade do
          WhatsApp/Meta, sobre a qual a Nasus Digital não tem controle.
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">6. Por quanto tempo guardamos</h2>
        <p>
          Mantemos seus dados pelo tempo necessário para a prestação dos serviços e
          pelo prazo mínimo exigido pela legislação fiscal e comercial brasileira.
          Após encerrado o relacionamento, os dados são excluídos ou anonimizados.
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">7. Seus direitos</h2>
        <p>Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Confirmar a existência de tratamento dos seus dados</li>
          <li>Acessar os dados que temos sobre você</li>
          <li>Corrigir dados incompletos ou desatualizados</li>
          <li>Solicitar a exclusão dos seus dados</li>
          <li>Revogar o consentimento a qualquer momento</li>
          <li>Solicitar a portabilidade para outro prestador</li>
        </ul>
        <p className="mt-3">
          Para exercer qualquer desses direitos, entre em contato pelo e-mail{" "}
          <a href="mailto:contato@nasus.digital" className="text-accent underline">contato@nasus.digital</a>.
        </p>
        <p className="mt-3">
          Caso entenda que seus direitos não foram atendidos, você pode registrar
          uma reclamação junto à{" "}
          <strong className="text-text-primary font-semibold">Autoridade Nacional de Proteção de Dados (ANPD)</strong>{" "}
          em <span className="font-mono text-sm">gov.br/anpd</span>.
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">8. Alterações nesta política</h2>
        <p>
          Esta política pode ser atualizada periodicamente. A data de atualização
          consta sempre no início do documento. O uso continuado do site após mudanças
          implica concordância com a versão vigente.
        </p>
      </section>
    </>
  );
}

function EnContent() {
  return (
    <>
      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">1. Who we are</h2>
        <p>
          Nasus Digital is a Brazilian digital presence agency (CNPJ{" "}
          <strong className="text-text-primary font-semibold">38.212.417/0001-90</strong>),
          headquartered in Curitiba, Brazil, responsible for the personal data
          collected through this website (<strong className="text-text-primary font-semibold">nasus.digital</strong>).
        </p>
        <p className="mt-3">
          Contact: <a href="mailto:contato@nasus.digital" className="text-accent underline">contato@nasus.digital</a>
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">2. Data we collect</h2>
        <p>
          When you click a contact button on this website, you are redirected to WhatsApp
          with a pre-filled message that may include:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Your name and phone number as registered in your WhatsApp account</li>
          <li>Your business name (clinic, practice, or law firm)</li>
          <li>Your city or service area</li>
        </ul>
        <p className="mt-3">
          We do not automatically collect data through forms, tracking cookies, or
          third-party pixels.
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">3. How we use your data</h2>
        <p>Your data is used solely to:</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Contact you to deliver the free visibility audit you requested</li>
          <li>Present a digital presence service proposal</li>
          <li>Provide contracted services, if any agreement is reached</li>
        </ul>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">4. Legal basis</h2>
        <p>
          Data processing is based on your{" "}
          <strong className="text-text-primary font-semibold">legitimate interest</strong> when
          voluntarily requesting contact, and on{" "}
          <strong className="text-text-primary font-semibold">contract performance</strong> when
          services are provided. We comply with Brazil&apos;s General Data Protection Law
          (LGPD — Lei nº 13.709/2018).
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">5. Sharing and international transfers</h2>
        <p>
          We do not sell, rent, or share your personal data with third parties for
          commercial purposes.
        </p>
        <p className="mt-3">
          When you click a WhatsApp button, you are directed to a platform operated
          by <strong className="text-text-primary font-semibold">Meta Platforms, Inc.</strong> (USA),
          which acts as an independent data processor. That transfer is governed by
          WhatsApp/Meta&apos;s own privacy policy, over which Nasus Digital has no control.
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">6. Retention</h2>
        <p>
          We retain your data for as long as necessary to deliver the agreed services
          and to comply with applicable legal obligations. After the relationship ends,
          data is deleted or anonymized.
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">7. Your rights</h2>
        <p>
          Under Brazil&apos;s LGPD (and applicable international data protection frameworks),
          you have the right to:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Confirm whether we process your data</li>
          <li>Access the data we hold about you</li>
          <li>Correct incomplete or inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent at any time</li>
          <li>Request data portability to another provider</li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:contato@nasus.digital" className="text-accent underline">contato@nasus.digital</a>.
        </p>
      </section>

      <section>
        <h2 className="font-sans font-bold text-text-primary text-lg mb-3">8. Changes to this policy</h2>
        <p>
          This policy may be updated periodically. The date at the top of the document
          reflects the most recent revision. Continued use of the site after changes
          constitutes acceptance of the updated version.
        </p>
      </section>
    </>
  );
}
