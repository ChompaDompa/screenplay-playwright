import { test, expect } from './fixtures';
import { GoToCursosLigeros } from '../src/screenplay/tasks/GoToCursosLigeros';
import { CursosLigerosPage } from '../src/screenplay/ui/CursosLigerosPage';
import { Visibility } from '../src/screenplay/questions/Visibility';

test('un actor navega desde el login hasta Cursos ligeros', async ({ actor }) => {
  await actor.attemptsTo(GoToCursosLigeros.navigate());

  const createButtonVisible = await actor.asks(
    Visibility.of(CursosLigerosPage.createCourseButton),
  );
  expect(createButtonVisible).toBe(true);
});
