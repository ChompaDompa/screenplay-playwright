import type { Actor } from '../actors/Actor';
import type { Question } from './Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Lee el texto visible del elemento que coincide con `selector`. Genérica y
 * agnóstica al dominio, igual que las Interactions — el dominio vive en quien la invoca (una Task o un test).
 */
export class Text implements Question<string> {
  private constructor(private readonly selector: string) {}

  static of(selector: string): Text {
    return new Text(selector);
  }

  async answeredBy(actor: Actor): Promise<string> {
    const page = actor.withAbilityTo(BrowseTheWeb).currentPage();
    return page.locator(this.selector).innerText();
  }
}
