// Checks the client offer: simple wording, rounded prices, nothing internal.
import assert from "node:assert/strict";
import { test } from "node:test";
import * as P from "../lib/pricing.ts";
import * as O from "../lib/offer.ts";

const s = P.defaultSettings;
const project = { ...P.defaultProject, clientName: "Acme Ltd" };
const fee = P.projectFee(project, s);
const ret = P.monthlyRetainer(P.defaultRetainer, fee.rate, project.buffer, fee.vAnnual);
const figs = { ...O.clientFigures(fee.fee, ret.monthly), pv: fee.pv, timeValue: fee.vTime };
const details = { ...O.defaultOffer, contactName: "Sarah", summary: "automate your invoice chasing." };
const text = O.buildOffer(project, P.defaultRetainer, figs, details);

test("prices are rounded up, never down", () => {
  assert.equal(O.roundUpPrice(14_709, 50), 14_750);
  assert.equal(O.roundUpPrice(14_750, 50), 14_750);
  assert.equal(O.roundUpPrice(1_128.9, 5), 1_130);
  assert.ok(figs.fee >= fee.fee && figs.monthly >= ret.monthly);
});

test("offer reads simply and includes the key facts", () => {
  assert.match(text, /^Hi Sarah,/);
  assert.match(text, /Here's my offer to automate your invoice chasing\.$/m); // trailing full stop not doubled
  assert.match(text, /Your team gets back about 32 hours a week\./);
  assert.match(text, /One-off fee: £14,750/);
  assert.match(text, /Support after launch: £1,130 a month \(up to 4 hours a month\)/);
  assert.match(text, /You can stop at any time\./);
  assert.match(text, /Over 3 years/);
  assert.match(text, /reply "yes"/);
  assert.match(text, /open for 30 days/);
  assert.match(text, /Ryan Fleming\nFirstLight AI$/);
});

test("nothing internal leaks into the offer", () => {
  for (const word of [/floor/i, /θ|theta/i, /utilisation/i, /buffer/i, /margin/i, /per hour|\/h\b/i, /PV/, /discount/i]) {
    assert.doesNotMatch(text, word);
  }
  const rate = String(Math.round(fee.rate)); // £207
  assert.ok(!text.includes(`£${rate}`), "hourly rate must not appear");
  assert.ok(!text.includes(P.costFloor(project.hours, fee.rate, project.directCosts, project.buffer).toFixed(0)));
});

test("no retainer line when the retainer is off; no value claim when value is low", () => {
  const off = O.buildOffer(project, { ...P.defaultRetainer, enabled: false }, { ...figs, monthly: 0 }, details);
  assert.doesNotMatch(off, /Support after launch/);
  const low = O.buildOffer(project, P.defaultRetainer, { ...figs, pv: figs.fee * 0.9 }, details);
  assert.doesNotMatch(low, /WHY IT'S WORTH IT/);
});

test("works with no name or summary", () => {
  const bare = O.buildOffer(project, P.defaultRetainer, figs, O.defaultOffer);
  assert.match(bare, /^Hi,\n/);
  assert.match(bare, /Thanks for your time\. Here's my offer\.\n/);
});
