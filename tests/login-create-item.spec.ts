import { test, expect } from './fixtures';
import { CreateItem } from '../src/screenplay/tasks/crud/CreateItem';
import { ItemList } from '../src/screenplay/questions/ItemList';

// NOTA: el login ya lo resuelve el fixture `actor` (tests/fixtures.ts) antes de
// que empiece el test. Los selectores de ItemsPage.ts (createButton, nameInput,
// etc.) siguen siendo provisionales hasta inspeccionar la pantalla real de
// "recursos virtuales" — este test fallará hasta ajustarlos.

test('un actor crea un recurso virtual', async ({ actor }) => {
  await actor.attemptsTo(
    CreateItem.withNameAndDescription(
      'Guía de Álgebra',
      'Recurso de práctica para el segundo periodo',
    ),
  );

  const items = await actor.asks(ItemList.displayed());
  expect(items).toContain('Guía de Álgebra');
});
