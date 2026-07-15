import type { Actor } from '../actors/Actor';

/**
 * Contract for every Question: reads state from the system and answers it as a value of type T.
 * Only concrete Questions (Text, Visibility, ItemList, ...) know *what* to read;
 * this interface only defines *how* Actor asks.
 */
export interface Question<T> {
  answeredBy(actor: Actor): Promise<T>;
}
