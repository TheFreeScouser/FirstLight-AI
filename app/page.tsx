"use client";

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
    price: "£5,000",
    priceNote: "Average project fee",
    label: "Build a useful solution",
    description: "An AI tool, automated workflow or system integration designed around a clearly defined problem, with testing, documentation and handover.",
    note: "£5,000 is a typical planning figure, not a fixed price or minimum. Each project is scoped and quoted individually.",
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
          <a href="#top" aria-label="FirstLight AI home" className="flex items-center gap-3">
            <span aria-hidden="true" className="relative flex h-8 w-8 shrink-0 items-center justify-center text-[#BA7517]">
              <span className="absolute h-px w-8 bg-current" />
              <span className="absolute h-8 w-px bg-current" />
              <span className="absolute h-5 w-5 rotate-45 border border-current" />
            </span>
            <span className="text-sm font-semibold tracking-[0.16em] sm:text-base">FIRSTLIGHT AI</span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm text-[#6B604D] md:flex">
            <a href="#services" className="hover:text-[#BA7517]">Services</a>
            <a href="#how-it-works" className="hover:text-[#BA7517]">How it works</a>
            <a href="#pricing" className="hover:text-[#BA7517]">Pricing</a>
          </nav>
          <a href="#contact" className="rounded-full bg-[#BA7517] px-4 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-[#18140D] sm:px-5 sm:text-sm">
            Request a call
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
              <a href="#contact" className={buttonPrimary}>Request a 20-minute fit call</a>
              <a href="#services" className={buttonSecondary}>See how we help</a>
            </div>
            <p className="mt-6 text-sm text-[#6B604D]">Founder-led · Fixed scope · Measurable business outcomes</p>
          </div>

          <aside className="rounded-3xl bg-[#18140D] p-7 text-white shadow-[0_20px_55px_rgba(24,20,13,0.12)] sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Simple, transparent pricing</p>
            <h2 className="mt-4 text-3xl font-semibold">A practical way to get started.</h2>
            <div className="mt-7 divide-y divide-white/15">
              <div className="flex items-baseline justify-between gap-4 py-4">
                <p className="font-medium">Workflow Audit</p>
                <p className="shrink-0 text-xl font-semibold text-[#D4AF37]">£2,500</p>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <div>
                  <p className="font-medium">AI Implementation</p>
                  <p className="mt-1 text-xs text-white/60">Average project fee</p>
                </div>
                <p className="shrink-0 text-xl font-semibold text-[#D4AF37]">£5,000</p>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <p className="font-medium">Ongoing Support</p>
                <p className="shrink-0 text-xl font-semibold text-[#D4AF37]">£200<span className="text-xs font-normal text-white/65">/month</span></p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/70">
              Not every project needs a full audit. We'll suggest the simplest appropriate starting point. Implementation is individually scoped and quoted.
            </p>
            <a href="#contact" className="mt-6 inline-flex font-semibold text-[#D4AF37] underline-offset-4 hover:underline">
              Talk through your project →
            </a>
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

      <section id="work" className="border-y border-[#EADFCA] bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Example of our work</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Practical tools built around real problems.</h2>
            <p className="mt-4 leading-7 text-[#6B604D]">
              We combine engineering discipline, process thinking and practical automation rather than selling AI as the answer to every problem.
            </p>
            <p className="mt-5 text-sm leading-6 text-[#6B604D]">
              <span className="font-semibold text-[#18140D]">Founder-led by Ryan Fleming.</span> Based in Liverpool and working with UK manufacturers, engineering teams, professional services firms and SMEs.
            </p>
          </div>
          <article className="rounded-3xl bg-[#18140D] p-7 text-white sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Featured project</p>
            <h3 className="mt-3 text-2xl font-semibold">QatarMatch AI</h3>
            <p className="mt-4 leading-7 text-white/75">
              A property matching engine that turns natural-language briefs into ranked shortlists and better structured sales enquiries.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Natural-language search, ranked matches, explanations, lead capture and WhatsApp handoff.
            </p>
            <a href="https://qatarmatch-ai.vercel.app/" target="_blank" rel="noreferrer" className="mt-6 inline-flex font-semibold text-[#D4AF37] underline-offset-4 hover:underline">
              Explore the live demo ↗
            </a>
          </article>
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
            <p className="max-w-xl text-sm leading-6 text-[#6B604D]">Not sure which fits? Request a free 20-minute conversation and we'll help you work out the right next step.</p>
            <a href="#contact" className={buttonPrimary}>Request a fit call</a>
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
              Request a 20-minute fit call. No pressure and no AI theatre, just a practical conversation.
            </p>
            <p className="mt-7 text-sm text-white/70">
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
              Request a fit call
            </button>
            <p className="text-xs text-white/60">Submitting this form sends us your enquiry so we can contact you. No appointment is booked automatically.</p>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#EADFCA] px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[#6B604D] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold tracking-[0.15em] text-[#18140D]">FIRSTLIGHT AI</p>
            <p className="mt-1">Clean process first. Useful AI second.</p>
          </div>
          <div className="flex flex-wrap gap-5">
            <a href="/beacon-framework" className="hover:text-[#BA7517]">Our approach</a>
            <a href="https://www.linkedin.com/company/firstlightai/" target="_blank" rel="noreferrer" className="hover:text-[#BA7517]">LinkedIn</a>
            <a href="mailto:hello@firstlightai.co.uk" className="hover:text-[#BA7517]">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
