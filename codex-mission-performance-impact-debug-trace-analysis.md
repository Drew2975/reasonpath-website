# Codex Mission: Performance Impact & Debug Trace Analysis

This guide helps you measure performance impact of changes and capture debug traces in a structured, low‑overhead way. It includes practical steps, code snippets, and a lightweight workflow that fits this repo.

## Objectives

- Establish a repeatable baseline and compare performance across changes.
- Add low‑noise, high‑signal debug tracing for faster diagnosis.
- Keep overhead minimal; avoid shipping debug code to production paths.

## Workflow Summary

1. Define the scenario and metric (e.g., runtime, allocations, I/O).
2. Create a reproducible runner (script or pytest) for the scenario.
3. Measure baseline locally; capture artifacts (profile, logs).
4. Implement instrumentation (timers + structured logs) as needed.
5. Re‑measure after changes; compare to baseline.
6. Optionally gate in CI with thresholds.

## Quick Setup

- Python env: `make setup`
- Run tests: `make test`
- Lint: `make lint`
- Entry point: `python -m src.main`

## Instrumentation: Minimal, Useful, Toggleable

Prefer standard `logging` with structured context and opt‑in verbosity via env vars.

```python
# Example: drop-in logging setup (put near app startup)
import logging, os, sys

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
LOG_FORMAT = os.getenv("LOG_FORMAT", "plain")  # plain|json

class JsonFormatter(logging.Formatter):
    def format(self, record):
        import json, time
        payload = {
            "ts": time.strftime("%Y-%m-%dT%H:%M:%S", time.gmtime(record.created)),
            "lvl": record.levelname,
            "msg": record.getMessage(),
            "logger": record.name,
        }
        if record.exc_info:
            payload["exc"] = self.formatException(record.exc_info)
        return json.dumps(payload)

handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JsonFormatter() if LOG_FORMAT == "json" else logging.Formatter("[%(levelname)s] %(message)s"))
logging.basicConfig(level=LOG_LEVEL, handlers=[handler])
logger = logging.getLogger("app")
logger.debug("logging initialized", extra={"component": "bootstrap"})
```

Add timing around critical sections with context managers.

```python
import time, logging
logger = logging.getLogger("app")

class Stopwatch:
    def __init__(self, label: str):
        self.label = label
    def __enter__(self):
        self.t0 = time.perf_counter(); return self
    def __exit__(self, *_):
        dt = (time.perf_counter() - self.t0) * 1000
        logger.info("timing", extra={"label": self.label, "ms": round(dt, 3)})

# Usage
with Stopwatch("load_users"):
    pass  # critical code
```

Add correlation/trace IDs to tie logs together.

```python
import uuid
trace_id = uuid.uuid4().hex
logger.info("start request", extra={"trace": trace_id})
# pass trace_id through calls
```

## Profiling: Where Time Is Spent

Use built‑in `cProfile` for CPU profiles.

```bash
python -m cProfile -o profile.out -m src.main
python -c "import pstats; s=pstats.Stats('profile.out'); s.strip_dirs().sort_stats('cumtime').print_stats(25)"
```

Optional viewers (local only):
- `snakeviz profile.out` (pip install snakeviz)
- `pip install pyinstrument` then `pyinstrument -m src.main`

Memory focus (optional): `pip install memray` and run `memray run -o mem.bin -m src.main`.

## Benchmarking: Compare To Baseline

If using `pytest`, adopt `pytest-benchmark`.

```bash
pip install pytest-benchmark
```

Create a benchmark test:

```python
# tests/bench/test_greet_bench.py
from src.main import greet

def test_greet_benchmark(benchmark):
    def _work():
        greet("Alice")
    benchmark(_work)
```

Run and save baseline (or use Makefile targets below):

```bash
pytest tests/bench -q --benchmark-only --benchmark-save=baseline
```

Compare later runs to the baseline:

```bash
pytest tests/bench -q --benchmark-only --benchmark-compare --benchmark-compare-fail=mean:5%
```

The `--benchmark-compare-fail=mean:5%` flag fails when mean regression >5%.

Make targets:

```bash
make bench         # report only
make bench-save    # save baseline named 'baseline'
make bench-compare # compare to 'baseline' and fail on >5% mean regression
```

## CI Gating (Optional)

- Add a job step to run benchmarks in a stable environment.
- Store a known‑good baseline artifact; compare in PRs.
- Keep noise low: pin Python version, avoid shared runners with heavy load.

Example CI step:

```yaml
- name: Bench (compare to baseline)
  if: env.BENCH_COMPARE == '1'
  env:
    BENCH_BASELINE_NAME: baseline
    BENCH_FAIL_THRESHOLD: mean:5%
  run: |
    pytest tests/bench -q --benchmark-only \
      --benchmark-compare="${{ env.BENCH_BASELINE_NAME }}" \
      --benchmark-compare-fail="${{ env.BENCH_FAIL_THRESHOLD }}"
```

## Debug Trace Capture

- Use `LOG_LEVEL=DEBUG` only when diagnosing; default to INFO.
- Prefer `LOG_FORMAT=json` for machine parsing.
- Include `trace` IDs, key inputs, and outcomes; avoid dumping large payloads.
- Sample verbose traces (e.g., enable per request via header/env) to reduce noise.

## Analysis Playbook

- Large slowdowns: inspect `cumtime` and `tottime` from `pstats` to find hot paths.
- Many tiny calls: enable logger at DEBUG for specific modules; aggregate by label.
- I/O waits: log start/end with durations; correlate with external system timestamps.
- Memory growth: sample RSS over time; use leak detectors (e.g., `tracemalloc`).

## Reporting Template

Copy/paste and fill for each analysis.

```md
### Summary
- Scenario: <what was measured>
- Baseline vs Change: <delta %, absolute ms>
- Root Cause: <hot path / I/O / algorithm>
- Resolution: <change applied or proposed>

### Method
- Runner: <command or test>
- Env: Python <ver>, OS, CPU
- Tools: cProfile/pytest-benchmark/logging

### Evidence
- Top functions (cumtime):
- Timings (labels):
- Logs/Trace IDs:

### Next Steps
- <actions, gates, follow-ups>
```

## Pitfalls & Tips

- Warm‑ups: run once before measuring to avoid cold‑start bias.
- Variance: take multiple samples; report median and IQR, not just mean.
- Interference: close other apps; fix CPU scaling; avoid network variability.
- Over‑instrumentation skews results; prefer sampling and post‑hoc profiling.

## References

- cProfile / pstats: Python stdlib docs
- pytest-benchmark: https://pytest-benchmark.readthedocs.io/
- pyinstrument: https://pyinstrument.readthedocs.io/
- Structured logging patterns (logfmt/JSON)

