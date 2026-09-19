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
- ⚠️ [**Known Automation Issues**](./docs/known-automation-issues.md): Transparent log of active technical debt, browser compatibility, and deferred POM locators.
- 🔍 [**Final SDET Project Audit**](./docs/project-audit-phase-10-4.md): Comprehensive Phase 10.4 audit evaluating architecture, quality gates, and maintainability.

---

## 5. Technology Stack

- **Test Runner & Engine**: Playwright (`@playwright/test`)
- **Language**: TypeScript (`v5.x` with strict mode enabled)
- **Accessibility Engine**: `@axe-core/playwright`
- **CI/CD Integration**: GitHub Actions
- **Reporting**: Playwright HTML Reporter / Allure Reporter

---

## 6. Repository Structure

```text
portfolio-quality-engineering/
├── .github/
│   └── workflows/
│       ├── smoke.yml            # Primary Push/PR Smoke CI Quality Gate (5 Browsers)
│       └── scheduled-e2e.yml    # Full Cross-Browser Regression (Manual Trigger Only)
├── docs/                        # Complete Framework Documentation Suite
│   ├── automation-architecture.md
│   ├── implementation-roadmap.md
│   ├── known-automation-issues.md
│   ├── project-audit-phase-0-9.md
│   ├── project-audit-phase-10-4.md
│   ├── test-matrix.md
│   └── test-strategy.md
├── src/                         # Quality Engineering Source Code
│   ├── api/                     # REST API Clients & Services
│   ├── components/              # Component Objects (Navbar, Search, Form, etc.)
│   ├── config/                  # Centralized Environment & URL Configuration
│   ├── data/                    # Test Data Factories & Schemas
│   ├── fixtures/                # Custom Playwright Fixtures
│   ├── pages/                   # Page Object Model (BasePage, HomePage, BlogPage, etc.)
│   └── utils/                   # Helper Utilities (a11y, formatters)
├── tests/                       # Modular Test Suites
│   ├── a11y/                    # Accessibility Audits (@axe-core/playwright)
│   ├── api/                     # REST API Contract & Endpoint Tests
│   ├── cross-browser/           # Cross-Browser Engine Compatibility Specs
│   ├── integration/             # Component & Network Integration Tests (Mocks)
│   ├── regression/              # Functional Regression Test Specs
│   ├── responsive/              # Responsive Viewport Overflow & Layout Specs
│   ├── smoke/                   # Critical Path P0 Smoke Test Suite
│   └── visual/                  # Visual Regression Screenshot Comparison Specs
├── .env.example                 # Environment Variable Template
├── .gitignore                   # Git Exclusions
├── package.json                 # Node Dependencies & Test Scripts
├── playwright.config.ts         # Central Playwright Test Runner Configuration
├── tsconfig.json                # TypeScript Strict Compiler Configuration
└── README.md                    # Framework Overview & Repository Documentation
```

---

## 7. Test Capabilities & Matrix

| Testing Capability | Engine / Tool | Scope & Description | Key Test Location |
| :--- | :--- | :--- | :--- |
| **UI & E2E Testing** | Playwright (`@playwright/test`) | Black-box navigation, user journeys, modal popups, and deep links. | `tests/smoke/`, `tests/regression/` |
| **Functional Regression** | Playwright POM Architecture | Comprehensive feature regression across projects, blogs, contact, and 404. | `tests/regression/` |
| **API Testing** | Playwright `APIRequestContext` | Live HTTP contract validation against SUT `/api/medium` RSS proxy endpoints. | `tests/api/` |
| **Network Integration** | Playwright `page.route()` | Offline network payload mocking for Web3Forms contact submission. | `tests/integration/` |
| **Accessibility Audits** | `@axe-core/playwright` | Automated WCAG 2.1 Level AA compliance scans across 7 routes. | `tests/a11y/` |
| **Visual Regression** | Playwright `toHaveScreenshot()` | Pixel-diff visual screenshot comparison with `maxDiffPixelRatio: 0.02`. | `tests/visual/` |
| **Responsive Testing** | Playwright Viewports | Viewport layout validation across Desktop (1280x720), Tablet, and Mobile. | `tests/responsive/` |
| **Cross-Browser** | Chromium, Firefox, WebKit | Cross-engine validation across Desktop Chrome, Firefox, Safari, Mobile. | `tests/cross-browser/` |
| **CI/CD Quality Gates** | GitHub Actions (`smoke.yml`) | Automated typecheck (`tsc`), lint (`eslint`), test execution, and report uploads. | `.github/workflows/smoke.yml` |

---

## 8. CI/CD Quality Gates & Known Technical Debt Policy

- **Truthful Failure Propagation**: All workflows enforce non-zero exit code failure propagation. Failures are **never suppressed**, masked with `continue-on-error`, or skipped.
- **Active Technical Debt Log**: Unresolved mobile navigation and WebKit sticky header actionability issues are explicitly documented in [`docs/known-automation-issues.md`](./docs/known-automation-issues.md) and remain actively executed in CI:
  - `TC-PRJ-001` (Mobile Chrome / Mobile Safari)
  - `TC-CNT-001` (Mobile Chrome / Mobile Safari)
  - `TC-SCH-001` (Desktop Safari)

---

## 9. Local Execution Commands

```bash
# Install dependencies & Playwright browsers
npm ci
npx playwright install --with-deps

# Run type check and linting
npm run typecheck
npm run lint

# Execute test suites
npm run test:smoke         # Execute Smoke Suite
npm run test:regression    # Execute Functional Regression
npm run test:api           # Execute API Contract Tests
npm run test:integration   # Execute Integration Mock Tests
npm run test:a11y          # Execute Accessibility Audits
npm run test:visual        # Execute Visual Regression Specs
npm run test:responsive    # Execute Responsive Layout Specs
npm run test:cross-browser # Execute Cross-Browser Specs
```
