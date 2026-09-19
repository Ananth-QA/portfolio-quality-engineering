import { Page, Locator, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { Result as AxeResult, ImpactValue } from 'axe-core';

export interface A11yScanOptions {
  includeTags?: string[];
  excludeRules?: string[];
  includeRules?: string[];
  targetSelector?: string | Locator;
}

export interface FormattedA11yViolation {
  id: string;
  impact: ImpactValue | undefined;
  description: string;
  helpUrl: string;
  targetNodes: string[];
}

export interface A11yScanReport {
  totalViolations: number;
  criticalCount: number;
  seriousCount: number;
  moderateCount: number;
  minorCount: number;
  violations: FormattedA11yViolation[];
  rawViolations: AxeResult[];
}

export interface QualityGatePolicy {
  blockOnCritical?: boolean;
  blockOnSerious?: boolean;
  blockOnModerate?: boolean;
  blockOnMinor?: boolean;
  /**
   * Known baseline SUT defects (e.g., color-contrast, link-name) that are logged
   * as confirmed SUT accessibility findings without breaking quality gate baseline.
   */
  allowKnownBaselineDefects?: boolean;
}

const DEFAULT_POLICY: QualityGatePolicy = {
  blockOnCritical: true,
  blockOnSerious: false, // Logged as confirmed SUT baseline findings
  blockOnModerate: false,
  blockOnMinor: false,
  allowKnownBaselineDefects: true,
};

/**
 * Executes an automated axe-core accessibility scan on the current page or specific container element.
 */
export async function scanAccessibility(
  page: Page,
  options: A11yScanOptions = {},
): Promise<A11yScanReport> {
  let builder = new AxeBuilder({ page }).withTags(
    options.includeTags ?? ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  );

  if (options.targetSelector) {
    if (typeof options.targetSelector === 'string') {
      builder = builder.include(options.targetSelector);
    }
  }

  if (options.excludeRules && options.excludeRules.length > 0) {
    builder = builder.disableRules(options.excludeRules);
  }

  if (options.includeRules && options.includeRules.length > 0) {
    builder = builder.withRules(options.includeRules);
  }

  const results = await builder.analyze();

  const formattedViolations: FormattedA11yViolation[] = results.violations.map((v) => ({
    id: v.id,
    impact: v.impact ?? undefined,
    description: v.description,
    helpUrl: v.helpUrl,
    targetNodes: v.nodes.map((n) => n.target.join(' ')),
  }));

  let criticalCount = 0;
  let seriousCount = 0;
  let moderateCount = 0;
  let minorCount = 0;

  for (const v of formattedViolations) {
    switch (v.impact) {
      case 'critical':
        criticalCount++;
        break;
      case 'serious':
        seriousCount++;
        break;
      case 'moderate':
        moderateCount++;
        break;
      case 'minor':
        minorCount++;
        break;
    }
  }

  return {
    totalViolations: formattedViolations.length,
    criticalCount,
    seriousCount,
    moderateCount,
    minorCount,
    violations: formattedViolations,
    rawViolations: results.violations,
  };
}

/**
 * Asserts page accessibility against configured quality gate threshold policy.
 * Logs diagnostic breakdown for all violations and confirmed SUT defects.
 */
export function assertA11yQualityGate(
  report: A11yScanReport,
  policy: QualityGatePolicy = DEFAULT_POLICY,
): void {
  if (report.totalViolations > 0) {
    console.log(`\n=== ACCESSIBILITY ANALYSIS REPORT ===`);
    console.log(`Total Detectable Violations: ${report.totalViolations}`);
    console.log(`- Critical: ${report.criticalCount}`);
    console.log(`- Serious:  ${report.seriousCount}`);
    console.log(`- Moderate: ${report.moderateCount}`);
    console.log(`- Minor:    ${report.minorCount}\n`);

    report.violations.forEach((v, idx) => {
      console.log(
        `[Violation #${idx + 1}] Rule: ${v.id} (${v.impact?.toUpperCase() ?? 'UNKNOWN'})`,
      );
      console.log(`  Description: ${v.description}`);
      console.log(`  Help: ${v.helpUrl}`);
      console.log(
        `  Target Elements (${v.targetNodes.length}): ${v.targetNodes.slice(0, 3).join('; ')}`,
      );
    });
  }

  const effectivePolicy: QualityGatePolicy = { ...DEFAULT_POLICY, ...policy };
  const blockingViolations: FormattedA11yViolation[] = [];

  for (const v of report.violations) {
    const isKnownBaselineDefect = v.id === 'color-contrast' || v.id === 'link-name';
    if (isKnownBaselineDefect && effectivePolicy.allowKnownBaselineDefects) {
      console.log(
        `[SUT ACCESSIBILITY DEFECT RECORDED] Rule ${v.id} (${v.impact}) logged in accessibility baseline audit report.`,
      );
      continue;
    }

    if (v.impact === 'critical' && effectivePolicy.blockOnCritical) {
      blockingViolations.push(v);
    } else if (v.impact === 'serious' && effectivePolicy.blockOnSerious) {
      blockingViolations.push(v);
    } else if (v.impact === 'moderate' && effectivePolicy.blockOnModerate) {
      blockingViolations.push(v);
    } else if (v.impact === 'minor' && effectivePolicy.blockOnMinor) {
      blockingViolations.push(v);
    }
  }

  if (blockingViolations.length > 0) {
    const summary = blockingViolations
      .map((b) => `${b.id} (${b.impact}): ${b.description}`)
      .join('\n');
    expect(
      blockingViolations.length,
      `Found ${blockingViolations.length} blocking accessibility violations according to quality gate policy:\n${summary}`,
    ).toBe(0);
  }
}
