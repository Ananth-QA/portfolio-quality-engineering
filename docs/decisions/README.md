# Architectural Decision Records (ADRs)

> **Directory**: `docs/decisions/`  
> **Project**: Portfolio Quality Engineering

---

## 1. Overview & Purpose

This directory contains **Architectural Decision Records (ADRs)** for the `portfolio-quality-engineering` framework.

An Architectural Decision Record captures a significant technical choice made during the design, implementation, or maintenance of the QA automation architecture, along with its background context, options evaluated, and consequences.

---

## 2. ADR Lifecycle & Governance

- **When to Create an ADR**: Only significant technical architectural decisions warrant a formal ADR. Minor implementation details or refactorings do not need ADRs.
- **Naming Convention**: `ADR-XXX-<short-title>.md` (e.g., `ADR-001-two-repository-architecture.md`).

---

## 3. Index of Architectural Decisions

| ADR ID      | Decision Title                                            | Status     | Date       | Key Outcome                                                                                                                           |
| ----------- | --------------------------------------------------------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **ADR-001** | **Independent Two-Repository Architecture**               | `ACCEPTED` | 2026-09-16 | Fully decoupled QA framework testing SUT via standard HTTPS/API protocols without source code imports.                                |
| **ADR-002** | **Playwright + TypeScript Technology Stack**              | `ACCEPTED` | 2026-09-16 | Selected Playwright + TS for native multi-browser support, auto-waiting, built-in network interception, and type safety.              |
| **ADR-003** | **Production Safety & Client-Side Route Interception**    | `ACCEPTED` | 2026-09-16 | Mandatory client-side interception (`page.route()`) of EmailJS and webhooks during test runs to protect live production environment.  |
| **ADR-004** | **Locator Preference Order & Test Attribute Conventions** | `ACCEPTED` | 2026-09-16 | Prioritized ARIA roles (`getByRole`) and `data-testid` attributes; prohibited brittle auto-generated CSS classes and absolute XPaths. |

---

## 4. Standard ADR Document Structure

When creating a new ADR (`docs/decisions/ADR-XXX-<title>.md`), adhere to the following standard template:

```markdown
# ADR-XXX: [Title of Decision]

- **Status**: [ PROPOSED | ACCEPTED | REJECTED | DEPRECATED | SUPERSEDED ]
- **Date**: YYYY-MM-DD
- **Authors**: Senior SDET / QA Architect

## 1. Context & Problem Statement

Describe the technical challenge, architectural context, or requirement driving this decision.

## 2. Options Evaluated

List the technical alternatives considered, along with pros and cons for each.

## 3. Decision Outcome

State the chosen option clearly and explain why it was selected.

## 4. Consequences & Trade-Offs

- **Positive Consequences**: Architectural benefits gained.
- **Negative Consequences / Risks**: Trade-offs or maintenance overhead incurred.

## 5. Compliance & Verification

How this decision will be enforced in code reviews and CI pipeline quality gates.
```
