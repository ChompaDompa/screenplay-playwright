import { test, expect } from './fixtures';
import { Navigate } from '../src/screenplay/interactions/Navigate';
import { MainMenu } from '../src/screenplay/ui/MainMenu';
import { EnterVirtualCourse } from '../src/screenplay/tasks/EnterVirtualCourse';
import { CreateTextResource } from '../src/screenplay/tasks/crud/CreateTextResource';
import { TextResourceForm } from '../src/screenplay/ui/TextResourceForm';
import { Visibility } from '../src/screenplay/questions/Visibility';

test('un actor crea un recurso de tipo texto dentro de un curso', async ({ actor }) => {
  const title = 'Guía de Álgebra';

  await actor.attemptsTo(
    Navigate.to(MainMenu.cursosLigerosUrl),
    EnterVirtualCourse.first(),
    CreateTextResource.withTitleAndDescription(
      title,
      'Recurso de práctica para el segundo periodo',
    ),
  );

  const resourceCreated = await actor.asks(
    Visibility.of(TextResourceForm.createdResourceHeadingFor(title)),
  );
  expect(resourceCreated).toBe(true);
});
