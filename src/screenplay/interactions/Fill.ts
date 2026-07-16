import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Rellena el elemento que coincide con `selector` con `value`. Genérica y agnóstica al dominio.
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
