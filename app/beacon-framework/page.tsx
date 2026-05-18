export default function BeaconFrameworkPage() {
  const stages = [
    {
      code: "PD",
      title: "Product Definition",
      description:
        "Clarify the idea, the user, the problem, and the commercial purpose before anything is built.",
    },
    {
      code: "PF",
      title: "Project Feasibility",
      description:
        "Check whether the tool is technically realistic, commercially useful, and supported by usable data.",
    },
    {
      code: "KE",
      title: "Concept Decision",
      description:
        "Decide whether the product should move forward, pivot, or stop based on evidence and scope.",
    },
    {
      code: "LH",
      title: "Product Specification",
      description:
        "Define the product requirements, user flow, input/output logic, data sources, and success criteria.",
    },
    {
      code: "LF",
      title: "Launch Release",
      description:
        "Release a controlled working version that can be used, tested, and demonstrated.",
    },
    {
      code: "PVS",
      title: "Production Trial Series",
      description:
        "Test the product with real users, capture feedback, measure behaviour, and identify weak points.",
    },
    {
      code: "0S",
      title: "Zero Series",
      description:
        "Run a near-final version with improved UX, cleaner data, and more robust workflows before wider release.",
    },
    {
      code: "SOP",
      title: "Start of Production",
      description:
        "Move from prototype to operational product with stable hosting, analytics, support, and handover.",
    },
    {
      code: "ME",
      title: "Market Entry",
      description:
        "Launch commercially, gather customers, track adoption, and improve based on real-world use.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#18140d]">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-[#eadfca]/70 bg-[#fbfaf7]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-semibold tracking-tight">
            FirstLight AI
          </a>

          <nav className="hidden gap-8 text-sm text-[#6b604d] md:flex">
            <a href="/" className="hover:text-[#9a7624]">
              Home
            </a>
            <a href="/#work" className="hover:text-[#9a7624]">
              Work
            </a>
            <a href="/#submit" className="hover:text-[#9a7624]">
              Submit Idea
            </a>
          </nav>

          <a
            href="/#submit"
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
            FirstLight AI delivery method
          </div>

          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl md:leading-[1.05]">
            The{" "}
            <span className="bg-gradient-to-r from-[#9a7624] to-[#d4af37] bg-clip-text text-transparent">
              Beacon Framework
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#5f5442] md:text-xl">
            A structured gateway process for turning messy business ideas into
            useful, validated AI products.
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6b604d]">
            Built to bring product discipline to AI builds — so ideas are
            defined, tested, released, and improved with clear decision points
            instead of vague experimentation.
          </p>
        </div>
      </section>

      {/* WHY IT EXISTS */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
              Why it exists
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              AI projects fail when they skip structure.
            </h2>
          </div>

          <div className="rounded-[2rem] border border-[#eadfca] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)]">
            <p className="text-lg leading-8 text-[#5f5442]">
              Most AI ideas start with excitement but quickly become unclear:
              who is the user, what data is needed, what should the tool return,
              and how do we know it works?
            </p>

            <p className="mt-5 text-lg leading-8 text-[#5f5442]">
              The Beacon Framework solves this by breaking the journey into
              controlled gateways. Each stage has a purpose, a decision point,
              and a clear output.
            </p>
          </div>
        </div>
      </section>

      {/* FRAMEWORK STAGES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
              Gateway model
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              From idea to market entry
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {stages.map((stage) => (
              <div
                key={stage.code}
                className="rounded-3xl border border-[#eadfca] bg-white p-6 shadow-[0_15px_45px_rgba(38,31,18,0.04)] transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fbf3da] text-sm font-bold text-[#9a7624]">
                    {stage.code}
                  </div>
                  <h3 className="text-lg font-semibold">{stage.title}</h3>
                </div>

                <p className="mt-5 text-sm leading-7 text-[#6b604d]">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT APPLIES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#eadfca] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)] md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
                How FirstLight uses it
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                The framework keeps builds focused.
              </h2>
            </div>

            <div className="grid gap-5">
              {[
                [
                  "Before building",
                  "We define the user, problem, input, output, data source, and success criteria.",
                ],
                [
                  "During the build",
                  "We create a focused version that proves the core workflow before adding complexity.",
                ],
                [
                  "After release",
                  "We track real usage, collect feedback, and improve based on behaviour rather than guesswork.",
                ],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl bg-[#fbfaf7] p-5">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6b604d]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLE */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
              Example
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              QatarMatch AI through the Beacon Framework
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-[#eadfca] bg-white p-6">
              <p className="text-sm font-semibold text-[#9a7624]">
                Definition
              </p>
              <h3 className="mt-4 text-xl font-semibold">
                Real estate lead conversion
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#6b604d]">
                The product was reframed from property search into an
                AI-powered sales assistant for agencies.
              </p>
            </div>

            <div className="rounded-3xl border border-[#eadfca] bg-white p-6">
              <p className="text-sm font-semibold text-[#9a7624]">
                Launch Release
              </p>
              <h3 className="mt-4 text-xl font-semibold">
                Working V1 deployed
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#6b604d]">
                Users can ask, receive top matches, submit details, and trigger
                a WhatsApp viewing request.
              </p>
            </div>

            <div className="rounded-3xl border border-[#eadfca] bg-white p-6">
              <p className="text-sm font-semibold text-[#9a7624]">
                Production Trial
              </p>
              <h3 className="mt-4 text-xl font-semibold">
                QSTP showcase testing
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#6b604d]">
                Analytics, demo feedback, and user behaviour will shape the V2
                product brief.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#eadfca] bg-[#18140d] p-10 text-center text-white shadow-[0_20px_60px_rgba(38,31,18,0.16)]">
          <h2 className="text-4xl font-semibold tracking-tight">
            Have an idea that needs structure?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/70">
            Submit the idea and FirstLight AI will shape it through the Beacon
            Framework — from vague concept to buildable product.
          </p>

          <a
            href="/#submit"
            className="mt-8 inline-flex rounded-2xl bg-[#BA7517] px-7 py-4 font-semibold text-white transition hover:bg-[#9f6112]"
          >
            Submit an idea
          </a>
        </div>
      </section>
    </main>
  );
}