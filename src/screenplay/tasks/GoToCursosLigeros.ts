import type { Actor, Activity } from '../actors/Actor';
import { Click } from '../interactions/Click';
import { Hover } from '../interactions/Hover';
import { WaitForLoad } from '../interactions/WaitForLoad';
import { MainMenu } from '../ui/MainMenu';

/**
 * Navigates from anywhere inside Q10 to the "Cursos ligeros" listing:
 * Académico → Educación virtual → Cursos ligeros. This is the entry point
 * for reaching a specific virtual course before creating resources inside it.
 * "Educación virtual" is a mega-menu category that expands on hover, not click.
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
      WaitForLoad.toFinish(),
    );
  }
}
