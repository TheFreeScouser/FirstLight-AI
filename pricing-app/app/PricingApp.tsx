"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type PipelineProject,
  type PipelineRetainer,
  type ProjectInputs,
  type RetainerInputs,
  type Role,
  type Settings,
  annualValue,
  annuityFactor,
  billableHours,
  defaultProject,
  defaultRetainer,
  defaultSettings,
  loadedHourlyCost,
  mixCheck,
  monthlyRetainer,
  projectFee,
  roleAnnualValue,
  workingHours,
} from "@/lib/pricing";
import { type OfferDetails, buildOffer, clientFigures, defaultOffer, offerSubject } from "@/lib/offer";

type Tab = "rate" | "value" | "fee" | "retainer" | "target";

/** Chrome/Android's install prompt event (not in the standard DOM types). */
type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Pipeline = { projects: PipelineProject[]; retainers: PipelineRetainer[] };

type Draft = {
  id: string;
  savedAt: string;
  status: "draft" | "sent";
  sentAt?: string;
  project: ProjectInputs;
  retainer: RetainerInputs;
  offer: OfferDetails;
  /** Fee and retainer at the time of saving, for the list. */
  fee: number;
  monthly: number;
};

type Saved = {
  settings: Settings;
  project: ProjectInputs;
  retainer: RetainerInputs;
  pipeline: Pipeline;
  offer: OfferDetails;
  drafts: Draft[];
  draftId: string | null;
};

const STORAGE_KEY = "firstlight-pricing-v1";

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const money = (v: number) => (Number.isFinite(v) ? gbp.format(Math.round(v)) : "—");
const hrs = (v: number) => `${num.format(Math.round(v))} h`;
const pct = (v: number) => `${Math.round(v * 100)}%`;

const uid = () => Math.random().toString(36).slice(2, 10);

const TABS: { id: Tab; step: string; label: string }[] = [
  { id: "rate", step: "A", label: "Rate" },
  { id: "value", step: "C", label: "Value" },
  { id: "fee", step: "D", label: "Fee" },
  { id: "retainer", step: "E", label: "Retainer" },
  { id: "target", step: "F", label: "Target" },
];

export default function PricingApp() {
  const [tab, setTab] = useState<Tab>("value");
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [project, setProject] = useState<ProjectInputs>(defaultProject);
  const [retainer, setRetainer] = useState<RetainerInputs>(defaultRetainer);
  const [pipeline, setPipeline] = useState<Pipeline>({ projects: [], retainers: [] });
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [offer, setOffer] = useState<OfferDetails>(defaultOffer);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [sheet, setSheet] = useState<"drafts" | "offer" | null>(null);

  // Offline support + Android "Install" button.
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as InstallPromptEvent);
    };
    const onInstalled = () => setInstallPrompt(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice.catch(() => null);
    setInstallPrompt(null);
  }

  // Load saved state once on the client. Storage can be unavailable (private mode), so fail quietly.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Saved>;
        /* eslint-disable react-hooks/set-state-in-effect -- one-off hydration from browser storage */
        if (saved.settings) setSettings({ ...defaultSettings, ...saved.settings });
        if (saved.project) setProject({ ...defaultProject, ...saved.project });
        if (saved.retainer) setRetainer({ ...defaultRetainer, ...saved.retainer });
        if (saved.pipeline) setPipeline({ projects: saved.pipeline.projects ?? [], retainers: saved.pipeline.retainers ?? [] });
        if (saved.offer) setOffer({ ...defaultOffer, ...saved.offer });
        if (Array.isArray(saved.drafts)) setDrafts(saved.drafts);
        if (saved.draftId) setDraftId(saved.draftId);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const data: Saved = { settings, project, retainer, pipeline, offer, drafts, draftId };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [hydrated, settings, project, retainer, pipeline, offer, drafts, draftId]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const fee = useMemo(() => projectFee(project, settings), [project, settings]);
  const ret = useMemo(
    () => monthlyRetainer(retainer, fee.rate, project.buffer, fee.vAnnual),
    [retainer, fee.rate, fee.vAnnual, project.buffer],
  );
  const mix = useMemo(() => mixCheck(pipeline.projects, pipeline.retainers, settings), [pipeline, settings]);

  const setP = <K extends keyof ProjectInputs>(k: K, v: ProjectInputs[K]) => setProject((p) => ({ ...p, [k]: v }));
  const setS = <K extends keyof Settings>(k: K, v: Settings[K]) => setSettings((s) => ({ ...s, [k]: v }));
  const setR = <K extends keyof RetainerInputs>(k: K, v: RetainerInputs[K]) => setRetainer((r) => ({ ...r, [k]: v }));

  function addToPipeline() {
    const name = project.clientName.trim() || `Project ${pipeline.projects.length + 1}`;
    setPipeline((pl) => ({
      projects: [...pl.projects, { id: uid(), name, fee: Math.round(fee.fee), hours: project.hours }],
      retainers:
        retainer.enabled && retainer.hoursPerMonth + retainer.tooling > 0
          ? [...pl.retainers, { id: uid(), name, monthly: Math.round(ret.monthly), hoursPerMonth: retainer.hoursPerMonth }]
          : pl.retainers,
    }));
    setToast(`${name} added to your year`);
  }

  function newQuote() {
    setProject({ ...defaultProject, roles: [{ ...defaultProject.roles[0], id: uid() }] });
    setRetainer(defaultRetainer);
    // Keep your own preferences (payment terms, sign-off), clear the client's details.
    setOffer((o) => ({ ...o, contactName: "", email: "", summary: "" }));
    setDraftId(null);
    setTab("value");
    window.scrollTo({ top: 0 });
  }

  const offerFigures = clientFigures(fee.fee, retainer.enabled ? ret.monthly : 0);

  /** Save the current quote as a draft (or mark it sent). Updates the same draft if it was saved before. */
  function saveDraft(status: Draft["status"] = "draft") {
    const id = draftId ?? uid();
    const now = new Date().toISOString();
    setDrafts((list) => {
      const existing = list.find((d) => d.id === id);
      const draft: Draft = {
        id,
        savedAt: now,
        // Once sent, a later "save" keeps the sent status.
        status: status === "sent" || existing?.status === "sent" ? "sent" : "draft",
        sentAt: status === "sent" ? now : existing?.sentAt,
        project,
        retainer,
        offer,
        // Store the prices as the client sees them (rounded up).
        fee: offerFigures.fee,
        monthly: offerFigures.monthly,
      };
      return [draft, ...list.filter((d) => d.id !== id)];
    });
    setDraftId(id);
    if (status === "draft") setToast("Draft saved");
  }

  function openDraft(d: Draft) {
    setProject({ ...defaultProject, ...d.project });
    setRetainer({ ...defaultRetainer, ...d.retainer });
    setOffer({ ...defaultOffer, ...d.offer });
    setDraftId(d.id);
    setSheet(null);
    setTab("fee");
    window.scrollTo({ top: 0 });
    setToast(`Opened ${d.project.clientName.trim() || "draft"}`);
  }

  function deleteDraft(id: string) {
    setDrafts((list) => list.filter((d) => d.id !== id));
    if (id === draftId) setDraftId(null);
  }

  const currentDraft = drafts.find((d) => d.id === draftId) ?? null;

  const actions = (
    <QuoteActions
      belowFloor={fee.belowFloor}
      current={currentDraft}
      onSend={() => setSheet("offer")}
      onSave={() => saveDraft("draft")}
      onAdd={addToPipeline}
    />
  );

  const status = fee.belowFloor
    ? { label: "Below floor", tone: "bad" as const }
    : fee.verdict === "ceiling"
      ? { label: "Capped by market", tone: "warn" as const }
      : { label: "Value priced", tone: "good" as const };

  return (
    <div className="min-h-dvh bg-[#EFE9DD] text-[#18140D]">
      <div className="relative mx-auto flex min-h-dvh max-w-[480px] flex-col bg-[#FBFAF7] shadow-[0_0_80px_rgba(38,31,18,0.08)]">
        {/* Header + live quote */}
        <header className="sticky top-0 z-20 border-b border-[#EADFCA] bg-[#FBFAF7]/90 px-4 pb-3 pt-[max(env(safe-area-inset-top),12px)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Mark />
              <span className="whitespace-nowrap text-xs font-semibold tracking-[0.2em]">
                FIRSTLIGHT <span className="hidden text-[#BA7517] min-[460px]:inline">PRICING</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              {installPrompt ? (
                <button
                  onClick={install}
                  className="whitespace-nowrap rounded-full bg-[#BA7517] px-3 py-1.5 text-xs font-semibold text-white active:bg-[#18140D]"
                >
                  Install
                </button>
              ) : null}
              <button
                onClick={() => setSheet("drafts")}
                className="whitespace-nowrap rounded-full border border-[#D8C99F] px-3 py-1.5 text-xs font-semibold active:bg-[#F3ECDD]"
              >
                Drafts{drafts.length ? ` · ${drafts.length}` : ""}
              </button>
              <button
                onClick={newQuote}
                className="whitespace-nowrap rounded-full border border-[#D8C99F] px-3 py-1.5 text-xs font-semibold active:bg-[#F3ECDD]"
              >
                New quote
              </button>
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-[#18140D] p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                  {project.clientName.trim() || "Untitled client"}
                </p>
                <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">{money(fee.fee)}</p>
                <p className="mt-0.5 text-xs text-white/60">
                  project fee{retainer.enabled ? <> · <span className="text-white">{money(ret.monthly)}</span>/mo retainer</> : null}
                </p>
              </div>
              <StatusPill tone={status.tone}>{status.label}</StatusPill>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
              <Mini label="Floor" value={money(fee.floor)} />
              <Mini label="θ × PV" value={money(fee.valuePrice)} />
              <Mini label="Client ROI" value={fee.roiMultiple > 0 ? `${fee.roiMultiple.toFixed(1)}×` : "—"} />
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pb-32 pt-4">
          {tab === "rate" && <RateTab settings={settings} setS={setS} rate={fee.rate} onReset={() => setSettings(defaultSettings)} />}
          {tab === "value" && <ValueTab project={project} setP={setP} setProject={setProject} settings={settings} />}
          {tab === "fee" && <FeeTab project={project} setP={setP} fee={fee} actions={actions} />}
          {tab === "retainer" && <RetainerTab retainer={retainer} setR={setR} ret={ret} rate={fee.rate} buffer={project.buffer} vAnnual={fee.vAnnual} actions={actions} />}
          {tab === "target" && <TargetTab mix={mix} pipeline={pipeline} setPipeline={setPipeline} settings={settings} />}
        </main>

        {sheet === "drafts" ? (
          <DraftsSheet drafts={drafts} currentId={draftId} onOpen={openDraft} onDelete={deleteDraft} onClose={() => setSheet(null)} />
        ) : null}
        {sheet === "offer" ? (
          <OfferSheet
            offer={offer}
            setOffer={setOffer}
            text={buildOffer(project, retainer, { ...offerFigures, pv: fee.pv, timeValue: fee.vTime }, offer)}
            subject={offerSubject(project.clientName)}
            onSent={(how) => {
              saveDraft("sent");
              setToast(how === "copy" ? "Offer copied · saved as sent" : "Offer ready · saved as sent");
            }}
            onClose={() => setSheet(null)}
          />
        ) : null}

        {toast ? (
          <div className="pointer-events-none fixed inset-x-0 bottom-24 z-30 mx-auto w-fit rounded-full bg-[#18140D] px-4 py-2 text-sm font-semibold text-white shadow-lg">
            {toast}
          </div>
        ) : null}

        {/* Bottom tab bar */}
        <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-[480px] border-t border-[#EADFCA] bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
          <ul className="grid grid-cols-5">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => {
                      setTab(t.id);
                      window.scrollTo({ top: 0 });
                    }}
                    aria-current={active ? "page" : undefined}
                    aria-label={`${t.label} (step ${t.step})`}
                    className="flex w-full flex-col items-center gap-1 py-2.5"
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${
                        active ? "bg-[#BA7517] text-white" : "bg-[#F3ECDD] text-[#6B604D]"
                      }`}
                    >
                      {t.step}
                    </span>
                    <span className={`text-[11px] font-semibold ${active ? "text-[#18140D]" : "text-[#6B604D]"}`}>{t.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tabs                                                               */
/* ------------------------------------------------------------------ */

function RateTab({
  settings,
  setS,
  rate,
  onReset,
}: {
  settings: Settings;
  setS: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
  rate: number;
  onReset: () => void;
}) {
  const hyr = workingHours(settings);
  const billable = billableHours(settings);
  return (
    <>
      <Intro step="Step A" title="Your hourly floor" body="The rate every billable hour must earn to hit your revenue target. Nothing goes out below this." />

      <Card>
        <BigResult label="Required hourly rate · ch" value={`${money(rate)}/h`} />
        <Working>
          ch = {money(settings.revenueTarget)} ÷ ({num.format(hyr)} × {settings.utilisation.toFixed(2)}) = <b>{money(rate)}</b>
        </Working>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Stat label="Working hours · Hyr" value={hrs(hyr)} />
          <Stat label="Billable hours" value={hrs(billable)} />
        </div>
      </Card>

      <Card title="Your year">
        <NumberField label="Revenue target" hint="Rtarget · for ~£100k take-home" prefix="£" value={settings.revenueTarget} onChange={(v) => setS("revenueTarget", v)} step={5000} />
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Working weeks" value={settings.weeksPerYear} onChange={(v) => setS("weeksPerYear", v)} />
          <NumberField label="Hours / week" value={settings.hoursPerWeek} onChange={(v) => setS("hoursPerWeek", v)} />
        </div>
        <SliderField
          label="Utilisation · U"
          hint="Share of hours you can bill. Selling and admin eat the rest."
          value={settings.utilisation}
          onChange={(v) => setS("utilisation", v)}
          min={0.3}
          max={0.9}
          step={0.05}
        />
      </Card>

      <Card title="Client staff cost assumptions">
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="On-cost multiplier" hint="NI, pension, overheads" value={settings.onCost} onChange={(v) => setS("onCost", v)} step={0.05} decimals />
          <NumberField label="Staff hours / year" hint="Paid hours per FTE" value={settings.staffHoursPerYear} onChange={(v) => setS("staffHoursPerYear", v)} />
        </div>
      </Card>

      <button onClick={onReset} className="mt-2 w-full rounded-2xl border border-[#D8C99F] py-3 text-sm font-semibold text-[#6B604D] active:bg-[#F3ECDD]">
        Reset to FirstLight defaults
      </button>
    </>
  );
}

function ValueTab({
  project,
  setP,
  setProject,
  settings,
}: {
  project: ProjectInputs;
  setP: <K extends keyof ProjectInputs>(k: K, v: ProjectInputs[K]) => void;
  setProject: React.Dispatch<React.SetStateAction<ProjectInputs>>;
  settings: Settings;
}) {
  const { time, total } = annualValue(project, settings);
  const factor = annuityFactor(project.years, project.discountRate);
  const pv = project.adoption * total * factor;

  const updateRole = (id: string, patch: Partial<Role>) =>
    setProject((p) => ({ ...p, roles: p.roles.map((r) => (r.id === id ? { ...r, ...patch } : r)) }));
  const removeRole = (id: string) => setProject((p) => ({ ...p, roles: p.roles.filter((r) => r.id !== id) }));
  const addRole = () =>
    setProject((p) => ({
      ...p,
      roles: [...p.roles, { id: uid(), name: `Role ${p.roles.length + 1}`, staff: 1, hoursSavedPerWeek: 2, salary: 30_000 }],
    }));

  return (
    <>
      <Intro step="Step C" title="What is it worth to them?" body="Fill this in with the client. Time saved, revenue gained and mistakes avoided, discounted and risk-weighted." />

      <Card>
        <TextField label="Client" value={project.clientName} onChange={(v) => setP("clientName", v)} placeholder="e.g. MW Financial Solutions" />
      </Card>

      <Card title="Time saved by role" action={<SmallButton onClick={addRole}>+ Role</SmallButton>}>
        {project.roles.length === 0 ? <p className="text-sm text-[#6B604D]">No roles yet. Add the people whose time this frees up.</p> : null}
        {project.roles.map((r) => {
          const ci = loadedHourlyCost(r.salary, settings);
          return (
            <div key={r.id} className="rounded-2xl border border-[#EADFCA] bg-[#FBFAF7] p-3">
              <div className="flex items-center gap-2">
                <input
                  value={r.name}
                  onChange={(e) => updateRole(r.id, { name: e.target.value })}
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
                  aria-label="Role name"
                />
                <button onClick={() => removeRole(r.id)} className="rounded-full px-2 py-1 text-xs font-semibold text-[#9A3B2A] active:bg-[#F7E3DD]" aria-label={`Remove ${r.name}`}>
                  Remove
                </button>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <NumberField compact label="Staff · n" value={r.staff} onChange={(v) => updateRole(r.id, { staff: v })} />
                <NumberField compact label="Hrs/wk · s" value={r.hoursSavedPerWeek} onChange={(v) => updateRole(r.id, { hoursSavedPerWeek: v })} step={0.5} decimals />
                <NumberField compact label="Salary" prefix="£" value={r.salary} onChange={(v) => updateRole(r.id, { salary: v })} step={1000} />
              </div>
              <p className="mt-2 flex justify-between text-xs text-[#6B604D]">
                <span>c = {money(ci)}/h loaded</span>
                <span className="font-semibold text-[#18140D]">{money(roleAnnualValue(r, settings))}/yr</span>
              </p>
            </div>
          );
        })}
      </Card>

      <Card title="Other annual value">
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Extra revenue · G" hint="More clients, same team" prefix="£" value={project.extraRevenue} onChange={(v) => setP("extraRevenue", v)} step={1000} />
          <NumberField label="Losses avoided · L" hint="Errors, fines, rework" prefix="£" value={project.lossAvoided} onChange={(v) => setP("lossAvoided", v)} step={500} />
        </div>
      </Card>

      <Card title="Be conservative">
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Years benefit lasts · N" value={project.years} onChange={(v) => setP("years", Math.max(1, Math.round(v)))} />
          <NumberField label="Discount rate · r" suffix="%" value={Math.round(project.discountRate * 100)} onChange={(v) => setP("discountRate", v / 100)} />
        </div>
        <SliderField label="Adoption probability · p" hint="How likely they actually change how they work." value={project.adoption} onChange={(v) => setP("adoption", v)} min={0.3} max={1} step={0.05} />
      </Card>

      <Card>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Time value / yr" value={money(time)} />
          <Stat label="Vannual" value={money(total)} strong />
        </div>
        <BigResult label="Risk-adjusted present value · PV" value={money(pv)} />
        <Working>
          PV = {project.adoption.toFixed(2)} × {money(total)} × {factor.toFixed(3)} = <b>{money(pv)}</b>
          <br />
          <span className="opacity-70">({factor.toFixed(3)} = Σ 1/(1+{project.discountRate.toFixed(2)})ᵗ over {project.years} yrs)</span>
        </Working>
      </Card>
    </>
  );
}

function FeeTab({
  project,
  setP,
  fee,
  actions,
}: {
  project: ProjectInputs;
  setP: <K extends keyof ProjectInputs>(k: K, v: ProjectInputs[K]) => void;
  fee: ReturnType<typeof projectFee>;
  actions: React.ReactNode;
}) {
  return (
    <>
      <Intro step="Steps B + D" title="Set the fee" body="The fee is the value price, capped by what the market will bear, and never below your cost floor." />

      <Card title="Your cost to deliver · B">
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Estimated hours · h" value={project.hours} onChange={(v) => setP("hours", v)} step={5} />
          <NumberField label="Direct costs · E" hint="Software, subs" prefix="£" value={project.directCosts} onChange={(v) => setP("directCosts", v)} step={50} />
        </div>
        <SliderField label="Risk buffer · m" hint="Overruns and unknowns. 15–25%." value={project.buffer} onChange={(v) => setP("buffer", v)} min={0.1} max={0.35} step={0.01} />
        <Working>
          Pfloor = ({num.format(project.hours)} × {money(fee.rate)} + {money(project.directCosts)}) ÷ (1 − {project.buffer.toFixed(2)}) = <b>{money(fee.floor)}</b>
        </Working>
      </Card>

      <Card title="Value price · D">
        <SliderField label="Share of value · θ" hint={`Client keeps ${pct(1 - project.valueShare)} — an easy yes.`} value={project.valueShare} onChange={(v) => setP("valueShare", v)} min={0.05} max={0.3} step={0.01} />
        <NumberField label="Market ceiling · Pceiling" hint="Sense-check against their annual IT / consultancy spend" prefix="£" value={project.ceiling} onChange={(v) => setP("ceiling", v)} step={1000} />
      </Card>

      <PriceScale floor={fee.floor} valuePrice={fee.valuePrice} ceiling={project.ceiling} fee={fee.fee} />

      <Verdict fee={fee} hours={project.hours} />

      <Card title="How it lands with the client">
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Value to them (PV)" value={money(fee.pv)} />
          <Stat label="Your fee" value={money(fee.fee)} strong />
          <Stat label="Return on fee" value={fee.roiMultiple > 0 ? `${fee.roiMultiple.toFixed(1)}×` : "—"} />
          <Stat label="They keep" value={pct(fee.clientKeeps)} />
        </div>
        <p className="mt-3 text-xs leading-5 text-[#6B604D]">
          Effective rate on this job: <b className="text-[#18140D]">{money(fee.effectiveRate)}/h</b> vs your floor of {money(fee.rate)}/h.
        </p>
      </Card>

      {actions}
    </>
  );
}

function RetainerTab({
  retainer,
  setR,
  ret,
  rate,
  buffer,
  vAnnual,
  actions,
}: {
  retainer: RetainerInputs;
  setR: <K extends keyof RetainerInputs>(k: K, v: RetainerInputs[K]) => void;
  ret: ReturnType<typeof monthlyRetainer>;
  rate: number;
  buffer: number;
  vAnnual: number;
  actions: React.ReactNode;
}) {
  return (
    <>
      <Intro step="Step E" title="Monthly retainer" body="Ongoing support priced at the higher of your cost to run it, or a share of the value it keeps delivering." />

      <Card>
        <label className="flex items-center justify-between gap-3">
          <span>
            <span className="block text-sm font-semibold">Include a retainer</span>
            <span className="block text-xs text-[#6B604D]">Added to the pipeline with the project</span>
          </span>
          <Toggle checked={retainer.enabled} onChange={(v) => setR("enabled", v)} />
        </label>
      </Card>

      <div className={retainer.enabled ? "" : "pointer-events-none opacity-40"}>
        <Card title="Inputs">
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Support hrs / month · hm" value={retainer.hoursPerMonth} onChange={(v) => setR("hoursPerMonth", v)} step={1} />
            <NumberField label="Tooling & API · T" hint="Per month" prefix="£" value={retainer.tooling} onChange={(v) => setR("tooling", v)} step={25} />
          </div>
          <SliderField label="Share of ongoing value · γ" hint="Typically 20–30%. Uses the full annual value (no adoption discount): the retainer starts after go-live, once the client is actually using it." value={retainer.valueShare} onChange={(v) => setR("valueShare", v)} min={0.1} max={0.4} step={0.01} />
        </Card>

        <Card>
          <BigResult label="Monthly retainer · Rmonth" value={`${money(ret.monthly)}/mo`} />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Stat label="Cost-based" value={money(ret.costBased)} strong={ret.driver === "cost"} />
            <Stat label="Value-based" value={money(ret.valueBased)} strong={ret.driver === "value"} />
          </div>
          <Working>
            cost = ({num.format(retainer.hoursPerMonth)} × {money(rate)} + {money(retainer.tooling)}) ÷ (1 − {buffer.toFixed(2)}) = {money(ret.costBased)}
            <br />
            value = {retainer.valueShare.toFixed(2)} × {money(vAnnual)} ÷ 12 = {money(ret.valueBased)}
          </Working>
          <p className="mt-3 text-xs leading-5 text-[#6B604D]">
            {ret.driver === "value"
              ? "Value sets the price: the work is worth more to them than it costs you to run."
              : "Cost sets the price: make sure the support hours are genuinely needed."}{" "}
            Annual: <b className="text-[#18140D]">{money(ret.monthly * 12)}</b>.
          </p>
        </Card>
      </div>

      {actions}
    </>
  );
}

function TargetTab({
  mix,
  pipeline,
  setPipeline,
  settings,
}: {
  mix: ReturnType<typeof mixCheck>;
  pipeline: Pipeline;
  setPipeline: React.Dispatch<React.SetStateAction<Pipeline>>;
  settings: Settings;
}) {
  const [adding, setAdding] = useState<"project" | "retainer" | null>(null);
  const [draft, setDraft] = useState({ name: "", amount: 0, hours: 0 });

  const remainingHours = Math.max(0, mix.capacity - mix.hoursUsed);
  const neededRate = mix.gap > 0 && remainingHours > 0 ? mix.gap / remainingHours : 0;

  let headline: { tone: "good" | "warn" | "bad"; title: string; body: string };
  if (mix.revenueOk && mix.capacityOk) {
    headline = { tone: "good", title: "Target reached", body: "Revenue clears the target within the hours you actually have." };
  } else if (mix.revenueOk && !mix.capacityOk) {
    headline = { tone: "bad", title: "Prices are too low", body: `Revenue only works by billing ${hrs(mix.hoursUsed - mix.capacity)} more than you have.` };
  } else if (!mix.capacityOk) {
    headline = { tone: "bad", title: "Over capacity and short", body: "You're out of hours and still below target. Raise prices or swap low-value work." };
  } else {
    headline = {
      tone: "warn",
      title: `${money(mix.gap)} to go`,
      body: neededRate > 0 ? `Remaining ${hrs(remainingHours)} need to earn ${money(neededRate)}/h on average.` : "Add work to close the gap.",
    };
  }

  function saveDraft() {
    const name = draft.name.trim() || (adding === "project" ? "Project" : "Retainer");
    if (adding === "project") {
      setPipeline((p) => ({ ...p, projects: [...p.projects, { id: uid(), name, fee: draft.amount, hours: draft.hours }] }));
    } else if (adding === "retainer") {
      setPipeline((p) => ({ ...p, retainers: [...p.retainers, { id: uid(), name, monthly: draft.amount, hoursPerMonth: draft.hours }] }));
    }
    setAdding(null);
    setDraft({ name: "", amount: 0, hours: 0 });
  }

  return (
    <>
      <Intro step="Step F" title="Does the mix reach the target?" body="Every project and retainer you've priced, checked against revenue and the hours you can really bill." />

      <Card>
        <div className={`rounded-2xl p-3 ${toneBg(headline.tone)}`}>
          <p className="text-sm font-semibold">{headline.title}</p>
          <p className="mt-0.5 text-xs leading-5 opacity-80">{headline.body}</p>
        </div>
        <Meter
          label="Revenue"
          value={mix.revenue}
          max={settings.revenueTarget}
          display={`${money(mix.revenue)} / ${money(settings.revenueTarget)}`}
          ok={mix.revenueOk}
          segments={[
            { value: mix.projectRevenue, color: "#BA7517", label: "Projects" },
            { value: mix.retainerRevenue, color: "#D4AF37", label: "Retainers × 12" },
          ]}
        />
        <Meter
          label="Hours"
          value={mix.hoursUsed}
          max={mix.capacity}
          display={`${hrs(mix.hoursUsed)} / ${hrs(mix.capacity)}`}
          ok={mix.capacityOk}
          invert
          segments={[
            { value: mix.projectHours, color: "#18140D", label: "Projects" },
            { value: mix.retainerHours, color: "#6B604D", label: "Retainers × 12" },
          ]}
        />
      </Card>

      <Card title={`Projects · ${pipeline.projects.length}`} action={<SmallButton onClick={() => setAdding("project")}>+ Add</SmallButton>}>
        {pipeline.projects.length === 0 ? <Empty>Price a project and tap “Add to my year”.</Empty> : null}
        {pipeline.projects.map((p) => (
          <Row
            key={p.id}
            name={p.name}
            meta={hrs(p.hours)}
            amount={money(p.fee)}
            onRemove={() => setPipeline((pl) => ({ ...pl, projects: pl.projects.filter((x) => x.id !== p.id) }))}
          />
        ))}
      </Card>

      <Card title={`Retainers · ${pipeline.retainers.length}`} action={<SmallButton onClick={() => setAdding("retainer")}>+ Add</SmallButton>}>
        {pipeline.retainers.length === 0 ? <Empty>Recurring revenue makes the target far easier.</Empty> : null}
        {pipeline.retainers.map((r) => (
          <Row
            key={r.id}
            name={r.name}
            meta={`${num.format(r.hoursPerMonth)} h/mo`}
            amount={`${money(r.monthly)}/mo`}
            onRemove={() => setPipeline((pl) => ({ ...pl, retainers: pl.retainers.filter((x) => x.id !== r.id) }))}
          />
        ))}
      </Card>

      <Working>
        Σ Pj + 12 × Σ Rk = {money(mix.projectRevenue)} + {money(mix.retainerRevenue)} = <b>{money(mix.revenue)}</b> {mix.revenueOk ? "≥" : "<"} {money(settings.revenueTarget)}
        <br />
        Σ hj + 12 × Σ hm = {hrs(mix.hoursUsed)} {mix.capacityOk ? "≤" : ">"} {hrs(mix.capacity)}
      </Working>

      {adding ? (
        <Sheet title={adding === "project" ? "Add a project" : "Add a retainer"} onClose={() => setAdding(null)}>
          <TextField label="Name" value={draft.name} onChange={(v) => setDraft((d) => ({ ...d, name: v }))} placeholder="Client or project" />
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={adding === "project" ? "Fee" : "Monthly fee"} prefix="£" value={draft.amount} onChange={(v) => setDraft((d) => ({ ...d, amount: v }))} step={500} />
            <NumberField label={adding === "project" ? "Hours" : "Hours / month"} value={draft.hours} onChange={(v) => setDraft((d) => ({ ...d, hours: v }))} />
          </div>
          <PrimaryButton onClick={saveDraft}>Add</PrimaryButton>
        </Sheet>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Visuals                                                            */
/* ------------------------------------------------------------------ */

function PriceScale({ floor, valuePrice, ceiling, fee }: { floor: number; valuePrice: number; ceiling: number; fee: number }) {
  const hasCeiling = ceiling > 0;
  const max = Math.max(floor, valuePrice, hasCeiling ? ceiling : 0, fee, 1) * 1.12;
  const pos = (v: number) => `${Math.min(100, Math.max(0, (v / max) * 100))}%`;
  const markers = [
    { v: floor, label: "Floor", color: "#9A3B2A" },
    { v: valuePrice, label: "θ×PV", color: "#BA7517" },
    ...(hasCeiling ? [{ v: ceiling, label: "Ceiling", color: "#6B604D" }] : []),
  ];

  return (
    <Card title="Where the fee lands">
      <div className="relative mt-2 h-24">
        {/* No-go zone below the floor */}
        <div className="absolute left-0 top-9 h-3 rounded-l-full bg-[#F7E3DD]" style={{ width: pos(floor) }} />
        <div className="absolute top-9 h-3 bg-[#EADFCA]" style={{ left: pos(floor), right: 0 }} />
        {hasCeiling ? <div className="absolute top-9 h-3 rounded-r-full bg-[#E5E0D6]" style={{ left: pos(ceiling), right: 0 }} /> : null}
        {markers.map((m, i) => {
          const below = i % 2 === 1; // alternate above/below so close labels don't collide
          return (
            <div key={m.label} className="absolute -translate-x-1/2" style={{ left: pos(m.v), top: 0, bottom: 0 }}>
              <div className="absolute left-1/2 top-[26px] h-7 w-px" style={{ background: m.color }} />
              <p
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold"
                style={{ color: m.color, top: below ? 64 : 8 }}
              >
                {m.label}
              </p>
            </div>
          );
        })}
        <div className="absolute top-[30px] -translate-x-1/2" style={{ left: pos(fee) }}>
          <div className="h-[30px] w-[30px] rounded-full border-4 border-white bg-[#18140D] shadow-md" />
        </div>
      </div>
      <p className="text-center text-xs text-[#6B604D]">
        Fee <b className="text-[#18140D]">{money(fee)}</b> · red zone is below your cost floor
      </p>
    </Card>
  );
}

function Verdict({ fee, hours }: { fee: ReturnType<typeof projectFee>; hours: number }) {
  if (fee.belowFloor) {
    const cut = Math.max(0, hours - fee.maxHours);
    return (
      <div className={`mb-4 rounded-3xl p-4 ${toneBg("bad")}`}>
        <p className="text-sm font-semibold">Don&apos;t take it at this scope</p>
        <p className="mt-1 text-xs leading-5">
          θ × PV ({money(fee.capped)}) is below your floor ({money(fee.floor)}). Cut scope to about <b>{hrs(fee.maxHours)}</b> (−{hrs(cut)}), raise θ, or walk away.
        </p>
      </div>
    );
  }
  if (fee.verdict === "ceiling") {
    return (
      <div className={`mb-4 rounded-3xl p-4 ${toneBg("warn")}`}>
        <p className="text-sm font-semibold">Capped by the market</p>
        <p className="mt-1 text-xs leading-5">
          The value supports {money(fee.valuePrice)}, but this client won&apos;t bear more than {money(fee.capped)}. Strong deal; consider a retainer to capture more.
        </p>
      </div>
    );
  }
  return (
    <div className={`mb-4 rounded-3xl p-4 ${toneBg("good")}`}>
      <p className="text-sm font-semibold">Value priced, clears the floor</p>
      <p className="mt-1 text-xs leading-5">
        {money(fee.fee - fee.floor)} above cost floor. You could absorb up to {hrs(fee.maxHours)} of delivery before this stops paying.
      </p>
    </div>
  );
}

function Meter({
  label,
  value,
  max,
  display,
  ok,
  invert,
  segments,
}: {
  label: string;
  value: number;
  max: number;
  display: string;
  ok: boolean;
  invert?: boolean;
  segments: { value: number; color: string; label: string }[];
}) {
  const scale = Math.max(max, value, 1);
  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold">{label}</p>
        <p className={`text-xs font-semibold tabular-nums ${ok ? "text-[#2F6B3A]" : invert ? "text-[#9A3B2A]" : "text-[#8A5A0E]"}`}>{display}</p>
      </div>
      <div className="relative mt-2 flex h-3 overflow-hidden rounded-full bg-[#F3ECDD]">
        {segments.map((s) => (
          <div key={s.label} style={{ width: `${(s.value / scale) * 100}%`, background: s.color }} />
        ))}
        <div className="absolute inset-y-0 w-0.5 bg-[#18140D]" style={{ left: `calc(${(max / scale) * 100}% - 1px)` }} aria-hidden />
      </div>
      <div className="mt-1.5 flex gap-3 text-[11px] text-[#6B604D]">
        {segments.map((s) => (
          <span key={s.label} className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Drafts and offers                                                  */
/* ------------------------------------------------------------------ */

const when = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const fmtWhen = (iso?: string) => (iso ? when.format(new Date(iso)) : "");

function QuoteActions({
  belowFloor,
  current,
  onSend,
  onSave,
  onAdd,
}: {
  belowFloor: boolean;
  current: Draft | null;
  onSend: () => void;
  onSave: () => void;
  onAdd: () => void;
}) {
  return (
    <section className="mb-4 rounded-3xl border border-[#EADFCA] bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B604D]">Finish this quote</h2>
        {current ? (
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${current.status === "sent" ? "bg-[#DCEBD9] text-[#24502C]" : "bg-[#F3ECDD] text-[#6B604D]"}`}>
            {current.status === "sent" ? `Sent ${fmtWhen(current.sentAt)}` : `Saved ${fmtWhen(current.savedAt)}`}
          </span>
        ) : null}
      </div>
      <div className="grid gap-2">
        <PrimaryButton onClick={onSend} disabled={belowFloor}>
          {belowFloor ? "Cut scope before sending" : "Send offer to client"}
        </PrimaryButton>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={onSave} className="rounded-2xl border border-[#18140D] py-3 text-sm font-semibold active:bg-[#F3ECDD]">
            Save as draft
          </button>
          <button
            onClick={onAdd}
            disabled={belowFloor}
            className="rounded-2xl border border-[#D8C99F] py-3 text-sm font-semibold text-[#6B604D] active:bg-[#F3ECDD] disabled:opacity-40"
          >
            Add to my year
          </button>
        </div>
      </div>
    </section>
  );
}

function DraftsSheet({
  drafts,
  currentId,
  onOpen,
  onDelete,
  onClose,
}: {
  drafts: Draft[];
  currentId: string | null;
  onOpen: (d: Draft) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <Sheet title="Drafts" onClose={onClose}>
      {drafts.length === 0 ? <Empty>No drafts yet. Tap “Save as draft” at the end of a quote.</Empty> : null}
      {drafts.map((d) => (
        <div key={d.id} className={`flex items-center gap-3 rounded-2xl p-3 ${d.id === currentId ? "bg-[#F6F1E7] ring-1 ring-[#D8C99F]" : "bg-[#FBFAF7]"}`}>
          <button onClick={() => onOpen(d)} className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold">{d.project.clientName.trim() || "Untitled client"}</p>
            <p className="text-xs text-[#6B604D]">
              {money(d.fee)}
              {d.monthly ? ` + ${money(d.monthly)}/mo` : ""} · {d.status === "sent" ? `Sent ${fmtWhen(d.sentAt)}` : `Draft ${fmtWhen(d.savedAt)}`}
            </p>
          </button>
          <span className={`h-2 w-2 shrink-0 rounded-full ${d.status === "sent" ? "bg-[#2F6B3A]" : "bg-[#D8C99F]"}`} aria-hidden />
          <button
            onClick={() => onDelete(d.id)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#9A3B2A] active:bg-[#F7E3DD]"
            aria-label={`Delete ${d.project.clientName || "draft"}`}
          >
            ×
          </button>
        </div>
      ))}
    </Sheet>
  );
}

function OfferSheet({
  offer,
  setOffer,
  text,
  subject,
  onSent,
  onClose,
}: {
  offer: OfferDetails;
  setOffer: React.Dispatch<React.SetStateAction<OfferDetails>>;
  text: string;
  subject: string;
  onSent: (how: "share" | "email" | "copy") => void;
  onClose: () => void;
}) {
  const set = <K extends keyof OfferDetails>(k: K, v: OfferDetails[K]) => setOffer((o) => ({ ...o, [k]: v }));
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
  const mailto = `mailto:${encodeURIComponent(offer.email.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

  async function share() {
    try {
      await navigator.share({ title: subject, text });
      onSent("share");
    } catch {
      /* cancelled */
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      onSent("copy");
    } catch {
      /* clipboard blocked: the text is still visible to copy by hand */
    }
  }

  return (
    <Sheet title="Offer to client" onClose={onClose}>
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Their first name" value={offer.contactName} onChange={(v) => set("contactName", v)} placeholder="e.g. Sarah" />
        <TextField label="Their email" value={offer.email} onChange={(v) => set("email", v)} placeholder="Optional" type="email" />
      </div>
      <TextField label="What you'll do for them" value={offer.summary} onChange={(v) => set("summary", v)} placeholder="e.g. automate your invoice chasing" />

      <details className="rounded-2xl border border-[#EADFCA] p-3">
        <summary className="cursor-pointer text-sm font-semibold">Payment, deadline and sign-off</summary>
        <div className="mt-3 grid gap-3">
          <TextField label="How they pay" value={offer.payment} onChange={(v) => set("payment", v)} />
          <NumberField label="Offer open for (days)" value={offer.validDays} onChange={(v) => set("validDays", Math.round(v))} />
          <label className="grid gap-1">
            <span className="text-sm font-semibold">Sign-off</span>
            <textarea
              value={offer.signOff}
              onChange={(e) => set("signOff", e.target.value)}
              rows={2}
              className="rounded-xl border border-[#D8C99F] bg-[#FBFAF7] px-3 py-2 text-base outline-none focus:border-[#BA7517]"
            />
          </label>
        </div>
      </details>

      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B604D]">What they&apos;ll read</p>
        <div className="max-h-[38dvh] overflow-y-auto whitespace-pre-wrap rounded-2xl border border-[#EADFCA] bg-[#FBFAF7] p-3 text-sm leading-6" aria-label="Offer preview">
          {text}
        </div>
        <p className="mt-1 text-[11px] text-[#6B604D]">Prices are rounded up. Your floor, rate and margins are never included.</p>
      </div>

      {canShare ? <PrimaryButton onClick={share}>Send… (WhatsApp, email, text)</PrimaryButton> : null}
      <div className="grid grid-cols-2 gap-2">
        <a
          href={mailto}
          onClick={() => onSent("email")}
          className={`rounded-2xl py-3 text-center text-sm font-semibold ${canShare ? "border border-[#18140D] active:bg-[#F3ECDD]" : "bg-[#BA7517] text-white active:bg-[#18140D]"}`}
        >
          Email
        </a>
        <button onClick={copy} className="rounded-2xl border border-[#D8C99F] py-3 text-sm font-semibold active:bg-[#F3ECDD]">
          Copy text
        </button>
      </div>
    </Sheet>
  );
}

/* ------------------------------------------------------------------ */
/* Primitives                                                         */
/* ------------------------------------------------------------------ */

function Mark() {
  return (
    <span className="relative flex h-6 w-6 items-center justify-center text-[#BA7517]" aria-hidden>
      <span className="absolute h-px w-6 bg-current" />
      <span className="absolute h-6 w-px bg-current" />
      <span className="absolute h-3.5 w-3.5 rotate-45 border border-current" />
    </span>
  );
}

function Intro({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <div className="mb-4 px-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#BA7517]">{step}</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-sm leading-6 text-[#6B604D]">{body}</p>
    </div>
  );
}

function Card({ title, action, children }: { title?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mb-4 rounded-3xl border border-[#EADFCA] bg-white p-4 shadow-[0_10px_30px_rgba(38,31,18,0.04)]">
      {title || action ? (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title ? <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B604D]">{title}</h2> : <span />}
          {action}
        </div>
      ) : null}
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

function BigResult({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#6B604D]">{label}</p>
      <p className="mt-1 text-4xl font-semibold tabular-nums tracking-tight">{value}</p>
    </div>
  );
}

function Working({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 rounded-2xl bg-[#F6F1E7] px-3 py-2.5 font-mono text-[11px] leading-5 text-[#4A4132] [&_b]:text-[#18140D]">
      {children}
    </p>
  );
}

function Stat({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`rounded-2xl p-3 ${strong ? "bg-[#18140D] text-white" : "bg-[#FBFAF7]"}`}>
      <p className={`text-[11px] font-semibold ${strong ? "text-[#D4AF37]" : "text-[#6B604D]"}`}>{label}</p>
      <p className="mt-0.5 text-lg font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">{label}</p>
      <p className="mt-0.5 text-sm font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function StatusPill({ tone, children }: { tone: "good" | "warn" | "bad"; children: React.ReactNode }) {
  const cls = { good: "bg-[#DCEBD9] text-[#24502C]", warn: "bg-[#F6E6C4] text-[#7A4E0C]", bad: "bg-[#F7D9D1] text-[#8A2E1F]" }[tone];
  return <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${cls}`}>{children}</span>;
}

function toneBg(tone: "good" | "warn" | "bad") {
  return { good: "bg-[#E6F0E3] text-[#24502C]", warn: "bg-[#FBF0D9] text-[#6E460B]", bad: "bg-[#FBE5DF] text-[#8A2E1F]" }[tone];
}

function NumberField({
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  decimals,
  compact,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  decimals?: boolean;
  compact?: boolean;
}) {
  // Keep the raw text while typing so "0." or an empty box don't fight the user.
  const [draft, setDraft] = useState<string | null>(null);
  const shown = draft ?? (Number.isFinite(value) ? String(value) : "");
  return (
    <label className="grid min-w-0 gap-1">
      <span className={`font-semibold ${compact ? "text-[11px] text-[#6B604D]" : "text-sm"}`}>{label}</span>
      <span className={`flex items-center rounded-xl border border-[#D8C99F] bg-[#FBFAF7] focus-within:border-[#BA7517] ${compact ? "px-2" : "px-3"}`}>
        {prefix ? <span className="mr-1 text-sm text-[#6B604D]">{prefix}</span> : null}
        <input
          type="number"
          inputMode={decimals ? "decimal" : "numeric"}
          step={step}
          min={0}
          value={shown}
          onChange={(e) => {
            setDraft(e.target.value);
            const n = Number(e.target.value);
            if (e.target.value !== "" && Number.isFinite(n)) onChange(Math.max(0, n));
          }}
          onBlur={() => {
            if (draft === "") onChange(0);
            setDraft(null);
          }}
          className={`w-full min-w-0 bg-transparent font-semibold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
            compact ? "py-2 text-sm" : "py-3 text-base"
          }`}
        />
        {suffix ? <span className="ml-1 text-sm text-[#6B604D]">{suffix}</span> : null}
      </span>
      {hint ? <span className="text-[11px] leading-4 text-[#6B604D]">{hint}</span> : null}
    </label>
  );
}

function SliderField({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="flex items-baseline justify-between">
        <span className="text-sm font-semibold">{label}</span>
        <span className="rounded-full bg-[#18140D] px-2 py-0.5 text-xs font-semibold tabular-nums text-white">{pct(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-8 w-full accent-[#BA7517]"
      />
      {hint ? <span className="text-[11px] leading-4 text-[#6B604D]">{hint}</span> : null}
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "email";
}) {
  return (
    <label className="grid min-w-0 gap-1">
      <span className="text-sm font-semibold">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 rounded-xl border border-[#D8C99F] bg-[#FBFAF7] px-3 py-3 text-base outline-none focus:border-[#BA7517]"
      />
    </label>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? "bg-[#BA7517]" : "bg-[#D8C99F]"}`}
    >
      <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${checked ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

function SmallButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="rounded-full bg-[#F3ECDD] px-3 py-1.5 text-xs font-semibold text-[#18140D] active:bg-[#EADFCA]">
      {children}
    </button>
  );
}

function PrimaryButton({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl bg-[#BA7517] py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(186,117,23,0.3)] transition active:bg-[#18140D] disabled:bg-[#D8C99F] disabled:shadow-none"
    >
      {children}
    </button>
  );
}

function Row({ name, meta, amount, onRemove }: { name: string; meta: string; amount: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#FBFAF7] p-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{name}</p>
        <p className="text-xs text-[#6B604D]">{meta}</p>
      </div>
      <p className="text-sm font-semibold tabular-nums">{amount}</p>
      <button onClick={onRemove} className="flex h-8 w-8 items-center justify-center rounded-full text-[#9A3B2A] active:bg-[#F7E3DD]" aria-label={`Remove ${name}`}>
        ×
      </button>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl border border-dashed border-[#D8C99F] p-3 text-center text-xs text-[#6B604D]">{children}</p>;
}

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/30" onClick={onClose}>
      <div
        className="max-h-[92dvh] w-full max-w-[480px] overflow-y-auto overscroll-contain rounded-t-3xl bg-white p-4 pb-[max(env(safe-area-inset-bottom),16px)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={title}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#EADFCA]" />
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-sm font-semibold text-[#6B604D]">
            Cancel
          </button>
        </div>
        <div className="grid gap-3">{children}</div>
      </div>
    </div>
  );
}
