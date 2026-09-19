import { Page, Locator, expect } from '@playwright/test';

/**
 * Component Object representing Sticky Header Navigation.
 */
export class Navbar {
  readonly navHeader: Locator;
  readonly searchTriggerDesktop: Locator;
  readonly searchTriggerMobile: Locator;
  readonly mobileMenuButton: Locator;
  readonly mobileNavDrawer: Locator;

  constructor(private readonly page: Page) {
    this.navHeader = page.locator('header nav, nav').first();
    this.searchTriggerDesktop = page.getByTestId('global-search-trigger');
    this.searchTriggerMobile = page.getByTestId('global-search-trigger-mobile');
    this.mobileMenuButton = page
      .getByRole('button', { name: /menu|toggle/i })
      .or(page.locator('header button').filter({ hasNotText: /search/i }).first());
    this.mobileNavDrawer = page.locator('header nav, nav').last();
  }

  /**
   * Clicks a section navigation link by section anchor name.
   * Viewport-aware: models real user interaction for desktop header and mobile drawer.
   */
  async clickSectionLink(
    sectionName:
      | 'home'
      | 'about'
      | 'skills'
      | 'experience'
      | 'projects'
      | 'certifications'
      | 'contact',
  ): Promise<void> {
    const viewport = this.page.viewportSize();
    const isMobile = !!viewport && viewport.width < 768;

    if (isMobile) {
      if (!(await this.mobileNavDrawer.isVisible())) {
        await expect(this.mobileMenuButton).toBeVisible();
        await this.mobileMenuButton.click();
        await expect(this.mobileNavDrawer).toBeVisible();
      }
      const mobileLink = this.mobileNavDrawer.locator(`a[href="#${sectionName}"]`).first();
      await expect(mobileLink).toBeVisible();
      await mobileLink.click();
    } else {
      const desktopLink = this.navHeader.locator(`a[href="#${sectionName}"]`).first();
      await expect(desktopLink).toBeVisible();
      await desktopLink.click();
    }
  }

  /**
   * Clicks global search trigger button using real Playwright locator click.
   * Uses viewport-appropriate search trigger testid.
   */
  async openSearchModal(): Promise<void> {
    const searchTrigger = (await this.searchTriggerDesktop.isVisible())
      ? this.searchTriggerDesktop
      : this.searchTriggerMobile;
    await expect(searchTrigger).toBeVisible();
    await searchTrigger.click();
  }

  /**
   * Toggles mobile navigation drawer.
   */
  async toggleMobileMenu(): Promise<void> {
    await expect(this.mobileMenuButton).toBeVisible();
    await this.mobileMenuButton.click();
  }

  /**
   * Asserts header navigation visibility.
   */
  async assertHeaderVisible(): Promise<void> {
    await expect(this.navHeader).toBeVisible();
  }
}

