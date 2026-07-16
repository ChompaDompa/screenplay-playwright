import type { Actor, Activity } from '../actors/Actor';
import { Click } from '../interactions/Click';
import { Hover } from '../interactions/Hover';
import { WaitForVisible } from '../interactions/WaitForVisible';
import { MainMenu } from '../ui/MainMenu';
import { CursosLigerosPage } from '../ui/CursosLigerosPage';

/**
 * Navega desde cualquier lugar dentro de Q10 hasta el listado de "Cursos ligeros":
 * Académico → Educación virtual → Cursos ligeros. Este es el punto de entrada
 * para llegar a un curso virtual específico antes de crear recursos dentro de él.
 * "Educación virtual" es una categoría de mega-menú que se expande con hover, no con clic.
 *
 * El clic final dispara una navegación real; WaitForLoad podría resolver antes de que
 * el listado termine de cargar, así que se espera a un elemento propio de esa pantalla.
 */
export class GoToCursosLigeros implements Activity {
  private constructor() {}

  static navigate(): GoToCursosLigeros {
    return new GoToCursosLigeros();
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(MainMenu.academicMenuToggle),
      Hover.over(MainMenu.educacionVirtualCategory),
      Click.on(MainMenu.cursosLigerosLink),
      WaitForVisible.of(CursosLigerosPage.createCourseButton),
    );
  }
}
