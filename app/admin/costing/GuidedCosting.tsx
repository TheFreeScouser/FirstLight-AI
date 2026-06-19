"use client";

import { useMemo, useState } from "react";

type Option = {
  label: string;
  definition: string;
  questions: string[];
  multiplier?: number;
  base?: number;
};

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const engagementOptions = {
  audit: {
    label: "Beacon Audit",
    base: 750,
    definition: "Best when the client knows the process is messy but does not yet know what to automate first.",
    questions: ["Where does the workflow break?", "Who touches it?", "What is repeated manually?"],
  },
  blueprint: {
    label: "Beacon Blueprint",
    base: 1500,
    definition: "Best when there is a clear problem, but the workflow, data and build requirements need structuring.",
    questions: ["What does the user input?", "What should come back?", "What data is needed?"],
  },
  build: {
    label: "Focused AI Build",
    base: 3500,
    definition: "Best when the workflow, outcome and first useful version are clear enough to build.",
    questions: ["What must V1 do?", "What can wait?", "How will we test it?"],
  },
  retainer: {
    label: "Support Retainer",
    base: 950,
    definition: "Best after launch when the client needs support, improvements and small changes each month.",
    questions: ["What needs monitoring?", "How often will it change?", "Who raises support requests?"],
  },
} satisfies Record<string, Option>;

const footprintOptions = {
  micro: {
    label: "Micro workflow",
    multiplier: 1,
    definition: "1-3 users, one process owner and one simple workflow.",
    questions: ["How many people touch this each week?", "Is there one clear owner?"],
  },
  small: {
    label: "Small team workflow",
    multiplier: 1.15,
    definition: "4-15 users, one team and 1-3 tools or spreadsheets involved.",
    questions: ["Which team owns this?", "How many tools does it pass through?"],
  },
  growing: {
    label: "Growing SME workflow",
    multiplier: 1.35,
    definition: "16-50 users, multiple roles, several handovers and regular reporting pressure.",
    questions: ["How many roles are involved?", "Where do handovers slow down?"],
  },
  opsHeavy: {
    label: "Ops-heavy SME workflow",
    multiplier: 1.6,
    definition: "50+ users, multiple teams or sites, compliance, reporting or operational risk.",
    questions: ["Are multiple teams or sites involved?", "What happens if the workflow fails?"],
  },
} satisfies Record<string, Option>;

const complexityOptions = {
  low: {
    label: "Low complexity",
    multiplier: 1,
    definition: "One workflow, clear input, clear output and few exceptions.",
    questions: ["Is the process mostly the same each time?", "Are the rules obvious?"],
  },
  medium: {
    label: "Medium complexity",
    multiplier: 1.25,
    definition: "Several steps, a few decision rules and some exceptions.",
    questions: ["How many steps are involved?", "What are the common exceptions?"],
  },
  high: {
    label: "High complexity",
    multiplier: 1.55,
    definition: "Multiple user roles, approvals, edge cases, handovers or risk.",
    questions: ["Who approves or checks the work?", "What needs human judgement?"],
  },
  veryHigh: {
    label: "Very high complexity",
    multiplier: 1.9,
    definition: "Compliance-heavy, multi-system, sensitive data or complex business logic.",
    questions: ["Is sensitive data involved?", "Could mistakes create business or compliance risk?"],
  },
} satisfies Record<string, Option>;

const dataOptions = {
  clean: {
    label: "Clean",
    multiplier: 1,
    definition: "One clear source, structured fields, exportable data and low duplication.",
    questions: ["Is there one source of truth?", "Can the data be exported easily?"],
  },
  mixed: {
    label: "Mixed",
    multiplier: 1.2,
    definition: "Some spreadsheets, some manual notes and inconsistent fields.",
    questions: ["Which fields are inconsistent?", "Who cleans the data before using it?"],
  },
  messy: {
    label: "Messy",
    multiplier: 1.45,
    definition: "Duplicates, missing fields, no clear owner or knowledge stuck in people's heads.",
    questions: ["Where do duplicates appear?", "Which knowledge only lives with one person?"],
  },
  unknown: {
    label: "Unknown",
    multiplier: 1.1,
    definition: "The client does not yet know where all data lives or how reliable it is.",
    questions: ["Where might the data live?", "Who knows the process best?"],
  },
} satisfies Record<string, Option>;

const integrationOptions = {
  none: {
    label: "None",
    multiplier: 1,
    definition: "Standalone tool, manual upload/download or copy/paste handoff.",
    questions: ["Can we prove this manually first?", "Can the client upload or export a file?"],
  },
  light: {
    label: "Light",
    multiplier: 1.15,
    definition: "Email, form, spreadsheet, WhatsApp link or CSV export.",
    questions: ["Does it need to send an email or WhatsApp message?", "Is a spreadsheet enough for V1?"],
  },
  moderate: {
    label: "Moderate",
    multiplier: 1.35,
    definition: "CRM, database, Airtable, Google Sheets, Supabase or one API connection.",
    questions: ["Which system should be updated?", "Is API access available?"],
  },
  heavy: {
    label: "Heavy",
    multiplier: 1.65,
    definition: "Multiple systems, authentication, permissions, live sync or complex APIs.",
    questions: ["Who owns access?", "Does it need permissions or live sync?"],
  },
} satisfies Record<string, Option>;

const paceOptions = {
  normal: {
    label: "Normal",
    multiplier: 1,
    definition: "No hard deadline and a sensible delivery pace.",
    questions: ["What is the ideal date?", "Who needs to review the work?"],
  },
  soon: {
    label: "Soon",
    multiplier: 1.1,
    definition: "Needed in the next 2-4 weeks.",
    questions: ["What happens if this waits a month?", "Can the client review quickly?"],
  },
  fast: {
    label: "Fast-track",
    multiplier: 1.25,
    definition: "Needed in 1-2 weeks and the client can support quick decisions.",
    questions: ["Can access and data be provided quickly?", "Can feedback happen within 24-48 hours?"],
  },
  critical: {
    label: "Critical",
    multiplier: 1.45,
    definition: "Deadline this week, business risk or event-driven pressure.",
    questions: ["What is the hard deadline?", "Who can unblock decisions immediately?"],
  },
} satisfies Record<string, Option>;

export default function GuidedCosting() {
  const [engagement, setEngagement] = useState<keyof typeof engagementOptions>("build");
  const [footprint, setFootprint] = useState<keyof typeof footprintOptions>("small");
  const [complexity, setComplexity] = useState<keyof typeof complexityOptions>("medium");
  const [data, setData] = useState<keyof typeof dataOptions>("mixed");
  const [integrations, setIntegrations] = useState<keyof typeof integrationOptions>("light");
  const [pace, setPace] = useState<keyof typeof paceOptions>("normal");
  const [supportMonths, setSupportMonths] = useState("1");

  const estimate = useMemo(() => {
    const base = engagementOptions[engagement].base || 0;
    const support = Number(supportMonths || 0) * 350;
    const raw =
      base *
        (footprintOptions[footprint].multiplier || 1) *
        (complexityOptions[complexity].multiplier || 1) *
        (dataOptions[data].multiplier || 1) *
        (integrationOptions[integrations].multiplier || 1) *
        (paceOptions[pace].multiplier || 1) +
      support;

    const recommended = Math.round(raw / 50) * 50;
    const rangeLow = Math.round((recommended * 0.85) / 50) * 50;
    const rangeHigh = Math.round((recommended * 1.2) / 50) * 50;

    const riskFlags = [
      data === "unknown",
      data === "messy",
      complexity === "high" || complexity === "veryHigh",
      integrations === "heavy",
      pace === "critical",
    ].filter(Boolean).length;

    const confidence = riskFlags >= 3 ? "Low" : riskFlags >= 1 ? "Medium" : "High";

    let recommendedStep = engagementOptions[engagement].label;

    if (data === "unknown") {
      recommendedStep = "Beacon Audit";
    } else if (
      data === "messy" ||
      complexity === "high" ||
      complexity === "veryHigh" ||
      integrations === "moderate" ||
      integrations === "heavy"
    ) {
      recommendedStep = "Beacon Blueprint";
    } else if (engagement === "retainer") {
      recommendedStep = "Support Retainer";
    } else if (engagement === "audit") {
      recommendedStep = "Beacon Audit";
    } else if (engagement === "blueprint") {
      recommendedStep = "Beacon Blueprint";
    } else {
      recommendedStep = "Focused AI Build";
    }

    return {
      rangeLow,
      rangeHigh,
      commercialFloor: Math.round((rangeLow * 0.75) / 50) * 50,
      deposit: engagement === "retainer" ? rangeLow : Math.round((rangeLow * 0.4) / 50) * 50,
      confidence,
      recommendedStep,
      reasons: [
        footprintOptions[footprint].label,
        complexityOptions[complexity].label,
        `${dataOptions[data].label} data readiness`,
        `${integrationOptions[integrations].label} integrations`,
        `${paceOptions[pace].label} pace`,
      ],
    };
  }, [engagement, footprint, complexity, data, integrations, pace, supportMonths]);

  return (
    <main className="min-h-screen bg-[#FBFAF7] px-6 py-8 text-[#18140D]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">FirstLight OS</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Guided costing demo</h1>
            <p className="mt-3 max-w-2xl leading-7 text-[#6B604D]">
              A client-facing scoping guide for pricing the workflow, not the buzzword.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/admin" className="rounded-full border border-[#D8C99F] px-4 py-2 text-sm font-semibold hover:border-[#BA7517]">Back to OS</a>
            <a href="/" className="rounded-full bg-[#18140D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#BA7517]">View website</a>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] bg-[#18140D] p-8 text-white shadow-[0_30px_80px_rgba(24,20,13,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">Result</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">Show the sensible starting point.</h2>
            <p className="mt-5 leading-7 text-white/70">
              This is not a quote generator. It is a scoping guide. Use it live on a call to explain why a project should start with an Audit, Blueprint, Build or Retainer.
            </p>

            <div className="mt-8 rounded-[2rem] bg-white p-6 text-[#18140D]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Recommended start</p>
              <p className="mt-3 text-4xl font-semibold">{estimate.recommendedStep}</p>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Estimated range</p>
              <p className="mt-3 text-5xl font-semibold">{gbp.format(estimate.rangeLow)}-{gbp.format(estimate.rangeHigh)}</p>

              <div className="mt-6 grid gap-3 text-sm text-[#6B604D]">
                <p><span className="font-semibold text-[#18140D]">Commercial floor:</span> {gbp.format(estimate.commercialFloor)}</p>
                <p><span className="font-semibold text-[#18140D]">Suggested deposit:</span> {gbp.format(estimate.deposit)}</p>
                <p><span className="font-semibold text-[#18140D]">Confidence:</span> {estimate.confidence}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {estimate.reasons.map((reason) => (
                  <span key={reason} className="rounded-full bg-[#FBFAF7] px-3 py-1 text-xs font-semibold text-[#6B604D]">
                    {reason}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-sm leading-6 text-white/70">
              <p className="font-semibold text-white">Demo script</p>
              <p className="mt-3">
                I price this by walking through the workflow footprint, complexity, data readiness, integrations and pace. That shows whether we should start with an Audit, Blueprint or Build.
              </p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <SelectField label="1. Engagement being scoped" value={engagement} onChange={(value) => setEngagement(value as keyof typeof engagementOptions)} options={engagementOptions} />
            <SelectField label="2. Workflow footprint" value={footprint} onChange={(value) => setFootprint(value as keyof typeof footprintOptions)} options={footprintOptions} />
            <SelectField label="3. Process complexity" value={complexity} onChange={(value) => setComplexity(value as keyof typeof complexityOptions)} options={complexityOptions} />
            <SelectField label="4. Data readiness" value={data} onChange={(value) => setData(value as keyof typeof dataOptions)} options={dataOptions} />
            <SelectField label="5. Integration needs" value={integrations} onChange={(value) => setIntegrations(value as keyof typeof integrationOptions)} options={integrationOptions} />
            <SelectField label="6. Delivery pace" value={pace} onChange={(value) => setPace(value as keyof typeof paceOptions)} options={paceOptions} />

            <label className="grid gap-2 rounded-[2rem] border border-[#EADFCA] bg-white p-5 text-sm font-semibold shadow-[0_15px_50px_rgba(38,31,18,0.05)] md:col-span-2">
              Support months
              <input
                type="number"
                min="0"
                value={supportMonths}
                onChange={(event) => setSupportMonths(event.target.value)}
                className="rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#D4AF37]"
              />
            </label>

            <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-6 text-sm leading-6 text-[#6B604D] shadow-[0_15px_50px_rgba(38,31,18,0.05)] md:col-span-2">
              <p className="font-semibold text-[#18140D]">Proposal wording</p>
              <p className="mt-3">
                Recommended starting point: {estimate.recommendedStep}. Estimated range: {gbp.format(estimate.rangeLow)}-{gbp.format(estimate.rangeHigh)}. This is based on {footprintOptions[footprint].label.toLowerCase()}, {complexityOptions[complexity].label.toLowerCase()}, {dataOptions[data].label.toLowerCase()} data readiness, {integrationOptions[integrations].label.toLowerCase()} integrations and {paceOptions[pace].label.toLowerCase()} delivery pace.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Record<string, Option>;
}) {
  const selectedOption = options[value];

  return (
    <label className="grid gap-2 rounded-[2rem] border border-[#EADFCA] bg-white p-5 text-sm font-semibold shadow-[0_15px_50px_rgba(38,31,18,0.05)]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#D4AF37]"
      >
        {Object.entries(options).map(([key, option]) => (
          <option key={key} value={key}>{option.label}</option>
        ))}
      </select>
      <div className="rounded-2xl bg-[#FBFAF7] p-4 font-normal leading-6 text-[#6B604D]">
        <p>{selectedOption.definition}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {selectedOption.questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>
    </label>
  );
}
