import { test, expect } from '@playwright/test';
import { Actor } from '../src/screenplay/actors/Actor';
import { BrowseTheWeb } from '../src/screenplay/abilities/BrowseTheWeb';
import { Login } from '../src/screenplay/tasks/Login';
import { Text } from '../src/screenplay/questions/Text';
import { suppressSystemAlerts } from './support/suppressSystemAlerts';

const Q10_URL = process.env.Q10_URL ?? 'https://pruebasordenesdepago2025.q10.com';
const Q10_USER = process.env.Q10_USER ?? 'johnba.admin';
const Q10_PASSWORD = process.env.Q10_PASSWORD ?? 'johnba.admin';

test('un actor inicia sesión correctamente en Q10', async ({ page }) => {
  await suppressSystemAlerts(page);
  const actor = Actor.named('Admin').can(BrowseTheWeb.using(page));

  await actor.attemptsTo(Login.as(Q10_USER, Q10_PASSWORD).at(Q10_URL));

  const accountMenu = await actor.asks(Text.of('.user-menu'));
  expect(accountMenu).toContain('Admin');
});
