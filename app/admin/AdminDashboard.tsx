"use client";

import { useMemo, useState } from "react";

type ClientProject = {
  id: string;
  client: string;
  contact: string;
  sector: string;
  project: string;
  stage: number;
  status: "Lead" | "Audit" | "Blueprint" | "Build" | "Live" | "Support";
  value: number;
  due: string;
  nextAction: string;
  notes: string;
};

type LogoutAction = () => Promise<void>;

const beaconStages = [
  { code: "B0", title: "Signal", description: "Spot the opportunity" },
  { code: "B1", title: "Shape", description: "Define the workflow" },
  { code: "B2", title: "Proof", description: "Validate the need" },
  { code: "B3", title: "Blueprint", description: "Map requirements" },
  { code: "B4", title: "Build", description: "Create the system" },
  { code: "B5", title: "Trust", description: "Review risk" },
  { code: "B6", title: "Launch", description: "Go live carefully" },
  { code: "B7", title: "Learn", description: "Collect feedback" },
  { code: "B8", title: "Scale", description: "Extend what works" },
];

const initialProjects: ClientProject[] = [
  {
    id: "mw-financial",
    client: "MW Financial Solutions",
    contact: "Martin Yates / David Whittaker",
    sector: "Finance / admin",
    project: "AI workflow discovery and client admin blueprint",
    stage: 3,
    status: "Blueprint",
    value: 2750,
    due: "Next meeting",
    nextAction: "Prepare workflow map, pain points and first build options.",
    notes: "Good fit for admin reduction, document handling, client follow-up and reporting clarity.",
  },
  {
    id: "qatarmatch",
    client: "QatarMatch AI",
    contact: "Founder-led product",
    sector: "Real estate / lead conversion",
    project: "AI property matching and WhatsApp lead handoff",
    stage: 7,
    status: "Live",
    value: 3500,
    due: "B7 feedback review",
    nextAction: "Review clarity recordings, capture agency feedback and prioritise V2 improvements.",
    notes: "Commercial proof point for decision engines, match scoring and structured lead capture.",
  },
  {
    id: "onlylids",
    client: "OnlyLids",
    contact: "Concept lab",
    sector: "Content discovery",
    project: "Fan companion with episode recommendations and searchable lore direction",
    stage: 5,
    status: "Build",
    value: 1500,
    due: "Next Patreon feedback cycle",
    nextAction: "Add searchable moments/tags roadmap and capture user feedback themes.",
    notes: "Concept lab showing rapid build, public metadata use, recommendation logic and community feedback.",
  },
  {
    id: "morelands",
    client: "Morelands Camping",
    contact: "LinkedIn services lead",
    sector: "Hospitality / campsite",
    project: "Project management / process improvement enquiry",
    stage: 0,
    status: "Lead",
    value: 750,
    due: "This week",
    nextAction: "Qualify whether the need is booking, admin, website, CRM or operations workflow related.",
    notes: "Potential small business workflow audit. Do not pitch AI too early; diagnose the process first.",
  },
];

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const projectTypes = {
  audit: { label: "Beacon Audit", base: 750 },
  blueprint: { label: "Beacon Blueprint", base: 1500 },
  build: { label: "Focused AI Build", base: 3500 },
  retainer: { label: "Monthly Support Retainer", base: 950 },
};

const companySizeMultipliers = {
  micro: { label: "Micro business", multiplier: 1 },
  small: { label: "Small business", multiplier: 1.15 },
  medium: { label: "Medium business", multiplier: 1.35 },
  large: { label: "Larger SME", multiplier: 1.6 },
};

const complexityMultipliers = {
  low: { label: "Low complexity", multiplier: 1 },
  medium: { label: "Medium complexity", multiplier: 1.25 },
  high: { label: "High complexity", multiplier: 1.55 },
};

const dataReadinessMultipliers = {
  clean: { label: "Clean data/process", multiplier: 1 },
  mixed: { label: "Mixed readiness", multiplier: 1.2 },
  messy: { label: "Messy data/process", multiplier: 1.45 },
};

const integrationMultipliers = {
  none: { label: "No integrations", multiplier: 1 },
  light: { label: "Light integrations", multiplier: 1.15 },
  moderate: { label: "Moderate integrations", multiplier: 1.35 },
  heavy: { label: "Heavy integrations", multiplier: 1.65 },
};

const urgencyMultipliers = {
  normal: { label: "Normal pace", multiplier: 1 },
  fast: { label: "Fast-track", multiplier: 1.25 },
};

export default function AdminDashboard({ logoutAction }: { logoutAction: LogoutAction }) {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedId, setSelectedId] = useState(initialProjects[0].id);
  const [projectType, setProjectType] = useState<keyof typeof projectTypes>("build");
  const [companySize, setCompanySize] = useState<keyof typeof companySizeMultipliers>("small");
  const [complexity, setComplexity] = useState<keyof typeof complexityMultipliers>("medium");
  const [dataReadiness, setDataReadiness] = useState<keyof typeof dataReadinessMultipliers>("mixed");
  const [integrations, setIntegrations] = useState<keyof typeof integrationMultipliers>("light");
  const [urgency, setUrgency] = useState<keyof typeof urgencyMultipliers>("normal");
  const [supportMonths, setSupportMonths] = useState("1");

  const selectedProject = projects.find((project) => project.id === selectedId) || projects[0];

  const activeClients = projects.length;
  const pipelineValue = projects.reduce((sum, project) => sum + project.value, 0);
  const liveProjects = projects.filter((project) => project.status === "Live" || project.status === "Support").length;

  const estimate = useMemo(() => {
    const base = projectTypes[projectType].base;
    const support = Number(supportMonths) * 350;
    const calculated =
      base *
        companySizeMultipliers[companySize].multiplier *
        complexityMultipliers[complexity].multiplier *
        dataReadinessMultipliers[dataReadiness].multiplier *
        integrationMultipliers[integrations].multiplier *
        urgencyMultipliers[urgency].multiplier +
      support;

    const rounded = Math.round(calculated / 50) * 50;

    return {
      recommended: rounded,
      minimum: Math.round((rounded * 0.75) / 50) * 50,
      deposit: projectType === "retainer" ? rounded : Math.round((rounded * 0.4) / 50) * 50,
      support,
      base,
    };
  }, [projectType, companySize, complexity, dataReadiness, integrations, urgency, supportMonths]);

  function updateSelectedProject(field: keyof ClientProject, value: string | number) {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === selectedId ? { ...project, [field]: value } : project,
      ),
    );
  }

  return (
    <main className="min-h-screen bg-[#FBFAF7] text-[#18140D]">
      <header className="border-b border-[#EADFCA] bg-white/70 px-6 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">FirstLight OS</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">Beacon delivery and costing dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="rounded-full border border-[#D8C99F] px-4 py-2 text-sm font-semibold text-[#18140D] transition hover:border-[#BA7517]">
              View website
            </a>
            <form action={logoutAction}>
              <button className="rounded-full bg-[#18140D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#BA7517]">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          <StatCard label="Tracked clients" value={String(activeClients)} />
          <StatCard label="Pipeline value" value={gbp.format(pipelineValue)} />
          <StatCard label="Live/support" value={String(liveProjects)} />
          <StatCard label="Selected stage" value={`${beaconStages[selectedProject.stage].code} ${beaconStages[selectedProject.stage].title}`} />
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-6 shadow-[0_20px_60px_rgba(38,31,18,0.06)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#BA7517]">Clients</p>
                <h2 className="mt-2 text-2xl font-semibold">Beacon projects</h2>
              </div>
              <span className="rounded-full bg-[#F6E9CC] px-3 py-1 text-xs font-semibold text-[#BA7517]">MVP data</span>
            </div>

            <div className="grid gap-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedId(project.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selectedId === project.id
                      ? "border-[#BA7517] bg-[#FBFAF7] shadow-sm"
                      : "border-[#EADFCA] bg-white hover:border-[#D4AF37]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{project.client}</p>
                      <p className="mt-1 text-sm text-[#6B604D]">{project.project}</p>
                    </div>
                    <span className="rounded-full bg-[#18140D] px-3 py-1 text-xs font-semibold text-white">
                      {beaconStages[project.stage].code}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#6B604D]">
                    <span className="rounded-full bg-[#FBFAF7] px-3 py-1">{project.status}</span>
                    <span className="rounded-full bg-[#FBFAF7] px-3 py-1">{project.sector}</span>
                    <span className="rounded-full bg-[#FBFAF7] px-3 py-1">{gbp.format(project.value)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-6 shadow-[0_20px_60px_rgba(38,31,18,0.06)]">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#BA7517]">Selected project</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">{selectedProject.client}</h2>
                <p className="mt-2 text-[#6B604D]">{selectedProject.project}</p>
              </div>
              <div className="rounded-2xl bg-[#FBFAF7] p-5 text-sm leading-6 text-[#6B604D]">
                <p><span className="font-semibold text-[#18140D]">Contact:</span> {selectedProject.contact}</p>
                <p><span className="font-semibold text-[#18140D]">Sector:</span> {selectedProject.sector}</p>
                <p><span className="font-semibold text-[#18140D]">Due:</span> {selectedProject.due}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3 lg:grid-cols-9">
              {beaconStages.map((stage, index) => (
                <button
                  key={stage.code}
                  onClick={() => updateSelectedProject("stage", index)}
                  className={`rounded-2xl border p-3 text-center transition ${
                    index < selectedProject.stage
                      ? "border-[#D4AF37] bg-[#F6E9CC]"
                      : index === selectedProject.stage
                        ? "border-[#BA7517] bg-[#BA7517] text-white"
                        : "border-[#EADFCA] bg-[#FBFAF7]"
                  }`}
                >
                  <p className="text-xs font-bold">{stage.code}</p>
                  <p className="mt-1 text-xs font-semibold">{stage.title}</p>
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                Status
                <select
                  value={selectedProject.status}
                  onChange={(event) => updateSelectedProject("status", event.target.value)}
                  className="rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#D4AF37]"
                >
                  {['Lead', 'Audit', 'Blueprint', 'Build', 'Live', 'Support'].map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold">
                Estimated value
                <input
                  type="number"
                  value={selectedProject.value}
                  onChange={(event) => updateSelectedProject("value", Number(event.target.value))}
                  className="rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#D4AF37]"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                Next action
                <textarea
                  value={selectedProject.nextAction}
                  onChange={(event) => updateSelectedProject("nextAction", event.target.value)}
                  className="min-h-24 rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#D4AF37]"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                Notes
                <textarea
                  value={selectedProject.notes}
                  onChange={(event) => updateSelectedProject("notes", event.target.value)}
                  className="min-h-24 rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 font-normal outline-none focus:border-[#D4AF37]"
                />
              </label>
            </div>

            <p className="mt-5 rounded-2xl bg-[#FBFAF7] p-4 text-sm leading-6 text-[#6B604D]">
              This MVP stores edits in browser state only. The next version should connect to Supabase so client notes, stages and costing records persist securely.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-[#EADFCA] bg-[#18140D] p-6 text-white shadow-[0_30px_80px_rgba(24,20,13,0.18)] lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">Costing system</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">Price the first useful engagement.</h2>
            <p className="mt-5 leading-7 text-white/70">
              Use this calculator to turn project type, size, complexity, data readiness and integration effort into a practical starting estimate.
            </p>

            <div className="mt-8 rounded-[2rem] bg-white p-6 text-[#18140D]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#BA7517]">Recommended price</p>
              <p className="mt-3 text-5xl font-semibold">{gbp.format(estimate.recommended)}</p>
              <div className="mt-6 grid gap-3 text-sm text-[#6B604D]">
                <p><span className="font-semibold text-[#18140D]">Minimum acceptable:</span> {gbp.format(estimate.minimum)}</p>
                <p><span className="font-semibold text-[#18140D]">Suggested deposit:</span> {gbp.format(estimate.deposit)}</p>
                <p><span className="font-semibold text-[#18140D]">Support allowance:</span> {gbp.format(estimate.support)}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <SelectField label="Project type" value={projectType} onChange={(value) => setProjectType(value as keyof typeof projectTypes)} options={projectTypes} />
            <SelectField label="Company size" value={companySize} onChange={(value) => setCompanySize(value as keyof typeof companySizeMultipliers)} options={companySizeMultipliers} />
            <SelectField label="Complexity" value={complexity} onChange={(value) => setComplexity(value as keyof typeof complexityMultipliers)} options={complexityMultipliers} />
            <SelectField label="Data readiness" value={dataReadiness} onChange={(value) => setDataReadiness(value as keyof typeof dataReadinessMultipliers)} options={dataReadinessMultipliers} />
            <SelectField label="Integration needs" value={integrations} onChange={(value) => setIntegrations(value as keyof typeof integrationMultipliers)} options={integrationMultipliers} />
            <SelectField label="Urgency" value={urgency} onChange={(value) => setUrgency(value as keyof typeof urgencyMultipliers)} options={urgencyMultipliers} />

            <label className="grid gap-2 text-sm font-semibold md:col-span-2">
              Support months
              <input
                type="number"
                min="0"
                value={supportMonths}
                onChange={(event) => setSupportMonths(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white p-4 font-normal text-[#18140D] outline-none focus:border-[#D4AF37]"
              />
            </label>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-sm leading-6 text-white/70 md:col-span-2">
              <p className="font-semibold text-white">Proposal wording</p>
              <p className="mt-3">
                Recommended starting point: {projectTypes[projectType].label} at {gbp.format(estimate.recommended)}. This includes discovery, workflow review, practical recommendations and a focused path to the first useful build.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-[#EADFCA] bg-white p-6 shadow-[0_15px_50px_rgba(38,31,18,0.05)]">
      <p className="text-sm text-[#6B604D]">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
    </div>
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
  options: Record<string, { label: string; multiplier?: number; base?: number }>;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-white/10 bg-white p-4 font-normal text-[#18140D] outline-none focus:border-[#D4AF37]"
      >
        {Object.entries(options).map(([key, option]) => (
          <option key={key} value={key}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
