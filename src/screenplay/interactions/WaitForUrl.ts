import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Espera a que la URL de la página cumpla `predicate`. Genérica y agnóstica al dominio —
 * útil después de interacciones que disparan un login/redirect asíncrono (vía JS, no un
 * submit de formulario tradicional), donde WaitForLoad puede resolver antes de tiempo
 * porque la navegación real todavía no ha comenzado en ese instante.
 */
export class WaitForUrl implements Activity {
  private constructor(private readonly predicate: (url: URL) => boolean) {}

  static toMatch(predicate: (url: URL) => boolean): WaitForUrl {
    return new WaitForUrl(predicate);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.withAbilityTo(BrowseTheWeb).currentPage();
    await page.waitForURL(this.predicate, { waitUntil: 'domcontentloaded' });
  }
}
