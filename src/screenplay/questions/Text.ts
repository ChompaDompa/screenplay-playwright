import type { Actor } from '../actors/Actor';
import type { Question } from './Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Reads the visible text of the element matched by `selector`. Generic and
 * domain-agnostic, like the Interactions — the domain lives in the caller (a Task test).
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
