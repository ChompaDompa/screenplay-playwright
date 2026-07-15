import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Fills the element matched by `selector` with `value`. Generic and domain-agnostic.
 */
export class Fill implements Activity {
  private constructor(
    private readonly selector: string,
    private readonly value: string,
  ) {}

  static in(selector: string, value: string): Fill {
    return new Fill(selector, value);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.withAbilityTo(BrowseTheWeb).currentPage();
    await page.locator(this.selector).fill(this.value);
  }
}
