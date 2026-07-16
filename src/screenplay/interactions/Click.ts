import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Hace clic en el elemento que coincide con `selector`. Genérica y agnóstica al dominio —
 * el selector lo entrega quien la invoca (típicamente una constante de locator de ui/*.ts).
 *
 * Este clic no espera ningún efecto posterior (navegación, contenido async, etc.) — si lo
 * dispara, la Task que compone este Click debe encadenar la espera adecuada a continuación:
 * WaitForUrl (la URL cambia, p. ej. tras un login/redirect), WaitForVisible (aparece un
 * elemento nuevo tras una carga async) o, como último recurso, WaitForLoad.
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
