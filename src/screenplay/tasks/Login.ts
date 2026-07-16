import type { Actor, Activity } from '../actors/Actor';
import { Navigate } from '../interactions/Navigate';
import { Fill } from '../interactions/Fill';
import { Click } from '../interactions/Click';
import { WaitForUrl } from '../interactions/WaitForUrl';
import { WaitForVisible } from '../interactions/WaitForVisible';
import { LoginPage } from '../ui/LoginPage';

/**
 * Inicia sesión de un actor en Q10. Este es el único lugar que conoce el flujo de login
 * (navegar → llenar credenciales → enviar) — compone las Interactions genéricas
 * con los selectores de LoginPage, manteniendo el conocimiento del dominio fuera de las Interactions.
 *
 * El envío del formulario dispara un login asíncrono (vía JS, no un submit tradicional),
 * por lo que se espera explícitamente a abandonar la ruta /login antes de continuar —
 * un simple WaitForLoad puede resolver antes de que la navegación real siquiera comience.
 * Abandonar /login tampoco garantiza que la página destino ya esté lista, así que además
 * se espera a que el menú de usuario (presente en toda pantalla autenticada) sea visible.
 */
export class Login implements Activity {
  private constructor(
    private readonly username: string,
    private readonly password: string,
    private readonly url?: string,
  ) {}

  static as(username: string, password: string): Login {
    return new Login(username, password);
  }

  at(url: string): Login {
    return new Login(this.username, this.password, url);
  }

  async performAs(actor: Actor): Promise<void> {
    const activities: Activity[] = this.url ? [Navigate.to(this.url)] : [];

    activities.push(
      Fill.in(LoginPage.usernameInput, this.username),
      Fill.in(LoginPage.passwordInput, this.password),
      Click.on(LoginPage.submitButton),
      WaitForUrl.toMatch((url) => !url.pathname.includes('/login')),
      WaitForVisible.of('.user-menu'),
    );

    await actor.attemptsTo(...activities);
  }
}
