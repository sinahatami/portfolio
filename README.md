# Sina Hatami — Portfolio

Personal site of Sina Hatami, software engineer and data scientist in Genoa, Italy.

- Live: [sinahatami.vercel.app](https://sinahatami.vercel.app/)
- Source: [github.com/sinahatami/portfolio](https://github.com/sinahatami/portfolio)

[![Portfolio preview](/public/screenshot.png)](https://sinahatami.vercel.app/)

## What's on the site

- **Route map**: the career drawn as a transit map. Industry, research and study are lines, each role or degree is a station, and switches between lines are interchanges. Hover, focus or tap a station to read it.
- **Route**: roles and degrees as one strip map, newest first, ending at an open "next stop".
- **Projects**: every public repository, joined with live GitHub data (primary language, last update) and filterable by area. Areas are shown as line roundels: web, machine learning, data and signals, systems and XR.
- **Skills as evidence**: choosing a skill lists the roles and projects that used it. The list is derived from the content, not self-rated.
- **References**: recommendation letters reproduced verbatim, with the PDF originals.
- **Contact**: a validated form backed by a rate-limited server action and Resend.
- **Command palette** (`⌘K` / `Ctrl+K`) and **voice control**, both driven by one command registry.
- Light and dark themes, a print stylesheet for a résumé printout, and keyboard and screen-reader support.

## Design system: "Line map"

| Token        | Light     | Dark      | Use                                   |
| ------------ | --------- | --------- | ------------------------------------- |
| Paper        | `#ffffff` | `#0a1226` | Page background                       |
| Ink / board  | `#0f1e3d` | `#13224a` | Text, buttons, station boards         |
| Industry     | `#0072ce` | `#3d9df0` | Industry line, web roundel            |
| Research     | `#c8007a` | `#f05bb0` | Research line, machine-learning roundel |
| Study        | `#00965e` | `#2fbf86` | Study line                            |
| Signal       | `#ffcd00` | `#ffcd00` | Selected station, next stop, focus on boards |

The type is **Barlow** for reading and **Barlow Semi Condensed** for signage and headings. The deep blue "board" sections (hero, contact, footer) re-point the colour tokens through a `.board` scope, so components work on them without changes. All tokens live in [`src/app/globals.css`](src/app/globals.css).

## Architecture

```
src/
├── app/                 Routes (Next.js App Router) — the "pages" of atomic design
├── components/
│   ├── atoms/           Button, Roundel, LineBadge, Input, Icon, TextLink…
│   ├── molecules/       FormField, PeriodLabel, ChoiceChips, ThemeToggle…
│   ├── organisms/       Hero, RouteMap, RouteStrip, ProjectIndex, ContactForm, CommandPalette…
│   ├── templates/       SiteShell, PageSection, ArticleLayout, StatusLayout
│   └── providers/       Theme and command-center context
├── content/             Typed site content (profile, experience, projects, posts/*.md)
├── domain/              Entities and ports (interfaces) shared by every layer
├── lib/                 Pure logic: dates, career map geometry, repo matching, skill evidence, commands
├── server/              Use cases and adapters (GitHub, email, rate limiting, blog)
│   └── container.ts     Composition root — the only place concrete adapters are chosen
├── actions/             Server actions (thin HTTP adapters over use cases)
├── emails/              React Email templates
├── hooks/               Client hooks (scroll spy, speech recognition…)
└── config/              Navigation, site settings, environment access
```

### Principles in practice

- **Single responsibility** — content, pure logic, server use cases and presentation live in separate layers. The contact server action only adapts the request; `ContactService` owns the use case.
- **Open/closed** — sections, navigation and commands are data. Adding a section to `config/navigation.ts` updates the header, scroll spy, command palette and voice control without touching them.
- **Liskov substitution** — atoms accept their native element props, so a `Button` or `Input` can replace the element it wraps.
- **Interface segregation** — ports are small (`EmailSender.send`, `RateLimiter.consume`, `GitHubClient`), and organisms receive only the data they render.
- **Dependency inversion** — use cases depend on interfaces in `domain/` and `server/*`; `server/container.ts` injects the concrete adapters. Pages pass plain props into presentational organisms.

### Patterns

| Pattern            | Where                                                                       |
| ------------------ | --------------------------------------------------------------------------- |
| Repository         | `BlogRepository` → `FileSystemBlogRepository`                               |
| Adapter            | `GitHubRestClient`, `ResendEmailSender`, `useSpeechRecognition`             |
| Strategy           | `RateLimiter` → `FixedWindowRateLimiter` (swap for Redis/KV)                |
| Null Object        | `UnconfiguredEmailSender` when no email provider is configured              |
| Command + Factory  | `buildCommands()` registry consumed by the palette and voice control        |
| Composition root   | `server/container.ts` with lazy singletons                                  |
| Scoped theming     | `.board` re-points design tokens for content on the station board           |
| Observer           | `useScrollSpy` over `IntersectionObserver`                                  |
| Polymorphic slot   | `Button asChild` via Radix `Slot`                                           |

## Getting started

Requires Node.js 20+ and Yarn 1.

```bash
yarn install
yarn dev
```

Create `.env.local` (all values optional for local development):

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
GITHUB_TOKEN=            # raises the GitHub API rate limit
RESEND_API_KEY=          # without it, the contact form reports that email is not configured
ADMIN_EMAIL=             # inbox for contact messages
FROM_EMAIL=              # verified sender for notifications
REPLY_TO_EMAIL=          # sender for the visitor's confirmation
GOOGLE_VERIFICATION_ID=
```

## Scripts

| Command                 | Purpose                                                             |
| ----------------------- | ------------------------------------------------------------------- |
| `yarn dev`              | Development server (Turbopack)                                      |
| `yarn build`            | Production build                                                    |
| `yarn start`            | Serve the production build                                          |
| `yarn lint`             | ESLint                                                              |
| `yarn type-check`       | TypeScript, strict mode                                             |
| `yarn test`             | Vitest unit and component tests                                     |
| `yarn test:coverage`    | Vitest with V8 coverage                                             |
| `yarn test:e2e`         | Playwright end-to-end tests (desktop and mobile Chrome)             |
| `yarn lighthouse [url]` | Lighthouse scores for mobile and desktop, reports in `.lighthouse/` |
| `yarn knip`             | Find unused files, exports and packages                             |

End-to-end tests and Lighthouse run against the production build, so run
`yarn build` first. Playwright starts the server itself; for Lighthouse, run
`yarn start` in another terminal. The first Playwright run needs a browser:
`yarn playwright install chromium`.

## Contact

Sina Hatami — [hatamisinaa@gmail.com](mailto:hatamisinaa@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sina-hatami/) · [GitHub](https://github.com/sinahatami)

## License

MIT
