"use client";

import { useMemo, useState } from "react";

type ViewMode = "consultant" | "client";
type Complexity = "low" | "medium" | "high" | "veryHigh";
type DataReadiness = "clean" | "mixed" | "messy" | "unknown";
type IntegrationLoad = "none" | "light" | "moderate" | "heavy";
type Pace = "normal" | "soon" | "fast" | "critical";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const complexityLabels: Record<Complexity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  veryHigh: "Very high",
};

const dataLabels: Record<DataReadiness, string> = {
  clean: "Clean",
  mixed: "Mixed",
  messy: "Messy",
  unknown: "Unknown",
};

const integrationLabels: Record<IntegrationLoad, string> = {
  none: "None",
  light: "Light",
  moderate: "Moderate",
  heavy: "Heavy",
};

const paceLabels: Record<Pace, string> = {
  normal: "Normal",
  soon: "Soon",
  fast: "Fast-track",
  critical: "Critical",
};

export default function GuidedCosting() {
  const [viewMode, setViewMode] = useState<ViewMode>("consultant");

  const [clientName, setClientName] = useState("");
  const [problem, setProblem] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [people, setPeople] = useState(5);
  const [systems, setSystems] = useState(3);
  const [handovers, setHandovers] = useState(3);
  const [hoursPerPerson, setHoursPerPerson] = useState(8);
  const [hourlyCost, setHourlyCost] = useState(25);
  const [automationPotential, setAutomationPotential] = useState(50);
  const [complexity, setComplexity] = useState<Complexity>("medium");
  const [dataReadiness, setDataReadiness] = useState<DataReadiness>("mixed");
  const [integrationLoad, setIntegrationLoad] = useState<IntegrationLoad>("light");
  const [pace, setPace] = useState<Pace>("normal");
  const [businessRisk, setBusinessRisk] = useState("Medium");
  const [desiredOutcome, setDesiredOutcome] = useState("");

  const model = useMemo(() => {
    const monthlyHours = people * hoursPerPerson;
    const monthlyCapacityCost = monthlyHours * hourlyCost;
    const annualCapacityCost = monthlyCapacityCost * 12;
    const monthlyCapacityReleased = Math.round(monthlyHours * (automationPotential / 100));
    const annualValuePotential = Math.round(annualCapacityCost * (automationPotential / 100));

    const footprintMultiplier = people <= 3 ? 1 : people <= 10 ? 1.15 : people <= 25 ? 1.35 : 1.6;
    const complexityMultiplier = { low: 1, medium: 1.25, high: 1.55, veryHigh: 1.9 }[complexity];
    const dataMultiplier = { clean: 1, mixed: 1.2, messy: 1.45, unknown: 1.1 }[dataReadiness];
    const integrationMultiplier = { none: 1, light: 1.15, moderate: 1.35, heavy: 1.65 }[integrationLoad];
    const paceMultiplier = { normal: 1, soon: 1.1, fast: 1.25, critical: 1.45 }[pace];
    const systemMultiplier = systems <= 1 ? 1 : systems <= 3 ? 1.08 : systems <= 5 ? 1.18 : 1.3;
    const handoverMultiplier = handovers <= 2 ? 1 : handovers <= 5 ? 1.08 : 1.18;

    let recommendedStep = "Focused AI Build";
    let base = 3500;

    if (dataReadiness === "unknown") {
      recommendedStep = "Beacon Audit";
      base = 750;
    } else if (
      dataReadiness === "messy" ||
      complexity === "high" ||
      complexity === "veryHigh" ||
      integrationLoad === "moderate" ||
      integrationLoad === "heavy" ||
      systems >= 4 ||
      handovers >= 5
    ) {
      recommendedStep = "Beacon Blueprint → Focused AI Build";
      base = 4200;
    } else if (monthlyHours < 12 && systems <= 2 && complexity === "low") {
      recommendedStep = "Beacon Audit";
      base = 750;
    }

    const raw =
      base *
      footprintMultiplier *
      complexityMultiplier *
      dataMultiplier *
      integrationMultiplier *
      paceMultiplier *
      systemMultiplier *
      handoverMultiplier;

    const midpoint = Math.max(base, Math.round(raw / 100) * 100);
    const rangeLow = Math.round((midpoint * 0.85) / 100) * 100;
    const rangeHigh = Math.round((midpoint * 1.2) / 100) * 100;
    const commercialFloor = Math.round((rangeLow * 0.8) / 100) * 100;
    const deposit = Math.round((rangeLow * 0.4) / 100) * 100;

    const score =
      (people <= 3 ? 1 : people <= 10 ? 2 : people <= 25 ? 3 : 4) +
      (systems <= 1 ? 1 : systems <= 3 ? 2 : systems <= 5 ? 3 : 4) +
      (handovers <= 2 ? 1 : handovers <= 5 ? 2 : 3) +
      ({ low: 1, medium: 2, high: 3, veryHigh: 4 }[complexity]) +
      ({ clean: 1, mixed: 2, messy: 3, unknown: 3 }[dataReadiness]) +
      ({ none: 1, light: 2, moderate: 3, heavy: 4 }[integrationLoad]);

    const profile = score <= 8 ? "Simple" : score <= 12 ? "Moderate" : score <= 16 ? "Complex" : "High-complexity";

    const reasons = [
      `${people} people touch the workflow`,
      `${systems} system${systems === 1 ? "" : "s"} are involved`,
      `${handovers} manual handover${handovers === 1 ? "" : "s"}`,
      `${dataLabels[dataReadiness]} data readiness`,
      `${integrationLabels[integrationLoad]} integration need`,
    ];

    return {
      monthlyHours,
      monthlyCapacityCost,
      annualCapacityCost,
      monthlyCapacityReleased,
      annualValuePotential,
      recommendedStep,
      rangeLow,
      rangeHigh,
      commercialFloor,
      deposit,
      profile,
      reasons,
    };
  }, [people, systems, handovers, hoursPerPerson, hourlyCost, automationPotential, complexity, dataReadiness, integrationLoad, pace]);

  return (
    <main className="min-h-screen bg-[#FBFAF7] px-5 py-6 text-[#18140D] md:px-8 md:py-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#BA7517]">FirstLight OS</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Discovery Console</h1>
            <p className="mt-3 max-w-3xl text-[#6B604D]">
              Ask simple business questions. The workflow profile, value opportunity and recommended route update live as the client answers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-full border border-[#D8C99F] bg-white p-1 shadow-sm">
              <button
                onClick={() => setViewMode("consultant")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${viewMode === "consultant" ? "bg-[#18140D] text-white" : "text-[#6B604D]"}`}
              >
                Consultant View
              </button>
              <button
                onClick={() => setViewMode("client")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${viewMode === "client" ? "bg-[#BA7517] text-white" : "text-[#6B604D]"}`}
              >
                Client View
              </button>
            </div>
            <a href="/admin" className="rounded-full border border-[#D8C99F] px-4 py-2 text-sm font-semibold hover:border-[#BA7517]">Back to OS</a>
          </div>
        </header>

        {viewMode === "consultant" ? (
          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.75fr_0.85fr]">
            <section className="rounded-[2rem] border border-[#EADFCA] bg-white p-6 shadow-[0_20px_60px_rgba(38,31,18,0.05)]">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#BA7517]">01 · Discovery</p>
                <h2 className="mt-2 text-2xl font-semibold">Ask, listen, update.</h2>
                <p className="mt-2 text-sm leading-6 text-[#6B604D]">Do not ask the client to score complexity. Ask normal questions, then set the internal assessment yourself.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Client / company" value={clientName} onChange={setClientName} placeholder="MW Financial Solutions" />
                <SelectField label="How often does this happen?" value={frequency} onChange={setFrequency} options={["Several times a day", "Daily", "Weekly", "Monthly", "Ad hoc"]} />

                <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                  What problem are we trying to fix?
                  <textarea value={problem} onChange={(e) => setProblem(e.target.value)} className="min-h-24 rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#BA7517]" placeholder="Describe the repeated admin, delay, handover or decision problem..." />
                </label>

                <NumberField label="People touching the process" value={people} onChange={setPeople} min={1} />
                <NumberField label="Systems / tools involved" value={systems} onChange={setSystems} min={0} />
                <NumberField label="Manual handovers" value={handovers} onChange={setHandovers} min={0} />
                <NumberField label="Hours per person / month" value={hoursPerPerson} onChange={setHoursPerPerson} min={0} />
                <NumberField label="Loaded hourly cost (£)" value={hourlyCost} onChange={setHourlyCost} min={0} />

                <label className="grid gap-2 text-sm font-semibold">
                  Realistic automation potential
                  <div className="rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4">
                    <div className="mb-3 flex items-center justify-between font-normal text-[#6B604D]"><span>Capacity that could be released</span><strong className="text-[#18140D]">{automationPotential}%</strong></div>
                    <input type="range" min="10" max="90" step="5" value={automationPotential} onChange={(e) => setAutomationPotential(Number(e.target.value))} className="w-full accent-[#BA7517]" />
                  </div>
                </label>

                <SelectField label="Internal complexity assessment" value={complexity} onChange={(v) => setComplexity(v as Complexity)} options={["low", "medium", "high", "veryHigh"]} renderLabel={(v) => complexityLabels[v as Complexity]} />
                <SelectField label="Data readiness" value={dataReadiness} onChange={(v) => setDataReadiness(v as DataReadiness)} options={["clean", "mixed", "messy", "unknown"]} renderLabel={(v) => dataLabels[v as DataReadiness]} />
                <SelectField label="Integration need" value={integrationLoad} onChange={(v) => setIntegrationLoad(v as IntegrationLoad)} options={["none", "light", "moderate", "heavy"]} renderLabel={(v) => integrationLabels[v as IntegrationLoad]} />
                <SelectField label="Delivery pace" value={pace} onChange={(v) => setPace(v as Pace)} options={["normal", "soon", "fast", "critical"]} renderLabel={(v) => paceLabels[v as Pace]} />
                <SelectField label="Business risk if this goes wrong" value={businessRisk} onChange={setBusinessRisk} options={["Low", "Medium", "High", "Critical"]} />

                <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                  What would better look like?
                  <textarea value={desiredOutcome} onChange={(e) => setDesiredOutcome(e.target.value)} className="min-h-24 rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#BA7517]" placeholder="Faster follow-up, fewer errors, less admin, clearer reporting..." />
                </label>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#EADFCA] bg-white p-6 shadow-[0_20px_60px_rgba(38,31,18,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#BA7517]">02 · Live workflow profile</p>
              <h2 className="mt-2 text-2xl font-semibold">The model reacts as you talk.</h2>

              <div className="mt-6 grid gap-3">
                <Metric label="Workflow profile" value={model.profile} />
                <Metric label="People involved" value={String(people)} />
                <Metric label="Systems involved" value={String(systems)} />
                <Metric label="Manual handovers" value={String(handovers)} />
                <Metric label="Monthly manual effort" value={`${model.monthlyHours} hrs`} />
                <Metric label="Data readiness" value={dataLabels[dataReadiness]} />
                <Metric label="Complexity" value={complexityLabels[complexity]} />
                <Metric label="Integration load" value={integrationLabels[integrationLoad]} />
                <Metric label="Delivery pressure" value={paceLabels[pace]} />
                <Metric label="Business risk" value={businessRisk} />
              </div>

              <div className="mt-6 rounded-2xl bg-[#FBFAF7] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#BA7517]">Capacity/value view</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <ValueBlock label="Current capacity cost" value={`${gbp.format(model.monthlyCapacityCost)}/mo`} />
                  <ValueBlock label="Annual capacity cost" value={gbp.format(model.annualCapacityCost)} />
                  <ValueBlock label="Potential capacity released" value={`${model.monthlyCapacityReleased} hrs/mo`} />
                  <ValueBlock label="Estimated annual value" value={gbp.format(model.annualValuePotential)} />
                </div>
                <p className="mt-4 text-xs leading-5 text-[#6B604D]">Capacity released is an estimate, not guaranteed cash saving. Use it to frame the opportunity, not promise ROI.</p>
              </div>
            </section>

            <section className="rounded-[2rem] bg-[#18140D] p-6 text-white shadow-[0_30px_80px_rgba(24,20,13,0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">03 · Recommendation</p>
              <h2 className="mt-3 text-3xl font-semibold">Let the route emerge.</h2>

              <div className="mt-6 rounded-[2rem] bg-white p-6 text-[#18140D]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#BA7517]">Best fit</p>
                <p className="mt-3 text-3xl font-semibold">{model.recommendedStep}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#BA7517]">Indicative investment</p>
                <p className="mt-2 text-4xl font-semibold">{gbp.format(model.rangeLow)}–{gbp.format(model.rangeHigh)}</p>
              </div>

              <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-sm text-white/70">
                <p><span className="font-semibold text-white">Commercial floor:</span> {gbp.format(model.commercialFloor)}</p>
                <p><span className="font-semibold text-white">Suggested deposit:</span> {gbp.format(model.deposit)}</p>
                <p><span className="font-semibold text-white">Frequency:</span> {frequency}</p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">Why</p>
                <ul className="mt-3 space-y-3 text-sm text-white/70">
                  {model.reasons.map((reason) => <li key={reason}>• {reason}</li>)}
                </ul>
              </div>

              <button onClick={() => setViewMode("client")} className="mt-7 w-full rounded-2xl bg-[#D4AF37] px-5 py-4 font-semibold text-[#18140D] transition hover:bg-white">
                Present recommendation →
              </button>
            </section>
          </div>
        ) : (
          <ClientPresentation
            clientName={clientName}
            problem={problem}
            desiredOutcome={desiredOutcome}
            people={people}
            systems={systems}
            handovers={handovers}
            model={model}
          />
        )}
      </div>
    </main>
  );
}

function ClientPresentation({ clientName, problem, desiredOutcome, people, systems, handovers, model }: {
  clientName: string;
  problem: string;
  desiredOutcome: string;
  people: number;
  systems: number;
  handovers: number;
  model: {
    monthlyHours: number;
    monthlyCapacityReleased: number;
    annualValuePotential: number;
    recommendedStep: string;
    rangeLow: number;
    rangeHigh: number;
    reasons: string[];
  };
}) {
  return (
    <section className="mx-auto max-w-6xl overflow-hidden rounded-[2.2rem] border border-[#EADFCA] bg-white shadow-[0_30px_100px_rgba(38,31,18,0.10)]">
      <div className="bg-[#18140D] p-8 text-white md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#D4AF37]">FirstLight AI</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Your workflow, made clearer.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">Based on what we have discussed, this is the most sensible route for improving the workflow before applying automation or AI.</p>
            {clientName ? <p className="mt-5 text-sm text-white/50">Prepared live for {clientName}</p> : null}
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">Recommended starting point</p>
            <p className="mt-3 text-3xl font-semibold">{model.recommendedStep}</p>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12">
        {(problem || desiredOutcome) ? (
          <div className="mb-8 grid gap-5 md:grid-cols-2">
            {problem ? <ClientCard eyebrow="What we heard" title="Current challenge" text={problem} /> : null}
            {desiredOutcome ? <ClientCard eyebrow="What better looks like" title="Desired outcome" text={desiredOutcome} /> : null}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-4">
          <BigMetric label="Manual effort" value={`${model.monthlyHours} hrs/mo`} />
          <BigMetric label="People involved" value={String(people)} />
          <BigMetric label="Systems involved" value={String(systems)} />
          <BigMetric label="Handovers" value={String(handovers)} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] bg-[#FBFAF7] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Potential opportunity</p>
            <p className="mt-3 text-4xl font-semibold">~{model.monthlyCapacityReleased} hrs/month</p>
            <p className="mt-4 leading-7 text-[#6B604D]">Estimated staff capacity that could potentially be released for higher-value work.</p>
            <p className="mt-5 text-2xl font-semibold">{gbp.format(model.annualValuePotential)} <span className="text-base font-normal text-[#6B604D]">estimated annual capacity value</span></p>
          </div>

          <div className="rounded-[2rem] bg-[#FBFAF7] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Indicative investment</p>
            <p className="mt-3 text-4xl font-semibold">{gbp.format(model.rangeLow)}–{gbp.format(model.rangeHigh)}</p>
            <p className="mt-4 leading-7 text-[#6B604D]">This is an indicative range based on the workflow as understood today. Final scope is confirmed before work begins.</p>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#EADFCA] p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Why this route</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {model.reasons.map((reason) => (
              <div key={reason} className="flex gap-3 rounded-2xl bg-[#FBFAF7] p-4 text-[#6B604D]"><span className="text-[#BA7517]">✦</span><span>{reason}</span></div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <JourneyStep number="01" title="Map" text="Confirm the real workflow, data, people and friction." />
          <JourneyStep number="02" title="Design" text="Define the smallest useful system and the controls around it." />
          <JourneyStep number="03" title="Build" text="Create, test and improve the solution with real users." />
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 rounded-[2rem] bg-[#18140D] p-7 text-white md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Next step</p>
            <p className="mt-2 text-2xl font-semibold">Confirm the first scope together.</p>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/65">Clean process first. Useful AI second. The aim is to prove the workflow and value before building more than the business needs.</p>
        </div>
      </div>
    </section>
  );
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#BA7517]" /></label>;
}

function NumberField({ label, value, onChange, min = 0 }: { label: string; value: number; onChange: (value: number) => void; min?: number }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<input type="number" min={min} value={value} onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))} className="rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#BA7517]" /></label>;
}

function SelectField({ label, value, onChange, options, renderLabel }: { label: string; value: string; onChange: (value: string) => void; options: string[]; renderLabel?: (value: string) => string }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#BA7517]">{options.map((option) => <option key={option} value={option}>{renderLabel ? renderLabel(option) : option}</option>)}</select></label>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#FBFAF7] px-4 py-3"><span className="text-sm text-[#6B604D]">{label}</span><strong className="text-sm">{value}</strong></div>;
}

function ValueBlock({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs uppercase tracking-[0.16em] text-[#6B604D]">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p></div>;
}

function BigMetric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[1.7rem] border border-[#EADFCA] bg-[#FBFAF7] p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#BA7517]">{label}</p><p className="mt-3 text-3xl font-semibold">{value}</p></div>;
}

function ClientCard({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="rounded-[2rem] border border-[#EADFCA] p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#BA7517]">{eyebrow}</p><h3 className="mt-2 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-[#6B604D]">{text}</p></div>;
}

function JourneyStep({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-6"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E9CC] text-sm font-bold text-[#BA7517]">{number}</div><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#6B604D]">{text}</p></div>;
}
