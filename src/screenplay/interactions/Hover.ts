import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Pasa el mouse por encima del elemento que coincide con `selector`. Genérica y agnóstica
 * al dominio — algunos elementos de UI (p. ej. categorías de mega-menú) solo revelan su
 * contenido al pasar el mouse (hover) en vez de con un clic.
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
