# Master Test Traceability Matrix

> **Project**: Portfolio Quality Engineering  
> **System Under Test**: Ananth Portfolio (`https://ananth-portfolio-xi.vercel.app/`)  
> **Document Version**: 1.0.0

---

## 1. Overview

This document serves as the **Master Test Traceability Matrix** for the portfolio quality engineering project. It maps user-facing functional requirements (`PF-*`) to specific test scenario IDs (`TC-*`), classifying each scenario by test level, execution priority, production safety automation decision, and target CI suite.

---

## 2. Requirement Traceability Matrix

| Requirement ID  | Test ID         | Module         | Feature                   | Scenario Description                                                          | Test Type            | Priority | Automation Decision   | Target CI Suite |
| --------------- | --------------- | -------------- | ------------------------- | ----------------------------------------------------------------------------- | -------------------- | -------- | --------------------- | --------------- |
| **PF-NAV-001**  | **TC-NAV-001**  | Navigation     | Desktop Section Scroll    | Click `#projects` nav link; smooth scrolls to Projects section                | UI / E2E             | P0       | Production-Safe       | Smoke / PR      |
| **PF-NAV-002**  | **TC-NAV-002**  | Navigation     | Mobile Drawer Toggle      | Click Hamburger button on mobile viewport; opens navigation drawer            | Responsive UI        | P1       | Production-Safe       | Regression      |
| **PF-SCH-001**  | **TC-SCH-001**  | Global Search  | Keyboard Trigger          | Press `Ctrl+K`; opens global search modal dialog with input focused           | Functional / a11y    | P0       | Production-Safe       | Smoke / PR      |
| **PF-SCH-002**  | **TC-SCH-002**  | Global Search  | Multi-Entity Search       | Type query "Playwright"; displays matching projects and skills                | Functional           | P0       | Production-Safe       | Smoke / PR      |
| **PF-SCH-003**  | **TC-SCH-003**  | Global Search  | Keyboard Arrow Nav        | Navigate search hits using `ArrowDown` + `Enter`; jumps to section            | Functional / a11y    | P1       | Production-Safe       | Regression      |
| **PF-HERO-001** | **TC-HERO-001** | Hero           | Dynamic Title Loop        | Observe Hero section; title continuously types out and cycles job titles      | UI / Animation       | P2       | Production-Safe       | Regression      |
| **PF-HERO-002** | **TC-HERO-002** | Hero           | Resume PDF Link           | Click "Download Resume" button in Hero; triggers PDF asset download           | Download / E2E       | P0       | Production-Safe       | Smoke / PR      |
| **PF-EXP-001**  | **TC-EXP-001**  | Experience     | Achievements Drawer       | Click "Show Achievements"; expands drawer revealing SDET bullet points        | UI / Component       | P1       | Production-Safe       | Regression      |
| **PF-PRJ-001**  | **TC-PRJ-001**  | Projects       | Keyword Filter            | Type "Alatron" in search box; filters grid to show Alatron card               | Functional           | P0       | Production-Safe       | Smoke / PR      |
| **PF-PRJ-002**  | **TC-PRJ-002**  | Projects       | Category Pill Filter      | Click "Web Automation" pill; filters grid by category                         | Functional           | P1       | Production-Safe       | Regression      |
| **PF-PRJ-003**  | **TC-PRJ-003**  | Projects       | Project Sorting           | Select "Title (A-Z)" from dropdown; sorts projects alphabetically             | Functional           | P2       | Production-Safe       | Extended        |
| **PF-PRJ-004**  | **TC-PRJ-004**  | Projects       | Case Study Modal          | Click "View Case Study"; opens detail modal and traps keyboard focus          | Functional / a11y    | P0       | Production-Safe       | Smoke / PR      |
| **PF-PRJ-005**  | **TC-PRJ-005**  | Projects       | Empty Search State        | Type "NonExistentTerm"; displays empty card with "Clear Search" button        | Functional           | P2       | Production-Safe       | Extended        |
| **PF-BLG-001**  | **TC-BLG-001**  | Blog Platform  | RSS Article Grid          | Open `/blogs`; renders featured article card and paginated article grid       | E2E / Integration    | P0       | Mocked for Production | Regression      |
| **PF-BLG-002**  | **TC-BLG-002**  | Blog Platform  | Article Pagination        | Click Page "2" button; updates grid with page 2 articles & scrolls top        | Functional           | P1       | Mocked for Production | Regression      |
| **PF-BLG-003**  | **TC-BLG-003**  | Blog Platform  | Article Search            | Type query in blog search box; filters blog cards dynamically                 | Functional           | P1       | Mocked for Production | Regression      |
| **PF-RES-001**  | **TC-RES-001**  | Resume Hub     | PDF Download Button       | Click "Download Resume" button; triggers `Ananth_A_Resume.pdf` file download  | Download / E2E       | P0       | Production-Safe       | Smoke / PR      |
| **PF-RES-002**  | **TC-RES-002**  | Resume Hub     | PDF Preview Modal         | Click "Preview PDF"; opens fullscreen modal containing PDF iframe             | UI / Modal           | P1       | Production-Safe       | Regression      |
| **PF-CERT-001** | **TC-CERT-001** | Certifications | Credential Download       | Click direct credential link; initiates binary download of certificate PDF    | Download / E2E       | P1       | Production-Safe       | Regression      |
| **PF-CNT-001**  | **TC-CNT-001**  | Contact Form   | Blank Required Validation | Click "Send Message" with empty fields; displays inline red validation errors | Negative / Form      | P0       | Production-Safe       | Smoke / PR      |
| **PF-CNT-002**  | **TC-CNT-002**  | Contact Form   | Email Format Validation   | Type "user@invalid" in email field; displays email format syntax error        | Negative / Form      | P1       | Production-Safe       | Regression      |
| **PF-CNT-003**  | **TC-CNT-003**  | Contact Form   | Honeypot Spam Check       | Fill hidden `botcheck` input; submission rejected / triggers bot error        | Security / Form      | P2       | Production-Safe       | Extended        |
| **PF-CNT-004**  | **TC-CNT-004**  | Contact Form   | Successful Dispatch       | Enter valid details + Submit; intercepts network call & shows success toast   | Integration / Mocked | P0       | Mocked for Production | Smoke / PR      |
| **PF-CNT-005**  | **TC-CNT-005**  | Contact Form   | Form Reset Action         | Click "Reset Form"; clears all text inputs, resets errors, focuses Name       | Functional           | P2       | Production-Safe       | Extended        |
| **PF-ERR-001**  | **TC-ERR-001**  | Error Handling | Custom 404 Page           | Navigate to `/non-existent-route`; renders custom 404 recovery UI             | UI / Routing         | P1       | Production-Safe       | Regression      |
| **PF-API-001**  | **TC-API-001**  | API Proxy      | Medium Proxy API          | GET `/api/medium`; validates HTTP 200 status, JSON schema, & cache headers    | API Testing          | P0       | Production-Safe       | Smoke / PR      |
| **PF-A11Y-001** | **TC-A11Y-001** | Accessibility  | Automated WCAG Audit      | Run `@axe-core/playwright` audit across routes; identify violations           | Accessibility        | P1       | Production-Safe       | Regression      |
| **PF-VIS-001**  | **TC-VIS-001**  | Visual Testing | Layout Snapshots          | Compare component visual states against baselines using `toHaveScreenshot()`  | Visual Regression    | P2       | Production-Safe       | Extended        |

---

## 3. Matrix Maintenance Rules

1. **New Feature Additions**: Every newly identified application requirement must be assigned a unique `PF-*` ID and mapped to a `TC-*` test scenario before automation spec authoring.
2. **Deprecation**: If a feature is removed from the application, update the corresponding matrix entry status to `DEPRECATED`.
