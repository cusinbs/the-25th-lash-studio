# 25th Studio — Website

A single-page static website for 25th Studio (lashes, brows & academy).
Soft **pastel green** theme, fully responsive, no build step required.

## Structure

```
site/
├── index.html            # the whole page (all 5 sections)
├── css/styles.css        # pastel-green theme & layout
├── js/main.js            # mobile menu, scroll animations, footer year
└── assets/images/        # photos & branding (swap these for the real ones)
```

## Sections

About · Reviews · Pictures (gallery) · Academy · Contact + Hours

## ✏️ What to fill in before going live

Already filled in from the studio info: email (`25thstudiollc@gmail.com`),
Instagram (`@25thlashstudio`), business hours (Mon–Sun 9–6, closed Tuesdays),
services, reviews and training programs.

Still to add — open `index.html` and search for the text:

- **Phone** — `(insert phone number)` and the `tel:0000000000` link
- **Address** — `(insert address)` (remove this line if it's a private/home studio)
- **Booking link** — the "Book Online" / "Book Now" buttons currently point to `#`.
  Replace `href="#"` with the real booking URL (Calendly, Square, etc.)
- **Photos** — replace the files in `assets/images/` with the real studio photos,
  keeping the same file names (or update the `src` paths in `index.html`).

## 🚀 Free hosting (recommended: Cloudflare Pages)

**Yes — Cloudflare Pages is free forever for a site like this.** The free plan
includes unlimited sites, unlimited bandwidth/requests, free HTTPS, and 500
builds/month. There's no trial that expires and no card required. You'd only pay
if you added paid add-ons you don't need here. It's fast, and connects cleanly
to a Porkbun domain.

### Option A — Cloudflare Pages (drag & drop, no GitHub needed)
1. Create a free account at https://pages.cloudflare.com
2. **Create a project → Direct Upload** and drag in the **contents of the `site/`
   folder** (index.html at the top level).
3. After it deploys, go to **Custom domains → Set up a domain** and enter the
   Porkbun domain (e.g. `25thstudio.com`).
4. Cloudflare shows the DNS records to add. In **Porkbun → Domain → DNS**, add
   the CNAME/records exactly as shown. HTTPS is automatic.

### Option B — Netlify (easiest drag & drop)
1. Go to https://app.netlify.com/drop and drag the `site/` folder onto the page.
2. **Site settings → Domain management → Add custom domain** → enter the Porkbun
   domain, then add the DNS records Netlify gives you in Porkbun's DNS panel.

### Option C — GitHub Pages
1. Push this `site/` folder to a GitHub repo (as the repo root or `/docs`).
2. **Settings → Pages →** select the branch/folder.
3. Add the custom domain under Pages settings and create a `CNAME` file, then
   point Porkbun's DNS to GitHub.

> Tip: Porkbun also offers free static hosting if you want everything in one
> place — but Cloudflare Pages is faster and easier to update.

## Local preview

From inside the `site/` folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000
