import type { Actor, Activity } from '../../actors/Actor';
import { Click } from '../../interactions/Click';
import { ItemsPage } from '../../ui/ItemsPage';

/**
 * Deletes a virtual item, located by name: click its row's delete button, confirm.
 */
export class DeleteItem implements Activity {
  private constructor(private readonly name: string) {}

  static named(name: string): DeleteItem {
    return new DeleteItem(name);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(ItemsPage.deleteButtonFor(this.name)),
      Click.on(ItemsPage.confirmDeleteButton),
    );
  }
}
