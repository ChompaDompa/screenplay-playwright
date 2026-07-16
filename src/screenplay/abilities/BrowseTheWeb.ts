import type { Page } from '@playwright/test';
import { Ability } from './Ability';

/**
 * Envuelve el objeto Page de Playwright. Este es el ÚNICO lugar del framework que mantiene
 * una referencia directa al Page de Playwright — las Interactions la obtienen desde aquí vía
 * `actor.withAbilityTo(BrowseTheWeb).currentPage()`, de modo que Tasks/Questions nunca tocan
 * Playwright directamente.
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
