import type { Actor, Activity } from '../../actors/Actor';
import { Click } from '../../interactions/Click';
import { Fill } from '../../interactions/Fill';
import { WaitForVisible } from '../../interactions/WaitForVisible';
import { CursosLigerosPage } from '../../ui/CursosLigerosPage';
import { TextResourceForm } from '../../ui/TextResourceForm';

/**
 * Crea un recurso virtual de tipo "Texto" dentro de un curso ya abierto: abre
 * "Agregar recursos", elige "Texto", llena título/descripción, desactiva la
 * restricción de fecha (activada por defecto) y acepta.
 *
 * El editor de descripción es CKEditor 5: su `<textarea>` real queda oculto, así
 * que se llena el div editable visible (`.ck-editor__editable[contenteditable]`),
 * no el textarea — Playwright's `.fill()` soporta elementos contenteditable.
 */
export class CreateTextResource implements Activity {
  private constructor(
    private readonly title: string,
    private readonly description: string,
  ) {}

  static withTitleAndDescription(title: string, description: string): CreateTextResource {
    return new CreateTextResource(title, description);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(CursosLigerosPage.addResourcesButton),
      Click.on(CursosLigerosPage.textResourceOption),
      WaitForVisible.of(TextResourceForm.titleInput),
      Fill.in(TextResourceForm.titleInput, this.title),
      Fill.in(TextResourceForm.descriptionEditor, this.description),
      Click.on(TextResourceForm.dateRestrictionSwitchLabel),
      Click.on(TextResourceForm.acceptButton),
      WaitForVisible.of(TextResourceForm.createdResourceHeadingFor(this.title)),
    );
  }
}
