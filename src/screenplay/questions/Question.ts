import type { Actor } from '../actors/Actor';

/**
 * Contrato para toda Question: lee estado del sistema y lo responde como un valor de tipo T.
 * Solo las Questions concretas (Text, Visibility, ...) saben *qué* leer;
 * esta interfaz solo define *cómo* pregunta el Actor.
 */
export interface Question<T> {
  answeredBy(actor: Actor): Promise<T>;
}
