import type { Actor, Activity } from '../../actors/Actor';
import { Click } from '../../interactions/Click';
import { Fill } from '../../interactions/Fill';
import { ItemsPage } from '../../ui/ItemsPage';

interface EditItemBuilder {
  to(newName: string, newDescription: string): EditItem;
}

/**
 * Edits an existing virtual item, located by its current name: open its row's edit
 * button, replace name/description, save. Usage: EditItem.named('X').to('Y', 'desc').
 */
export class EditItem implements Activity {
  private constructor(
    private readonly currentName: string,
    private readonly newName: string,
    private readonly newDescription: string,
  ) {}

  static named(currentName: string): EditItemBuilder {
    return {
      to: (newName: string, newDescription: string) =>
        new EditItem(currentName, newName, newDescription),
    };
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(ItemsPage.editButtonFor(this.currentName)),
      Fill.in(ItemsPage.nameInput, this.newName),
      Fill.in(ItemsPage.descriptionInput, this.newDescription),
      Click.on(ItemsPage.saveButton),
    );
  }
}
