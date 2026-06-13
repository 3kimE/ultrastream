# ULTRASTREAM — Production IPTV Website

A production-grade IPTV subscription website built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (dark theme)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend
- **Payments:** Stripe + NowPayments (crypto)
- **Deployment:** Vercel

## Quick Start

```bash
npm install
cp .env.example .env.local    # fill in your API keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | [resend.com](https://resend.com) — email delivery |
| `ADMIN_EMAIL` | Where trial/contact notifications go |
| `STRIPE_SECRET_KEY` | Stripe secret key (test: sk_test_...) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `NOWPAYMENTS_API_KEY` | [nowpayments.io](https://nowpayments.io) — crypto payments |
| `NEXT_PUBLIC_POSTHOG_KEY` | [posthog.com](https://posthog.com) — analytics (optional) |

## Pages Built

| Route | Description |
|---|---|
| `/` | Homepage — hero, features, live EPG preview, pricing, comparison |
| `/pricing` | Full pricing with 5 plans, add-ons, comparison table |
| `/channels` | Searchable channel library with category/country filters |
| `/devices` | Device grid |
| `/devices/[slug]` | Per-device install guide (9 devices) |
| `/free-trial` | Free trial form with countdown |
| `/how-it-works` | Step-by-step guide |
| `/reseller` | Reseller program with credit pricing |
| `/about` | About, team, server locations |
| `/contact` | Contact form + WhatsApp/Telegram links |
| `/faq` | Searchable FAQ (26+ questions, 8 categories) |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog post (5 starter posts) |
| `/account` | Customer dashboard mockup |
| `/terms` `/privacy` `/refund` | Legal pages |

## Brand Customization

### Step 1 — Change brand name & config
Edit `src/lib/constants.ts`:
```ts
export const SITE_CONFIG = {
  name: "YOUR_BRAND",          // ← Your brand name
  url: "https://yourdomain.com",
  whatsapp: "+1234567890",
  telegram: "@yourbrand",
  email: "support@yourdomain.com",
};
```

### Step 2 — Change colors
In `src/app/globals.css`, replace:
- `#3B82F6` → your primary color (currently: blue)
- `#06B6D4` → your accent color (currently: cyan)

### Step 3 — Replace assets
See `assets.md` for the complete list.

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel Dashboard → Project Settings → Environment Variables.

## Connect Your IPTV Panel

In `src/app/api/trial/route.ts`, add a call to your panel's API (XtreamUI, XUI.one, etc.) to auto-provision trial accounts:

```ts
// After sending the email, add:
await fetch('YOUR_PANEL_API/create_trial', {
  method: 'POST',
  body: JSON.stringify({ email: data.email, ... })
});
```

## Remaining Manual Tasks

- [ ] Replace `ULTRASTREAM` with your brand name in `src/lib/constants.ts`
- [ ] Swap logo files in `public/` (see `assets.md`)
- [ ] Replace randomuser.me testimonial photos with licensed images
- [ ] Add real WhatsApp/Telegram numbers to `constants.ts`
- [ ] Set Stripe live keys before going live
- [ ] Complete FR/ES/AR/PT translations in `src/messages/`
- [ ] Write real blog content (starter posts have placeholder text)
- [ ] Connect IPTV panel API for auto-provisioning
- [ ] Add real channel logos to `public/channels/`
