import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Espera a que la página actual termine de cargar. Genérica y agnóstica al dominio —
 * se usa después de una interacción que dispara una navegación real (p. ej. hacer clic
 * en un link), ya que Click/Hover no esperan por su cuenta a que la página resultante esté lista.
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
