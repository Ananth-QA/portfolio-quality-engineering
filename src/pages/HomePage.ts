import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Navbar } from '../components/Navbar';
import { GlobalSearchModal } from '../components/GlobalSearchModal';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { ResumeHub } from '../components/ResumeHub';
import { ContactForm } from '../components/ContactForm';

/**
 * Page Object representing Homepage (`/`).
 */
export class HomePage extends BasePage {
  readonly navbar: Navbar;
  readonly searchModal: GlobalSearchModal;
  readonly projectCard: ProjectCard;
  readonly projectModal: ProjectModal;
  readonly experienceTimeline: ExperienceTimeline;
  readonly resumeHub: ResumeHub;
  readonly contactForm: ContactForm;
  readonly heroResumeDownloadLink: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(page);
    this.searchModal = new GlobalSearchModal(page);
    this.projectCard = new ProjectCard(page);
    this.projectModal = new ProjectModal(page);
    this.experienceTimeline = new ExperienceTimeline(page);
    this.resumeHub = new ResumeHub(page);
    this.contactForm = new ContactForm(page);
    this.heroResumeDownloadLink = page.locator('a[download="Ananth_A_Resume.pdf"]').first();
  }

  /**
   * Navigates to `/` and waits for load.
   */
  async open(): Promise<void> {
    await this.navigateTo('/');
    await this.waitForLoad();
  }
}
