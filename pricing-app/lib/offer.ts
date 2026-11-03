/**
 * Builds the client-facing offer in plain, simple language.
 *
 * Only client-safe figures go in here: the price, the support fee and the
 * value to them. Nothing internal (cost floor, hourly rate, θ, buffers).
 */

import type { ProjectInputs, RetainerInputs } from "./pricing";

export type OfferDetails = {
  /** First name of the person at the client. */
  contactName: string;
  /** Client email, used for the "Email" button. */
  email: string;
  /** What we'll do, in a few words, e.g. "automate your invoice chasing". */
  summary: string;
  /** How the fee is paid. */
  payment: string;
  /** Days the offer stays open. */
  validDays: number;
  /** Sign-off name and company. */
  signOff: string;
};

export const defaultOffer: OfferDetails = {
  contactName: "",
  email: "",
  summary: "",
  payment: "Half when we start, half when it's up and running.",
  validDays: 30,
  signOff: "Ryan Fleming\nFirstLight AI",
};

export type OfferFigures = {
  /** Project fee (already rounded for the client). */
  fee: number;
  /** Monthly support fee (already rounded), or 0 if no retainer. */
  monthly: number;
  /** Risk-adjusted value to the client over the benefit period. */
  pv: number;
  /** Annual value from time saved. */
  timeValue: number;
};

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const money = (v: number) => gbp.format(Math.round(v));

/** Round a price up so client figures look considered and never drop below what was calculated. */
export function roundUpPrice(v: number, step: number) {
  return v > 0 ? Math.ceil(v / step) * step : 0;
}

/** Fee rounded up to the nearest £50, retainer to the nearest £5. */
export function clientFigures(fee: number, monthly: number) {
  return { fee: roundUpPrice(fee, 50), monthly: roundUpPrice(monthly, 5) };
}

/** Value is rounded down to the nearest £500 so we never overstate it. */
function roundDownValue(v: number) {
  return v >= 1000 ? Math.floor(v / 500) * 500 : Math.floor(v);
}

export function offerSubject(clientName: string) {
  const who = clientName.trim();
  return who ? `Our offer for ${who}` : "Our offer";
}

export function buildOffer(
  project: ProjectInputs,
  retainer: RetainerInputs,
  figures: OfferFigures,
  details: OfferDetails,
): string {
  const lines: string[] = [];
  const name = details.contactName.trim();
  const what = details.summary.trim().replace(/[.\s]+$/, "");

  lines.push(name ? `Hi ${name},` : "Hi,");
  lines.push("");
  lines.push(what ? `Thanks for your time. Here's my offer to ${what}.` : "Thanks for your time. Here's my offer.");

  // What they get, in their terms.
  const hoursPerWeek = project.roles.reduce((t, r) => t + r.staff * r.hoursSavedPerWeek, 0);
  const gains: string[] = [];
  if (hoursPerWeek > 0) gains.push(`- Your team gets back about ${formatHours(hoursPerWeek)} a week.`);
  if (project.extraRevenue > 0) gains.push(`- You can take on more work, worth about ${money(roundDownValue(project.extraRevenue))} a year.`);
  if (project.lossAvoided > 0) gains.push(`- Fewer mistakes and less rework, saving about ${money(roundDownValue(project.lossAvoided))} a year.`);
  if (gains.length) {
    lines.push("", "WHAT YOU GET", ...gains);
  }

  // Price.
  lines.push("", "THE PRICE");
  lines.push(`- One-off fee: ${money(figures.fee)}`);
  if (retainer.enabled && figures.monthly > 0) {
    const hrs = retainer.hoursPerMonth > 0 ? ` (up to ${formatHours(retainer.hoursPerMonth)} a month)` : "";
    lines.push(`- Support after launch: ${money(figures.monthly)} a month${hrs}. This keeps it running, fixes problems and covers small changes. You can stop at any time.`);
  }
  if (details.payment.trim()) lines.push(`- Payment: ${details.payment.trim()}`);

  // Why it's worth it. Use the conservative (risk-adjusted) value.
  const value = roundDownValue(figures.pv);
  if (value > figures.fee && figures.fee > 0) {
    const years = Math.max(1, Math.round(project.years));
    const multiple = Math.floor((figures.pv / figures.fee) * 10) / 10;
    lines.push("", "WHY IT'S WORTH IT");
    lines.push(
      `- Over ${years} year${years === 1 ? "" : "s"}, we expect this to be worth about ${money(value)} to you. That's a cautious estimate.`,
    );
    if (multiple >= 1.5) lines.push(`- That's roughly ${multiple.toFixed(1).replace(/\.0$/, "")} times what you pay.`);
  }

  // Next step.
  lines.push("", "NEXT STEP");
  lines.push("- Just reply \"yes\" and I'll send a short agreement and the first invoice.");
  if (details.validDays > 0) lines.push(`- This offer is open for ${details.validDays} days.`);

  lines.push("", "Any questions, just ask.", "", "Thanks,", ...details.signOff.trim().split("\n"));
  return lines.join("\n");
}

function formatHours(h: number) {
  const rounded = Math.round(h * 2) / 2; // nearest half hour
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return `${text} hour${rounded === 1 ? "" : "s"}`;
}
