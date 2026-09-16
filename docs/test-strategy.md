# QA Test Strategy

> **Project**: Portfolio Quality Engineering  
> **System Under Test**: Ananth Portfolio (`https://ananth-portfolio-xi.vercel.app/`)  
> **Document Version**: 1.0.0  
> **Status**: APPROVED (Planning Phase)

---

## 1. Purpose

The purpose of this Quality Assurance (QA) Test Strategy is to establish a rigorous, production-grade quality engineering framework for the personal portfolio application of **Ananth A**.

This document outlines **why we test**, **what we test**, **how we test**, and **how we protect production systems** while executing end-to-end, functional, visual, accessibility, and API test suites. It serves as the primary governing document for quality engineering across the project lifecycle.

---

## 2. System Under Test (SUT)

- **Production Endpoint**: `https://ananth-portfolio-xi.vercel.app/`
- **Application Type**: Multi-page Single-Page Application (SPA) with server-side proxy API routes.
- **Key Modules**: Sticky Navigation, Global Search Modal, Hero Section, About & Technical Skills, Experience Timeline, Projects Showcase & Case Study Modal, Medium Blog Platform (`/blogs`), Resume Hub & PDF Preview, Certifications Center, Contact Center & Form, Custom 404 Route.

---

## 3. Scope of Testing

The following capabilities of the SUT fall within the scope of this QA automation framework:

- **User Interface & Interaction**: Smooth scrolling navigation, modal focus management, expandable drawers, mobile navigation drawer, interactive button triggers.
- **Functional Workflows**: Keyword search, multi-category project filtering, project sorting, blog article pagination, blog search, PDF download triggers, contact form reset and validation.
- **API Testing**: Direct HTTP testing of the public RSS proxy API endpoint (`/api/medium`) for status codes, payload contract schemas, and cache headers.
- **Integration Mocking**: Client-side interception and validation of contact form submissions, third-party notification services, and external RSS feeds.
- **Accessibility (a11y)**: Automated WCAG scanning, keyboard navigation, focus traps, ARIA roles, and label associations.
- **Visual Regression**: Baseline snapshot comparison across key page layouts and interactive states.
- **Responsive Layouts**: Desktop (`>= 1024px`), Tablet (`768px - 1023px`), and Mobile (`< 768px`) viewports.
- **Cross-Browser Reliability**: Validation across Chromium, Firefox (Gecko), and WebKit (Safari) engines.

---

## 4. Out of Scope

The following areas are explicitly **out of scope** for this automation framework:

- **Source Code Unit Testing**: Component unit tests and internal helper functions belong inside the application's source repository.
- **Third-Party Service Infrastructure**: Testing the internal availability or server reliability of Medium, EmailJS, or Google Apps Script backend infrastructure.
- **Volumetric Performance / Load Testing**: High-concurrency stress testing against the production hosting provider.
- **Security Vulnerability Penetration Testing**: Deep dynamic security scanning (DAST) or vulnerability exploitation.

---

## 5. Testing Principles

1. **Risk-Based Testing**: Test effort is concentrated on high-impact user workflows, critical UI interactions, and integration points.
2. **Black-Box Decoupling**: The test suite treats the application as an external black box, interacting strictly through browser protocols and HTTP requests.
3. **Production Safety**: Automated execution against the live application must never pollute production databases or consume external service quotas.
4. **Deterministic Automation**: Tests must yield identical, repeatable results under identical conditions. Arbitrary sleep delays are strictly prohibited.
5. **Maintainability First**: Tests delegate interactions to Page and Component Objects. Locators rely on stable, non-brittle attributes (`data-testid` and accessible ARIA roles).
6. **Fast Feedback**: Smoke suites are optimized to execute quickly in CI pipelines to provide immediate signals on pull requests.

---

## 6. Test Levels

| Test Level                     | Scope                                                  | Primary Objective                                           | Execution Layer                        |
| ------------------------------ | ------------------------------------------------------ | ----------------------------------------------------------- | -------------------------------------- |
| **Smoke Testing**              | Critical P0 user paths & `/api/medium` route           | Rapid verification that SUT is operational post-deployment  | Playwright E2E & API Client            |
| **Functional Testing**         | All user interactions, search, filters, modals, forms  | Validation of business requirements & input edge cases      | Playwright Page Objects                |
| **API Testing**                | Endpoint `/api/medium`                                 | Verify HTTP 200 contract, JSON schema, and cache headers    | Playwright `APIRequestContext`         |
| **Integration Testing**        | Contact form submission & RSS data handling            | Intercept client requests and validate payload transmission | Playwright `page.route()` interception |
| **Accessibility**              | All routes (`/`, `/blogs`, `/404`) and modals          | Identify detectable WCAG 2.1 AA violations & keyboard traps | `@axe-core/playwright` engine          |
| **Visual Regression**          | Hero, Projects grid, Search modal, Mobile drawer       | Detect unintended visual layout shifts                      | Playwright `toHaveScreenshot()`        |
| **Responsive & Cross-Browser** | Desktop, Tablet, Mobile across Chrome, Firefox, Safari | Ensure visual and functional consistency across viewports   | Playwright Multi-browser Config        |

---

## 7. Test Priorities

Test scenarios are prioritized according to user impact, risk, and business critical path:

- **P0 (Critical)**: Fundamental user capabilities. Failure blocks application usage (e.g., page loading, core section scrolling, resume download, global search modal trigger, contact form validation).
- **P1 (High)**: Important functional capabilities (e.g., project category filtering, experience drawer expansion, blog pagination, custom 404 recovery).
- **P2 (Medium)**: Secondary features and state controls (e.g., project sorting matrix, contact form reset action, empty search results recovery).
- **P3 (Low)**: Minor cosmetic and optional enhancements.

---

## 8. Test Environment Strategy

The primary execution environment is the deployed production URL: `https://ananth-portfolio-xi.vercel.app/`.

To ensure the framework remains environment-agnostic, all URLs and environment parameters are encapsulated in configuration files (`src/config/env.config.ts`), enabling seamless execution against local development or QA staging environments if provided in the future.

---

## 9. Production Safety Strategy

Executing automated tests against a live production application requires strict safety guardrails.

### Test Classification Matrix

| Classification            | Definition                                                         | Application Rules                                                                           |
| ------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| **Production-Safe**       | Read-only operations with zero external side effects               | Allowed against production (e.g., navigation, search, PDF download, blank form validation). |
| **Mocked for Production** | Actions that trigger client-side network dispatch to third parties | Must be intercepted using Playwright `page.route()` before dispatching to external APIs.    |
| **QA / Staging Only**     | Mutating operations that require staging backends                  | Prohibited against production; executed only when a dedicated QA environment is configured. |
| **Manual Validation**     | Complex or visual checks requiring human judgment                  | Evaluated manually during exploratory testing cycles.                                       |

### Handling Client-Side vs. Server-Side Requests

- **Browser-Originated Requests**: External client requests dispatched by the browser (such as EmailJS API calls or client-side webhooks) are safely intercepted in Playwright using `page.route('**/api.emailjs.com/**', route => route.fulfill(...))`.
- **Server-Originated Requests**: Requests executed by Next.js server-side functions cannot be intercepted by browser-level `page.route()`. Server-side endpoints must be tested via contract validation or mocked upstream services.

---

## 10. Entry Criteria

Prior to starting any automated test cycle, the following criteria must be satisfied:

1. Target environment (`https://ananth-portfolio-xi.vercel.app/`) is accessible and returns HTTP 200 OK.
2. The automation repository builds cleanly with zero TypeScript compilation errors.
3. Network connectivity to target domain and mocking fixtures is established.

---

## 11. Exit Criteria

A test automation execution cycle is considered successful when:

1. 100% of P0 (Critical) and P1 (High) automated test cases pass.
2. 0 unhandled test framework errors or flaky test retries exist in the smoke suite.
3. Playwright HTML test report is generated and archived with full traces for any failed tests.
4. Accessibility audits report zero critical WCAG violations.

---

## 12. Quality Gates (CI Pipeline)

The CI/CD pipeline enforces the following automated quality gates:

- **Gate 1 (Pre-Commit / PR)**: ESLint checks + TypeScript typecheck + Smoke Test Suite (`@smoke`). Failure blocks pull request merging.
- **Gate 2 (Nightly / Scheduled)**: Full Regression Suite + Cross-Browser Matrix + Accessibility Audit + Visual Regression. Failures trigger automated pipeline alerts.

---

## 13. Risk Management

| Identified Risk                                         | Impact | Mitigation Strategy                                                                                                       |
| ------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| Flaky UI tests caused by dynamic animations             | High   | Disable framer-motion/CSS animations during test runs (`animations: 'disabled'`). Use Playwright auto-waiting assertions. |
| Third-party API rate limits or downtime (Medium RSS)    | Medium | Implement Playwright `page.route()` fallback fixtures for Medium RSS feeds during UI test runs.                           |
| Accidental spamming of contact submission emails        | High   | Mandatory interception of `api.emailjs.com` in all contact form test specs.                                               |
| OS-level rendering differences in visual snapshot tests | Medium | Run visual regression tests strictly inside Linux Docker containers or CI runners.                                        |

---

## 14. Defect Handling

When an automated test fails:

1. **Trace Analysis**: Inspect the Playwright trace archive (`trace.zip`) to observe DOM state, console logs, network requests, and action timing.
2. **Classification**: Determine whether the failure is an **Application Defect** (SUT behavior deviation), **Test Data / Mock Issue**, or **Environment Flake**.
3. **Reporting**: Log reproducible application defects with step-by-step Playwright repro scripts and attached video/trace artifacts.

---

## 15. Maintenance Strategy

- **Selector Updates**: If UI layouts change, updates are made strictly inside designated Component/Page Objects. Individual test specs remain untouched.
- **Requirement Traceability**: Every test file must reference its corresponding Requirement ID (`PF-*`) and Test ID (`TC-*`) in its description metadata.
- **Quarterly Audit**: Periodic review to remove deprecated test scenarios and refine locator stability.
