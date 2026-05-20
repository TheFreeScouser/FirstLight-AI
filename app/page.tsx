"use client";

import { useState } from "react";

export default function FirstLightPage() {
  const [submitted, setSubmitted] = useState(false);

function handleSubmit() {
  setSubmitted(true);
}

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#18140d]">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-[#eadfca]/70 bg-[#fbfaf7]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="text-xl font-semibold tracking-tight">
            FirstLight AI
          </a>

          <nav className="hidden gap-8 text-sm text-[#6b604d] md:flex">
            <a href="#work" className="hover:text-[#9a7624]">
              Work
            </a>
            <a href="#process" className="hover:text-[#9a7624]">
              Process
            </a>
            <a href="#submit" className="hover:text-[#9a7624]">
              Submit Idea
            </a>
            <a href="/beacon-framework" className="hover:text-[#9a7624]">
              Beacon Framework
            </a>
          </nav>

          <a
            href="#submit"
            className="rounded-full bg-[#18140d] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3a3022]"
          >
            Start a build
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-28 md:py-36">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#d4af37]/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-8 inline-flex rounded-full border border-[#eadfca] bg-white/70 px-4 py-2 text-sm text-[#7a6226] shadow-sm">
            AI agency + product studio
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Turn intent into{" "}
            <span className="bg-gradient-to-r from-[#9a7624] to-[#d4af37] bg-clip-text text-transparent">
              decisions
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#5f5442] md:text-xl">
            I design and build AI systems that turn messy business ideas into
            working tools in days, not months.
          </p>

          <p className="mt-4 text-base text-[#6b604d]">
            Not a generic AI agency — focused systems that solve one problem
            extremely well.
          </p>

          <p className="mt-6 text-sm text-[#8a7a5a]">
            Built by Ryan Fleming — AI product builder
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#submit"
              className="rounded-2xl bg-[#18140d] px-7 py-4 font-semibold text-white shadow-sm transition hover:bg-[#3a3022]"
            >
              Start a build
            </a>
            <a
              href="https://qatarmatch-ai.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-[#d8c99f] bg-white/70 px-7 py-4 font-semibold text-[#18140d] transition hover:border-[#d4af37]"
            >
              View our work
            </a>
          </div>

          <div className="mt-10 text-sm text-[#7a6c53]">
            Built for founders, operators, and teams who need practical AI tools that move from idea to live product.
          </div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            ["AI Product Builds", "From rough idea to working prototype."],
            ["Workflow Automation", "Remove repetitive manual steps."],
            ["Decision Engines", "Rank, filter and explain options."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-3xl border border-[#eadfca] bg-white p-7 shadow-[0_15px_50px_rgba(38,31,18,0.05)] transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6b604d]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
<section id="work" className="px-6 py-24">
  <div className="mx-auto max-w-6xl">
    <div className="mb-12 max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
        Featured work
      </p>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
        Live builds from FirstLight AI
      </h2>
      <p className="mt-5 text-lg leading-8 text-[#5f5442]">
        Practical AI tools built around real use cases — from lead conversion
        to content discovery.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-2">
      {/* QatarMatch AI */}
      <div className="rounded-[2rem] border border-[#eadfca] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)] transition hover:-translate-y-1 hover:shadow-lg">
        <p className="text-sm font-medium text-[#9a7624]">
          Featured Build #1
        </p>

        <h3 className="mt-3 text-3xl font-semibold">
          QatarMatch AI
        </h3>

        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#8a7a5a]">
          Real estate lead conversion engine
        </p>

        <p className="mt-5 leading-7 text-[#6b604d]">
          A zero-browsing property decision engine for Qatar agencies. Users ask
          for what they want, receive ranked matches with reasoning, submit a
          viewing request, and trigger a structured WhatsApp lead.
        </p>

        <div className="mt-8 grid gap-3 rounded-3xl bg-[#fbfaf7] p-5 text-sm text-[#6b604d]">
          <div>
            <span className="font-semibold text-[#18140d]">Problem:</span>{" "}
            Agencies lose leads through slow response and poor matching.
          </div>
          <div>
            <span className="font-semibold text-[#18140d]">Solution:</span>{" "}
            AI matching, QatarMatch Score™, lead capture, and WhatsApp handoff.
          </div>
          <div>
            <span className="font-semibold text-[#18140d]">Beacon stage:</span>{" "}
            B6 Launch / B7 Learn
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://qatarmatch-ai.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-[#18140d] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#3a3022]"
          >
            Try live demo
          </a>
          <a
            href="/beacon-framework"
            className="rounded-2xl border border-[#d8c99f] px-6 py-3 text-center font-semibold text-[#18140d] transition hover:border-[#d4af37]"
          >
            View framework
          </a>
        </div>
      </div>

      {/* OnlyLids */}
      <div className="rounded-[2rem] border border-[#eadfca] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)] transition hover:-translate-y-1 hover:shadow-lg">
        <p className="text-sm font-medium text-[#9a7624]">
          Featured Build #2
        </p>

        <h3 className="mt-3 text-3xl font-semibold">
          OnlyLids
        </h3>

        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#8a7a5a]">
          Unofficial podcast discovery companion
        </p>

        <p className="mt-5 leading-7 text-[#6b604d]">
          An unofficial fan-built recommendation tool that helps Have A Word
          fans find episodes, guests and playlists based on mood, time
          available, and public YouTube engagement.
        </p>

        <div className="mt-8 grid gap-3 rounded-3xl bg-[#fbfaf7] p-5 text-sm text-[#6b604d]">
          <div>
            <span className="font-semibold text-[#18140d]">Problem:</span>{" "}
            Fans struggle to navigate a large long-form podcast archive.
          </div>
          <div>
            <span className="font-semibold text-[#18140d]">Solution:</span>{" "}
            Build My LidList, LidScore, mood tags, and YouTube-linked picks.
          </div>
          <div>
            <span className="font-semibold text-[#18140d]">Beacon stage:</span>{" "}
            B4 Build / B5 Trust
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://onlylids.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-[#18140d] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#3a3022]"
          >
            Try live demo
          </a>
          <a
            href="/beacon-framework"
            className="rounded-2xl border border-[#d8c99f] px-6 py-3 text-center font-semibold text-[#18140d] transition hover:border-[#d4af37]"
          >
            View framework
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* PROCESS */}
      <section id="process" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
              Process
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              From rough idea to working tool
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {[
              ["01", "Submit idea", "Capture the raw problem."],
              ["02", "Define logic", "Map inputs, outputs and rules."],
              ["03", "Build tool", "Create a focused working version."],
              ["04", "Test & improve", "Validate with real users."],
            ].map(([num, title, text]) => (
              <div
                key={num}
                className="rounded-3xl border border-[#eadfca] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-semibold text-[#9a7624]">{num}</p>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6b604d]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBMIT */}
      <section id="submit" className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] border border-[#eadfca] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)] lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
              Beacon Brief
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">Submit an idea through the Beacon Framework.</h2>
            <p className="mt-5 leading-7 text-[#6b604d]">
              FirstLight AI uses Beacon v2 to turn messy ideas into structured AI builds —
              from signal, to shape, to proof, to build, launch and scale.
            </p>
          </div>

          <form
  action="https://formspree.io/f/mjglwzya"
  method="POST"
  onSubmit={handleSubmit}
  className="grid gap-4"
>

<input
  name="name"
  className="rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="Name"
/>

<input
  name="email"
  type="email"
  className="rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="Email"
/>

<input
  name="project_name"
  className="rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="Project / idea name"
/>

<textarea
  name="b0_signal"
  className="min-h-24 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="B0 Signal — What sparked this idea? What problem or opportunity have you noticed?"
/>

<textarea
  name="b1_shape"
  className="min-h-24 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="B1 Shape — Who is the user? What should the simplest useful version do?"
/>

<textarea
  name="b2_proof"
  className="min-h-24 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="B2 Proof — Has anyone asked for this? What would prove people care?"
/>

<textarea
  name="b3_blueprint"
  className="min-h-28 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="B3 Blueprint — What does the user input, what should the system return, and what data is needed?"
/>

<textarea
  name="b4_build"
  className="min-h-24 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="B4 Build — What must V1 include, and what should wait until later?"
/>

<textarea
  name="b5_trust"
  className="min-h-24 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="B5 Trust — What could make users doubt this? What trust signals, privacy notes, or disclaimers are needed?"
/>

<textarea
  name="b6_launch"
  className="min-h-24 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="B6 Launch — Who should test the first live version, and where would it be shared?"
/>

<textarea
  name="b7_learn"
  className="min-h-24 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="B7 Learn — What feedback or behaviour should we track?"
/>

<textarea
  name="b8_scale"
  className="min-h-24 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="B8 Scale — If it works, who would pay for it and what could it become?"
/>

<button className="rounded-2xl bg-[#18140d] px-6 py-4 font-semibold text-white transition hover:bg-[#3a3022]">
{submitted ? "Idea received" : "Submit idea"}
</button>

          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#eadfca] px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[#6b604d] md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-[#18140d]">FirstLight AI</p>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/company/firstlightai/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9a7624]"
            >
              LinkedIn
            </a>

            <a
              href="ryanfleming@flemingengineers.com"
              className="hover:text-[#9a7624]"
            >
              Email
            </a>
            <a href="/beacon-framework" className="hover:text-[#9a7624]">
              Beacon Framework
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}