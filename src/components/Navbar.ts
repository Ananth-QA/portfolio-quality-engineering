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
    this.navHeader = page.locator('nav').first();
    this.searchTriggerDesktop = page.getByTestId('global-search-trigger');
    this.searchTriggerMobile = page.getByTestId('global-search-trigger-mobile');
    this.mobileMenuButton = page.locator('header button').first();
    this.mobileNavDrawer = page.locator('header nav').first();
  }

  /**
   * Clicks a section navigation link by section anchor name.
   */
  async clickSectionLink(
    sectionName:
      'home' | 'about' | 'skills' | 'experience' | 'projects' | 'certifications' | 'contact',
  ): Promise<void> {
    const link = this.page.locator(`a[href="#${sectionName}"]`).first();
    await link.click();
  }

  /**
   * Clicks global search trigger button.
   */
  async openSearchModal(): Promise<void> {
    if (await this.searchTriggerDesktop.isVisible()) {
      await this.searchTriggerDesktop.click();
    } else {
      await this.searchTriggerMobile.click();
    }
  }

  /**
   * Toggles mobile navigation drawer.
   */
  async toggleMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
  }

  /**
   * Asserts header navigation visibility.
   */
  async assertHeaderVisible(): Promise<void> {
    await expect(this.navHeader).toBeVisible();
  }
}
