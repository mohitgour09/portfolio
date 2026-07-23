# PRD — Portfolio Site Cleanup & Hardening

**Author:** Claude (review requested by Mohit Gour)
**Date:** 2026-07-23
**Repo:** `portfolio` (Next.js 14 App Router, TypeScript, Tailwind, shadcn/ui, MagicUI, MDX blog)
**Scope reviewed:** `src/`, `public/`, plus supporting config (`content/`, `next.config.mjs`, `package.json`)

---

## 1. Background

This is a personal portfolio built from the popular "Dillion Verma" Next.js portfolio template. Mohit has re-skinned it with his own resume, work history, and projects, but a full read-through of `src` and `public` shows the customization is incomplete: template placeholder data, dead code, unused assets, and a few functional bugs are still present. The site is deployable today, but it currently ships content that isn't Mohit's own (demo videos, an unrelated domain in SEO metadata) and has visible rendering bugs.

## 2. Problem Statement

A portfolio's job is to build credibility in under 10 seconds of a recruiter's attention. Right now the site undermines that in three ways:

1. **Authenticity gaps** — leftover template content (wrong name initials, wrong domain, third-party demo videos presented as "projects") makes the site look unfinished or, worse, misattributed.
2. **Functional bugs** — a duplicated/malformed component in the Skills section, broken project links, and a dead OG-image reference degrade polish and social-share quality.
3. **Missing production basics** — no sitemap/robots/manifest, unused ~1–2MB of image assets shipped to `public`, and SEO metadata pointing at someone else's domain.

## 3. Goals

- Every piece of content on the site is verifiably Mohit's own (no template leftovers).
- Zero visible rendering bugs; all links resolve to something real (or are removed).
- SEO/social metadata is correct for Mohit's actual deployed domain.
- Repo ships only assets that are actually referenced.
- Codebase has no dead imports/dead components left from the template.

## 4. Non-Goals

- Visual redesign (layout, color system, animation style) — out of scope unless explicitly requested later.
- Adding new sections (testimonials, certifications, etc.) — can be a follow-up PRD.
- Migrating framework/stack (Next.js version, Tailwind, etc.).

## 5. Findings (Review Detail)

### P0 — Critical (content authenticity / broken user-facing content)

| # | Finding | Location | Why it matters |
|---|---|---|---|
| 1 | Two projects ("OnlineBazar", "Automatic Chat") use **external demo videos from the original template author** (`cdn.llm.report/openai-demo.mp4`, `pub-...r2.dev/automatic-chat.mp4`) instead of Mohit's own project media, and both have **empty `href`/source links** (`href: ""`). | `src/data/resume.tsx:174-229` | Presents someone else's project demo as Mohit's work; broken "Source" badges lead nowhere. This is the single biggest credibility risk on the site. |
| 2 | Site metadata (`DATA.url`) is still `https://dillion.io` — the template author's real, live domain. | `src/data/resume.tsx:7` | This value drives `metadataBase`, Open Graph `url`, Twitter card, and blog JSON-LD `url`/`author`. Deployed as-is, Mohit's pages self-report as `dillion.io` — broken canonical/OG tags and an inadvertent reference to a third party's domain. |
| 3 | `initials: "DV"` (Dillion Verma) shown in the avatar fallback. | `src/data/resume.tsx:6` | Wrong initials render if the avatar image fails to load. |
| 4 | `location: "San Francisco, CA"` / `locationLink` pointing at San Francisco, while phone (`+91 87705 50853`) indicates India. | `src/data/resume.tsx:8-9` | Inconsistent, unverified personal info. |

### P1 — High (functional bugs)

| # | Finding | Location | Why it matters |
|---|---|---|---|
| 5 | Skills section has a **duplicated, incorrectly nested `<BlurFade>`** wrapping each `Badge`, with the `key="skill"` repeated on both the outer and inner instance. | `src/app/page.tsx:127-133` | React duplicate-key warning in console; double-wraps every skill badge in redundant motion components, causing an extra (invisible but wasted) fade animation per badge. |
| 6 | Blog post pages generate an OG image fallback URL `${DATA.url}/og?title=...`, but **no `/og` route exists** in `src/app`. | `src/app/blog/[slug]/page.tsx:28` | Any blog post without a manual `image` in frontmatter produces a broken social-preview image link. |
| 7 | "Download Resume" button links to a personal Google Drive share URL with a `download` attribute. | `src/app/page.tsx:174-181` | The `download` attribute is ignored for cross-origin URLs — clicking it opens Google Drive's viewer instead of downloading, contradicting the button's label/intent. Also fragile: link rot if the Drive file is moved/permissions change. |
| 8 | `SparklesText` is imported in `page.tsx` but never rendered anywhere. | `src/app/page.tsx:12` | Dead import; also suggests an intended-but-unfinished hero effect. |
| 9 | `HackathonCard` component exists fully built but is **never used** — no hackathons section exists on the page. | `src/components/hackathon-card.tsx` | Dead code shipped to the bundle; either wire it up (if Mohit has hackathons to list) or delete it. |
| 10 | `"TailwindCSS"` is listed twice in the OnlineBazar project's `technologies` array. | `src/data/resume.tsx:184-186` | Renders a duplicate badge. |

### P2 — Medium (SEO / production readiness)

| # | Finding | Why it matters |
|---|---|---|
| 11 | No `sitemap.ts`, `robots.ts`, or `manifest.ts`/`manifest.json` in `src/app`. | Next.js App Router supports generating these natively; without them, search engines have no sitemap and there's no PWA manifest (no installable icon/name metadata). |
| 12 | `metadata.verification.google` / `.yandex` are empty strings. | Harmless but signals the SEO pass was never finished; empty strings can also emit an empty `<meta>` verification tag. |
| 13 | Blog nav item is commented out (`src/data/resume.tsx:39`) but `/blog` and `/blog/[slug]` routes remain live and crawlable/linkable, with a single placeholder "Hello World" MDX post. | Orphaned section: reachable by URL/search engines but not discoverable via UI navigation, and its only content is scaffold text, not a real post. Decide: finish the blog or remove the routes. |
| 14 | `contact.tel` (`+91 8770550853`) is defined in data but never rendered/linked anywhere in the UI. | Dead data; if intentional (privacy), remove the field — if not, surface it (e.g., `tel:` link) or drop it. |

### P3 — Low (repo hygiene)

| # | Finding | Why it matters |
|---|---|---|
| 15 | 9 unused image/video assets in `public/`: `nvidia.png`, `waterloo.png`, `laurier.png`, `buildspace.jpg`, `atomic.png`, `ib.png`, `splunk.svg`, `shopify.svg`, `lime.svg`. None are referenced anywhere in `src/`. | Confirmed via full-repo grep. These are leftovers from the original template (Dillion Verma's employers/schools: NVIDIA, Waterloo, Laurier, etc.). Bloats repo size and deploy artifact for no benefit. |
| 16 | `globals.css` has a duplicated block of CSS rules for `code > [data-line]::before` (defined twice, once via `@apply` shorthand, once via raw properties). | `src/app/globals.css:112-136` | Redundant, confusing to maintain; harmless at runtime (last rule wins) but should be consolidated. |
| 17 | `package.json` still has template boilerplate: `"name": "porfolio"` (typo), `"author": ""`, `"license": "ISC"`, and a `"description"` field containing raw HTML `<img>` markup for the *original* GitHub repo's README badge. | Cosmetic but visible to anyone who inspects the package metadata or npm-installs the repo. |

## 6. Requirements

### R1 — Content authenticity (P0)
- R1.1 Replace or remove the two projects using third-party demo media (`OnlineBazar`, `Automatic Chat`). Either supply real screenshots/screen-recordings of Mohit's own build, or drop the project entries until real media exists.
- R1.2 Fill in real `href` (repo/live links) for every project's `links[].href`, or remove the link badge if none exists.
- R1.3 Update `DATA.url` to Mohit's actual deployed domain (e.g., Vercel URL or custom domain) before next deploy.
- R1.4 Update `initials` to `"MG"`.
- R1.5 Verify and correct `location`/`locationLink` to Mohit's actual city, or remove if he prefers not to disclose it.

### R2 — Bug fixes (P1)
- R2.1 Fix the Skills section: remove the duplicate nested `<BlurFade>` wrapper and duplicate `key`.
- R2.2 Either implement an `/og` dynamic image route (`src/app/og/route.tsx` using `next/og`) or change the blog fallback to a static default OG image.
- R2.3 Replace the Google Drive resume link with either (a) a same-origin static PDF served from `public/` with a working `download` attribute, or (b) keep Drive but drop the misleading `download` attribute and label the button "View Resume".
- R2.4 Remove the unused `SparklesText` import, or use it in the hero if that was the original intent (confirm with Mohit).
- R2.5 Delete `hackathon-card.tsx` if unused, or add a "Hackathons" section to `page.tsx` if Mohit has hackathon history to show.
- R2.6 De-duplicate the repeated `"TailwindCSS"` tag on the OnlineBazar project.

### R3 — SEO/production readiness (P2)
- R3.1 Add `src/app/sitemap.ts` and `src/app/robots.ts` using Next's built-in metadata route conventions.
- R3.2 Add a `manifest.ts` (or static `manifest.json`) with site name, icons, theme color.
- R3.3 Fill in real Google Search Console / remove the empty `verification` block.
- R3.4 Decide the fate of `/blog`: either (a) re-enable the nav link and publish real posts, or (b) remove the blog route + `content/` dir + `data/blog.ts` entirely to avoid shipping a dead placeholder section.
- R3.5 Either wire up `contact.tel` in the UI (e.g., a phone icon in the Dock/navbar with a `tel:` link) or remove it from `DATA`.

### R4 — Repo hygiene (P3)
- R4.1 Delete the 9 unused files from `public/`.
- R4.2 Consolidate the duplicated `code > [data-line]::before` CSS rule in `globals.css` into a single definition.
- R4.3 Update `package.json`: fix `"name"` typo, set `"author"`, choose an appropriate `"license"`, replace the leftover HTML `"description"` with a plain one-line description or remove the field.

## 7. Success Metrics

- 0 references to `dillion.io` or third-party template media remain in `src`/`public`.
- 0 React console warnings on the homepage (duplicate keys, hydration mismatches).
- Every link on the page (project sources, resume download, social icons) resolves to a real, working destination — verified by a manual click-through pass.
- `public/` contains only assets referenced by `src/` (verified by grep-based audit — 0 orphaned files).
- Lighthouse SEO score ≥ 95 post-fix (currently penalized by missing sitemap/robots/manifest and incorrect canonical domain).

## 8. Suggested Phasing

1. **Phase 1 (P0, do first):** Content authenticity fixes — R1.1–R1.5. These are the highest-impact, most visible issues.
2. **Phase 2 (P1):** Bug squash — R2.1–R2.6. Quick, low-risk, high-polish wins.
3. **Phase 3 (P2):** SEO/production hardening — R3.1–R3.5. Needed before treating the domain as "launched."
4. **Phase 4 (P3):** Repo hygiene — R4.1–R4.3. Cheap cleanup, can be batched into the same PR as Phase 2.

## 9. Open Questions for Mohit

1. For the "OnlineBazar" and "Automatic Chat" projects — do real repos/demos exist to link, or should these entries be removed until they do?
2. What's the actual production domain this site will be deployed to (for `DATA.url`)?
3. Is the blog intended to be a real, ongoing section, or should it be removed for now?
4. Should the phone number be public-facing on the site, or kept resume-only?
5. Any hackathons/certifications to fill the now-unused `HackathonCard` component, or should it be deleted?
