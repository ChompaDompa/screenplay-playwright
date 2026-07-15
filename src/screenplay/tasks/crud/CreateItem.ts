import type { Actor, Activity } from '../../actors/Actor';
import { Click } from '../../interactions/Click';
import { Fill } from '../../interactions/Fill';
import { ItemsPage } from '../../ui/ItemsPage';

/**
 * Creates a virtual item: open the form, fill name/description, save.
 */
export class CreateItem implements Activity {
  private constructor(
    private readonly name: string,
    private readonly description: string,
  ) {}

  static withNameAndDescription(name: string, description: string): CreateItem {
    return new CreateItem(name, description);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(ItemsPage.createButton),
      Fill.in(ItemsPage.nameInput, this.name),
      Fill.in(ItemsPage.descriptionInput, this.description),
      Click.on(ItemsPage.saveButton),
    );
  }
}
