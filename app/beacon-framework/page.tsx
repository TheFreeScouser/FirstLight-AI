export default function BeaconFrameworkPage() {
  const stages = [
    {
      code: "B0",
      title: "Signal",
      purpose: "Spot the real problem, opportunity, or user need.",
      question: "What sparked this idea, and why does it matter now?",
    },
    {
      code: "B1",
      title: "Shape",
      purpose: "Turn the rough idea into a clear product concept.",
      question: "Who is it for, what should it do, and what should it avoid?",
    },
    {
      code: "B2",
      title: "Proof",
      purpose: "Check whether the idea has evidence behind it.",
      question: "Has anyone asked for this, and what would prove people care?",
    },
    {
      code: "B3",
      title: "Blueprint",
      purpose: "Convert the idea into buildable requirements.",
      question: "What does the user input, what comes back, and what data is needed?",
    },
    {
      code: "B4",
      title: "Build",
      purpose: "Create the smallest useful working version.",
      question: "What must V1 include, and what can wait?",
    },
    {
      code: "B5",
      title: "Trust",
      purpose: "Make the product credible, safe, and clear.",
      question: "What could make users doubt it, and how do we build confidence?",
    },
    {
      code: "B6",
      title: "Launch",
      purpose: "Release the product in a controlled way.",
      question: "Who should see the first live version, and what should it prove?",
    },
    {
      code: "B7",
      title: "Learn",
      purpose: "Use real behaviour and feedback to improve.",
      question: "What should we track, and where might users drop off?",
    },
    {
      code: "B8",
      title: "Scale",
      purpose: "Turn what works into a product, offer, or case study.",
      question: "If it works, who pays, what grows, and what can be reused?",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#18140d]">
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
              Submit Brief
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
            A structured method for turning messy ideas into useful AI products.
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6b604d]">
            Beacon v2 helps FirstLight AI move from rough signal to working
            product through clear stages: Signal, Shape, Proof, Blueprint,
            Build, Trust, Launch, Learn and Scale.
          </p>
        </div>
      </section>

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
              The Beacon Framework turns that messy starting point into a clear
              path: define the signal, shape the idea, prove demand, blueprint
              the system, build the smallest useful version, add trust, launch,
              learn, and scale what works.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
              Beacon v2
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              From signal to scale
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
                  {stage.purpose}
                </p>

                <div className="mt-5 rounded-2xl bg-[#fbfaf7] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7624]">
                    Key question
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5f5442]">
                    {stage.question}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#eadfca] bg-white p-8 shadow-[0_20px_60px_rgba(38,31,18,0.06)] md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
                How FirstLight uses it
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                Beacon keeps builds focused.
              </h2>
            </div>

            <div className="grid gap-5">
              {[
                [
                  "Before building",
                  "We identify the signal, shape the concept, and check proof so we do not build the wrong thing.",
                ],
                [
                  "During the build",
                  "We use the blueprint to create the smallest useful version without drifting into unnecessary features.",
                ],
                [
                  "Before launch",
                  "We add trust signals, clear user copy, analytics, and a controlled release plan.",
                ],
                [
                  "After launch",
                  "We learn from real user behaviour and scale only what proves useful.",
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

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7624]">
              Examples
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Beacon in practice
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-[#eadfca] bg-white p-6">
              <p className="text-sm font-semibold text-[#9a7624]">
                QatarMatch AI
              </p>
              <h3 className="mt-4 text-xl font-semibold">
                AI real estate lead conversion engine
              </h3>
              <div className="mt-5 grid gap-3 text-sm leading-6 text-[#6b604d]">
                <p>
                  <span className="font-semibold text-[#18140d]">Signal:</span>{" "}
                  agencies lose leads due to slow response and poor matching.
                </p>
                <p>
                  <span className="font-semibold text-[#18140d]">Shape:</span>{" "}
                  zero-browsing property decision engine.
                </p>
                <p>
                  <span className="font-semibold text-[#18140d]">Trust:</span>{" "}
                  QatarMatch Score™, explanations, images, and clear handoff.
                </p>
                <p>
                  <span className="font-semibold text-[#18140d]">Launch:</span>{" "}
                  QSTP showcase-ready live demo.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#eadfca] bg-white p-6">
              <p className="text-sm font-semibold text-[#9a7624]">
                OnlyLids
              </p>
              <h3 className="mt-4 text-xl font-semibold">
                Unofficial fan companion and playlist builder
              </h3>
              <div className="mt-5 grid gap-3 text-sm leading-6 text-[#6b604d]">
                <p>
                  <span className="font-semibold text-[#18140d]">Signal:</span>{" "}
                  fans struggle to navigate a large podcast archive.
                </p>
                <p>
                  <span className="font-semibold text-[#18140d]">Shape:</span>{" "}
                  Build My LidList guided recommendation flow.
                </p>
                <p>
                  <span className="font-semibold text-[#18140d]">Trust:</span>{" "}
                  clear unofficial disclaimer and public metadata only.
                </p>
                <p>
                  <span className="font-semibold text-[#18140d]">Scale:</span>{" "}
                  reusable content discovery template for podcasts and creators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#eadfca] bg-[#18140d] p-10 text-center text-white shadow-[0_20px_60px_rgba(38,31,18,0.16)]">
          <h2 className="text-4xl font-semibold tracking-tight">
            Have an idea with a signal?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/70">
            Submit a Beacon Brief and FirstLight AI will shape it into a
            buildable product path.
          </p>

          <a
            href="/#submit"
            className="mt-8 inline-flex rounded-2xl bg-[#BA7517] px-7 py-4 font-semibold text-white transition hover:bg-[#9f6112]"
          >
            Submit Beacon Brief
          </a>
        </div>
      </section>
    </main>
  );
}