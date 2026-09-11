# AIDLC — Overview

This project is delivered with the **AI-Driven Development Lifecycle (AIDLC)**: three phases, each with a written artifact and explicit exit criteria. Nothing moves forward until the previous phase's criteria are checked off.

| Phase | Artifact | Question it answers |
|-------|----------|---------------------|
| 1. Inception | [`01-inception.md`](01-inception.md) | What are we building, for whom, and what does "done" mean? |
| 2. Construction | [`02-construction.md`](02-construction.md) | In what order do we build it, and against what contract? |
| 3. Operation | [`03-operation.md`](03-operation.md) | How is it built, deployed, observed, and changed later? |

Decisions that outlive a phase are recorded as ADRs in [`../adr/`](../adr/).

## Why AIDLC here

This is a small, single-purpose static site — the value of the process is not ceremony, it is that **the "how do I change this later?" question is answered in writing before any code exists**. The site's whole reason for being is to stay current with a career that keeps moving, so maintainability is the primary requirement, not a nice-to-have.

## Roles

- **Product owner / approver:** Elio Cortés.
- **Implementer:** Claude Code, working inside the constraints in `CLAUDE.md`.

## Phase status

| Phase | Status | Date |
|-------|--------|------|
| Inception | ✅ Complete — awaiting sign-off | 2026-09-10 |
| Construction | ✅ Complete | 2026-09-10 |
| Operation | ✅ Complete | 2026-09-10 |
