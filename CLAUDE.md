# CLAUDE.md — VIOS Group marketing site

This file is the operating contract for Claude working in this repository. Read it before any task. If something here conflicts with a request, surface the conflict before acting.

## 1. Project

VIOS Group is an Australian PropTech company building Immersive Intelligence for luxury real estate. This repository is the public marketing site at vios.au. It is a single-page cinematic scroll experience built across seven days. The site exists to introduce the category, demonstrate the visual language of the product, and capture qualified leads through the ENGAGE drawer.

## 2. Stack

- Framework: Next.js 15, App Router
- UI: React 19 with TypeScript in strict mode
- Styling: Tailwind CSS v4, configured in app/globals.css via @theme
- 3D: Three.js, React Three Fiber, Drei
- Camera path: Theatre.js, used for the INHABIT stage only
- Smooth scroll: Lenis
- Scroll-linked motion: GSAP ScrollTrigger
- Component motion: Motion (formerly Framer Motion), imported from motion/react
- Drawer and lead form: Vaul
- Validation: Zod
- Hosting: Vercel

Do not introduce a dependency outside this list without asking. See section 18.

## 3. Voice and copy rules

- Australian English throughout.
- No em dashes anywhere, in copy, code comments, or commit messages. Use commas, semicolons, parentheses, or restructure the sentence.
- No AI-sounding filler. No weak marketing language.
- Tone is faith-grounded, confident, direct. Write the way a serious operator speaks to a serious buyer.
- All on-page copy lives in lib/copy.ts, grouped by stage. Do not inline strings in components.
- Headlines are short. Body copy reads like editorial, not advertising.

## 4. Banned words and phrases

Never use these words or any inflection of them, in copy, code, comments, or commit messages:

- revolutionary
- next-generation
- cutting-edge
- game-changing
- seamless
- robust
- leverage (as a verb)

A grep over lib/copy.ts and any committed copy must return zero matches before deploy.

## 5. Architecture overview

Single Next.js App Router route at /. The page composes four stage components stacked vertically. A single shared R3F Canvas is mounted once and reused across stages that need 3D. Lenis runs over the entire page. Scroll choreography is owned by one ScrollOrchestrator that registers GSAP ScrollTriggers for the four stages and drives the Theatre.js sheet for INHABIT. Lead capture is a Vaul drawer rendered at the root layout, opened from ENGAGE, and submitted to /api/lead.

## 6. The four stages

- APPROACH: point-cloud hero. Full-bleed 100vh. Slow drift. No text until the user begins to scroll.
- INHABIT: Theatre.js drives a PerspectiveCamera along a path through the scene. Pinned during the camera move. Stage duration comes from lib/timing.ts.
- VERIFY: editorial proof section. Long-form text with a docked splat thumbnail in the corner that the reader can mouse over to inspect.
- ENGAGE: CTA section. A single primary action opens the Vaul lead drawer.

## 7. Scroll choreography and timing

- One ScrollOrchestrator component sets up all ScrollTriggers inside a single useGSAP or useLayoutEffect block, so cleanup is automatic.
- INHABIT and VERIFY are pinned. APPROACH and ENGAGE are not.
- Stage boundaries live in lib/timing.ts in viewport-height units. Do not hardcode pixel offsets in components.
- The Theatre.js sheet position is driven by the INHABIT ScrollTrigger progress value.
- Respect prefers-reduced-motion. When set, disable Lenis, disable ScrollTrigger pins, and render stages as a plain stacked document.

## 8. Performance budgets

- Initial JS for / under 250kB gzipped.
- Lighthouse Performance 90 or higher on the Vercel preview, target 95.
- 60fps on M-series MacBook, 45fps floor on a recent iPhone.
- First contentful paint under 2.5s on simulated Slow 4G.
- The R3F Canvas is mounted via next/dynamic with ssr: false.
- Point cloud and splat files are decimated to the lowest fidelity that still reads on a 27 inch display.

## 9. Asset pipeline

- Point clouds live in public/pointclouds as .ply. Decimate offline before committing. Do not commit raw scans.
- Splats live in public/splats as .splat or .ksplat.
- Fonts live in public/fonts and load via next/font/local. No Google Fonts.
- Open Graph and social cards live in public/og.
- Any binary over 5MB requires either Git LFS or an external CDN URL referenced from lib/config. Ask before committing such a file.

## 10. Build, dev, and deploy commands

- Install: pnpm install
- Develop: pnpm dev
- Type check: pnpm tsc --noEmit
- Lint: pnpm lint
- Production build: pnpm build
- Local production: pnpm start
- Deploy: pushing to main triggers a Vercel production deploy. All other branches deploy to a preview URL. Do not push to main, see section 18.

## 11. File and naming conventions

- Components are PascalCase, one component per file, named after the file.
- No barrel index.ts files inside components. Import the file directly.
- Stages live in components/stages. R3F primitives live in components/three. Motion primitives live in components/motion. UI chrome lives in components/ui.
- Shared hooks live in lib/ and are prefixed with use.
- Copy strings live in lib/copy.ts, grouped by stage.
- Timing constants live in lib/timing.ts.

## 12. TypeScript and lint rules

- strict: true. No any. No ts-ignore without a one-line reason on the same line.
- Prefer type over interface unless declaration merging is needed.
- ESLint extends eslint-config-next with no relaxations.
- Prettier with prettier-plugin-tailwindcss. Run on save.
- Imports are sorted: react, next, third-party, then aliased local (@/...), then relative.

## 13. Working with Theatre.js

- One project. One sheet. State is exported to lib/theatre/project.json and committed.
- @theatre/studio is loaded only when process.env.NODE_ENV !== 'production'. It must never appear in a production bundle. Use a dynamic import behind that guard.
- The INHABIT camera reads its position and rotation from a Theatre object driven by the INHABIT ScrollTrigger progress.
- When the camera path needs tuning, open Studio locally, adjust, export the state, commit the JSON. Do not hand-edit the JSON.

## 14. Working with R3F

- One shared <Canvas> wrapped in components/three/Stage.tsx. Do not mount additional Canvases.
- Use frameloop="demand" for stages that are not constantly animating. Switch to frameloop="always" only inside INHABIT.
- All R3F entry points are imported via next/dynamic with ssr: false.
- Use Drei only when the wrapper genuinely simplifies the code.
- Dispose geometries and materials on unmount. Watch the renderer info panel during development for leaks.

## 15. Working with GSAP ScrollTrigger and Lenis

- Lenis runs at the layout root. ScrollTrigger uses Lenis as its scroller via the standard integration in components/motion/SmoothScroll.tsx.
- All ScrollTriggers are created inside a single useGSAP call so cleanup is guaranteed.
- Use markers in development only, gated by process.env.NODE_ENV !== 'production'.
- Never call ScrollTrigger.refresh() in a render path. Refresh on window resize and on font-load only.

## 16. Lead form, Vaul drawer, and submission target

- The drawer lives in components/ui/LeadDrawer.tsx and is rendered once at the root layout.
- ENGAGE opens it via a shared open-state primitive. The exact mechanism (context vs zustand) is decided on Day 4, not before.
- Fields: name, company, email, project location, message. Validated with Zod on the client and again on the server.
- Submission posts to /api/lead. The handler validates, then forwards to the chosen capture target (decided on Day 5). On success the drawer shows a confirmation state.

## 17. Australian English rules

- Use -ise, -isation, not -ize, -ization. Examples: organise, recognise, optimise, prioritise.
- Use -our, not -or. Examples: colour, behaviour, favour.
- Use -re, not -er. Examples: centre, theatre, metre. The library name Theatre.js stays as published.
- Dates as 23 May 2026, not May 23, 2026.
- Currency as A$1,250,000 or AUD 1,250,000.

## 18. Guardrails for Claude, ask before doing

Stop and ask before you:

- Add or upgrade a dependency that is not in the pinned list.
- Change the four-stage structure or rename a stage.
- Mount a second R3F Canvas.
- Add a CSS framework or component library beyond Tailwind v4 and Vaul.
- Change the routing structure away from a single page at /.
- Push to main, force-push anywhere, or rewrite published history.
- Commit a binary larger than 5MB.
- Write copy directly into a component. Add it to lib/copy.ts first so it can be voice-checked.
- Disable a lint rule or add a ts-ignore without a reason.
- Use any banned word or any em dash.

## 19. Out of scope for the 7-day build

- CMS integration.
- Multi-page routing or a blog.
- Authentication.
- Internationalisation.
- Analytics beyond a single page-view event and a single form-submit event.
- Email automation beyond the initial submission handoff.
- A dark or light mode toggle. The site has one designed surface.
