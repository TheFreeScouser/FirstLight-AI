// Checks the formula engine against hand-worked values.
// Run: npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import * as P from "../lib/pricing.ts";

const s = P.defaultSettings; // £200k, 46 wks × 35 h, U 0.6
const near = (a, b, msg) => assert.ok(Math.abs(a - b) < 0.01, `${msg}: ${a} ≠ ${b}`);
const ch = 200_000 / (46 * 35 * 0.6);

test("A: hourly floor", () => {
  near(P.workingHours(s), 1610, "Hyr");
  near(P.billableHours(s), 966, "billable");
  near(P.requiredHourlyRate(s), ch, "ch");
});

test("B: cost floor", () => {
  near(P.costFloor(40, ch, 500, 0.2), (40 * ch + 500) / 0.8, "Pfloor");
});

test("C: annual value and PV", () => {
  const ci = (32_000 * 1.3) / 1725;
  const v = 8 * 4 * 46 * ci + 10_000;
  near(P.annualValue(P.defaultProject, s).total, v, "Vannual");
  near(P.annuityFactor(3, 0.1), 1 / 1.1 + 1 / 1.21 + 1 / 1.331, "annuity");
  near(P.presentValue(v, 3, 0.1, 0.65), 0.65 * v * P.annuityFactor(3, 0.1), "PV");
});

test("D: fee takes the value price when it clears the floor", () => {
  const f = P.projectFee(P.defaultProject, s);
  assert.equal(f.verdict, "value");
  near(f.fee, 0.2 * f.pv, "fee = θ × PV");
  assert.ok(f.fee > f.floor);
});

test("D: fee is capped by the market ceiling", () => {
  const f = P.projectFee({ ...P.defaultProject, ceiling: 12_000 }, s);
  assert.equal(f.verdict, "ceiling");
  near(f.fee, 12_000, "fee = ceiling");
});

test("D: below floor → fee is the floor and the job is flagged", () => {
  const f = P.projectFee({ ...P.defaultProject, hours: 120 }, s);
  assert.equal(f.belowFloor, true);
  assert.equal(f.verdict, "floor-wins");
  near(f.fee, f.floor, "fee = floor");
  // At maxHours the floor equals the value price exactly.
  near(P.costFloor(f.maxHours, f.rate, 500, 0.2), f.capped, "maxHours clears");
});

test("E: retainer is the higher of cost and value", () => {
  const cost = P.monthlyRetainer({ enabled: true, hoursPerMonth: 4, tooling: 75, valueShare: 0.25 }, ch, 0.2, 45_000);
  near(cost.monthly, (4 * ch + 75) / 0.8, "cost-based");
  assert.equal(cost.driver, "cost");
  const value = P.monthlyRetainer({ enabled: true, hoursPerMonth: 1, tooling: 0, valueShare: 0.25 }, ch, 0.2, 120_000);
  near(value.monthly, 2500, "value-based");
  assert.equal(value.driver, "value");
});

test("F: mix check catches revenue that only works over capacity", () => {
  const m = P.mixCheck(
    [{ id: "a", name: "a", fee: 150_000, hours: 500 }],
    [{ id: "b", name: "b", monthly: 5_000, hoursPerMonth: 40 }],
    s,
  );
  near(m.revenue, 210_000, "revenue");
  near(m.hoursUsed, 980, "hours");
  assert.equal(m.revenueOk, true);
  assert.equal(m.capacityOk, false);
});
