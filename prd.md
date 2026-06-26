# Chill The Beans — Master PRD
**Award-tier marketing website · React + Framer Motion + Three.js**

Version 1.0 — Single source of truth for design + engineering.

---

## 0. Source data (everything below is grounded in this — no invented brand facts)

Pulled from the cafe's live Google Maps listing:

| Field | Value |
|---|---|
| Name | Chill The Beans |
| Category | Cafe |
| Rating | 4.8★ (170 reviews) |
| Price band | €1–10 per person |
| Address | Main Street, Castlemungret, Mungret, Co. Limerick, V94 Y012, Ireland |
| Plus code | J8P4+8R Mungret, County Limerick |
| Phone | +353 83 081 1943 |
| Instagram | instagram.com (handle not yet confirmed — placeholder link) |
| Service options | Dine-in, Kerbside pickup, Delivery |
| Hours signal | Closed at time of capture, "Opens 8am Sat" — implies early-morning opening, likely closed one weekday (verify full hours before launch) |
| Popular times signal | Fridays show a clear midday peak (9am–1pm cluster) |

**Menu items confirmed (from listing):**
Coffee, SOS Cookies, Hazelnut Cappuccino, Caramel Cappuccino, Vanilla Cappuccino, Protein Balls, Caramel Latte, Chocolate Cookies, Chocolate Cake, Oat Milk (milk alternative).

**Review signal tags (frequency-tagged by Google):** hot chocolate (9), protein balls (2), outdoor seating (4), fresh cookies (2), +6 more untagged.

**Verbatim review themes (paraphrased, not quoted — see copyright note in §10):**
- Hot chocolate is rich and a standout; caramel SOS cookies praised; decent range of baked goods and protein balls.
- Tiny physical space, both indoor and outdoor seating, queues are common but move quickly; one reviewer wants reusable cups instead of disposable, and a few lunch items.
- A regular customer calls it their favorite coffee spot, jokes there's no larger size available, and notes service has gotten faster even though queues used to stretch out the door.

**Nearby competitive set (for tone calibration, not for the site):** The Milk Thistle Kitchen (4.6), Soul Coffee House (4.8), Siege Coffee Company (4.9), Butlers Chocolate Café (4.2), Red Bean Roastery (3.0).

**What this data tells us about brand personality:**
This is not a slow, precious, single-origin-pourover brand. It's a **small, beloved, fast-moving neighborhood spot** that people queue for and return to obsessively. The emotional core is *worth-the-queue comfort* — hot chocolate richness, caramel sweetness, a cookie people specifically drive for. The site's job is to make someone who has never been there feel the queue is worth joining, and make a regular feel proud of their find.

---

## 1. Project Goal & Success Criteria

**Goal:** A single-page (with smooth in-page routing) marketing website for Chill The Beans that functions as a love letter to the cafe's actual identity — small, warm, queue-worthy — executed with portfolio/award-submission-grade craft (think Awwwards Site of the Day caliber), built in React, animated with Framer Motion, and featuring 2–3 deliberate Three.js moments.

**Explicitly out of scope:** No ordering, no cart, no payments, no table reservation system, no user accounts. This is a brand + information site: discover → believe → find your way there.

**Success criteria:**
1. A first-time visitor understands in <5 seconds: what this place is, what it's famous for, and that it's beloved (4.8★/170 reviews).
2. The 3D hero moment is the single most memorable thing about the site — distinctive, on-brand, not a generic floating coffee cup.
3. Full responsiveness, including a non-degraded mobile 3D fallback.
4. Lighthouse Performance ≥ 85 mobile, ≥ 95 desktop, despite Three.js.
5. WCAG AA color contrast; full keyboard navigation; `prefers-reduced-motion` fully respected (3D and Framer Motion both have static fallbacks).
6. Design does not read as a templated "AI cafe site" — see §3 for explicit anti-default direction.

---

## 2. Information Architecture

Single scrolling page, six sections, persistent minimal nav. No multi-page routing needed (keeps PRD and build simple, matches a small local cafe's actual needs).

```
┌─────────────────────────────────────┐
│ NAV (sticky, transparent → solid)    │
├─────────────────────────────────────┤
│ 01 HERO — 3D signature moment        │
├─────────────────────────────────────┤
│ 02 THE QUEUE (social proof / rating) │
├─────────────────────────────────────┤
│ 03 MENU — interactive, tabbed        │
├─────────────────────────────────────┤
│ 04 SIGNATURE PRODUCT — 3D showcase   │
│    (SOS Cookie or Hot Chocolate)     │
├─────────────────────────────────────┤
│ 05 VOICES — review wall              │
├─────────────────────────────────────┤
│ 06 FIND US — map, hours, contact     │
├─────────────────────────────────────┤
│ FOOTER                               │
└─────────────────────────────────────┘
```

Nav links scroll-spy to: Menu · Reviews · Find Us. Logo/wordmark scrolls to top.

---

## 3. Design Direction (Brainstorm → Decision)

### 3.1 Rejecting the default
The generic "AI cafe site" output clusters around warm cream (#F4F1EA) + high-contrast serif + terracotta accent. That is a coffee-brand-as-product-shot aesthetic (single-origin, minimalist, expensive). **Chill The Beans is the opposite of that brand**: small, sweet, queue-driven, hot-chocolate-and-cookies, €1–10 a head. Using the cream/terracotta/serif default would actively misrepresent the place. We reject it.

### 3.2 Token system

**Color — pulled from the actual products (hot chocolate, caramel, oat milk), not generic "coffee brown":**

| Token | Hex | Use |
|---|---|---|
| `--cocoa-dark` | `#2B1810` | Primary text, deep backgrounds |
| `--cocoa-rich` | `#5C3A28` | Secondary surfaces, nav-solid state |
| `--caramel` | `#C8843A` | Primary accent — CTAs, highlights, the "queue" motion trail |
| `--cream-foam` | `#F7EFE3` | Light backgrounds (milk foam, not cream-default beige — slightly warmer/yellower) |
| `--oat` | `#EADFC8` | Card surfaces, dividers |
| `--cherry` | `#A8362E` | Rare alert/highlight only — pulled from a cherry-topped hot chocolate visual, used at <2% of surface area as a "specials" flag color |

This is warm but distinctly *dessert-cafe* warm (caramel/cocoa) rather than *espresso-bar* warm (terracotta/clay) — a deliberate, justifiable split from the default.

**Type:**
- Display: **Fraunces** (variable, soft-serif with high optical warmth and a slightly wonky/handmade character in its italic — echoes a hand-lettered cafe chalkboard without resorting to a literal script font). Used large, with negative tracking, in italic for the wordmark treatment.
- Body: **General Sans** (or Inter as fallback) — clean, humanist, sets small at high legibility for menu/review density.
- Utility/data (prices, tags, hours): **JetBrains Mono** at small size, used sparingly for prices and the "popular times" / queue indicator — gives prices a receipt/till feel, which is true to a fast-counter-service cafe.

**Layout concept — "The Queue":**
The cafe's defining physical trait is the line out the door that moves fast. The site's structural metaphor is a **queue/counter flow**: sections connect via a continuous thin animated line (the "order line") that runs down the left margin on desktop, transforming at each section into that section's content — at the hero it's steam, at the menu it becomes the counter divider, at reviews it threads between review cards like a ticket rail. This is the one structural device that *means something* (per the skill's guidance to avoid decorative numbering) — it's literally the line you'd stand in, made into the site's spine.

ASCII wireframe (desktop hero):
```
┌──────────────────────────────────────────────┐
│ ChillTheBeans         Menu  Reviews  FindUs   │ ← nav, transparent over hero
│┃                                              │
│┃   small queue-counter line, animates in      │
│┃                                              │
│┃        CHILL THE BEANS                       │ ← Fraunces italic, huge
│┃        worth the wait, every time.            │ ← body, small
│┃                                              │
│┃   [3D steaming cup / SOS cookie scene]        │ ← Three.js canvas, right 55%
│┃                                              │
│┃   ★ 4.8  ·  170 happy queuers  ·  Limerick    │
└──────────────────────────────────────────────┘
```

**Signature element:** A **3D photoreal-stylized SOS cookie** (the most specifically-named, most-praised, most unique item on the menu — "caramel SOS cookies which are to die for") rendered in Three.js, rotating slowly in the hero, that visitors can drag to spin, with a subtle steam/caramel-drip shader detail. This is the one thing nobody else's cafe site has, because it's built from *this* cafe's actual signature item, not a generic coffee bean or cup. It reappears smaller as a hover-state cursor companion on desktop (optional stretch).

### 3.3 Motion direction
- **Hero load sequence:** orchestrated, not scattered — wordmark mask-reveals as if steam is clearing, 3D cookie scene fades/scales in last, ~1.6s total. One moment, done well, beats five small effects.
- **Scroll-triggered reveals:** menu items and review cards rise + fade on scroll-into-view (Framer Motion `whileInView`), staggered by 60ms — fast enough to feel snappy/queue-paced, not slow and precious.
- **Hover micro-interactions:** menu items lift 4px with a soft caramel-tinted shadow; review cards tilt 1–2° toward cursor (subtle, not gimmicky).
- **Ambient:** a barely-visible steam-wisp particle drifting upward behind the hero text, low opacity, slow — texture, not distraction.
- **Restraint check:** no parallax-on-everything, no scroll-jacking, no full-page 3D scroll-scrubbing (explicitly rejected — see §3.1, this brand is fast/casual, not a luxury scrollytelling brand). 3D stays contained to two hero-weight moments per the brief.

---

## 4. Section-by-Section Spec

### 4.1 Navigation
- Fixed top, height 72px desktop / 60px mobile.
- Transparent + white text over hero; crossfades to `--cream-foam` background + `--cocoa-dark` text after 80px scroll (Framer Motion `useScroll` + `useTransform`, not a hard class-swap, for a smooth blend).
- Left: wordmark "Chill The Beans" in Fraunces italic.
- Center/right: Menu · Reviews · Find Us (scroll-spy underline in `--caramel`).
- Far right: phone number as a pill button (`tel:+35383081943`), `--caramel` fill — this is a real, valuable CTA for a no-ordering site (people calling ahead for kerbside pickup).
- Mobile: hamburger → full-screen overlay menu, Fraunces italic links, staggered fade-in.

### 4.2 Hero — "01 The Counter"
**Layout:** Split. Left ~45%: wordmark, one-line positioning copy, rating chip, two CTAs. Right ~55%: Three.js canvas.

**Copy (final, ready to use):**
- Eyebrow (mono, small, caramel): `MAIN STREET, CASTLEMUNGRET`
- H1 (Fraunces, huge): `Chill The Beans`
- Subhead: `The tiny cafe Limerick queues for. Rich hot chocolate, caramel SOS cookies, and the fastest line you'll ever be glad to stand in.`
- Rating chip: `★ 4.8 from 170 reviews` — links to §4.5 Voices.
- CTA primary: `See the menu` → scrolls to §4.3
- CTA secondary: `Get directions` → opens Google Maps deep link (see §7)

**3D scene (Three.js, R3F recommended):**
- Subject: stylized SOS cookie, 3–4 caramel-drip variants, sitting on a small ceramic plate.
- Material: soft matte cookie base (warm `--caramel`/`--cocoa-rich` toon-ish shading, not photoreal PBR — keeps it lightweight and gives it a friendly, illustrative character consistent with the brand, not a sterile product render).
- Behavior: idle slow Y-axis rotation (4s loop); on drag (`OrbitControls` limited to Y-axis only, damped), user can spin it; on scroll-out, scene fades and pauses rendering (perf).
- Lighting: one warm key light (caramel-tinted), one cool rim light for edge definition, no HDRI environment map needed (keeps bundle light).
- Ambient particles: 12–20 simple sprite "steam" particles drifting up behind the cookie, additive blending, very low opacity.

**Mobile fallback:** Same 3D scene at reduced particle count and pixel ratio capped at 1.5; if `prefers-reduced-motion` or low-end device detected (see §8), swap canvas for a static WebP render of the same cookie scene from the default camera angle — no loss of the visual, just no interactivity.

### 4.3 The Queue — Social Proof Strip
A slim, high-contrast band directly under the hero. Not a generic stats-grid — three numbers that are *true and specific*:

```
★ 4.8        170          €1–10
RATING       REVIEWS      PER PERSON
```
Counts animate from 0 on scroll-into-view (Framer Motion, 900ms ease-out). Background `--cocoa-dark`, text `--cream-foam`, the divider lines are the "queue line" motif from §3.2, now horizontal, ticking like a counter rail.

Directly below: a single pulled-out line treated as a pull-quote (paraphrased, own words, not verbatim per copyright rules):
> "Regulars say the queue used to stretch out the door — now the line moves fast, and the hot chocolate is still the reason they keep coming back."

### 4.4 Menu — "02 What's Behind the Counter"
**Not a static list** — an interactive tabbed/filterable menu, because the source data has clear categories.

Categories (derived from confirmed items):
- **Coffee** — Coffee, Hazelnut Cappuccino, Caramel Cappuccino, Vanilla Cappuccino, Caramel Latte
- **Sweet Treats** — SOS Cookies, Chocolate Cookies, Chocolate Cake
- **Something Lighter** — Protein Balls
- **Milk & Add-ons** — Oat Milk

> Note for engineering: prices are not published in the source listing. Build the data schema with a `price` field present but populate with `null`/`"—"` placeholders, and flag clearly in the README that real prices must be supplied before launch. Do not invent prices.

**Layout:** Left vertical tab rail (category names, Fraunces, active state gets the caramel underline + a small steam-icon), right content grid of item cards. Cards: name, one-line flavor description (write 1 honest, simple descriptor per item — e.g. "Hazelnut Cappuccino — espresso, steamed milk, hazelnut syrup"), price (or "ask in store" placeholder), and a small "🔥 Most loved" tag on SOS Cookies, Hot Chocolate-style item, and Protein Balls specifically because those three are the only items with explicit review-volume signal in the source data — every other tag would be invented, so we don't add one.

Mobile: tabs become a horizontal swipeable pill row above a single-column card list.

### 4.5 Signature Product Showcase — "03 The Cookie, Up Close" (second 3D moment)
A focused, full-bleed section: the same SOS cookie 3D asset from the hero, now large and centered, with a short editorial-style copy block beside it on desktop (stacked below on mobile).

Copy:
> "Caramel SOS Cookies. The thing people drive for. A soft, caramel-laced cookie that's become this little cafe's calling card — ask any of the 170 reviewers."

Interaction: scroll-linked rotation — as the user scrolls through this section (not the whole page; scoped via `useScroll` with a local container ref, per §3.3's restraint rule), the cookie rotates exactly one full turn and a caramel-drip shader animates once. This is the single scroll-driven 3D moment on the site — used deliberately, once, where it earns its place.

### 4.6 Voices — Review Wall
Masonry/staggered grid of review cards sourced from the actual review data provided (paraphrased — see §10 copyright handling, never verbatim quotes pulled from Google). Each card:
- Reviewer first name + "Local Guide" badge if applicable
- Star row
- Paraphrased one-line takeaway (written fresh, in plain voice, not copied)
- Relative time ("3 months ago")

Include the frequency tags as a filter row above the grid (chips): `hot chocolate · protein balls · outdoor seating · fresh cookies` — clicking filters the visible cards. This uses real signal from the source data (Google's own tag-frequency system) rather than invented categories.

CTA at the end of the grid: `Read all 170 reviews on Google` → external link to the Maps listing.

### 4.7 Find Us — Location & Hours
Two-column: left = practical info, right = embedded map.

Left column content (all from confirmed source data):
- Address: `Main Street, Castlemungret, Mungret, Co. Limerick, V94 Y012`
- Phone: `+353 83 081 1943` (tap-to-call on mobile)
- Service options as icon row: Dine-in · Kerbside pickup · Delivery
- Hours: display what's confirmed (opens 8am Saturday); **explicit placeholder note in code/CMS for the full weekly hours table, clearly marked TODO** — do not fabricate hours for days not in the source data.
- Instagram icon link (placeholder href until handle confirmed)

Right column: embedded Google Map (iframe or Maps Embed API) centered on the Plus Code `J8P4+8R Mungret`, styled with a custom muted map theme pulling from `--cream-foam`/`--cocoa-rich` so it doesn't clash with the default Google blue/grey.

### 4.8 Footer
Minimal: wordmark, address one-liner, phone, Instagram, and a small line — `Built with love for the queue.` Copyright line with current year (dynamic, `new Date().getFullYear()`).

---

## 5. Tech Stack & Architecture

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18+ (Vite) | Fast dev server, no Next.js needed since there's no SSR/routing requirement for a single page |
| Animation | Framer Motion | `whileInView`, `useScroll`, `useTransform`, `AnimatePresence` for mobile nav overlay |
| 3D | Three.js via **React Three Fiber** + `@react-three/drei` | R3F keeps the 3D declarative and React-idiomatic; drei gives `OrbitControls`, `Float`, `useGLTF` helpers |
| 3D asset pipeline | Cookie modeled in Blender (low-poly, <15k tris) → exported `.glb`, compressed via `gltf-transform`/Draco | Keep hero asset under ~500KB |
| Styling | Tailwind CSS (config extended with the token system in §3.2) or CSS Modules with CSS variables — either acceptable; Tailwind recommended for speed | Define tokens once, reference everywhere — no hardcoded hex in components |
| Fonts | Fraunces (variable, via Fontsource or self-hosted), General Sans, JetBrains Mono | Self-host for performance; subset to used weights |
| Map | Google Maps Embed API (iframe, no JS SDK needed) | Avoid full Maps JS SDK — unnecessary weight for a static embed |
| Icons | Lucide React | Matches the clean utility aesthetic |
| Build/deploy | Vite build → static hosting (Vercel/Netlify/Cloudflare Pages) | No backend required for v1 (marketing-only scope) |

**Suggested file structure:**
```
src/
  components/
    Nav.tsx
    Hero/
      Hero.tsx
      CookieScene.tsx        ← R3F canvas + model
      SteamParticles.tsx
    QueueStrip.tsx
    Menu/
      Menu.tsx
      MenuTabs.tsx
      MenuCard.tsx
      menuData.ts             ← typed data, see §6
    ProductShowcase.tsx       ← second 3D moment, scroll-linked
    Reviews/
      ReviewWall.tsx
      ReviewCard.tsx
      reviewsData.ts
    FindUs.tsx
    Footer.tsx
  hooks/
    usePrefersReducedMotion.ts
    useDeviceTier.ts           ← perf gating, see §8
  styles/
    tokens.css                 ← all CSS variables from §3.2
  assets/
    models/cookie.glb
```

---

## 6. Data Schema (placeholder-safe, no invented facts)

```ts
// menuData.ts
type MenuItem = {
  id: string;
  name: string;
  category: 'coffee' | 'sweet' | 'lighter' | 'milk-addons';
  description: string;       // honest 1-liner, written fresh
  price: number | null;      // null until real prices supplied — DO NOT GUESS
  mostLoved?: boolean;       // true ONLY for items with explicit review signal:
                              // SOS Cookies, Hot Chocolate(if added), Protein Balls
};

// reviewsData.ts
type Review = {
  id: string;
  name: string;
  isLocalGuide: boolean;
  reviewCount?: number;
  rating: 5 | 4 | 3 | 2 | 1;
  timeAgo: string;            // "3 months ago"
  takeaway: string;            // PARAPHRASED summary, never verbatim Google text
  tags: string[];              // from confirmed tag set: hot chocolate, protein balls,
                                // outdoor seating, fresh cookies, etc.
};

// siteInfo.ts
type SiteInfo = {
  name: 'Chill The Beans';
  rating: 4.8;
  reviewCount: 170;
  priceRange: '€1–10';
  address: 'Main Street, Castlemungret, Mungret, Co. Limerick, V94 Y012, Ireland';
  plusCode: 'J8P4+8R Mungret, County Limerick, Ireland';
  phone: '+353 83 081 1943';
  serviceOptions: ['Dine-in', 'Kerbside pickup', 'Delivery'];
  hours: Record<string, string | 'TODO'>;  // fill only confirmed days, mark rest TODO
  instagramUrl: string | null;             // null until handle confirmed
};
```

---

## 7. Key Interactions & Links

- **Get directions CTA →** `https://www.google.com/maps/search/?api=1&query=Chill+The+Beans+Mungret` (or plus-code variant) — opens native Maps app on mobile, web Maps on desktop.
- **Call CTA →** `tel:+35383081943`
- **Read all reviews →** external link to the Google Maps listing for Chill The Beans, Mungret.
- **Scroll-spy nav** uses `IntersectionObserver` (via a small hook) rather than scroll-position math, for accuracy and performance.

---

## 8. Performance & Device-Tier Strategy

Three.js is the main perf risk. Mitigations, required not optional:

1. **`useDeviceTier` hook**: checks `navigator.hardwareConcurrency`, `navigator.deviceMemory` (where available), and screen width. Tiers: `high` / `mid` / `low`.
   - `low` tier or `prefers-reduced-motion: reduce` → hero and showcase render static WebP/AVIF stills instead of canvases. No exceptions — this is an accessibility requirement, not a nice-to-have.
   - `mid` tier → 3D renders, but particle count halved, `pixelRatio` capped at 1.5, shadows off.
   - `high` tier → full experience.
2. **Lazy-load** the R3F canvas components (`React.lazy` + `Suspense`) so Three.js's bundle weight doesn't block first paint of text content.
3. **Pause rendering** (`invalidateFrameloop` / conditionally unmount `<Canvas>`) when hero/showcase sections are scrolled out of view — don't burn GPU on an offscreen scene.
4. **Compress the `.glb`** with Draco; target <500KB for the cookie asset including textures.
5. **Font loading**: `font-display: swap`, preload the two weights actually used above the fold.
6. **Images**: review-adjacent and any cafe photography exported as AVIF with WebP fallback, served at responsive `srcset` widths.

Target budgets:
- JS bundle (excl. 3D model) < 250KB gzipped
- Largest Contentful Paint < 2.5s on throttled 4G
- Lighthouse Performance ≥ 85 mobile / ≥ 95 desktop (stated in §1, repeated here as the hard gate)

---

## 9. Accessibility

- All interactive elements reachable by keyboard; visible focus ring in `--caramel`, 2px offset.
- 3D canvas elements get an `aria-label` describing the scene ("Rotating 3D model of a caramel SOS cookie") and are marked `aria-hidden="false"` only when they convey non-decorative content — otherwise treat as decorative (`aria-hidden="true"`) and let the surrounding text carry the meaning.
- Color contrast: verify `--caramel` on `--cream-foam` and `--cocoa-dark` on `--cream-foam` both pass WCAG AA for body text sizes (run a contrast check before lock — caramel-on-cream is the one combination at risk and may need darkening for text use vs. decorative use).
- `prefers-reduced-motion`: disables hero load-sequence animation (content appears instantly, no mask-reveal), disables scroll-linked cookie rotation (static image instead), disables steam particles, keeps simple opacity-only fades capped at 150ms.
- Map embed has a text-equivalent address block beside it (already specified in §4.7) so location info isn't locked inside an iframe for screen reader users.

---

## 10. Content & Copyright Rules (binding for whoever builds this)

- **Never copy verbatim text from the Google Maps listing or reviews.** All review takeaways in `reviewsData.ts` must be original paraphrases of the *themes* (rich hot chocolate, caramel cookies, friendly fast service, tiny seating, queue speed, request for real cups) — not lifted sentences.
- **Never invent prices, full weekly hours, or menu items not present in the source data.** Mark unknowns explicitly (`null`, `"TODO"`) in the data layer so a human fills them in before launch — this PRD treats fabricated business facts as a defect, not a placeholder convenience.
- **Star rating, review count, address, phone, plus code, service options** are all directly sourced and safe to use as-is — these are factual business listing details, not creative content.
- Photography: source data includes no licensable images in this conversation. Spec assumes the cafe will supply real photos before launch; until then, use the 3D-rendered cookie/hero asset (which is original, modeled for this project) plus tasteful neutral placeholder photography, never scraped Google Maps user photos (those belong to the reviewers who posted them).

---

## 11. Build Phases (for a coding agent / dev to execute against)

**Phase 1 — Foundation**
Vite + React scaffold, Tailwind config with full token system from §3.2, font loading, base layout grid, Nav component with scroll-spy and scroll-driven background crossfade.

**Phase 2 — Hero + 3D Pipeline**
Model/source the cookie asset, set up R3F canvas, build `CookieScene` with idle rotation + drag control, steam particles, device-tier gating, static-fallback image path. Build hero copy layout and load-sequence animation. This is the highest-risk phase — timebox it and get the fallback path working before polishing the interactive path.

**Phase 3 — Content Sections**
Queue Strip with animated counters, Menu with tabs/filtering and the `menuData.ts` populated per §6 rules, Review Wall with filter chips, Find Us with map embed and info block, Footer.

**Phase 4 — Second 3D Moment**
Product Showcase section with scroll-linked rotation, scoped to its own container so it doesn't fight the page scroll.

**Phase 5 — Motion Polish**
Scroll-triggered reveals across Menu/Reviews, hover micro-interactions, mobile nav overlay transitions, final reduced-motion audit.

**Phase 6 — Performance & QA**
Lighthouse pass, Draco compression check, device-tier testing on an actual low-end Android if possible, keyboard-nav pass, contrast check, cross-browser (Safari's WebGL quirks especially).

**Phase 7 — Content Lock**
Swap every `TODO`/`null` placeholder (hours, prices, Instagram handle, real photography) for cafe-supplied real data. Site does not ship to production with any placeholder still present — add a build-time lint/grep check for the literal string `TODO` in data files as a release gate.

---

## 12. Open Items Requiring Cafe Input (not assumable)

1. Full weekly opening hours (only "opens 8am Saturday" is confirmed).
2. Menu prices (none published in source listing).
3. Confirmed Instagram handle (listing shows bare "instagram.com").
4. Real photography of the space, drinks, and food — current source has none in-context.
5. Whether they want the "real cups instead of disposable" feedback acknowledged anywhere on-site (e.g. a small sustainability note) — a nice authentic touch if true, but confirm with the owner before stating it as fact/initiative.

---

*End of PRD. This document is the single master reference — hand it to Claude Code, Cursor, or a human dev as-is; no secondary brief needed.*