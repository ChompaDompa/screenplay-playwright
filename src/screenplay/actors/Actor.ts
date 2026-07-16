import type { Ability } from '../abilities/Ability';
import type { Question } from '../questions/Question';

/**
 * Contrato para todo lo que un Actor puede realizar: Interactions y Tasks implementan esto.
 */
export interface Activity {
  performAs(actor: Actor): Promise<void>;
}

/**
 * Referencia a la clase de una Ability, usada como llave de búsqueda. Deliberadamente no tiene
 * firma de construcción: Abilities como BrowseTheWeb exponen constructores privados detrás de un
 * factory estático, y una firma `new (...) => T` las rechazaría estructuralmente.
 */
type AbilityClass<T extends Ability> = Function & { readonly prototype: T };

/**
 * El Actor es el único punto de entrada que ejecuta Activities (attemptsTo) y lee
 * estado vía Questions (asks). No sabe nada de Playwright ni del dominio en sí —
 * ese conocimiento vive en sus Abilities, Tasks, Interactions y Questions.
 */
export class Actor {
  private readonly abilities = new Map<AbilityClass<Ability>, Ability>();

  private constructor(public readonly name: string) {}

  static named(name: string): Actor {
    return new Actor(name);
  }

  can(...abilities: Ability[]): this {
    for (const ability of abilities) {
      const abilityClass = ability.constructor as unknown as AbilityClass<Ability>;
      this.abilities.set(abilityClass, ability);
    }
    return this;
  }

  withAbilityTo<T extends Ability>(abilityClass: AbilityClass<T>): T {
    const ability = this.abilities.get(abilityClass);
    if (!ability) {
      throw new Error(`${this.name} does not have the ability to ${abilityClass.name}.`);
    }
    return ability as T;
  }

  async attemptsTo(...activities: Activity[]): Promise<void> {
    for (const activity of activities) {
      await activity.performAs(this);
    }
  }

  async asks<T>(question: Question<T>): Promise<T> {
    return question.answeredBy(this);
  }
}
