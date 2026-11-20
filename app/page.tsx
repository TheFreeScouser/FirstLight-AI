"use client";

import BrandLogo from "./components/BrandLogo";

const BOOKING_URL = "https://calendly.com/ryanfleming-flemingengineers";

const painPoints = [
  "Information lives in spreadsheets and inboxes",
  "Work relies on one person knowing how it all fits together",
  "You copy data between systems and still miss things",
  "Reports take too long to pull together",
  "There is no single source of truth across your tools",
  "Leads and enquiries get followed up too late",
];

const services = [
  {
    title: "Workflow automation",
    text: "Remove repetitive admin, manual handovers and copy-and-paste work across your systems.",
    examples: "Onboarding, approvals, reporting, data updates and task handovers.",
  },
  {
    title: "AI systems & tools",
    text: "Build practical AI tools that improve decisions, surface information and speed up operations.",
    examples: "Document Q&A, matching engines, recommendations and internal assistants.",
  },
  {
    title: "CRM & process clean-up",
    text: "Fix messy data, unclear ownership and underused systems before adding more automation.",
    examples: "CRM clean-up, process mapping, source-of-truth design and automation readiness.",
  },
  {
    title: "Manufacturing workflow improvement",
    text: "Apply an engineering mindset to process-heavy work where information, ownership and handovers matter.",
    examples: "Reporting, quality workflows, project handovers, approvals and operational admin.",
  },
];

const steps = [
  {
    number: "01",
    title: "Diagnose",
    text: "Choose one important workflow, map how it really works and identify the highest-value improvement.",
    result: "A clear picture of the problem and a practical improvement plan.",
  },
  {
    number: "02",
    title: "Build",
    text: "Simplify the process first, then build the automation, integration or AI tool that removes the friction.",
    result: "A tested, documented solution your team can use.",
  },
  {
    number: "03",
    title: "Improve",
    text: "Keep the system useful through monitoring, support and measured improvements.",
    result: "Reliable workflows that continue to work for the business.",
  },
];

const offers = [
  {
    title: "Workflow Audit",
    price: "£2,500",
    priceNote: "Fixed fee",
    label: "Understand the opportunity",
    description: "A focused review of one important process, typically delivered over 10 working days. We map the workflow, identify wasted time and risk, and provide a practical improvement plan and implementation proposal.",
    note: "A useful standalone deliverable. An audit is not required for every implementation.",
  },
  {
    title: "AI Implementation",
    price: "£3,000–£8,000",
    priceNote: "Typical implementation range",
    label: "Build a useful solution",
    description: "An AI tool, automated workflow or system integration designed around a clearly defined problem, with testing, documentation and handover.",
    note: "An indicative range, not a minimum or fixed package. Each project is scoped and quoted individually.",
  },
  {
    title: "Ongoing Support",
    price: "£200",
    priceNote: "Per month",
    label: "Keep things running",
    description: "Light-touch support and ongoing improvement for an agreed workflow or tool after launch, within a clearly defined monthly scope.",
    note: "Larger changes, new integrations and additional builds are quoted separately.",
  },
];

const buttonPrimary = "inline-flex items-center justify-center rounded-xl bg-[#BA7517] px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#18140D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BA7517]";
const buttonSecondary = "inline-flex items-center justify-center rounded-xl border border-[#D8C99F] bg-white px-6 py-3.5 text-center text-sm font-semibold text-[#18140D] transition hover:border-[#BA7517] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BA7517]";

export default function FirstLightPage() {
  return (
    <main className="min-h-screen bg-[#FBFAF7] text-[#18140D]">
      <header className="sticky top-0 z-50 border-b border-[#EADFCA] bg-[#FBFAF7]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <a href="#top" aria-label="FirstLight AI home" className="flex shrink-0 items-center">
            <BrandLogo className="h-auto w-[156px] sm:w-[215px] lg:w-[265px]" />
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm text-[#6B604D] md:flex">
            <a href="#services" className="hover:text-[#BA7517]">Services</a>
            <a href="#how-it-works" className="hover:text-[#BA7517]">How it works</a>
            <a href="#pricing" className="hover:text-[#BA7517]">Pricing</a>
          </nav>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#BA7517] px-4 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-[#18140D] sm:px-5 sm:text-sm">
            Choose a time
          </a>
        </div>
      </header>

      <section id="top" className="scroll-mt-24 px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#BA7517] sm:text-sm">
              Process improvement, workflow automation and practical AI
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.08]">
              Find where your business is wasting time. Then fix it properly.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6B604D]">
              FirstLight helps businesses measure the cost of messy processes, redesign the workflow and automate the work that should not stay manual.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>Choose a time to talk ↗</a>
              <a href="#services" className={buttonSecondary}>See how we help</a>
            </div>
            <p className="mt-6 text-sm text-[#6B604D]">Founder-led · First-class robotics engineering · Practical delivery</p>
          </div>

          <aside className="rounded-3xl bg-[#18140D] p-7 text-white shadow-[0_20px_55px_rgba(24,20,13,0.12)] sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Meet the founder</p>
            <div className="mt-5 flex items-center gap-4">
              <div aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white/10 text-xl font-semibold text-[#D4AF37]">RF</div>
              <div><h2 className="text-2xl font-semibold">Ryan Fleming</h2><p className="mt-1 text-sm text-white/65">Founder, FirstLight AI</p></div>
            </div>
            <p className="mt-5 leading-7 text-white/80">First-class BEng in Robotics, Member of the IET, with several years in automotive engineering, vehicle quality and reliability testing programmes.</p>
            <p className="mt-4 leading-7 text-white/80">I bring that engineering discipline to practical business automation: understand the process, fix the friction and deliver tools that work.</p>
            <a href="#work" className="mt-6 inline-flex font-semibold text-[#D4AF37] hover:underline">See real project examples →</a>
          </aside>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-y border-[#EADFCA] bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BA7517]">What we help with</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            Less manual work. Clearer processes. Better connected systems.
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#6B604D]">
            If your team is buried in spreadsheets, copying information between tools or spending too long preparing reports, there is usually a simpler way.
          </p>
          <div className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {painPoints.map((point) => (
              <p key={point} className="flex gap-3 text-sm leading-6 text-[#6B604D]">
                <span aria-hidden="true" className="font-bold text-[#BA7517]">✓</span>
                {point}
              </p>
            ))}
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border border-[#EADFCA] bg-[#FBFAF7] p-6 sm:p-7">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-7 text-[#6B604D]">{service.text}</p>
                <p className="mt-3 text-sm leading-6 text-[#6B604D]"><span className="font-semibold text-[#18140D]">Examples:</span> {service.examples}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Our approach</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Diagnose first. Build second. Improve what works.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-[#6B604D]">No AI for the sake of it. We start with the process and the business case, not a pre-selected tool.</p>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="rounded-2xl border border-[#EADFCA] bg-white p-6">
                <span className="text-sm font-semibold text-[#BA7517]">{step.number}</span>
                <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B604D]">{step.text}</p>
                <p className="mt-4 border-t border-[#EADFCA] pt-4 text-sm leading-6"><span className="font-semibold">Result: </span>{step.result}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#6B604D]">
            Want to see the full delivery method?{" "}
            <a href="/beacon-framework" className="font-semibold text-[#BA7517] underline-offset-4 hover:underline">Explore the Beacon Framework</a>.
          </p>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 border-y border-[#EADFCA] bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Proof & experience</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">See the work, not just the pitch.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#6B604D]">Our public case-study library is growing. Here are an interactive demonstration and an active client engagement, with their status made clear. We won't invent ROI figures before they are measured.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="flex flex-col rounded-2xl border border-[#EADFCA] bg-[#FBFAF7] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Working demonstration</p>
              <h3 className="mt-3 text-2xl font-semibold">QatarMatch AI</h3>
              <p className="mt-3 leading-7 text-[#6B604D]">Natural-language property matching, ranked suggestions and structured lead capture with WhatsApp handoff.</p>
              <p className="mt-4 text-sm leading-6 text-[#6B604D]"><strong>Evidence:</strong> a live demonstration of an end-to-end interaction. Not a claimed client ROI result.</p>
              <a href="https://qatarmatch-ai.vercel.app/" target="_blank" rel="noopener noreferrer" className="mt-auto pt-6 font-semibold text-[#BA7517] hover:underline">Try the live demo ↗</a>
            </article>
            <article className="flex flex-col rounded-2xl border border-[#EADFCA] bg-[#FBFAF7] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Client engagement · In progress</p>
              <h3 className="mt-3 text-2xl font-semibold">Financial services automation</h3>
              <p className="mt-3 leading-7 text-[#6B604D]">A UK financial services workflow project addressing repeated administration and information handovers between existing systems.</p>
              <p className="mt-4 text-sm leading-6 text-[#6B604D]"><strong>Status:</strong> ongoing project. Time savings and financial outcomes have not yet been independently measured.</p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-auto pt-6 font-semibold text-[#BA7517] hover:underline">Discuss a similar problem ↗</a>
            </article>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Simple pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Three clear ways to work together.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#6B604D]">
            From understanding a slow process to building a useful AI tool or automation, choose the help you need. An audit isn't compulsory for every project. Implementation fees depend on scope, and you'll receive a clear quote before work begins. Prices exclude VAT where applicable.
          </p>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {offers.map((offer, i) => (
              <article key={offer.title} className={`flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${i === 1 ? "border-[#D4AF37] bg-[#18140D] text-white shadow-lg" : "border-[#EADFCA] bg-white"}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${i === 1 ? "text-[#D4AF37]" : "text-[#BA7517]"}`}>{offer.label}</p>
                <h3 className="mt-3 text-xl font-semibold">{offer.title}</h3>
                <p className={`mt-6 text-3xl font-semibold ${i === 1 ? "text-[#D4AF37]" : "text-[#18140D]"}`}>{offer.price}</p>
                <p className={`mt-1 text-sm ${i === 1 ? "text-white/65" : "text-[#6B604D]"}`}>{offer.priceNote}</p>
                <p className={`mt-6 text-sm leading-7 ${i === 1 ? "text-white/80" : "text-[#6B604D]"}`}>{offer.description}</p>
                <p className={`mt-4 border-t pt-4 text-xs leading-6 ${i === 1 ? "border-white/20 text-white/65" : "border-[#EADFCA] text-[#6B604D]"}`}>{offer.note}</p>
                <a href="#contact" className={`mt-6 inline-flex font-semibold underline-offset-4 hover:underline ${i === 1 ? "text-[#D4AF37]" : "text-[#BA7517]"}`}>Let's talk →</a>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-6 text-[#6B604D]">Not sure which fits? Choose an introductory appointment or send a short brief below.</p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>Choose a time ↗</a>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 px-5 pb-20 pt-3 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-9 rounded-3xl bg-[#18140D] p-7 text-white md:grid-cols-[0.95fr_1.05fr] md:p-11">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Start a conversation</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Have a workflow worth fixing?</h2>
            <p className="mt-5 leading-7 text-white/75">
              Tell us what is taking up your time. We will review the problem and discuss whether an audit, an AI implementation or light-touch ongoing support makes sense.
            </p>
            <p className="mt-5 text-sm leading-6 text-white/60">
              Choose an available appointment time directly, or use the form to explain your problem first.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-xl bg-[#D4AF37] px-6 py-3.5 font-semibold text-[#18140D] transition hover:bg-white">Choose a time on Calendly ↗</a>
            <p className="mt-5 text-sm text-white/70">
              Prefer email?{" "}
              <a href="mailto:hello@firstlightai.co.uk" className="font-semibold text-[#D4AF37] underline-offset-4 hover:underline">hello@firstlightai.co.uk</a>
            </p>
          </div>
          <form action="https://formspree.io/f/xgobqnbn" method="POST" className="grid gap-4">
            <div>
              <label htmlFor="lead-name" className="mb-1 block text-sm font-medium">Name *</label>
              <input id="lead-name" name="name" autoComplete="name" required className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-[#18140D] outline-none focus:border-[#D4AF37]" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="lead-email" className="mb-1 block text-sm font-medium">Email *</label>
              <input id="lead-email" name="email" type="email" autoComplete="email" required className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-[#18140D] outline-none focus:border-[#D4AF37]" placeholder="you@company.co.uk" />
            </div>
            <div>
              <label htmlFor="lead-company" className="mb-1 block text-sm font-medium">Company <span className="font-normal text-white/60">(optional)</span></label>
              <input id="lead-company" name="company" autoComplete="organization" className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-[#18140D] outline-none focus:border-[#D4AF37]" placeholder="Company or organisation" />
            </div>
            <div>
              <label htmlFor="lead-problem" className="mb-1 block text-sm font-medium">What would you like help with? *</label>
              <textarea id="lead-problem" name="workflow_problem" required rows={3} className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-[#18140D] outline-none focus:border-[#D4AF37]" placeholder="A sentence or two is enough to get started." />
            </div>
            <input type="hidden" name="_subject" value="New FirstLight website enquiry" />
            <button type="submit" className="rounded-xl bg-[#D4AF37] px-6 py-3.5 font-semibold text-[#18140D] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Send my enquiry
            </button>
            <p className="text-xs text-white/60">We use your details to reply. Read our <a href="/privacy" className="font-semibold text-[#D4AF37] underline">privacy policy</a>. Prefer to meet? <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#D4AF37] underline">Choose a time</a>.</p>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#EADFCA] px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[#6B604D] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold tracking-[0.15em] text-[#18140D]">FIRSTLIGHT AI</p>
            <p className="mt-1">Clean process first. Useful AI second.</p>
            <p className="mt-2 text-xs">A trading name of Fleming Engineers Ltd · Company no. 13863332</p>
          </div>
          <div className="flex flex-wrap gap-5">
            <a href="/beacon-framework" className="hover:text-[#BA7517]">Our approach</a>
            <a href="/privacy" className="hover:text-[#BA7517]">Privacy policy</a>
            <a href="https://www.linkedin.com/company/firstlightai/" target="_blank" rel="noreferrer" className="hover:text-[#BA7517]">LinkedIn</a>
            <a href="mailto:hello@firstlightai.co.uk" className="hover:text-[#BA7517]">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
