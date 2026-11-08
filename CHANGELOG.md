## [1.2.3](https://github.com/sinahatami/portfolio/compare/v1.2.2...v1.2.3) (2026-11-08)

### Bug Fixes

- remove throw-at-module-load in github config to prevent server crash ([f367944](https://github.com/sinahatami/portfolio/commit/f367944f5ac0f9d4a3a50a2c0194cf2d515aaf2c))

## [1.2.2](https://github.com/sinahatami/portfolio/compare/v1.2.1...v1.2.2) (2026-11-08)

### Bug Fixes

- skip redundant yarn install in Cypress CI step ([c7575dd](https://github.com/sinahatami/portfolio/commit/c7575dd78c70774b0094c929f4400354a258b346))

## [1.2.1](https://github.com/sinahatami/portfolio/compare/v1.2.0...v1.2.1) (2026-11-08)

### Bug Fixes

- make googleVerificationId optional to unblock CI builds ([ca30eb0](https://github.com/sinahatami/portfolio/commit/ca30eb039370fbd7a2b62152e8089c93092ab4bd))

# [1.2.0](https://github.com/sinahatami/portfolio/compare/v1.1.2...v1.2.0) (2026-11-08)

### Bug Fixes

- complete atomic design refactor — restore missing components and fix all build errors ([b4f7b81](https://github.com/sinahatami/portfolio/commit/b4f7b81d475f834bb013b9057f8d59a9f4bb2a0b))
- remove unused imports in command menu ([2bacbf3](https://github.com/sinahatami/portfolio/commit/2bacbf380b1f29808b3103ad4599a228f4a838b8))
- resolve broken deep imports after ui components reorganization ([763577c](https://github.com/sinahatami/portfolio/commit/763577c80c762f4cce0da8b3333004834db078d3))
- resolve theme toggle import path ([7ffabd0](https://github.com/sinahatami/portfolio/commit/7ffabd08d552eea0dbbd69ab96fa4e42f6edd97e))

### Features

- replace projects with all 15 GitHub repos ([001437f](https://github.com/sinahatami/portfolio/commit/001437fb8f2e335576b18c0148d4e5a4a8866782))

## [1.1.3](https://github.com/sinahatami/portfolio/compare/v1.1.2...v1.1.3) (2026-11-08)

### Bug Fixes

- complete atomic design refactor — restore missing components and fix all build errors ([b4f7b81](https://github.com/sinahatami/portfolio/commit/b4f7b81d475f834bb013b9057f8d59a9f4bb2a0b))
- remove unused imports in command menu ([2bacbf3](https://github.com/sinahatami/portfolio/commit/2bacbf380b1f29808b3103ad4599a228f4a838b8))
- resolve broken deep imports after ui components reorganization ([763577c](https://github.com/sinahatami/portfolio/commit/763577c80c762f4cce0da8b3333004834db078d3))
- resolve theme toggle import path ([7ffabd0](https://github.com/sinahatami/portfolio/commit/7ffabd08d552eea0dbbd69ab96fa4e42f6edd97e))

## [1.1.2](https://github.com/sinahatami/portfolio/compare/v1.1.1...v1.1.2) (2026-07-13)

### Bug Fixes

- **ui:** resolve hydration mismatch in GitHub activity and footer ([1dcc685](https://github.com/sinahatami/portfolio/commit/1dcc6850d4b804ae9e0bca3bb806268b9ef29cd2))

## [1.1.1](https://github.com/sinahatami/portfolio/compare/v1.1.0...v1.1.1) (2026-07-13)

### Bug Fixes

- resolve React [#418](https://github.com/sinahatami/portfolio/issues/418) hydration mismatch in footer and toaster ([158db0d](https://github.com/sinahatami/portfolio/commit/158db0d244fade4fdfa04e8f5a0f3dce845430f1))

# [1.1.0](https://github.com/sinahatami/portfolio/compare/v1.0.3...v1.1.0) (2026-07-13)

### Features

- optimize github section and restore features ([aecd4a3](https://github.com/sinahatami/portfolio/commit/aecd4a3da1b79ae8bef5bd312eca97cf32a229d7))

## [1.0.3](https://github.com/sinahatami/portfolio/compare/v1.0.2...v1.0.3) (2026-07-12)

### Performance Improvements

- aggressively lazy-load below-the-fold ui ([008590f](https://github.com/sinahatami/portfolio/commit/008590f054577694803fc277a3e905f8ea50e8fe))

## [1.0.2](https://github.com/sinahatami/portfolio/compare/v1.0.1...v1.0.2) (2026-07-12)

### Performance Improvements

- heavily optimize JS bundle splitting and LCP ([6e565c0](https://github.com/sinahatami/portfolio/commit/6e565c043e7e91adfc9bdb68a53780173bc24c20))

## [1.0.1](https://github.com/sinahatami/portfolio/compare/v1.0.0...v1.0.1) (2026-07-12)

### Performance Improvements

- dynamically import non-critical sections to improve lighthouse execution time ([963ec5d](https://github.com/sinahatami/portfolio/commit/963ec5dbcdc1eaa9c061d6164fc421d5feda390f))

# 1.0.0 (2026-07-10)

### Bug Fixes

- github project description ([932c04d](https://github.com/sinahatami/portfolio/commit/932c04df4641b42870fa8657720051ef84cbdc64))
- google analytics ([a31a831](https://github.com/sinahatami/portfolio/commit/a31a8310e1a555acee1d3c18280108bcafa00c4f))
- google search SEO ([b713c1a](https://github.com/sinahatami/portfolio/commit/b713c1a370992959960f2b364a2ecfb0dbb9f476))
- google search SEO ([9b4d76d](https://github.com/sinahatami/portfolio/commit/9b4d76dad226890362d21c1ff41aa143dc664910))
- image size and optimization ([ad6fa81](https://github.com/sinahatami/portfolio/commit/ad6fa81aa5b5dfdf765ea16176953c4d0deda44e))
- inject version via NEXT_PUBLIC_APP_VERSION ([901be87](https://github.com/sinahatami/portfolio/commit/901be8708a72675553f21deeca1d2cf8259dce20))
- language code ([c71efd0](https://github.com/sinahatami/portfolio/commit/c71efd061dad6b07acb0a399d9eb82749d498dc2))
- make command menu and voice command lists clickable ([8b7f320](https://github.com/sinahatami/portfolio/commit/8b7f3204298f813b12881471849d311d4ba1d51c))
- restore 3d and ar dependencies incorrectly flagged by knip ([4b5d351](https://github.com/sinahatami/portfolio/commit/4b5d3510df654f89e5dcff9aa05598ea5a63d89c))
- screenshot ([c655d03](https://github.com/sinahatami/portfolio/commit/c655d03bddbf747f50759753cd9d32da2d909a2b))
- update resume data ([7c28d07](https://github.com/sinahatami/portfolio/commit/7c28d07a0320722c1984995b05d6822c970354e0))

### Features

- add dynamic project routes, server actions, and contact form ([af514a9](https://github.com/sinahatami/portfolio/commit/af514a9bf3c28f39e2f9b5495c3aeebffdafe213))
- add global error boundaries and optimize component barrel files ([f915c02](https://github.com/sinahatami/portfolio/commit/f915c025a4b7effe859559f052e41e60c7774437))
- add happllab experience ([16810d0](https://github.com/sinahatami/portfolio/commit/16810d02248a50292dae6c4a1c426b1ea581e309))
- adding AR and needs to clean! ([589de03](https://github.com/sinahatami/portfolio/commit/589de0389131809e6467993108439c0c4335cff1))
- breaking the parent component ([c83969b](https://github.com/sinahatami/portfolio/commit/c83969b7394598fd139ff80470f640912bec745b))
- deploy ([0b14ac1](https://github.com/sinahatami/portfolio/commit/0b14ac11c7f53394940f647db6c35dee657eedc7))
- display package version in footer with environment awareness ([a8a7384](https://github.com/sinahatami/portfolio/commit/a8a7384762ede62bce8f227e83c7af59cf28ce7e))
- Dynamically generate sitemap entries for blog posts, enhance the UI and navigation of individual blog post pages, and simplify robots.txt configuration. ([6a24411](https://github.com/sinahatami/portfolio/commit/6a24411b0352d7b587fe743a819ab49b1c54f662))
- google analytics ([0358492](https://github.com/sinahatami/portfolio/commit/03584928df76d5965e2c4e6d3b32201b0d1a340f))
- Implement blog functionality with dedicated pages, components, and markdown rendering. ([9e443dd](https://github.com/sinahatami/portfolio/commit/9e443ddae5f27c572e1794e907352b88208b6d99))
- ready to deploy! ([2b68eb3](https://github.com/sinahatami/portfolio/commit/2b68eb39703e1dcd9563d8bf2e484a46fdf750ef))
- template changed! ([9e2c8e1](https://github.com/sinahatami/portfolio/commit/9e2c8e1f10695ae8d940b5c881f1dca8d9c49fc4))
- template finished ([b282936](https://github.com/sinahatami/portfolio/commit/b282936c08ea5b16b6a8f414b5b9f3f15a1a3a02))
- Update CSP to allow Google Tag Manager and Google Analytics domains. ([eaa7bf3](https://github.com/sinahatami/portfolio/commit/eaa7bf3c9ce63a4b9457367e2b90a05198ecaf9a))
