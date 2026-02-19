# SWUFE-OJ

A general-purpose judging platform with pluggable judger, built for contests, benchmarking, and custom metric leaderboards.

## Features

### Pluggable Judger System

Define what to evaluate and how. A Task specifies its submission format, test data, and judger — the platform handles the rest.

| Judger | Use Case |
|---|---|
| `StandardIOJudger` | Classic competitive programming (compile → run → diff) |
| `SpecialJudger` | Problems with multiple valid answers (custom checker) |
| `ScriptJudger` | Anything else — bring your own eval script |

`ScriptJudger` allows you to judge anything: upload a eval script, and the platform runs it in a sandboxed Docker container against submissions. This makes it trivial to set up ML competitions (accuracy/F1), code golf (code length), performance benchmarks (QPS/latency), or any custom metric.

### Metric & Leaderboard

Every judger outputs structured `MetricRecord`s. The platform stores, queries, and ranks them — regardless of whether the metric is time/memory, accuracy/RMSE, or QPS/p99.

### Remote Judge

Link problems from external platforms (Codeforces, Kaggle, etc.) with optional proxy submission — reuse existing problem sets without duplicating content.

### Contest System

Full contest lifecycle: creation → registration → time-windowed submissions → live leaderboard → freeze → unfreeze.

## Tech Stack

- **Frontend**: Nuxt 4 + [Nuxt UI](https://www.figma.com/community/file/1544369209862884086/nuxt-ui-v4-official-design-kit-free)
- **Backend**: REST API + PostgreSQL + RustFS + RabbitMQ + Redis
- **Sandbox**: Docker (cgroup isolation, read-only mounts, network restrictions)

## Quick Start

```bash
pnpm install
pnpm dev -o
```
