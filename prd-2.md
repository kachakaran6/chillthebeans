# Chill The Beans — Addendum PRD: Hero 3D Asset
**Coffee mug / cappuccino with live steam**

Version 1.0 — Addendum to `CHILL_THE_BEANS_MASTER_PRD.md`. This document replaces the SOS-cookie hero asset described in §3.2 and §4.2 of the master PRD with a coffee mug/cappuccino as the primary 3D hero subject. The cookie/tart moves to a minor supporting role — see §6. All other sections of the master PRD (IA, palette, type, motion principles, tech stack, performance, accessibility, copyright rules) remain unchanged and still apply.

---

## 1. Why the change

The master PRD originally picked the SOS cookie as the hero asset because it was the single most-praised, most-unique item in the review data. On reflection, a **coffee mug with visible foam art and rising steam** is the more universal "this is a cafe" signal — it reads instantly, works as a drag-to-spin object, and steam gives the hero scene built-in ambient motion that a static cookie can't offer on its own. The cookie isn't dropped — it becomes a secondary treat shown in the Menu section, not the 3D centerpiece.

---

## 2. Asset definition

**Subject:** A ceramic cappuccino mug, three-quarter view, sitting on a matching saucer, with a foam rosette on top and three soft steam wisps curling upward.

**Why a mug over a paper cup:** A ceramic mug with visible latte-art foam communicates "made fresh, made with care" — closer to the cafe's actual counter-service craft than a disposable takeaway cup would. (Note: reviewers specifically asked for *real cups instead of disposable ones* — see master PRD §10 item 5 — so a ceramic mug as the hero also quietly echoes something true about the brand, without making an unconfirmed claim that they've switched.)

**Visual reference (already approved in this conversation):** the illustration shown earlier in this thread — warm ceramic mug, caramel-toned coffee surface, a simple foam rosette, three independently-curling steam wisps, sitting on a saucer. Use that as the art-direction reference for modeling proportions and surface tone, translated into a low-poly 3D asset rather than rebuilt as flat art.

---

## 3. Model spec

| Property | Spec |
|---|---|
| Format | `.glb`, Draco-compressed |
| Poly budget | < 12,000 triangles total (mug + saucer + coffee surface + foam) |
| Parts | 4 separate meshes: `mug_body`, `saucer`, `coffee_surface`, `foam_rosette` — kept separate so foam/coffee can get distinct shaders and so the mug can later be reused without the saucer in smaller UI moments |
| Material style | Matte/toon-shaded, matching the master PRD's "friendly, illustrative" direction (§4.2) — not photoreal PBR. Two-tone ceramic shading: `--cream-foam` base, `--oat` for the interior rim shadow |
| Coffee surface material | `--caramel` to `--cocoa-rich` gradient (matches master PRD token system §3.2), slight Fresnel-style rim highlight to suggest liquid sheen without a full reflection probe |
| Foam rosette | Simple raised geometry, not a decal — should read clearly in silhouette when rotating, since it's the "this is a cappuccino, not just coffee" tell |
| Handle | Visible from the default camera angle and remains visible through a full Y-axis rotation (don't let it disappear behind the mug body at any point in the spin) |
| Target file size | < 450KB including textures, after Draco compression |

---

## 4. Steam system

Steam is the signature *motion* element of this hero, separate from the static mesh above.

- **Method:** GPU sprite particles (not simulated fluid — keeps this lightweight per master PRD §8 performance budget). Recommend `three-nebula` or a hand-rolled `InstancedMesh` of soft circular sprites with additive blending.
- **Count:** 3 independent wisp streams (matching the reference illustration), 8–14 particles per stream.
- **Behavior per wisp:** particles spawn near the coffee surface, drift upward with a gentle left-right sine sway, scale up slightly and fade out opacity as they rise, then respawn at the base — continuous loop, no hard restarts visible.
- **Timing:** each of the 3 wisps runs on a slightly different cycle length (e.g. 4s / 4.6s / 5.2s) so they never visibly sync up — mirrors the offset animation timing used in the reference illustration.
- **Color:** `--oat` / `--cream-foam` at low opacity (6–55% range), warm-toned steam rather than grey-white, consistent with the cafe's warm palette.
- **Device-tier behavior (per master PRD §8):**
  - `high` tier: full 3-wisp system, 14 particles each.
  - `mid` tier: 3-wisp system, particle count halved.
  - `low` tier / `prefers-reduced-motion`: steam is replaced with a single static soft-blur sprite layer (no animation) baked into the fallback image described in §5 below — never fully removed, since steam is part of what signals "hot drink," just made static.

---

## 5. Fallback (reduced motion / low-end devices)

Per master PRD §8 and §9, the interactive canvas must have a non-interactive equivalent:

- A static AVIF/WebP render of the mug scene from the default camera angle, steam included as a soft static graphic (not absent — a mug with zero steam reads as a cold drink, which is wrong for this brand).
- `aria-label`: "A ceramic cappuccino mug with foam art and rising steam" on the canvas/image container.
- Swap logic, file budget, and lazy-loading rules are inherited unchanged from master PRD §8 — this addendum does not modify them.

---

## 6. What happens to the cookie/tart

The SOS cookie and chocolate tart are **not removed from the site** — they move out of the 3D hero role into the Menu section (master PRD §4.4) as standard 2D photography/illustration cards, same treatment as every other menu item. No separate 3D model is required for them in this phase. If a future phase wants a second hero-weight 3D moment for a specific treat, treat that as a new addendum rather than reopening this one.

---

## 7. Updated hero copy (replaces master PRD §4.2 copy block)

- Eyebrow (mono, small, caramel): `MAIN STREET, CASTLEMUNGRET`
- H1 (Fraunces, huge): `Chill The Beans`
- Subhead: `The tiny cafe Limerick queues for. Rich hot chocolate, fast friendly service, and a cup that's always worth the wait.`
- Rating chip: `★ 4.8 from 170 reviews`
- CTA primary: `See the menu`
- CTA secondary: `Get directions`

(Dropped the cookie-specific subhead line from the original master PRD since the cookie is no longer the hero visual; "hot chocolate" and "cup" keep the copy aligned with what's now on screen.)

---

## 8. Interaction spec (replaces master PRD §4.2 "3D scene" + "Behavior" bullets)

- **Idle:** slow Y-axis rotation, 4s per loop, mug handle stays visible throughout (see §3).
- **Drag:** `OrbitControls`, Y-axis only, damped — user can spin the mug manually; releases back into idle rotation after 1.5s of no input.
- **Scroll-out:** canvas pauses rendering entirely when hero leaves viewport (perf rule inherited from master PRD §8.3).
- **Lighting:** one warm caramel-tinted key light, one cool rim light — unchanged from master PRD §4.2, still applies to the mug.

---

## 9. Build note for whoever models this

If modeling in Blender: block out the mug and saucer as simple lathed/revolved profiles first (fastest path to a clean silhouette), add the foam rosette as a separate small mesh on top of the coffee-surface disc, keep UVs simple since materials are flat-shaded, not textured. Export with Draco via `gltf-transform` per master PRD §5 tooling notes. Test the rotation early — the most common failure mode on mug hero assets is the handle vanishing or looking flat from certain angles; check the full 360° before calling the model done.

---

*End of addendum. Use together with `CHILL_THE_BEANS_MASTER_PRD.md` — this file does not stand alone; it modifies §3.2, §4.2, and the "What's Behind the Counter" sourcing for the cookie/tart only.*