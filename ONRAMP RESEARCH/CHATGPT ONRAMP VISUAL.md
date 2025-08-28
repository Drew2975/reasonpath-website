# Hero Onramp — Visual Best Practices (Late 2025 → 2026)

**Goal:** Turn the hero area from a billboard into an **on‑ramp**—a visually clear, low‑friction lane from first impression to first action.

---

## TL;DR (what actually moves the needle)
- **Clarity first:** One message, one primary CTA. Carousels generally underperform vs. a single focused hero.
- **Show continuation:** Avoid “false floors.” Let the next section peek into view; add a subtle scroll cue.
- **Make the hero the LCP you control:** Static image (AVIF/WebP) or poster for video, responsive `srcset/sizes`, `fetchpriority="high"`—then enhance.
- **Motion with manners:** Prefer CSS **transform/opacity** and native **scroll‑driven** effects. Respect `prefers-reduced-motion`.
- **Layouts that scan well:** Left text / right visual or centered stack, with tight hierarchy and high contrast. Skip “zig‑zag” for the hero.

---

## 1) Traditional vs. Modern Hero
**Traditional billboard hero**
- Big imagery, vague tagline, rotating carousel or autoplay video.
- Often creates the **illusion of completeness** (false floor), suppressing scroll and hurting discovery.
- Heavy assets delay first meaningful paint.

**Modern on‑ramp hero**
- **Plain headline** (≤9 words) stating benefit + **short subhead** (≤160 chars) + **1 primary CTA** + **1 secondary path**.
- **Visible continuation** (crop next section, scroll cue, or gradient fade).
- **Performance‑first**: LCP image or poster loads fast; enhancements (video, animation) come after.
- **Accessible motion** and contrast; content is readable even if visuals fail.

> Rationale anchors: users spend disproportionate time above the fold; false floors reduce exploration; carousels are risky; and Core Web Vitals (LCP/INP) reward lean, deterministic hero content.

---

## 2) Visual Trends (late 2025 → 2026)
- **Performance at the top:** Hero is commonly the LCP. Teams are shipping priority‑hinted, responsive hero media and auditing field **p75 LCP ≤ 2.5s** and **INP < 200 ms**.
- **Native scroll‑driven motion:** Subtle progress‑tied reveals using CSS scroll timelines; motion obeys `prefers-reduced-motion`.
- **Modern formats:** AVIF/WebP as default hero formats; JPEG/PNG as fallbacks. Increasing adoption, lighter bytes.
- **Text‑forward heroes:** Oversized type with supporting micro‑illustrations replaces heavy photo/video—especially on mobile.
- **View transitions:** Smoother inter‑page or in‑page state changes make the hero feel like part of a guided flow.

> Implication: the “best looking” hero is the **fastest clear one** that invites the next step without jank.

---

## 3) Video vs. Animation (decision tree)

**Use *static + optional motion*** for the hero if any are true:
- Mobile is a primary entry point; you need predictable LCP.
- The visual doesn’t carry critical meaning (decorative tone).
- Your product value is better shown with **micro‑interactions** (light, vector/DOM) than with cinematic footage.

**Prefer *video* when:**
- You must show real product footage or cause‑and‑effect that static/animation can’t explain.
- You can ship a **poster image** quickly (becomes LCP), then lazy‑start `autoplay` **muted** `playsinline` loop; offer controls on desktop; consider static on mobile.

**Prefer *animation* (CSS/SVG/Lottie) when:**
- You need short, semantic motion that teaches affordances (e.g., a chip toggling, panel expanding).
- You can stay in **transform/opacity** (compositor‑only) and avoid layout/paint‑heavy properties.

**Avoid:** animated GIF hero (large, CPU‑hungry); heavy WebGL canvases on landing; surprise audio.

**Implementation notes**
- Always provide a high‑quality **poster** for video; delay video bytes until after first paint.
- Gate any motion with `@media (prefers-reduced-motion: reduce)`.
- Keep animation durations short and easing gentle; motion should announce the **path**, not compete with it.

---

## 4) Common On‑ramp Interactions (lightweight, effective)
- **Search‑forward hero** (for content‑heavy sites): prominent search with autosuggest; keep nav as a co‑pilot, not a replacement.
- **Segmented path chooser**: two‑to‑three choices (“I’m new / I’ve built before”) that swap subhead + CTA (no carousel).
- **Inline sampler**: 3‑minute lesson/demo button with a tiny preview; opens on‑page or navigates to the lesson.
- **Dictionary/Glossary shortcut**: secondary CTA to a browsable index; reinforces credibility.
- **Micro‑quiz**: a single picker (“What do you want to do today?”) seeding a tailored first page (progressive disclosure).

---

## 5) Layouts that convert (and scan well)

### A) **Split: Left text / Right visual** (most universal)
- Benefits: aligns with F‑pattern scanning, keeps copy legible, allows responsive image swap.
- Use when: you have a meaningful image/illustration or UI mock.

### B) **Centered stack**
- Benefits: laser focus on headline + CTA; great for text‑first messaging and mobile.
- Use when: the “what/for whom/next step” is the draw; imagery is secondary.

### C) **Search‑first hero**
- Benefits: for large catalogs/docs; lets search‑dominant users act immediately.
- Use when: internal search is excellent and autosuggest is helpful.

**Avoid for hero:** zig‑zag/alternating text‑image (slows scanning), complex carousels, or content that suggests the page has ended.

**Micro‑typography & contrast**
- Keep line length ~45–70 characters (desktop), strong heading/body contrast, and accessible text‑over‑image (overlay, blur, or dedicated panel).

---

## 6) Technical Implementation (starter patterns)

### Responsive hero image (fast LCP)
```html
<link rel="preconnect" href="https://cdn.example.com" crossorigin>

<picture>
  <source type="image/avif" 
          srcset="hero-800.avif 800w, hero-1200.avif 1200w, hero-1600.avif 1600w" 
          sizes="(min-width: 1024px) 50vw, 100vw">
  <source type="image/webp" 
          srcset="hero-800.webp 800w, hero-1200.webp 1200w, hero-1600.webp 1600w" 
          sizes="(min-width: 1024px) 50vw, 100vw">
  <img src="hero-1200.jpg" width="1200" height="800" alt="Clear path into AI basics"
       fetchpriority="high" decoding="async">
</picture>
```

### Poster‑first video enhancement (after paint)
```html
<video autoplay muted playsinline loop
       poster="hero-poster.avif"
       width="1280" height="720">
  <source src="hero.webm" type="video/webm">
  <source src="hero.mp4"  type="video/mp4">
</video>
```

### Respect reduced motion + scroll‑driven affordance
```css
/* subtle fade/slide tied to scroll */
@keyframes rise { from { transform: translateY(12px); opacity: 0; } to { transform: none; opacity: 1; } }
.hero-next { animation: rise 1 both; animation-timeline: scroll(root); animation-range: entry 0% cover 35%; }

/* accessibility gate */
@media (prefers-reduced-motion: reduce) {
  .hero-next { animation: none; }
}
```

### Container queries for robust hero layout
```css
.hero { container-type: inline-size; }
@container (min-width: 780px) {
  .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
  .hero .visual { order: 2; }
}
```

---

## 7) Original On‑ramp Ideas (to test)
- **Two‑state hero switcher:** “I’m new / I’ve built before” toggles just the subhead + CTA; image stays fixed → minimal motion, real relevance.
- **Peek‑through cards:** three small cards clipped under the fold; on scroll, they “rise” 8–12px—no JS—signaling the next lane.
- **One‑minute mode:** a timed CTA that swaps to a 60‑sec micro‑lesson (poster‑first) if the user pauses for 3–5 seconds.
- **Handrail hints:** tiny helper text under CTA (“3‑min • No signup”). Low‑cost confidence builder.
- **Glossary hook:** if your domain is jargon‑heavy, show the top‑searched terms as chips in the hero; clicking opens definitions in a drawer.

---

## 8) QA & Measurement Checklist
- **Message**: Can a new user say “what it is / for whom / what next” in **5 seconds**?
- **Performance**: Field p75 **LCP ≤ 2.5s**, **INP < 200 ms** (mobile).
- **Accessibility**: `prefers-reduced-motion` honored; contrast meets WCAG AA/AAA; text readable without background image/video.
- **Scroll cues**: Next section peeks into view; no “false floor.”
- **A/B scope**: Test headline, CTA label, scroll cue, and proofline; keep imagery constant in early rounds.

---

## References & Further Reading
- Nielsen Norman Group — Above‑the‑fold attention share; false floors; scanning patterns; zig‑zag vs aligned layouts:
  - https://www.nngroup.com/articles/scrolling-and-attention/
  - https://www.nngroup.com/articles/illusion-of-completeness/
  - https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
  - https://www.nngroup.com/articles/zigzag-page-layout/

- Carousels generally underperform (unless strict rules met):
  - https://baymard.com/blog/homepage-carousel
  - https://baymard.com/blog/external-article-homepage-carousels
  - https://cxl.com/blog/dont-use-automatic-image-sliders-or-carousels/

- Core Web Vitals (targets & context), LCP/INP:
  - https://developers.google.com/search/docs/appearance/core-web-vitals
  - https://web.dev/articles/inp
  - https://web.dev/articles/optimize-lcp

- Image/video performance and formats:
  - https://web.dev/articles/choose-the-right-image-format
  - https://web.dev/articles/serve-responsive-images
  - https://web.dev/articles/fetch-priority
  - https://web.dev/articles/replace-gifs-with-videos
  - https://web.dev/learn/performance/video-performance
  - Web Almanac 2024 (media, page weight): https://almanac.httparchive.org/en/2024/media , https://almanac.httparchive.org/en/2024/page-weight

- Motion & accessibility:
  - `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-motion
  - CSS scroll‑driven animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
  - WebKit guide to scroll‑driven animations: https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/

- Modern layout primitives:
  - Container queries: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
  - View Transitions API: https://developer.chrome.com/docs/web-platform/view-transitions , https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API

- Accessible text over images:
  - https://www.smashingmagazine.com/2023/08/designing-accessible-text-over-images-part1/
  - https://www.smashingmagazine.com/2023/08/designing-accessible-text-over-images-part2/

---

## Appendix: Quick Hero Wireframes (ASCII)

**Split (Left text / Right visual)**
```
+-----------------------------------------------------------+
| H1 headline                    |       [ Product UI ]     |
| Subhead reinforcing benefit    |                          |
| [Primary CTA] [Secondary]      |                          |
| Proofline / Social proof       |                          |
+-----------------------------------------------------------+
                ⬇ next section peeks 16–24px
```

**Centered stack**
```
+-----------------------------------------------------------+
|                  H1 headline                              |
|            Subhead in one short sentence                  |
|            [Primary CTA]  [Secondary]                     |
|            Proofline / badges                             |
+-----------------------------------------------------------+
                ⬇ next section peeks 16–24px
```

**Search‑first**
```
+-----------------------------------------------------------+
|  H1 + Subhead                                             |
|  [           Search with autosuggest …              🔍 ]  |
|  Popular: [Term1] [Term2] [Term3]                         |
+-----------------------------------------------------------+
                ⬇ next section peeks 16–24px
```
