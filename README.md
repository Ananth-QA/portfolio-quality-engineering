# Portfolio Quality Engineering

> Production-grade, independent SDET & Quality Automation Engineering Framework for the personal portfolio application of **Ananth A**.

---

## 1. Overview

**Portfolio Quality Engineering** is a decoupled, external Quality Assurance (QA) test automation repository built with **Playwright** and **TypeScript**.

This repository treats the deployed personal portfolio web application as a pure **System Under Test (SUT)**. The automation framework executes black-box test suites against the live application via standard HTTP/HTTPS protocols and browser interactions, ensuring high functional reliability, accessibility compliance, visual consistency, and API stability.

---

## 2. System Under Test (SUT)

- **Production URL**: [https://ananth-portfolio-xi.vercel.app/](https://ananth-portfolio-xi.vercel.app/)
- **Application Architecture**: Web Application (Single-Page App navigation, RSS Proxy Endpoint, Contact Form, Blog Platform)
- **Deployment Platform**: Vercel Edge Engine

---

## 3. Two-Repository Architectural Model

```text
 ┌──────────────────────────────────────────────────┐        ┌──────────────────────────────────────────────────┐
 │           Portfolio Application Repo             │        │       portfolio-quality-engineering Repo         │
 │   (Developer Source Repository - Next.js)       │        │        (Decoupled QA Automation Framework)       │
 └────────────────────────┬─────────────────────────┘        └────────────────────────┬─────────────────────────┘
                          │                                                           │
                          ▼ Deploy                                                    ▼ Executes Tests
 ┌──────────────────────────────────────────────────┐                                 │
 │              Deployed Portfolio SUT              │◄────────────────────────────────┘ (HTTPS / Web Standard API)
 │     (https://ananth-portfolio-xi.vercel.app/)    │
 └──────────────────────────────────────────────────┘
```

This repository is **100% independent** from the application's source code. It does NOT clone, import, or depend on the portfolio repository's source files, components, utilities, or build configurations.

---

## 4. Key Documentation Links

All QA strategy, technical architecture, traceability, and implementation roadmap documents are maintained inside the [`docs/`](./docs) directory:

- 📋 [**Test Strategy**](./docs/test-strategy.md): Scope, principles, risk-based prioritization, test levels, defect handling, and production safety policies.
- 🏗️ [**Automation Architecture**](./docs/automation-architecture.md): Technical framework design, Page Object Model (POM), component objects, fixtures, network mocking, locator guidelines, and CI/CD setup.
- 📊 [**Test Traceability Matrix**](./docs/test-matrix.md): Complete mapping of requirement IDs (`PF-*`) to test scenario IDs (`TC-*`), test types, priorities, and automation decisions.
- 🗺️ [**Implementation Roadmap**](./docs/implementation-roadmap.md): Living 15-phase implementation plan tracking progress, status, and verification evidence.
- 📁 [**Feature Plans Guide**](./docs/feature-plans/README.md): Guidelines for authoring feature-level test plans for high-risk or major updates.
- 📑 [**Architecture Decisions (ADRs)**](./docs/decisions/README.md): Index of Architectural Decision Records governing technical framework choices.

---

## 5. Technology Stack

- **Test Runner & Engine**: Playwright (`@playwright/test`)
- **Language**: TypeScript (`v5.x` with strict mode enabled)
- **Accessibility Engine**: `@axe-core/playwright`
- **CI/CD Integration**: GitHub Actions
- **Reporting**: Playwright HTML Reporter / Allure Reporter

---

## 6. Implementation Status

- **Phase 0 (Planning & Architecture)**: `COMPLETE`
- **Phase 1 (Framework Initialization)**: `COMPLETE`
- **Phase 2 (Environment & Configuration)**: `COMPLETE`
- **Phase 3 (Page Object & Component Architecture)**: `COMPLETE`
- **Phase 4 (Smoke Test Suite Automation)**: `NOT STARTED`
