import { test as base } from '@playwright/test';
import { Actor } from '../src/screenplay/actors/Actor';
import { BrowseTheWeb } from '../src/screenplay/abilities/BrowseTheWeb';
import { Login } from '../src/screenplay/tasks/Login';
import { suppressSystemAlerts } from './support/suppressSystemAlerts';

const Q10_URL = process.env.Q10_URL ?? 'https://pruebasordenesdepago2025.q10.com';
const Q10_USER = process.env.Q10_USER ?? 'johnba.admin';
const Q10_PASSWORD = process.env.Q10_PASSWORD ?? 'johnba.admin';

interface ScreenplayFixtures {
  actor: Actor;
}

/**
 * Every test that requests `actor` gets one that is already logged into Q10 —
 * the fixture runs Login before yielding, so tests never repeat that setup.
 * Tests that need to verify the login flow itself (tests/login.spec.ts) build
 * their own Actor instead of using this fixture.
 */
export const test = base.extend<ScreenplayFixtures>({
  actor: async ({ page }, use) => {
    await suppressSystemAlerts(page);
    const actor = Actor.named('Admin').can(BrowseTheWeb.using(page));
    await actor.attemptsTo(Login.as(Q10_USER, Q10_PASSWORD).at(Q10_URL));
    await use(actor);
  },
});

export { expect } from '@playwright/test';
