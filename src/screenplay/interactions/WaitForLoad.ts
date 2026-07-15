import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Waits for the current page to finish loading. Generic and domain-agnostic —
 * used after an interaction that triggers a real navigation (e.g. clicking a link),
 * since Click/Hover don't wait for the resulting page to be ready on their own.
 */
export class WaitForLoad implements Activity {
  private constructor() {}

  static toFinish(): WaitForLoad {
    return new WaitForLoad();
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.withAbilityTo(BrowseTheWeb).currentPage();
    await page.waitForLoadState('domcontentloaded');
  }
}
