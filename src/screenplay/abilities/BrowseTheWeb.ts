import type { Page } from '@playwright/test';
import { Ability } from './Ability';

/**
 * Wraps Playwright's Page object. This is the ONLY place in the framework that holds
 * a direct reference to Playwright's Page — Interactions pull it from here via
 * `actor.withAbilityTo(BrowseTheWeb).currentPage()`, so Tasks/Questions never touch
 * Playwright directly.
 */
export class BrowseTheWeb extends Ability {
  private constructor(private readonly page: Page) {
    super();
  }

  static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  currentPage(): Page {
    return this.page;
  }
}
