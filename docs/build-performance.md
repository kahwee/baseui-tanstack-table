# Build performance

The artifact build runs its existing tools under Bun 1.4.4. This changes the build
host, while preserving the package's exports and output formats. Tests and
coverage retain their existing runtime; source checks still finish before builds.

On the Linux x64 executor (Node v26.11.1, Bun 1.4.4), the median artifact-build time
changed from **4.180s to 3.564s**, a **14.7% reduction** for this phase.

| Build host             | Median |        Range |
| ---------------------- | -----: | -----------: |
| Node tool shebangs     | 4.180s | 3.302–8.418s |
| Bun-hosted build tools | 3.564s | 2.477–3.728s |

Both cases used the same updated dependencies and included declaration emission.
One warm-up per case preceded three alternating measured runs. All emitted files,
including declarations and source maps, had identical SHA-256 fingerprints across
the measured cases. Dependency and OS caches were warm. No other build or test
workload ran during this comparison. This excludes dependency installation, source
checks, tests, Storybook, and CI setup; it is not a whole-CI speedup measurement.

[Raw samples](benchmarks/build-runtime-2026-10-22.json) retain the baseline commit,
tool versions, individual timings, file counts, fingerprints, and candidate command.
The recorded commands refer to the baseline scripts before explicit Bun invocations
were added. Current package scripts select the measured Bun-hosted path directly.

To time the current build, install pinned dependencies with `bun ci`, finish the
source checks, then run `bun run build:artifacts` repeatedly on an otherwise idle machine.
Compare medians and emitted files; do not combine this phase result with historical
checker improvements to claim a multiplied whole-build gain.

The existing Vite library build retains ESM and UMD output. Bun hosts Vite;
Bun’s bundler does not replace Vite’s UMD generation.

## Source checks and declaration generation

Bun 1.4.4 owns formatting (`bun run format`, `bun run format:check`) and type checking
(`bun run typecheck`). Biome has been removed. Bun formatting is not a replacement
for Biome’s semantic lint rules; tests, strict type checks, and package builds remain
the verification gates. TypeScript remains installed for declaration generation.

`bun run check:source` runs formatting, Bun type checking, and tests in parallel.
`bun run check` waits for those checks before building package artifacts.
`bun run build` checks types before building. CI calls `build:artifacts` only after
a successful Bun check; TypeScript emits declarations with `--noCheck` to avoid
checking the same source again. Do not use `build:artifacts` as a validation command.

On the session’s Linux executor, the median of three project-check runs was
0.360s with Bun versus 1.547s with `bun x --no-install tsc --noEmit`.
These include command startup and describe this checkout, not a CI speed guarantee.
Declaration emission measured 1.116s with `--noCheck` versus
1.144s with checking; generated `.d.ts` contents matched.
