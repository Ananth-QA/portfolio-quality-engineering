import { Page, Locator } from '@playwright/test';

/**
 * Component Object representing Projects Showcase Section controls.
 */
export class ProjectCard {
  readonly searchInput: Locator;
  readonly sortSelect: Locator;
  readonly noResultsMessage: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByTestId('project-search-input');
    this.sortSelect = page.getByTestId('project-sort-select');
    this.noResultsMessage = page.getByTestId('project-no-results');
  }

  /**
   * Enters keyword into project search input.
   */
  async searchProjects(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  /**
   * Clicks target category pill filter.
   */
  async filterByCategory(categoryName: string): Promise<void> {
    const formattedId = categoryName.toLowerCase().replace(/\s+/g, '-');
    const categoryPill = this.page.getByTestId(`project-category-${formattedId}`);

    if (await categoryPill.isVisible()) {
      await categoryPill.click();
    } else {
      await this.page.getByRole('button', { name: categoryName, exact: true }).click();
    }
  }

  /**
   * Selects sorting option from dropdown.
   */
  async selectSortOption(optionValue: 'newest' | 'title-asc'): Promise<void> {
    await this.sortSelect.selectOption(optionValue);
  }

  /**
   * Opens Case Study detail modal for project ID.
   */
  async openProjectCaseStudy(projectId: string): Promise<void> {
    const detailsButton = this.page.getByTestId(`project-details-button-${projectId}`);
    await detailsButton.click();
  }
}
