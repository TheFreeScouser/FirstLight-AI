"use client";

import { useState } from "react";

const painPoints = [
  "Information lives in spreadsheets and inboxes",
  "Work relies on one person knowing how it all fits together",
  "You copy data between systems and still miss things",
  "Reports take too long to pull together",
  "There is no single source of truth across your tools",
  "Leads and enquiries get followed up too late",
];

const engagementSteps = [
  {
    number: "01",
    title: "Beacon Workflow Audit",
    text: "Choose one important workflow, map how it really works and identify the highest-value improvement.",
    output: "Current-state map, wasted-time estimate, failure points, future-state design and fixed implementation proposal.",
  },
  {
    number: "02",
    title: "Workflow Implementation",
    text: "Simplify the process first, then build the automation, integration or AI tool that removes the friction.",
    output: "Working solution, testing, documentation, team handover and agreed success measures.",
  },
  {
    number: "03",
    title: "Managed Improvement",
    text: "Keep the system useful after launch through monitoring, support and measured improvements.",
    output: "Regular reviews, small changes, workflow optimisation and a clear improvement backlog.",
  },
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

const pricing = [
  {
    label: "Core starting point",
    title: "Beacon Workflow Audit",
    price: "£2,500 fixed",
    text: "A focused 10-working-day engagement around one important business process.",
    includes: "Discovery, workflow mapping, wasted-time and risk assessment, future-state design, automation opportunities and a fixed implementation proposal.",
    note: "Proceed with the implementation within 30 days and the £2,500 audit fee is credited against the project.",
    featured: true,
  },
  {
    label: "Build and implement",
    title: "Workflow Automation Project",
    price: "Typically £5,000–£15,000",
    text: "Improve one painful workflow with focused automation, cleaner data flow and clearer handovers.",
    includes: "Solution design, implementation, testing, documentation, training and launch support.",
    note: "A fixed scope, success measure and price are agreed before work begins.",
    featured: false,
  },
  {
    label: "More complex systems",
    title: "AI & Automation Systems",
    price: "Quoted to scope",
    text: "For projects involving custom AI, multiple integrations, dashboards or internal operational tools.",
    includes: "Technical discovery, phased delivery, risk controls, testing and adoption support.",
    note: "Complex work is broken into clear stages so you do not commit to a large build before the value is proven.",
    featured: false,
  },
  {
    label: "Ongoing support",
    title: "Managed Improvement",
    price: "£1,000–£2,500/month",
    text: "Ongoing support, optimisation and measured improvement for systems FirstLight has helped put in place.",
    includes: "Monitoring, small changes, workflow reviews, team support and a prioritised improvement backlog.",
    note: "The monthly level is based on the number and complexity of systems supported.",
    featured: false,
  },
];

const beaconSteps = [
  ["B0", "Signal", "Spot the real problem"],
  ["B1", "Shape", "Define the workflow"],
  ["B2", "Proof", "Validate the need"],
  ["B3", "Blueprint", "Map requirements"],
  ["B4", "Build", "Create the system"],
  ["B5", "Trust", "Review risk"],
  ["B6", "Launch", "Go live carefully"],
  ["B7", "Learn", "Collect feedback"],
  ["B8", "Scale", "Extend what works"],
];

export default function FirstLightPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBFAF7] text-[#18140D]">
      <header className="sticky top-0 z-50 border-b border-[#EADFCA]/80 bg-[#FBFAF7]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative flex h-8 w-8 items-center justify-center text-[#BA7517]">
              <span className="absolute h-px w-8 bg-current" />
              <span className="absolute h-8 w-px bg-current" />
              <span className="absolute h-5 w-5 rotate-45 border border-current" />
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-[0.18em]">FIRSTLIGHT AI</span>
              <span className="hidden text-xs text-[#6B604D] sm:block">Clean process first. Useful AI second.</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-[#6B604D] md:flex">
            <a href="#services" className="hover:text-[#BA7517]">Services</a>
            <a href="#pricing" className="hover:text-[#BA7517]">Pricing</a>
            <a href="#work" className="hover:text-[#BA7517]">Work</a>
            <a href="#beacon" className="hover:text-[#BA7517]">Beacon Framework</a>
            <a href="#about" className="hover:text-[#BA7517]">About</a>
          </nav>

          <a href="#contact" className="rounded-full bg-[#BA7517] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18140D]">
            Book a fit call
          </a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.20),transparent_35%),linear-gradient(135deg,rgba(186,117,23,0.08),transparent_40%)]" />
        <div className="absolute right-0 top-20 hidden h-72 w-[48rem] bg-gradient-to-r from-[#D4AF37]/20 via-[#BA7517]/10 to-transparent blur-2xl lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-8 inline-flex rounded-full border border-[#EADFCA] bg-white/70 px-4 py-2 text-sm font-medium text-[#6B604D] shadow-sm">
              Process improvement, workflow automation and practical AI
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl md:leading-[1.02]">
              Find where your business is wasting time. Then fix it properly.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6B604D] md:text-xl">
              FirstLight helps businesses measure the cost of messy processes, redesign the workflow and automate the work that should not stay manual.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6B604D]">
              No vague transformation programme. No AI for the sake of it. One important workflow, one clear business case and a practical route from problem to working solution.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="rounded-2xl bg-[#BA7517] px-7 py-4 text-center font-semibold text-white shadow-sm transition hover:bg-[#18140D]">
                Book a 20-minute fit call →
              </a>
              <a href="#pricing" className="rounded-2xl border border-[#D8C99F] bg-white/70 px-7 py-4 text-center font-semibold text-[#18140D] transition hover:border-[#BA7517]">
                View the offer
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#6B604D]">
              <span>• Founder-led</span>
              <span>• Fixed scope</span>
              <span>• Measurable business outcomes</span>
            </div>
          </div>

          <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-[#EADFCA] bg-[#18140D] p-8 text-white shadow-[0_30px_80px_rgba(24,20,13,0.18)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(212,175,55,0.35),transparent_22%),linear-gradient(135deg,rgba(251,250,247,0.08),transparent_45%)]" />
            <div className="absolute right-8 top-16 h-24 w-24 rounded-t-full border-2 border-[#D4AF37] opacity-90" />
            <div className="absolute right-16 top-40 h-28 w-10 border-x-2 border-[#D4AF37]" />
            <div className="absolute right-5 top-28 h-24 w-[26rem] -rotate-6 bg-gradient-to-r from-[#D4AF37]/40 to-transparent blur-md" />
            <div className="relative max-w-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">Core offer</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight">Beacon Workflow Audit</h2>
              <p className="mt-4 text-2xl font-semibold text-[#D4AF37]">£2,500 fixed · 10 working days</p>
              <p className="mt-5 leading-7 text-white/70">
                Map one important process, find the real cost of the friction and leave with a practical future-state design and fixed implementation proposal.
              </p>
              <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-white/75">
                Continue into implementation within 30 days and the audit fee is credited against the project.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#EADFCA] bg-white/50 px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Signs your workflow is costing you time and money</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6B604D]">
            Most businesses do not need more software. They need simpler workflows, clearer ownership and better data flow.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {painPoints.map((point) => (
              <div key={point} className="rounded-3xl border border-[#EADFCA] bg-[#FBFAF7] p-5 text-sm leading-6 shadow-[0_12px_40px_rgba(38,31,18,0.04)]">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F6E9CC] text-[#BA7517]">✦</div>
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">How engagements work</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Diagnose first. Build second. Improve what works.</h2>
            <p className="mt-5 text-lg leading-8 text-[#6B604D]">
              FirstLight starts with the process and the business case, not a pre-selected tool.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {engagementSteps.map((step) => (
              <div key={step.title} className="rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#18140D]">{step.number}</div>
                <h3 className="mt-6 text-2xl font-semibold">{step.title}</h3>
                <p className="mt-4 leading-7 text-[#6B604D]">{step.text}</p>
                <div className="mt-6 rounded-2xl bg-[#FBFAF7] p-5 text-sm leading-6 text-[#6B604D]">
                  <span className="font-semibold text-[#18140D]">Output:</span> {step.output}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">What FirstLight helps with</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">An engineering approach to better business workflows.</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="rounded-[2rem] border border-[#EADFCA] bg-white p-7 shadow-[0_15px_50px_rgba(38,31,18,0.05)] transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 h-10 w-10 rounded-full border border-[#D4AF37] bg-[#FBFAF7]" />
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#6B604D]">{service.text}</p>
                <p className="mt-5 text-sm leading-6 text-[#6B604D]"><span className="font-semibold text-[#18140D]">Examples:</span> {service.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-y border-[#EADFCA] bg-white/55 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">Transparent pricing</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">A clear starting point, not a vague day rate.</h2>
            <p className="mt-5 text-lg leading-8 text-[#6B604D]">
              Every engagement is scoped around the business problem, the complexity of delivery and the value of fixing it. You will know the scope and price before work begins.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {pricing.map((item) => (
              <div key={item.title} className={`rounded-[2rem] border p-8 shadow-[0_18px_55px_rgba(38,31,18,0.05)] ${item.featured ? "border-[#D4AF37] bg-[#18140D] text-white" : "border-[#EADFCA] bg-[#FBFAF7]"}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${item.featured ? "text-[#D4AF37]" : "text-[#BA7517]"}`}>{item.label}</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className={`shrink-0 text-lg font-semibold ${item.featured ? "text-[#D4AF37]" : "text-[#BA7517]"}`}>{item.price}</p>
                </div>
                <p className={`mt-5 leading-7 ${item.featured ? "text-white/75" : "text-[#6B604D]"}`}>{item.text}</p>
                <div className={`mt-6 rounded-2xl border p-5 text-sm leading-6 ${item.featured ? "border-white/10 bg-white/[0.05] text-white/75" : "border-[#EADFCA] bg-white text-[#6B604D]"}`}>
                  <span className={item.featured ? "font-semibold text-white" : "font-semibold text-[#18140D]"}>Typically includes:</span> {item.includes}
                </div>
                <p className={`mt-5 text-sm leading-6 ${item.featured ? "text-white/65" : "text-[#6B604D]"}`}>{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] bg-[#18140D] p-8 text-white md:flex md:items-center md:justify-between md:gap-10">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-semibold">A smaller pilot may still be possible.</h3>
              <p className="mt-3 leading-7 text-white/70">
                Tightly scoped micro-projects can start from £1,500 where there is one narrow workflow, one clear output and limited integration work. This is not the default for larger operational problems.
              </p>
            </div>
            <a href="#contact" className="mt-6 inline-flex shrink-0 rounded-2xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#18140D] transition hover:bg-white md:mt-0">Discuss the workflow →</a>
          </div>
        </div>
      </section>

      <section id="beacon" className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">The Beacon Framework</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">A structured route from messy process to useful system.</h2>
            <p className="mt-5 leading-7 text-[#6B604D]">Beacon keeps the work focused, commercially useful and low risk.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-9">
            {beaconSteps.map(([code, title, text]) => (
              <div key={code} className="rounded-2xl border border-[#EADFCA] bg-[#FBFAF7] p-4 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#BA7517] text-xs font-bold text-white">{code.replace("B", "")}</div>
                <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#6B604D]">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="/beacon-framework" className="font-semibold text-[#BA7517] hover:text-[#18140D]">View the full Beacon Framework →</a>
          </div>
        </div>
      </section>

      <section id="work" className="bg-[#18140D] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">Featured work / proof</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Focused systems built around real workflows.</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Commercial build</p>
              <h3 className="mt-4 text-3xl font-semibold">QatarMatch AI</h3>
              <p className="mt-5 leading-7 text-white/70">A property matching engine that turns a natural-language brief into a ranked shortlist and a better structured sales enquiry.</p>
              <div className="mt-7 grid gap-3 rounded-3xl bg-black/20 p-5 text-sm text-white/70">
                <p><span className="font-semibold text-white">Problem:</span> Prospects browse too many listings and leads arrive without enough structure.</p>
                <p><span className="font-semibold text-white">System:</span> Natural-language search, ranked matches, explanations, lead capture and WhatsApp handoff.</p>
              </div>
              <a href="https://qatarmatch-ai.vercel.app/" target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-2xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#18140D] transition hover:bg-white">Try live demo →</a>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Concept lab</p>
              <h3 className="mt-4 text-3xl font-semibold">OnlyLids</h3>
              <p className="mt-5 leading-7 text-white/70">A discovery companion showing how search, recommendation and tagging can make a large content archive easier to explore.</p>
              <div className="mt-7 grid gap-3 rounded-3xl bg-black/20 p-5 text-sm text-white/70">
                <p><span className="font-semibold text-white">Problem:</span> Fans struggle to navigate a large long-form archive.</p>
                <p><span className="font-semibold text-white">System:</span> Recommendations, public metadata, mood tags and search-ready content structure.</p>
              </div>
              <a href="https://onlylids.vercel.app/" target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-2xl border border-[#D4AF37] px-6 py-3 font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#18140D]">View project →</a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)]">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#18140D] text-3xl font-semibold text-[#D4AF37]">RF</div>
            <h2 className="mt-8 text-3xl font-semibold tracking-tight">Built by Ryan Fleming</h2>
            <p className="mt-5 leading-7 text-[#6B604D]">FirstLight is led by an engineering programme professional with experience delivering complex vehicle, technology and process-improvement programmes.</p>
            <p className="mt-4 leading-7 text-[#6B604D]">The approach combines engineering discipline, process thinking and practical automation rather than selling AI as the answer to every problem.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.05)]">
              <h3 className="text-xl font-semibold">Best fit</h3>
              <p className="mt-4 leading-7 text-[#6B604D]">Manufacturers, engineering teams, professional services firms and SMEs with process-heavy operational work.</p>
            </div>
            <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.05)]">
              <h3 className="text-xl font-semibold">Based in Liverpool, UK</h3>
              <p className="mt-4 leading-7 text-[#6B604D]">Working with businesses across the UK through focused audit, implementation and support engagements.</p>
            </div>
            <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.05)] md:col-span-2">
              <h3 className="text-xl font-semibold">What makes the approach different</h3>
              <p className="mt-4 leading-7 text-[#6B604D]">FirstLight measures the operational problem, improves the process and only then applies automation or AI where it produces a clear, useful result.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-[#18140D] p-8 text-white shadow-[0_30px_80px_rgba(24,20,13,0.18)] lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">20-minute fit call</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Have a workflow worth fixing?</h2>
            <p className="mt-5 leading-7 text-white/70">Send a short brief. I will review the problem and tell you whether it is a good fit for a Beacon Workflow Audit, a smaller pilot or no project at all.</p>
            <p className="mt-6 text-sm leading-6 text-white/60">No pressure and no AI theatre. Just a practical conversation about the cost of the current process and what better could look like.</p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/70">
              <span className="font-semibold text-white">Email:</span>{" "}
              <a href="mailto:hello@firstlightai.co.uk" className="text-[#D4AF37] hover:underline">hello@firstlightai.co.uk</a>
            </div>
          </div>

          <form action="https://formspree.io/f/xgobqnbn" method="POST" onSubmit={() => setSubmitted(true)} className="grid gap-4">
            <input name="name" required className="rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]" placeholder="Name" />
            <input name="email" type="email" required className="rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]" placeholder="Email" />
            <input name="company" className="rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]" placeholder="Company / organisation" />
            <textarea name="workflow_problem" required className="min-h-28 rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]" placeholder="What workflow feels messy, slow or too manual?" />
            <textarea name="current_process" className="min-h-24 rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]" placeholder="What currently happens? Include tools, spreadsheets, systems or handovers if useful." />
            <textarea name="ideal_outcome" className="min-h-24 rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]" placeholder="What would better look like? Less admin, fewer missed actions, faster reporting, clearer data flow, etc." />
            <button className="rounded-2xl bg-[#D4AF37] px-6 py-4 font-semibold text-[#18140D] transition hover:bg-white">
              {submitted ? "Brief received" : "Discuss your workflow"}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#EADFCA] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#6B604D] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold tracking-[0.18em] text-[#18140D]">FIRSTLIGHT AI</p>
            <p className="mt-1">Clean process first. Useful AI second.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="https://www.linkedin.com/company/firstlightai/" target="_blank" rel="noreferrer" className="hover:text-[#BA7517]">LinkedIn</a>
            <a href="#pricing" className="hover:text-[#BA7517]">Pricing</a>
            <a href="mailto:hello@firstlightai.co.uk" className="hover:text-[#BA7517]">hello@firstlightai.co.uk</a>
            <a href="/beacon-framework" className="hover:text-[#BA7517]">Beacon Framework</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
