import type { Actor } from '../actors/Actor';
import type { Question } from './Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Lee si el elemento que coincide con `selector` está actualmente visible. Genérica
 * y agnóstica al dominio, igual que las Interactions.
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
