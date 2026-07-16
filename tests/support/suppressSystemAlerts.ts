import type { Page } from '@playwright/test';

/**
 * Este tenant de Q10 muestra periódicamente un aviso de límite de plan (SweetAlert) que
 * reaparece cada pocos segundos e intercepta clics en cualquier parte de la página, sin
 * importar qué flujo se esté probando. Neutralizarlo con CSS inyectado (reaplicado en cada
 * navegación mediante addInitScript) es mucho más confiable que reintentar alrededor de él.
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
