# Portfolio Quality Engineering

> **Production-grade, independent SDET & Quality Automation Engineering Framework** for the personal portfolio application of **Ananth A**.

---

## 1. Project Overview

**Portfolio Quality Engineering** is an enterprise-grade, external Quality Assurance (QA) test automation repository built with **Playwright** and **TypeScript**.

This framework treats the live personal portfolio web application ([`https://ananth-portfolio-xi.vercel.app/`](https://ananth-portfolio-xi.vercel.app/)) as a pure **System Under Test (SUT)**. The framework executes decoupled, black-box test suites over standard HTTP/HTTPS protocols and browser interfaces—validating functional integrity, accessibility (WCAG 2.1 AA), visual consistency, API contracts, and responsive layout across desktop and mobile viewports.

---

## 2. Why This Project Exists

In modern software engineering, web applications are deployed frequently via continuous integration pipelines. Testing only within the application repository often masks environmental defects, deployment discrepancies, or edge-case cross-browser regressions.

This project demonstrates a **decoupled Quality Engineering model**:
- **Independent QA Governance**: Quality engineering assets are versioned and maintained separately from developer feature code.
- **Production Safety & Real-World Validation**: Validates the actual deployed build artifacts running on edge infrastructure (Vercel Edge Engine) without requiring local build setup or source code dependencies.
- **Enterprise Test Standards**: Implements Page Object Models, component abstractions, network mocking, accessibility scanning, strict static analysis, and automated CI quality gates.

---

## 3. Two-Repository Architectural Model

```text
 ┌──────────────────────────────────────────────────┐        ┌──────────────────────────────────────────────────┐
 │           Portfolio Application Repo             │        │       portfolio-quality-engineering Repo         │
 │   (Developer Source Repository - Next.js)        │        │        (Decoupled QA Automation Framework)        │
 └────────────────────────┬─────────────────────────┘        └────────────────────────┬─────────────────────────┘
                          │                                                           │
                          ▼ Deploy                                                    ▼ Executes Tests
 ┌──────────────────────────────────────────────────┐                                 │
 │              Deployed Portfolio SUT              │◄────────────────────────────────┘ (HTTPS / Web Standard API)
 │     (https://ananth-portfolio-xi.vercel.app/)    │
 └──────────────────────────────────────────────────┘
```

This repository is **100% decoupled** from the application's source repository. It does NOT clone, import, or depend on Next.js source code, components, build scripts, or private utilities.

---

## 4. Technology Stack

- **Test Automation Engine**: [Playwright](https://playwright.dev/) (`@playwright/test` v1.55+)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/) (v5.9+ with `strict` type checking)
- **Accessibility Audit Engine**: [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) (v4.10+)
- **Static Analysis & Linting**: ESLint (`@typescript-eslint`), Prettier
- **CI/CD Quality Gates**: GitHub Actions (Push & PR workflows)
- **Reporting & Diagnostics**: Playwright HTML Reporter, Allure Playwright (`allure-playwright`), Playwright Trace Viewer

---

## 5. Testing Coverage & Capabilities Matrix

| Testing Capability | Engine / Tool | Scope & Description | Key Test Location |
| :--- | :--- | :--- | :--- |
| **UI & E2E Testing** | Playwright (`@playwright/test`) | Black-box navigation, user journeys, modal popups, and deep links. | `tests/smoke/`, `tests/regression/` |
| **Functional Regression** | Playwright POM Architecture | Comprehensive feature regression across projects, blogs, contact, and 404. | `tests/regression/` |
| **API Contract Testing** | Playwright `APIRequestContext` | Live HTTP contract validation against SUT `/api/medium` RSS proxy endpoints. | `tests/api/` |
| **Network Integration** | Playwright `page.route()` | Offline network payload mocking for Web3Forms contact submission. | `tests/integration/` |
| **Accessibility Audits** | `@axe-core/playwright` | Automated WCAG 2.1 Level AA compliance scans across 7 routes. | `tests/a11y/` |
| **Visual Regression** | Playwright `toHaveScreenshot()` | Pixel-diff visual screenshot comparison with `maxDiffPixelRatio: 0.02`. | `tests/visual/` |
| **Responsive Testing** | Playwright Viewports | Viewport layout validation across Desktop (1280x720), Tablet, and Mobile. | `tests/responsive/` |
| **Cross-Browser** | Chromium, Firefox, WebKit | Cross-engine validation across Desktop Chrome, Firefox, Safari, Mobile. | `tests/cross-browser/` |
| **CI/CD Quality Gates** | GitHub Actions (`smoke.yml`) | Automated typecheck (`tsc`), lint (`eslint`), test execution, and report uploads. | `.github/workflows/smoke.yml` |
| **Test Reporting** | Playwright HTML & Allure | Detailed execution traces, video recordings, screenshots, and HTML reports. | `playwright-report/` |

---

## 6. Framework Architecture

The framework enforces strict separation of concerns through standard software engineering patterns:

- **BasePage Abstraction (`src/pages/BasePage.ts`)**: Encapsulates common page interactions, header verification, navigation wait strategies, and page load state handling.
- **Page Object Models (`src/pages/`)**: Specialized page representations (`HomePage`, `BlogPage`, `NotFoundPage`) mapping domain-specific page interactions.
- **Component Objects (`src/components/`)**: Reusable UI component encapsulations (`Navbar`, `GlobalSearchModal`, `ProjectCard`, `ProjectModal`, `ContactForm`).
- **Custom Fixtures (`src/fixtures/`)**: Extended Playwright fixtures providing auto-instantiated Page & Component objects into test signatures.
- **Data Factories (`src/data/`)**: Schema-validated test data generators for form inputs, search queries, and expected content constants.
- **API Clients (`src/api/`)**: Dedicated HTTP clients for direct API contract verification.

---

## 7. Repository Structure

```text
portfolio-quality-engineering/
├── .github/
│   └── workflows/
│       ├── smoke.yml            # Primary Push/PR Smoke CI Quality Gate (5 Browsers)
│       ├── manual-e2e.yml       # Manual Suite Dispatch Workflow (smoke, regression, full)
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
│   ├── api/                     # REST API Clients & Services (mediumApiClient.ts)
│   ├── components/              # Component Objects (Navbar, Search, Form, etc.)
│   ├── config/                  # Centralized Environment & URL Configuration
│   ├── data/                    # Test Data Factories & Schemas
│   ├── fixtures/                # Custom Playwright Test Fixtures
│   ├── pages/                   # Page Object Model (BasePage, HomePage, BlogPage, etc.)
│   └── utils/                   # Helper Utilities (a11yHelper.ts, formatters)
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

## 8. Browser & Responsive Coverage

The test suite validates browser compatibility across 5 distinct Playwright browser projects:

1. **Desktop Chrome** (Chromium - 1280x720)
2. **Desktop Firefox** (Gecko Engine - 1280x720)
3. **Desktop Safari** (WebKit Engine - 1280x720)
4. **Mobile Chrome** (Pixel 5 Viewport emulation)
5. **Mobile Safari** (iPhone 12 Viewport emulation)

---

## 9. API & Integration Testing

- **API Contract Verification (`tests/api/medium-api.spec.ts`)**: Uses Playwright `APIRequestContext` to perform direct HTTP GET requests against the SUT proxy endpoint (`/api/medium`). Validates HTTP status 200, response schema, JSON structures, content-type headers, and response latency SLAs.
- **Network Interception & Mocking (`tests/integration/`)**: Utilizes Playwright `page.route()` to intercept third-party network requests (e.g., Web3Forms contact submission endpoint). Mocks success (`200 OK`) and failure (`500 Server Error`) network payloads to test application UI state handling without sending actual emails or polluting production telemetry.

---

## 10. Accessibility Testing (WCAG 2.1 AA)

- Integrates `@axe-core/playwright` engine via `a11yHelper.ts`.
- Automatically audits 7 key route paths: `Homepage`, `Projects`, `Blog`, `Contact`, `Resume`, `Navigation/Search`, and `404 Error Page`.
- Enforces strict compliance checks for color contrast, landmark regions, ARIA labels, image alt text, and keyboard navigation.

---

## 11. Visual Regression Testing

- Uses Playwright snapshot comparison engine (`toHaveScreenshot()`).
- Captures component-level and section-level visual baselines.
- Configured with a strict sensitivity threshold (`maxDiffPixelRatio: 0.02`) to catch unexpected CSS layout shifts, font mismatches, or element overlaps while accounting for anti-aliasing variations across OS environments.

---

## 12. CI/CD Architecture & Quality Gates

The repository features automated GitHub Actions workflows:

- **Primary Quality Gate (`.github/workflows/smoke.yml`)**: Triggers automatically on `push` to `main` and `pull_request` targeting `main`.
  - Executes static typechecking (`npm run typecheck`).
  - Executes code linting (`npm run lint`).
  - Executes Smoke Test Suite across all 5 browser projects.
  - Uploads Playwright HTML report artifacts automatically on failure.
- **Manual Suite Selection Workflow (`.github/workflows/manual-e2e.yml`)**: Interactive manual execution (`workflow_dispatch`) supporting user-selected test suites (`smoke`, `regression`, or `full`) with automated HTML report & failure artifact uploads.
- **Manual Full Regression (`.github/workflows/scheduled-e2e.yml`)**: Scheduled and manual trigger for full cross-browser regression suites.
- **Truthful Failure Propagation**: All workflows enforce non-zero exit codes (`set -e`). Test failures are **never suppressed**, masked with `continue-on-error`, or skipped.

---

## 13. Reporting & Failure Diagnostics

When tests run locally or in CI, Playwright generates detailed diagnostics:

- **Playwright HTML Report**: Complete interactive HTML report summarizing test execution duration, steps, and browser distribution.
- **Traces & Screenshots**: Configured to capture full execution traces (`trace: 'retain-on-failure'`), DOM snapshots, and video recordings on test failures for fast root-cause analysis.
- **Allure Integration**: Compatible with Allure Playwright reporter (`allure-playwright`) for enterprise reporting dashboards.

---

## 14. Production Safety Policy

Because tests execute directly against a live production application, strict production safety guidelines are enforced:

1. **Read-Only Interactivity**: UI navigation, modal opening, and filter searches operate in read-only mode.
2. **Network Interception for Submissions**: Forms (such as the Contact Form) use `page.route()` to mock API responses during submission tests, ensuring **zero real emails** or unwanted database mutations are generated.
3. **No Rate-Limit Overload**: Worker concurrency is tuned (`workers: 2` in CI / local) to prevent accidental DDoS or HTTP 429 rate-limit throttling against Vercel edge nodes.

---

## 15. Known Limitations & Technical Debt Policy

In alignment with professional SDET practices, known test automation issues and browser compatibility edge cases are documented transparently rather than hidden or skipped:

- **Active Technical Debt Log**: See [`docs/known-automation-issues.md`](./docs/known-automation-issues.md) for full root-cause analysis and DOM inspection details.
- **Tracked Issues**:
  - `TC-PRJ-001` (Mobile Chrome / Mobile Safari): Mobile drawer DOM element selection behavior under investigation.
  - `TC-CNT-001` (Mobile Chrome / Mobile Safari): Mobile navigation container DOM locator refinement pending.
  - `TC-SCH-001` (Desktop Safari): WebKit sticky-header DOM stability transition behavior under investigation.
- **Policy**: These tests remain actively executed in CI to ensure full visibility into application behavior across all target environments.

---

## 16. How to Run Locally

### Prerequisites
- **Node.js**: `v18.x` or `v20.x` (LTS recommended)
- **npm**: `v9.x` or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Ananth-QA/portfolio-quality-engineering.git
cd portfolio-quality-engineering

# Install Node dependencies
npm ci

# Install Playwright browser binaries and OS dependencies
npx playwright install --with-deps

# Create environment configuration file from template
cp .env.example .env
```

---

## 17. Available npm Scripts

All test and verification scripts are managed via `package.json`:

| Command | Action / Description |
| :--- | :--- |
| `npm run typecheck` | Validates TypeScript types across the codebase without emitting JS files. |
| `npm run lint` | Runs ESLint static code analysis across source files. |
| `npm run format:check` | Verifies code formatting compliance with Prettier rules. |
| `npm run format` | Automatically formats codebase files using Prettier. |
| `npm run test` | Executes the entire Playwright test suite in headless mode. |
| `npm run test:smoke` | Executes the critical-path P0 Smoke Test Suite (`tests/smoke`). |
| `npm run test:regression` | Executes the Functional Regression Test Suite (`tests/regression`). |
| `npm run test:api` | Executes API Contract Tests against live `/api/medium` endpoints (`tests/api`). |
| `npm run test:integration` | Executes Integration Tests with Network Interception & Mocking (`tests/integration`). |
| `npm run test:a11y` | Executes Accessibility Compliance Audits via `@axe-core/playwright` (`tests/a11y`). |
| `npm run test:visual` | Executes Visual Regression Screenshot Comparison Specs (`tests/visual`). |
| `npm run test:responsive` | Executes Responsive Layout & Viewport Overflow Specs (`tests/responsive`). |
| `npm run test:cross-browser` | Executes Cross-Browser Compatibility Specs across Chromium, Firefox, & WebKit (`tests/cross-browser`). |
| `npm run test:headed` | Executes tests with browser UI visible for visual debugging. |
| `npm run test:debug` | Launches Playwright Inspector for step-by-step interactive debugging. |

---

## 18. Framework Documentation Navigation

Comprehensive engineering documentation is maintained in the [`docs/`](./docs) directory:

- 📋 [**Test Strategy**](./docs/test-strategy.md): Scope, risk-based testing, test levels, defect management, and production safety.
- 🏗️ [**Automation Architecture**](./docs/automation-architecture.md): Technical framework design, POM patterns, custom fixtures, mocking, and CI/CD.
- 📊 [**Test Traceability Matrix**](./docs/test-matrix.md): Mapping of requirements (`PF-*`) to test scenarios (`TC-*`), types, priorities, and decisions.
- 🗺️ [**Implementation Roadmap**](./docs/implementation-roadmap.md): Living 15-phase implementation plan tracking progress and verification evidence.
- 📁 [**Feature Plans Guide**](./docs/feature-plans/README.md): Guidelines for authoring feature-level test plans for complex updates.
- 📑 [**Architecture Decision Records (ADRs)**](./docs/decisions/README.md): Index of technical architecture decisions governing the framework.
- ⚠️ [**Known Automation Issues**](./docs/known-automation-issues.md): Transparent log of active technical debt, DOM analysis, and deferred locators.
- 🔍 [**Final SDET Project Audit**](./docs/project-audit-phase-10-4.md): Comprehensive Phase 10.4 audit evaluating architecture, quality gates, and maintainability.

---

## 19. Project Implementation Status

- **Framework Core Architecture**: `COMPLETED`
- **Page Object Models & Component Abstractions**: `COMPLETED`
- **Smoke & Regression Automation**: `COMPLETED`
- **API Contract & Integration Mocking**: `COMPLETED`
- **Accessibility & Visual Regression Suites**: `COMPLETED`
- **Responsive & Cross-Browser Specs**: `COMPLETED`
- **CI/CD Quality Gates (GitHub Actions)**: `IMPLEMENTED`
- **Documentation & Architecture Audits**: `COMPLETED`
- **Known Technical Debt Tracking**: `DOCUMENTED / ACTIVE`

---

## 20. Author & Professional Context

- **Author**: **Ananth A**
- **Role**: Lead Quality Engineer / SDET
- **Portfolio SUT**: [https://ananth-portfolio-xi.vercel.app/](https://ananth-portfolio-xi.vercel.app/)
- **Repository**: [portfolio-quality-engineering](https://github.com/Ananth-QA/portfolio-quality-engineering)
