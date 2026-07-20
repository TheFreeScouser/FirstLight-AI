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

const services = [
  {
    title: "Workflow automation",
    text: "Remove repetitive admin, manual handovers and copy/paste work across your systems.",
    examples: "Onboarding, approvals, reporting, data updates, task handovers.",
  },
  {
    title: "AI systems & tools",
    text: "Build practical AI tools that improve decisions, surface insights and speed up operations.",
    examples: "Lead scoring, document Q&A, matching engines, recommendations.",
  },
  {
    title: "CRM & process clean-up",
    text: "Fix messy data, unclear ownership and underused CRMs before adding more automation.",
    examples: "CRM setup, data clean-up, process mapping, automation readiness.",
  },
  {
    title: "Discovery & blueprint",
    text: "Map the workflow, find the biggest opportunities and design a realistic first build.",
    examples: "Process maps, use cases, AI opportunities, risk checks, build roadmap.",
  },
];

const offers = [
  {
    number: "01",
    title: "Beacon Audit",
    text: "Map the workflow, identify friction and choose the best first AI or automation opportunity.",
    output: "Workflow review, pain-point list, automation opportunities, recommended first build.",
  },
  {
    number: "02",
    title: "Beacon Blueprint",
    text: "Turn the chosen use case into a buildable plan with logic, user journeys, data needs and risks.",
    output: "Process map, user journeys, AI logic, risk controls and build plan.",
  },
  {
    number: "03",
    title: "Beacon Build",
    text: "Create a focused working tool, test it with real users and improve it using feedback.",
    output: "Prototype/MVP, testing, feedback loop and launch support.",
  },
];

const pricing = [
  {
    label: "Start here",
    title: "Beacon Discovery & Blueprint",
    price: "From £1,500",
    text: "Understand the workflow, identify the highest-value opportunity and leave with a practical, buildable plan.",
    includes: "Discovery session, process mapping, opportunity assessment and recommended roadmap.",
  },
  {
    label: "Most common",
    title: "Workflow Automation Project",
    price: "Typically £2,500–£7,500",
    text: "Improve one painful workflow with focused automation, better data flow and clearer handovers.",
    includes: "Scoped design, implementation, testing, documentation and handover.",
  },
  {
    label: "Larger builds",
    title: "AI & Automation Systems",
    price: "Quoted to scope",
    text: "For more complex systems involving custom AI, multiple integrations, dashboards or internal tools.",
    includes: "Fixed scope and pricing agreed before build begins.",
  },
  {
    label: "Ongoing support",
    title: "Managed Support",
    price: "From £750/month",
    text: "Ongoing optimisation, support and improvement for systems FirstLight has helped put in place.",
    includes: "Monitoring, workflow improvements, small changes and regular review.",
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

  function handleSubmit() {
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#FBFAF7] text-[#18140D]">
      {/* NAV */}
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

          <a
            href="#contact"
            className="rounded-full bg-[#BA7517] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18140D]"
          >
            Book a discovery call
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.20),transparent_35%),linear-gradient(135deg,rgba(186,117,23,0.08),transparent_40%)]" />
        <div className="absolute right-0 top-20 hidden h-72 w-[48rem] bg-gradient-to-r from-[#D4AF37]/20 via-[#BA7517]/10 to-transparent blur-2xl lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-8 inline-flex rounded-full border border-[#EADFCA] bg-white/70 px-4 py-2 text-sm font-medium text-[#6B604D] shadow-sm">
              AI automation consultancy for small teams with messy workflows
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl md:leading-[1.02]">
              Practical AI systems that start with your process, not the hype.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6B604D] md:text-xl">
              FirstLight AI helps businesses simplify messy workflows, reduce repeated admin and turn scattered information into useful AI-powered tools.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6B604D]">
              No vague transformation programme. No AI for the sake of it. Just focused systems built around one painful workflow at a time.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="rounded-2xl bg-[#BA7517] px-7 py-4 text-center font-semibold text-white shadow-sm transition hover:bg-[#18140D]"
              >
                Book a 20-minute discovery call →
              </a>
              <a
                href="#pricing"
                className="rounded-2xl border border-[#D8C99F] bg-white/70 px-7 py-4 text-center font-semibold text-[#18140D] transition hover:border-[#BA7517]"
              >
                View pricing
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#6B604D]">
              <span>• Founder-led</span>
              <span>• Fast to move</span>
              <span>• Built for real business workflows</span>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[#EADFCA] bg-[#18140D] p-8 text-white shadow-[0_30px_80px_rgba(24,20,13,0.18)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(212,175,55,0.35),transparent_22%),linear-gradient(135deg,rgba(251,250,247,0.08),transparent_45%)]" />
            <div className="absolute right-8 top-16 h-24 w-24 rounded-t-full border-2 border-[#D4AF37] opacity-90" />
            <div className="absolute right-16 top-40 h-28 w-10 border-x-2 border-[#D4AF37]" />
            <div className="absolute right-5 top-28 h-24 w-[26rem] -rotate-6 bg-gradient-to-r from-[#D4AF37]/40 to-transparent blur-md" />
            <div className="relative max-w-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">Core message</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight">
                Clean process first. Useful AI second.
              </h2>
              <p className="mt-5 leading-7 text-white/70">
                The best AI project usually starts by making the workflow clear: who owns the data, where the handovers break, and what the system should actually improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-y border-[#EADFCA] bg-white/50 px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Signs your workflow is costing you time, money and sanity
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6B604D]">
            Most businesses do not need more AI tools. They need simpler workflows, clearer ownership and better data flow.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {painPoints.map((point) => (
              <div key={point} className="rounded-3xl border border-[#EADFCA] bg-[#FBFAF7] p-5 text-sm leading-6 text-[#18140D] shadow-[0_12px_40px_rgba(38,31,18,0.04)]">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F6E9CC] text-[#BA7517]">✦</div>
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER LADDER */}
      <section id="services" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">How engagements start</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Start small. Prove value. Then build.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6B604D]">
              The Beacon approach keeps projects practical: understand the process, design the right first opportunity, then build only what is useful.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {offers.map((offer) => (
              <div key={offer.title} className="rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#18140D]">
                  {offer.number}
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{offer.title}</h3>
                <p className="mt-4 leading-7 text-[#6B604D]">{offer.text}</p>
                <div className="mt-6 rounded-2xl bg-[#FBFAF7] p-5 text-sm leading-6 text-[#6B604D]">
                  <span className="font-semibold text-[#18140D]">Output:</span> {offer.output}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">What FirstLight builds</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">Clean up the process, then apply the right AI or automation.</h2>
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

      {/* PRICING */}
      <section id="pricing" className="border-y border-[#EADFCA] bg-white/55 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">Transparent pricing</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Know the ballpark before we talk.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6B604D]">
              No mystery pricing and no sales call just to discover whether we are in the same budget range. These are typical starting points; every project is scoped around the actual problem.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {pricing.map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-[#EADFCA] bg-[#FBFAF7] p-8 shadow-[0_18px_55px_rgba(38,31,18,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BA7517]">{item.label}</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="shrink-0 text-lg font-semibold text-[#BA7517]">{item.price}</p>
                </div>
                <p className="mt-5 leading-7 text-[#6B604D]">{item.text}</p>
                <div className="mt-6 rounded-2xl border border-[#EADFCA] bg-white p-5 text-sm leading-6 text-[#6B604D]">
                  <span className="font-semibold text-[#18140D]">Typically includes:</span> {item.includes}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] bg-[#18140D] p-8 text-white md:flex md:items-center md:justify-between md:gap-10">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-semibold">Need a smaller starting point?</h3>
              <p className="mt-3 leading-7 text-white/70">
                A narrower pilot can often be scoped around one clear workflow and one measurable outcome. We will always agree the scope and a fixed price before work begins.
              </p>
            </div>
            <a href="#contact" className="mt-6 inline-flex shrink-0 rounded-2xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#18140D] transition hover:bg-white md:mt-0">
              Discuss your workflow →
            </a>
          </div>
        </div>
      </section>

      {/* BEACON */}
      <section id="beacon" className="px-6 pb-24 pt-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">The Beacon Framework</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">A structured method from messy idea to useful system.</h2>
            <p className="mt-5 leading-7 text-[#6B604D]">
              AI projects fail when they skip structure. Beacon keeps the work focused, practical and low risk.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-9">
            {beaconSteps.map(([code, title, text]) => (
              <div key={code} className="rounded-2xl border border-[#EADFCA] bg-[#FBFAF7] p-4 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#BA7517] text-xs font-bold text-white">
                  {code.replace("B", "")}
                </div>
                <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#6B604D]">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="/beacon-framework" className="font-semibold text-[#BA7517] hover:text-[#18140D]">
              View the full Beacon Framework →
            </a>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="bg-[#18140D] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">Featured work / proof</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Practical AI systems, built around real workflows.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Live builds show how focused workflow thinking can become working software quickly.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Commercial build</p>
              <h3 className="mt-4 text-3xl font-semibold">QatarMatch AI</h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">AI property matching engine for real estate lead conversion</p>
              <p className="mt-5 leading-7 text-white/70">
                Users describe what they want. QatarMatch ranks the best-fit properties, explains the match, captures the enquiry and creates a WhatsApp-ready lead.
              </p>
              <div className="mt-7 grid gap-3 rounded-3xl bg-black/20 p-5 text-sm text-white/70">
                <p><span className="font-semibold text-white">Problem:</span> Prospects browse too many listings and leads arrive without enough structure.</p>
                <p><span className="font-semibold text-white">System:</span> Natural language search, ranked shortlist, match score, lead capture and WhatsApp handoff.</p>
                <p><span className="font-semibold text-white">Beacon stage:</span> B6 Launch / B7 Learn</p>
              </div>
              <a href="https://qatarmatch-ai.vercel.app/" target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-2xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#18140D] transition hover:bg-white">
                Try live demo →
              </a>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Concept lab</p>
              <h3 className="mt-4 text-3xl font-semibold">OnlyLids</h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Fan-built discovery companion</p>
              <p className="mt-5 leading-7 text-white/70">
                A fan-built project showing how search, recommendation and tagging can make large content archives easier to explore.
              </p>
              <div className="mt-7 grid gap-3 rounded-3xl bg-black/20 p-5 text-sm text-white/70">
                <p><span className="font-semibold text-white">Problem:</span> Fans struggle to navigate a large long-form podcast archive.</p>
                <p><span className="font-semibold text-white">System:</span> Recommendations, public YouTube metadata, mood tags and search-ready content structure.</p>
                <p><span className="font-semibold text-white">Beacon stage:</span> B4 Build / B5 Trust</p>
              </div>
              <a href="https://onlylids.vercel.app/" target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-2xl border border-[#D4AF37] px-6 py-3 font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#18140D]">
                View project →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)]">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#18140D] text-3xl font-semibold text-[#D4AF37]">
              RF
            </div>
            <h2 className="mt-8 text-3xl font-semibold tracking-tight">Built by Ryan Fleming</h2>
            <p className="mt-5 leading-7 text-[#6B604D]">
              FirstLight AI is led by Ryan Fleming, an engineering programme professional with experience delivering complex vehicle and technology programmes.
            </p>
            <p className="mt-4 leading-7 text-[#6B604D]">
              I started FirstLight to help small teams use AI in a practical way: not as a gimmick, but as a way to reduce admin, improve decisions and make messy processes easier to run.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.05)]">
              <h3 className="text-xl font-semibold">Best fit</h3>
              <p className="mt-4 leading-7 text-[#6B604D]">
                Founders, operators, accountants, manufacturing firms, service businesses, engineering teams and SMEs with process-heavy work.
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.05)]">
              <h3 className="text-xl font-semibold">Based in Liverpool, UK</h3>
              <p className="mt-4 leading-7 text-[#6B604D]">
                Working with businesses across the UK through focused discovery, blueprint and build engagements.
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.05)] md:col-span-2">
              <h3 className="text-xl font-semibold">How FirstLight works</h3>
              <p className="mt-4 leading-7 text-[#6B604D]">
                We do not replace your systems overnight. We improve the workflow around them, clean up the process, and build useful AI or automation where it genuinely removes friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-[#18140D] p-8 text-white shadow-[0_30px_80px_rgba(24,20,13,0.18)] lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">Discovery conversation</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Have a messy workflow worth fixing?
            </h2>
            <p className="mt-5 leading-7 text-white/70">
              Send a short brief and I will review the workflow, then tell you whether it looks like a good fit for a Beacon Audit.
            </p>
            <p className="mt-6 text-sm leading-6 text-white/60">
              No pressure. No jargon. Just a practical conversation about where AI or automation could remove friction.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/70">
              <span className="font-semibold text-white">Email:</span>{" "}
              <a href="mailto:hello@firstlightai.co.uk" className="text-[#D4AF37] hover:underline">
                hello@firstlightai.co.uk
              </a>
            </div>
          </div>

          <form
            action="https://formspree.io/f/xgobqnbn"
            method="POST"
            onSubmit={handleSubmit}
            className="grid gap-4"
          >
            <input
              name="name"
              required
              className="rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]"
              placeholder="Name"
            />
            <input
              name="email"
              type="email"
              required
              className="rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]"
              placeholder="Email"
            />
            <input
              name="company"
              className="rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]"
              placeholder="Company / organisation"
            />
            <textarea
              name="workflow_problem"
              required
              className="min-h-28 rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]"
              placeholder="What workflow feels messy, slow or too manual?"
            />
            <textarea
              name="current_process"
              className="min-h-24 rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]"
              placeholder="What currently happens? Include tools, spreadsheets, CRM or handovers if useful."
            />
            <textarea
              name="ideal_outcome"
              className="min-h-24 rounded-2xl border border-white/10 bg-white p-4 text-[#18140D] outline-none transition focus:border-[#D4AF37]"
              placeholder="What would better look like? Less admin, faster follow-up, clearer reporting, better data flow, etc."
            />
            <button className="rounded-2xl bg-[#D4AF37] px-6 py-4 font-semibold text-[#18140D] transition hover:bg-white">
              {submitted ? "Brief received" : "Start with a workflow audit"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#EADFCA] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#6B604D] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold tracking-[0.18em] text-[#18140D]">FIRSTLIGHT AI</p>
            <p className="mt-1">Clean process first. Useful AI second.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="https://www.linkedin.com/company/firstlightai/" target="_blank" rel="noreferrer" className="hover:text-[#BA7517]">
              LinkedIn
            </a>
            <a href="#pricing" className="hover:text-[#BA7517]">
              Pricing
            </a>
            <a href="mailto:hello@firstlightai.co.uk" className="hover:text-[#BA7517]">
              hello@firstlightai.co.uk
            </a>
            <a href="/beacon-framework" className="hover:text-[#BA7517]">
              Beacon Framework
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
