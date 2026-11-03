# FirstLight Pricing

A standalone, installable pricing app for FirstLight AI. It runs entirely on
the phone: no login, no server, and quotes are saved on the device only.

It implements the FirstLight pricing formula:

| Tab | Step | Formula |
|---|---|---|
| Rate | A | `ch = Rtarget / (Hyr × U)` |
| Value | C | `Vannual = Σ(ni × si × w × ci) + G + L`, `PV = p × Σ Vannual / (1+r)^t` |
| Fee | B + D | `Pfloor = (h × ch + E) / (1 − m)`, `P = max(Pfloor, min(θ × PV, Pceiling))` |
| Retainer | E | `Rmonth = max((hm × ch + T) / (1 − m), γ × Vannual / 12)` |
| Target | F | `Σ Pj + 12 × Σ Rk ≥ Rtarget` subject to `Σ hj + 12 × Σ hm ≤ Hyr × U` |

All formula logic is in `lib/pricing.ts`; the UI is `app/PricingApp.tsx`.

## Develop

```bash
cd pricing-app
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm test           # formula checks (Steps A–F)
```

The service worker (offline mode) only registers in production builds.
If you change `public/icon.svg`, run `npm run icons` to regenerate the PNGs.

## Deploy (Vercel)

Create a **new** Vercel project from this same GitHub repo and set
**Root Directory** to `pricing-app`. Vercel detects Next.js; no other settings
are needed. Optionally add a domain such as `pricing.firstlightai.co.uk`.
The website project is unaffected.

## Install on Android

1. Open the deployed URL in Chrome.
2. Tap **Install** in the app header (or Chrome **⋮ → Install app / Add to Home screen**).
3. Open it from the home-screen icon: it runs full-screen and works offline.

When a new version is deployed, it loads the next time the app is opened with a connection.
