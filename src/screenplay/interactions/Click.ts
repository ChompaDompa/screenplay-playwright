import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Clicks the element matched by `selector`. Generic and domain-agnostic —
 * the selector is supplied by whoever calls it (typically a ui/*.ts locator constant).
 */
export class Click implements Activity {
  private constructor(private readonly selector: string) {}

  static on(selector: string): Click {
    return new Click(selector);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.withAbilityTo(BrowseTheWeb).currentPage();
    await page.locator(this.selector).click();
  }
}
