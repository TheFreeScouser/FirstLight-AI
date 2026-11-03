/**
 * FirstLight pricing model.
 *
 * Three layers:
 *   1. A cost floor (never go below it)                  -> Steps A, B
 *   2. A value price (what the work is worth to client)  -> Steps C, D
 *   3. A target check (does the mix reach £200k?)        -> Steps E, F
 *
 * Everything here is pure so it can be unit-tested and reused on any screen.
 */

export type Settings = {
  /** Rtarget — revenue needed for the take-home goal (£/yr). */
  revenueTarget: number;
  /** Working weeks per year (used for Hyr and as w for client staff). */
  weeksPerYear: number;
  /** Your own working hours per week. */
  hoursPerWeek: number;
  /** U — share of hours you can actually bill (0–1). */
  utilisation: number;
  /** Multiplier from salary to loaded staff cost (≈1.3). */
  onCost: number;
  /** Paid hours per client employee per year, to turn salary into £/hr. */
  staffHoursPerYear: number;
};

export type Role = {
  id: string;
  name: string;
  /** ni — number of staff in this role. */
  staff: number;
  /** si — hours saved per person per week. */
  hoursSavedPerWeek: number;
  /** Annual salary of the role (£). ci is derived from this. */
  salary: number;
};

export type ProjectInputs = {
  clientName: string;
  /** h — estimated delivery hours. */
  hours: number;
  /** E — direct costs (software, subscriptions). */
  directCosts: number;
  /** m — overrun / risk buffer (0–1). */
  buffer: number;
  roles: Role[];
  /** G — extra revenue per year. */
  extraRevenue: number;
  /** L — annual cost of errors, fines or rework avoided. */
  lossAvoided: number;
  /** N — years the benefit lasts. */
  years: number;
  /** r — discount rate (0–1). */
  discountRate: number;
  /** p — probability the client adopts the change (0–1). */
  adoption: number;
  /** θ — share of value charged (0–1). */
  valueShare: number;
  /** Pceiling — what the market will bear (£). */
  ceiling: number;
};

export type RetainerInputs = {
  enabled: boolean;
  /** hm — support hours per month. */
  hoursPerMonth: number;
  /** T — monthly tooling and API costs. */
  tooling: number;
  /** γ — share of the ongoing annual value charged (0–1). */
  valueShare: number;
};

export type PipelineProject = {
  id: string;
  name: string;
  fee: number;
  hours: number;
};

export type PipelineRetainer = {
  id: string;
  name: string;
  monthly: number;
  hoursPerMonth: number;
};

// ---------- Step A ----------

export function workingHours(s: Settings) {
  return s.weeksPerYear * s.hoursPerWeek;
}

export function billableHours(s: Settings) {
  return workingHours(s) * s.utilisation;
}

/** ch = Rtarget / (Hyr × U) */
export function requiredHourlyRate(s: Settings) {
  const billable = billableHours(s);
  return billable > 0 ? s.revenueTarget / billable : 0;
}

// ---------- Step B ----------

/** Pfloor = (h × ch + E) / (1 − m) */
export function costFloor(hours: number, rate: number, directCosts: number, buffer: number) {
  const m = clamp(buffer, 0, 0.95);
  return (hours * rate + directCosts) / (1 - m);
}

// ---------- Step C ----------

/** ci = salary × on-cost ÷ staff hours */
export function loadedHourlyCost(salary: number, s: Settings) {
  return s.staffHoursPerYear > 0 ? (salary * s.onCost) / s.staffHoursPerYear : 0;
}

/** ni × si × w × ci */
export function roleAnnualValue(role: Role, s: Settings) {
  return role.staff * role.hoursSavedPerWeek * s.weeksPerYear * loadedHourlyCost(role.salary, s);
}

/** Vannual = Σ (ni × si × w × ci) + G + L */
export function annualValue(p: ProjectInputs, s: Settings) {
  const time = p.roles.reduce((sum, r) => sum + roleAnnualValue(r, s), 0);
  return { time, total: time + p.extraRevenue + p.lossAvoided };
}

/** Σ_{t=1..N} 1/(1+r)^t */
export function annuityFactor(years: number, rate: number) {
  let f = 0;
  for (let t = 1; t <= Math.max(0, Math.floor(years)); t++) f += 1 / Math.pow(1 + rate, t);
  return f;
}

/** PV = p × Σ Vannual / (1+r)^t */
export function presentValue(vAnnual: number, years: number, rate: number, adoption: number) {
  return adoption * vAnnual * annuityFactor(years, rate);
}

// ---------- Step D ----------

export type FeeVerdict = "value" | "ceiling" | "floor-wins";

export type FeeResult = {
  rate: number;
  floor: number;
  vAnnual: number;
  vTime: number;
  pv: number;
  valuePrice: number;
  capped: number;
  fee: number;
  verdict: FeeVerdict;
  /** True when θ × PV is below the floor — walk away or cut scope. */
  belowFloor: boolean;
  /** Max delivery hours at which θ × PV (capped) still clears the floor. */
  maxHours: number;
  /** Client's return: PV ÷ fee. */
  roiMultiple: number;
  /** Share of the PV the client keeps. */
  clientKeeps: number;
  /** Effective hourly rate the fee represents. */
  effectiveRate: number;
};

/** P = max(Pfloor, min(θ × PV, Pceiling)) */
export function projectFee(p: ProjectInputs, s: Settings): FeeResult {
  const rate = requiredHourlyRate(s);
  const floor = costFloor(p.hours, rate, p.directCosts, p.buffer);
  const { time: vTime, total: vAnnual } = annualValue(p, s);
  const pv = presentValue(vAnnual, p.years, p.discountRate, p.adoption);
  const valuePrice = p.valueShare * pv;
  const ceiling = p.ceiling > 0 ? p.ceiling : Infinity;
  const capped = Math.min(valuePrice, ceiling);
  const fee = Math.max(floor, capped);
  const belowFloor = capped < floor;
  const verdict: FeeVerdict = belowFloor ? "floor-wins" : valuePrice > ceiling ? "ceiling" : "value";

  const m = clamp(p.buffer, 0, 0.95);
  const maxHours = rate > 0 ? Math.max(0, (capped * (1 - m) - p.directCosts) / rate) : 0;

  return {
    rate,
    floor,
    vAnnual,
    vTime,
    pv,
    valuePrice,
    capped,
    fee,
    verdict,
    belowFloor,
    maxHours,
    roiMultiple: fee > 0 ? pv / fee : 0,
    clientKeeps: pv > 0 ? Math.max(0, 1 - fee / pv) : 0,
    effectiveRate: p.hours > 0 ? fee / p.hours : 0,
  };
}

// ---------- Step E ----------

export type RetainerResult = {
  costBased: number;
  valueBased: number;
  monthly: number;
  driver: "cost" | "value";
};

/** Rmonth = max((hm × ch + T) / (1 − m), γ × Vannual / 12) */
export function monthlyRetainer(
  r: RetainerInputs,
  rate: number,
  buffer: number,
  vAnnual: number,
): RetainerResult {
  const m = clamp(buffer, 0, 0.95);
  const costBased = (r.hoursPerMonth * rate + r.tooling) / (1 - m);
  const valueBased = (r.valueShare * vAnnual) / 12;
  const monthly = Math.max(costBased, valueBased);
  return { costBased, valueBased, monthly, driver: valueBased > costBased ? "value" : "cost" };
}

// ---------- Step F ----------

export type MixResult = {
  projectRevenue: number;
  retainerRevenue: number;
  revenue: number;
  target: number;
  gap: number;
  revenueOk: boolean;
  projectHours: number;
  retainerHours: number;
  hoursUsed: number;
  capacity: number;
  capacityOk: boolean;
};

/**
 * Σ Pj + 12 × Σ Rk ≥ Rtarget
 * subject to Σ hj + 12 × Σ hm,k ≤ Hyr × U
 */
export function mixCheck(
  projects: PipelineProject[],
  retainers: PipelineRetainer[],
  s: Settings,
): MixResult {
  const projectRevenue = projects.reduce((t, p) => t + p.fee, 0);
  const retainerRevenue = 12 * retainers.reduce((t, r) => t + r.monthly, 0);
  const revenue = projectRevenue + retainerRevenue;
  const projectHours = projects.reduce((t, p) => t + p.hours, 0);
  const retainerHours = 12 * retainers.reduce((t, r) => t + r.hoursPerMonth, 0);
  const hoursUsed = projectHours + retainerHours;
  const capacity = billableHours(s);
  return {
    projectRevenue,
    retainerRevenue,
    revenue,
    target: s.revenueTarget,
    gap: s.revenueTarget - revenue,
    revenueOk: revenue >= s.revenueTarget,
    projectHours,
    retainerHours,
    hoursUsed,
    capacity,
    capacityOk: hoursUsed <= capacity,
  };
}

// ---------- defaults ----------

export const defaultSettings: Settings = {
  revenueTarget: 200_000,
  weeksPerYear: 46,
  hoursPerWeek: 35,
  utilisation: 0.6,
  onCost: 1.3,
  staffHoursPerYear: 1_725, // 46 weeks × 37.5 hrs
};

export const defaultProject: ProjectInputs = {
  clientName: "",
  hours: 40,
  directCosts: 500,
  buffer: 0.2,
  roles: [{ id: "r1", name: "Admin team", staff: 8, hoursSavedPerWeek: 4, salary: 32_000 }],
  extraRevenue: 0,
  lossAvoided: 10_000,
  years: 3,
  discountRate: 0.1,
  adoption: 0.65,
  valueShare: 0.2,
  ceiling: 25_000,
};

export const defaultRetainer: RetainerInputs = {
  enabled: true,
  hoursPerMonth: 4,
  tooling: 75,
  valueShare: 0.25,
};

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}
