import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Hovers over the element matched by `selector`. Generic and domain-agnostic —
 * some UI elements (e.g. mega-menu categories) only reveal their content on hover
 * instead of click.
 */
export class Hover implements Activity {
  private constructor(private readonly selector: string) {}

  static over(selector: string): Hover {
    return new Hover(selector);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.withAbilityTo(BrowseTheWeb).currentPage();
    await page.locator(this.selector).hover();
  }
}
