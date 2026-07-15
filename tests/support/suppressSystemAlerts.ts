import type { Page } from '@playwright/test';

/**
 * This Q10 tenant periodically shows a plan-limit nag (SweetAlert) that reappears
 * every few seconds and intercepts clicks anywhere on the page, regardless of what
 * flow is under test. Neutralizing it via injected CSS (re-applied on every
 * navigation through addInitScript) is far more reliable than retrying around it.
 */
export async function suppressSystemAlerts(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.textContent = `
      .sweet-alert, .sweet-overlay, #link-masker {
        display: none !important;
        pointer-events: none !important;
        visibility: hidden !important;
      }
    `;
    document.addEventListener('DOMContentLoaded', () => {
      (document.head ?? document.documentElement).appendChild(style);
    });
  });
}
