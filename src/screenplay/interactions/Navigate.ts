import type { Actor, Activity } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Navega el navegador hacia `url`. Genérica y agnóstica al dominio.
 */
export class Navigate implements Activity {
  private constructor(private readonly url: string) {}

  static to(url: string): Navigate {
    return new Navigate(url);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.withAbilityTo(BrowseTheWeb).currentPage();
    await page.goto(this.url);
  }
}
