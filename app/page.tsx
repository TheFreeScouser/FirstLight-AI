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
              View QatarMatch AI
            </a>
          </div>

          <div className="mt-10 text-sm text-[#7a6c53]">
            Built for founders, operators, and teams who need AI tools that
            actually work.
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
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
              Featured work
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              QatarMatch AI
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f5442]">
              A zero-browsing property decision engine for Qatar agencies. Users
              ask for what they want, get instant matches, and submit viewing
              requests through WhatsApp.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-[#eadfca] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)] transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-sm font-medium text-[#9a7624]">
                Live product
              </p>
              <h3 className="mt-3 text-3xl font-semibold">
                Search → Match → Capture → WhatsApp
              </h3>
              <p className="mt-5 leading-7 text-[#6b604d]">
                Built to solve a specific problem: real estate agencies losing
                leads due to slow response and poor matching.
              </p>
              <p className="mt-4 leading-7 text-[#6b604d]">
                Result: a fast, search-first system that captures qualified
                leads and pushes them directly to WhatsApp.
              </p>

              <div className="mt-8 grid gap-3 rounded-3xl bg-[#fbfaf7] p-5 text-sm text-[#6b604d]">
                <div>
                  <span className="font-semibold text-[#18140d]">Problem:</span>{" "}
                  Agencies lose leads through slow response.
                </div>
                <div>
                  <span className="font-semibold text-[#18140d]">Solution:</span>{" "}
                  Instant AI matching + lead capture.
                </div>
                <div>
                  <span className="font-semibold text-[#18140d]">Outcome:</span>{" "}
                  Faster response and higher-quality viewing requests.
                </div>
              </div>

              <a
                href="https://qatarmatch-ai.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-2xl bg-[#18140d] px-6 py-3 font-semibold text-white transition hover:bg-[#3a3022]"
              >
                Try live demo
              </a>
            </div>

            <div className="rounded-[2rem] border border-[#eadfca] bg-[#fffdf8] p-6 shadow-[0_20px_60px_rgba(38,31,18,0.06)] transition hover:-translate-y-1 hover:shadow-lg">
              <div className="rounded-2xl border border-[#eadfca] bg-white p-5">
                <p className="text-sm text-[#6b604d]">Example request</p>
                <p className="mt-2 rounded-xl bg-[#fbfaf7] p-4 text-sm font-medium">
                  “2-bed in Lusail under 9k near schools furnished”
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["#1", "Modern 2BR Marina Apartment", "96% match"],
                  ["#2", "Spacious Family 2BR Lusail", "92% match"],
                  ["#3", "2BR Apartment Near Schools", "89% match"],
                ].map(([rank, title, score]) => (
                  <div
                    key={title}
                    className="flex items-center justify-between rounded-2xl border border-[#eadfca] bg-white p-5 transition hover:border-[#d4af37]"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#9a7624]">
                        {rank} · {score}
                      </p>
                      <h4 className="mt-1 font-semibold">{title}</h4>
                      <p className="mt-1 text-sm text-[#6b604d]">
                        Matched on budget, location and viewing intent.
                      </p>
                    </div>
                    <div className="hidden rounded-full bg-[#fbf3da] px-3 py-1 text-sm font-semibold text-[#9a7624] sm:block">
                      Book
                    </div>
                  </div>
                ))}
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
              Submit an idea
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Have a workflow worth building?
            </h2>
            <p className="mt-5 leading-7 text-[#6b604d]">
              Share the problem, what the user inputs, and what the system
              should return. I’ll use that to shape a buildable AI product.
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

<textarea
  name="idea"
  className="min-h-28 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="Describe the idea or problem"
/>

<textarea
  name="user_input"
  className="min-h-24 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="What does the user input?"
/>

<textarea
  name="expected_output"
  className="min-h-24 rounded-2xl border border-[#d8c99f] p-4 outline-none transition focus:border-[#d4af37]"
  placeholder="What should the system return?"
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