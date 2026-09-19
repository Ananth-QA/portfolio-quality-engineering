# Known Automation & Browser Compatibility Issues Log

> **Repository**: `portfolio-quality-engineering`  
> **System Under Test**: Ananth Portfolio (`https://ananth-portfolio-xi.vercel.app`)  
> **Status Overview**: Active in CI — Failure Propagation Enabled (Unsuppressed)  

---

## Important Quality Gate Statement

> **CRITICAL CI POLICY**:  
> The test scenarios documented below are **NOT skipped**, **NOT disabled**, and **NOT suppressed**.  
> They remain fully active in the Playwright smoke suite and continue to run on every GitHub Actions CI execution (`.github/workflows/smoke.yml`).  
> CI workflow failures produced by these tests are **truthfully reported** to maintain quality gate integrity.  
> Remediation is explicitly deferred to a dedicated automation stabilization phase.

---

## Unresolved Automation Issues

### 1. TC-PRJ-001: Mobile Navigation to Projects Section

- **Test ID**: `TC-PRJ-001`
- **Affected Browsers**: `Mobile Chrome`, `Mobile Safari`
- **Observed Failure**: `expect(locator).toBeVisible() failed` during `clickSectionLink('projects')`.
- **Investigation Result**: The mobile hamburger button inside `<header>` lacks an accessible name or explicit `data-testid`, causing locator selection logic to collide with the mobile search trigger button or select the hidden desktop navigation drawer.
- **Ownership / Classification**: **QA Framework / POM Defect (`Navbar.ts`)**
- **Current Status**: `DEFERRED REMEDIATION`
- **Future Remediation Reference**: Phase 10.4 / Dedicated Mobile Navigation POM Remediation

---

### 2. TC-CNT-001: Mobile Navigation to Contact Form Section

- **Test ID**: `TC-CNT-001`
- **Affected Browsers**: `Mobile Chrome`, `Mobile Safari`
- **Observed Failure**: `expect(locator).toBeVisible() failed` during `clickSectionLink('contact')`.
- **Investigation Result**: Mobile navigation fails to reach the Contact section (`#contact`) because `clickSectionLink` fails during the hamburger toggle / drawer opening step inside `Navbar.ts`.
- **Ownership / Classification**: **QA Framework / POM Defect (`Navbar.ts`)**
- **Current Status**: `DEFERRED REMEDIATION`
- **Future Remediation Reference**: Phase 10.4 / Dedicated Mobile Navigation POM Remediation

---

### 3. TC-SCH-001: Desktop Safari Global Search Modal Trigger

- **Test ID**: `TC-SCH-001`
- **Affected Browsers**: `Desktop Safari` (WebKit)
- **Observed Failure**: `TimeoutError: locator.click: Timeout 10000ms exceeded` — `waiting for element to be visible, enabled and stable` (`element is not stable`).
- **Investigation Result**: The desktop search trigger button (`data-testid="global-search-trigger"`) is located correctly, but WebKit's layout engine defers element coordinate stability during initial render due to sticky header CSS transitions (`transition-all duration-300 backdrop-blur-md`).
- **Ownership / Classification**: **Mixed (SUT Sticky Header CSS Transition + WebKit Rendering Engine)**
- **Current Status**: `DEFERRED REMEDIATION`
- **Future Remediation Reference**: Phase 10.4 / Dedicated WebKit Actionability Remediation

---

## Summary Matrix

| Test ID | Scenario Description | Affected Browsers | Failure Type | Current Status | CI Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TC-PRJ-001` | Projects Section Navigation | Mobile Chrome, Mobile Safari | POM Locator Resolution | `DEFERRED REMEDIATION` | Active / Fails CI |
| `TC-CNT-001` | Contact Form Navigation | Mobile Chrome, Mobile Safari | POM Locator Resolution | `DEFERRED REMEDIATION` | Active / Fails CI |
| `TC-SCH-001` | Global Search Trigger Click | Desktop Safari | WebKit Layout Instability | `DEFERRED REMEDIATION` | Active / Fails CI |
