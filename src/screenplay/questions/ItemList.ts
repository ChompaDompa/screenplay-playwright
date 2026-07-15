import type { Actor } from '../actors/Actor';
import type { Question } from './Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { ItemsPage } from '../ui/ItemsPage';

/**
 * Reads the names of every virtual item currently displayed in the items table.
 * Domain-specific (knows about ItemsPage), unlike Text/Visibility.
 */
export class ItemList implements Question<string[]> {
  private constructor() {}

  static displayed(): ItemList {
    return new ItemList();
  }

  async answeredBy(actor: Actor): Promise<string[]> {
    const page = actor.withAbilityTo(BrowseTheWeb).currentPage();
    return page.locator(ItemsPage.itemNameCells).allTextContents();
  }
}
