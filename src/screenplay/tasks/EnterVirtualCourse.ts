import type { Actor, Activity } from '../actors/Actor';
import { Click } from '../interactions/Click';
import { WaitForVisible } from '../interactions/WaitForVisible';
import { CursosLigerosPage } from '../ui/CursosLigerosPage';

/**
 * Entra a un curso virtual desde el listado de "Cursos ligeros". Por ahora entra
 * siempre al primero de la lista — para el flujo de crear un recurso dentro de un
 * curso, cualquier curso sirve.
 *
 * El contenido del curso se carga de forma asíncrona después de la navegación, por
 * lo que se espera explícitamente a que aparezca (WaitForLoad no alcanza aquí).
 */
export class EnterVirtualCourse implements Activity {
  private constructor() {}

  static first(): EnterVirtualCourse {
    return new EnterVirtualCourse();
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(CursosLigerosPage.firstCourseEntryLink),
      WaitForVisible.of(CursosLigerosPage.courseContentHeading),
    );
  }
}
