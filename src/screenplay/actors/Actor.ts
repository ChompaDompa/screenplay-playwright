import type { Ability } from '../abilities/Ability';
import type { Question } from '../questions/Question';

/**
 * Contract for anything an Actor can perform: Interactions and Tasks both implement this.
 */
export interface Activity {
  performAs(actor: Actor): Promise<void>;
}

/**
 * Reference to an Ability's class, used as a lookup key. Deliberately has no construct
 * signature: Abilities like BrowseTheWeb expose private constructors behind a static
 * factory, and a `new (...) => T` signature would reject those structurally.
 */
type AbilityClass<T extends Ability> = Function & { readonly prototype: T };

/**
 * The Actor is the single entry point that performs Activities (attemptsTo) and reads
 * state via Questions (asks). It knows nothing about Playwright or the domain itself —
 * that knowledge lives in its Abilities, Tasks, Interactions and Questions.
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
