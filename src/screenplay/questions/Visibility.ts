import type { Actor } from '../actors/Actor';
import type { Question } from './Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Reads whether the element matched by `selector` is currently visible. Generic
 * and domain-agnostic, like the Interactions.
 */
export class Visibility implements Question<boolean> {
  private constructor(private readonly selector: string) {}

  static of(selector: string): Visibility {
    return new Visibility(selector);
  }

  async answeredBy(actor: Actor): Promise<boolean> {
    const page = actor.withAbilityTo(BrowseTheWeb).currentPage();
    return page.locator(this.selector).isVisible();
  }
}
