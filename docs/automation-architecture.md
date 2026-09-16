# Automation Architecture & Framework Blueprint

> **Project**: Portfolio Quality Engineering  
> **System Under Test**: Ananth Portfolio (`https://ananth-portfolio-xi.vercel.app/`)  
> **Target Framework**: Playwright + TypeScript  
> **Document Version**: 1.0.0

---

## 1. Architecture Overview

The **Portfolio Quality Engineering** framework is an enterprise-grade, independent test automation architecture designed for high maintainability, fast execution, and production safety.

```text
 ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                System Under Test (SUT)                                          │
 │                        https://ananth-portfolio-xi.vercel.app/                                  │
 └────────────────────────────────────────────────┬────────────────────────────────────────────────┘
                                                  │
                                                  │ HTTPS / W3C WebDriver Protocols
                                                  ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                   Playwright Automation Engine                                  │
 └──────────────────┬─────────────────────────────┬─────────────────────────────┬──────────────────┘
                    │                             │                             │
                    ▼                             ▼                             ▼
 ┌──────────────────────────────────┐ ┌──────────────────────────────┐ ┌──────────────────────────┐
 │       Page & Component Objects   │ │   Network Mocking & Intercept│ │  Accessibility & Visual  │
 │ - HomePage / BlogPage / 404Page │ │ - EmailJS Interceptor        │ │ - @axe-core/playwright   │
 │ - Navbar / SearchModal / Cards   │ │ - Google Script Mock         │ │ - toHaveScreenshot()     │
 └──────────────────┬───────────────┘ └──────────────┬───────────────┘ └────────────┬─────────────┘
                    │                                │                              │
                    └────────────────────────────────┼──────────────────────────────┘
                                                     │
                                                     ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                       Test Execution Layers                                     │
 │   ┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐   │
 │   │  Smoke Suite    │    │ Regression Suite │    │  API Proxy Suite │    │  CI/CD Workflows │   │
 │   │    (@smoke)     │    │   (@regression)  │    │      (@api)      │    │ (GitHub Actions) │   │
 │   └─────────────────┘    └──────────────────┘    └──────────────────┘    └──────────────────┘   │
 └───────────────────────────────────────────────────┬─────────────────────────────────────────────┘
                                                     │
                                                     ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                  Reports & Test Artifacts                                       │
 │       - Playwright HTML Report       - Playwright Traces       - Screenshots / Videos           │
 └─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Repository Independence

This automation framework lives inside the dedicated repository `portfolio-quality-engineering`.

### Key Architectural Boundaries

- **Zero Code Coupling**: Does NOT clone, import, or reference source code files (`.tsx`, `.ts`) from the portfolio application repository.
- **Protocol-Driven**: Interacts with the SUT strictly via standard HTTPS web requests, DOM tree interactions, and API protocols.
- **Black-Box Maintenance**: Allows the application development team to refactor internal code, update dependencies, or alter component hierarchies without breaking tests, provided external functional behaviors and contract locators remain consistent.

---

## 3. Technology Selection: Playwright + TypeScript

### Why Playwright?

- **Native Multi-Browser Support**: Out-of-the-box support for Chromium, Firefox (Gecko), and WebKit (Safari).
- **Auto-Waiting Capability**: Automatically waits for elements to be actionable before performing actions, eliminating arbitrary sleeps.
- **Built-in Network Interception**: Powerful client-side network routing (`page.route()`) for deterministic mocking.
- **First-Class Tracing**: Captures DOM snapshots, action logs, and network traffic in interactive Playwright Traces.

### Why TypeScript?

- **Compile-Time Safety**: Strong typing for Page Objects, custom fixtures, environment variables, and test data structures.
- **Enhanced IDE Auto-Completion**: Accelerates spec authoring and prevents runtime typos.

---

## 4. Page Object Model (POM) Design

The framework applies the **Page Object Model** pattern to encapsulate web page structure and user interactions.

```text
src/
├── pages/
│   ├── BasePage.ts         # Common navigation, wait helpers, and generic assertions
│   ├── HomePage.ts         # Main homepage section wrappers and scroll actions
│   ├── BlogPage.ts         # Dedicated /blogs platform workflows
│   └── NotFoundPage.ts     # Custom 404 error page interactions
```

### POM Implementation Rules

- **No Raw Locators in Specs**: Test spec files (`.spec.ts`) must never contain raw locator strings or CSS queries. All locators belong inside Page or Component Objects.
- **Action-Oriented Methods**: Page objects expose high-level semantic actions (e.g., `homePage.searchGlobal('Playwright')` or `contactForm.submitMessage(...)`).
- **Chainable Fluent API**: Methods return relevant Page/Component objects to support readable method chaining.

---

## 5. Component Objects

To avoid code duplication across pages, modular UI elements are abstracted into reusable **Component Objects**:

```text
src/
├── components/
│   ├── Navbar.ts               # Header navigation, scroll triggers, mobile drawer toggle
│   ├── GlobalSearchModal.ts    # Keyboard trigger, input search, arrow navigation
│   ├── ProjectCard.ts          # Project card badges, GitHub links, case study modal trigger
│   ├── ProjectModal.ts         # Detail modal, architecture points, focus trap, close button
│   ├── ExperienceTimeline.ts   # Timeline items & expandable achievements drawer
│   ├── ResumeHub.ts            # Download action & PDF preview modal
│   └── ContactForm.ts          # Form inputs, reset action, inline validation errors
```

---

## 6. Custom Test Fixtures

Playwright test fixtures (`src/fixtures/testFixtures.ts`) extend the base `test` object to automatically instantiate and inject Page Objects, Component Objects, and Network Mocks into test contexts.

```typescript
// Example Fixture Pattern (Mental Model)
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactForm } from '../components/ContactForm';

type PortfolioFixtures = {
  homePage: HomePage;
  contactForm: ContactForm;
};

export const test = base.extend<PortfolioFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  contactForm: async ({ page }, use) => {
    const contactForm = new ContactForm(page);
    await use(contactForm);
  },
});
```

---

## 7. Test Data Management

Test data is strictly segregated from test logic to support environment independence:

- **Static Test Data (`src/data/staticData.ts`)**: Known section names, project titles, certification names, skill categories.
- **Dynamic / Input Data (`src/data/formData.ts`)**: Valid and invalid contact form payloads, boundary strings, email formatting variations.
- **Mock Response Data (`src/data/mockPayloads.ts`)**: Fixture payloads for Medium RSS feeds, EmailJS success responses, and error state fallbacks.

---

## 8. Environment Configuration

All environment-specific parameters are managed via environment variables and encapsulated in `src/config/env.config.ts`:

```typescript
// Configuration Interface
export const config = {
  baseURL: process.env.BASE_URL || 'https://ananth-portfolio-xi.vercel.app',
  mediumApiEndpoint: '/api/medium',
  defaultTimeout: 30000,
  isCI: !!process.env.CI,
};
```

---

## 9. Recommended Locator Strategy

To ensure test resilience against UI design updates, locators follow a strict hierarchy of preference:

```text
1. getByRole()            ──► Accessible ARIA roles (button, dialog, link, heading)
2. getByLabel()           ──► Form controls associated with text labels
3. getByPlaceholder()     ──► Inputs identified by placeholder text
4. getByTestId()          ──► Explicit custom test IDs (e.g., data-testid="contact-submit")
5. Stable Attributes      ──► Semantic HTML attributes (e.g., download="Ananth_A_Resume.pdf")
6. Text Content           ──► Exact user-visible text (e.g., getByText('View Case Study'))
7. CSS / XPath            ──► LAST RESORT ONLY (strictly forbidden for dynamic class names)
```

---

## 10. API Testing Strategy

Next.js proxy routes (such as `/api/medium`) are tested directly using Playwright's `APIRequestContext`:

```text
Playwright API Client  ───► HTTP GET /api/medium ───► Next.js RSS Proxy Route
                                                               │
                                                               ▼
                             Assert: Status 200, JSON Contract, Cache Headers
```

- **Contract Validation**: Validates JSON response structure against defined schemas (`status`, `count`, `featuredBlog`, `blogs`).
- **Header Auditing**: Verifies caching policies (`Cache-Control: public, s-maxage=21600...`).

---

## 11. Network Mocking Strategy

### Production Safety Guardrails

To prevent automated tests from sending actual emails or modifying live database sheets:

1. **Browser-Originated Requests**: Intercepted at the browser context using `page.route()`.
   - EmailJS SDK calls (`api.emailjs.com`) are caught and fulfilled with mock HTTP 200 success responses.
   - Google Apps Script webhooks are caught and fulfilled with mock HTTP 200 responses.
2. **Server-Originated Requests**: Handled via contract assertions or mocked API response fixtures when testing upstream failures.

---

## 12. Accessibility (a11y) Strategy

Accessibility testing uses **`@axe-core/playwright`** integrated into dedicated fixture runs (`src/fixtures/axeFixture.ts`):

- **Automated Scanning**: Executes axe engine audits against pages (`/`, `/blogs`, `/404`) to detect WCAG 2.1 AA violations.
- **Focus Management Verification**: Asserts focus trap behavior in modal dialogs (`GlobalSearchModal`, `ProjectModal`).
- **Keyboard Traversal**: Simulates `Tab`, `Shift+Tab`, `ArrowDown`, `ArrowUp`, and `Escape` key behaviors.

---

## 13. Visual Regression Testing Strategy

Visual testing leverages Playwright’s native `toHaveScreenshot()` snapshot comparison engine:

- **Visual Checkpoints**: Captured for key UI components (Hero Section, Projects Showcase, Search Modal, Mobile Menu Drawer).
- **Snapshot Parameters**:
  - `animations: 'disabled'` prevents motion artifacts.
  - Thresholds and pixel tolerances are configured per baseline image and validated in CI environments.
- **Baseline Management**: Visual baselines are updated intentionally via `npx playwright test --update-snapshots`.

---

## 14. Responsive Viewport Strategy

Responsive coverage evaluates 3 primary viewport tiers:

- **Desktop Viewport**: `1280 x 720` (Full navigation bar, keyboard shortcut indicators).
- **Tablet Viewport**: `768 x 1024` (2-column grid layouts).
- **Mobile Viewport**: `390 x 844` (Hamburger menu drawer toggle, single-column layouts).

---

## 15. Cross-Browser Engine Strategy

Test suites execute across 3 core browser engines:

- **Chromium**: Google Chrome / Microsoft Edge rendering compatibility.
- **Firefox**: Mozilla Gecko rendering compatibility.
- **WebKit**: Apple Safari rendering compatibility (macOS / iOS engine).

---

## 16. Reporting Strategy

The framework provides comprehensive test visibility:

- **Playwright HTML Report**: Generates an interactive local/CI HTML dashboard with embedded step breakdowns, console logs, and failure screenshots.
- **Allure Report (Optional)**: Provides historical trend analysis, category breakdowns, and executive metrics.

---

## 17. Flaky Test Prevention Rules

To ensure 100% test determinism and eliminate test flakiness:

1. **No Arbitrary Sleep Waits**: `page.waitForTimeout()` is strictly forbidden in production test specs.
2. **Auto-Waiting Assertions**: Use web-first assertions (`await expect(locator).toBeVisible()`).
3. **Explicit State Verification**: Wait for modal animations to complete before asserting element focus.
4. **Isolated Contexts**: Every test executes inside a fresh, isolated browser context.

---

## 18. CI/CD Architecture (GitHub Actions)

```text
                               ┌──────────────────────────────────┐
                               │       GitHub Push / PR           │
                               └────────────────┬─────────────────┘
                                                │
                                                ▼
                               ┌──────────────────────────────────┐
                               │   .github/workflows/ci.yml       │
                               └────────────────┬─────────────────┘
                                                │
         ┌──────────────────────────────────────┼──────────────────────────────────────┐
         ▼                                      ▼                                      ▼
┌───────────────────┐                  ┌───────────────────┐                  ┌───────────────────┐
│ Code Validation   │                  │  Smoke Suite      │                  │  Cross-Browser    │
│ - ESLint          │                  │ - Chromium        │                  │ - Chromium        │
│ - TypeCheck       │                  │ - Fast Feedback   │                  │ - Firefox         │
└───────────────────┘                  └───────────────────┘                  │ - WebKit          │
                                                                              └───────────────────┘
```

---

## 19. Test Artifact Strategy

In the event of a test failure, CI pipelines automatically collect and archive:

- **Playwright Trace (`trace.zip`)**: Time-travel debugging file viewable via `npx playwright show-trace`.
- **Screenshot on Failure**: Visual DOM snapshot captured at exact failure moment.
- **Video Recording**: Video playback of failed test session (`video: 'retain-on-failure'`).
