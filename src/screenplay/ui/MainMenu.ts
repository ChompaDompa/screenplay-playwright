/**
 * Selectors for the Q10 top navigation bar, used to reach different modules.
 * No behavior here — only locators, consumed by tasks/GoToCursosLigeros.ts.
 */
export const MainMenu = {
  academicMenuToggle: '.navbar-nav > li.dropdown > a.dropdown-toggle:has-text("Académico")',
  educacionVirtualCategory: 'a[href="javascript:;"]:has-text("Educación virtual")',
  cursosLigerosLink: 'a[href="/EducacionVirtual/v3/CursosVirtuales"]',
} as const;
