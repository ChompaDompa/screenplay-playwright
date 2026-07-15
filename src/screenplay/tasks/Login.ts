import type { Actor, Activity } from '../actors/Actor';
import { Navigate } from '../interactions/Navigate';
import { Fill } from '../interactions/Fill';
import { Click } from '../interactions/Click';
import { LoginPage } from '../ui/LoginPage';

/**
 * Logs an actor into Q10. This is the only place that knows the login flow
 * (navigate → fill credentials → submit) — it composes the generic Interactions
 * with the LoginPage selectors, keeping domain knowledge out of Interactions.
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
    );

    await actor.attemptsTo(...activities);
  }
}
