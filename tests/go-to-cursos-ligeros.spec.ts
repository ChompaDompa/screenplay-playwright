import { test, expect } from './fixtures';
import { GoToCursosLigeros } from '../src/screenplay/tasks/GoToCursosLigeros';
import { Visibility } from '../src/screenplay/questions/Visibility';

test('un actor navega desde el login hasta Cursos ligeros', async ({ actor }) => {
  await actor.attemptsTo(GoToCursosLigeros.navigate());

  const createButtonVisible = await actor.asks(
    Visibility.of('a[href="/EducacionVirtual/v3/CursosVirtuales/Crear"]'),
  );
  expect(createButtonVisible).toBe(true);
});
