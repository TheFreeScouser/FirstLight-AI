import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How FirstLight AI uses information submitted through this website and our booking links.",
  alternates: { canonical: "/privacy" },
};

const heading = "mt-9 text-xl font-semibold text-[#18140D]";
const body = "mt-3 leading-7 text-[#6B604D]";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FBFAF7] text-[#18140D]">
      <header className="border-b border-[#EADFCA] bg-white/80 px-6 py-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <a href="/" className="font-semibold tracking-[0.15em] text-[#18140D]">FIRSTLIGHT AI</a>
          <a href="/#contact" className="text-sm font-semibold text-[#BA7517] hover:underline">Contact us</a>
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Your information</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[#6B604D]">Last updated: 20 November 2026</p>
        <p className={body}>
          This page explains how FirstLight AI handles personal information when you visit this website, contact us or follow our booking link.
        </p>

        <h2 className={heading}>1. Who is responsible for your data?</h2>
        <p className={body}>
          FirstLight AI is a trading name of Fleming Engineers Ltd, a company registered in England and Wales (company number 13863332). Fleming Engineers Ltd is the controller of personal information sent directly to FirstLight AI through this website.
        </p>
        <p className={body}>
          For privacy questions or requests, email <a className="font-semibold text-[#BA7517] underline" href="mailto:hello@firstlightai.co.uk">hello@firstlightai.co.uk</a>.
        </p>

        <h2 className={heading}>2. What information do we collect?</h2>
        <p className={body}>
          If you contact us, we receive the name, email address, optional company name and description of your enquiry that you choose to provide. We may also retain our correspondence and information necessary to prepare a proposal or deliver an agreed service. Website hosting providers may process technical information such as IP address, device/browser details and request logs required to serve and secure this website.
        </p>
        <p className={body}>
          Please do not include sensitive personal information, confidential client records or account credentials in an initial website enquiry.
        </p>

        <h2 className={heading}>3. How and why do we use it?</h2>
        <p className={body}>
          We use your details to respond to your enquiry, assess your needs, arrange a conversation, prepare proposals, provide services if you engage us, maintain necessary business records and protect our website against misuse. Our lawful bases, as applicable, are legitimate interests in responding to business enquiries and running our business, steps requested before entering a contract, performance of an agreed contract, and compliance with legal obligations.
        </p>
        <p className={body}>
          We do not use website enquiry details to make solely automated decisions about you that have legal or similarly significant effects. We do not treat an enquiry as consent to an unrelated marketing mailing list.
        </p>

        <h2 className={heading}>4. Who handles the information?</h2>
        <p className={body}>
          The enquiry form submits information to <a className="font-semibold text-[#BA7517] underline" href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Formspree</a>, which provides form delivery and handling. This website is deployed through Vercel, which may process operational hosting logs. Messages may be handled through our business email provider. These providers process data in connection with the services they supply.
        </p>
        <p className={body}>
          If you choose the external scheduling link, you leave this site for <a className="font-semibold text-[#BA7517] underline" href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">Calendly</a>, which will handle the booking information you provide under its own notice and terms. We receive the information required to manage the meeting. We do not sell your enquiry information.
        </p>

        <h2 className={heading}>5. International processing</h2>
        <p className={body}>
          Some of the suppliers named above operate outside the UK, including in the United States, so information may be processed internationally. Where legally required, international transfers should be protected by an applicable adequacy arrangement or appropriate contractual safeguards. Contact us if you would like further details about the safeguards relevant to your data.
        </p>

        <h2 className={heading}>6. How long do we keep data?</h2>
        <p className={body}>
          We keep enquiries and correspondence only while they are reasonably needed to respond, assess potential work, maintain a business relationship, handle disputes or meet applicable legal, tax and accounting obligations. The appropriate period depends on whether an enquiry leads to a project and on the nature of any resulting records. If the information is no longer needed, we will delete it or anonymise it in accordance with our retention practices. External form, email and booking providers may have their own system-level retention settings.
        </p>

        <h2 className={heading}>7. Your rights</h2>
        <p className={body}>
          Depending on the circumstances, you may have rights to access, correct or erase your personal information, restrict its use, request portability and object to certain processing. <strong>You have the right to object to processing based on legitimate interests, including any direct marketing.</strong> You can raise a request at <a className="font-semibold text-[#BA7517] underline" href="mailto:hello@firstlightai.co.uk">hello@firstlightai.co.uk</a>. If you have concerns about our response, you can complain to the <a className="font-semibold text-[#BA7517] underline" href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">Information Commissioner&apos;s Office (ICO)</a>.
        </p>

        <h2 className={heading}>8. Website cookies and external links</h2>
        <p className={body}>
          The public website does not intentionally set advertising or analytics cookies in its current application code. Hosting or embedded third-party services may use technical measures required for security or operation. If you follow a link to Calendly or another external website, that service may use its own cookies and privacy practices. We will update this notice and any consent controls if additional non-essential tracking is introduced.
        </p>

        <h2 className={heading}>9. Changes to this notice</h2>
        <p className={body}>
          We may update this policy if our services, suppliers or data-handling practices change. The date at the top indicates the version on this page.
        </p>
        <div className="mt-12 border-t border-[#EADFCA] pt-6">
          <a href="/" className="font-semibold text-[#BA7517] hover:underline">← Back to FirstLight AI</a>
        </div>
      </article>
    </main>
  );
}
