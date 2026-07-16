import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Espera a que el elemento que coincide con `selector` esté visible. Genérica y
 * agnóstica al dominio — útil cuando el contenido se carga de forma asíncrona (AJAX/SPA)
 * después de que la página ya reportó "cargada" (domcontentloaded/load no alcanzan).
 */
export class WaitForVisible implements Activity {
  private constructor(private readonly selector: string) {}

  static of(selector: string): WaitForVisible {
    return new WaitForVisible(selector);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.withAbilityTo(BrowseTheWeb).currentPage();
    await page.locator(this.selector).waitFor({ state: 'visible' });
  }
}
