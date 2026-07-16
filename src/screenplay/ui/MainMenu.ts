/**
 * Selectores de la barra de navegación superior de Q10, usados para llegar a distintos módulos.
 * No hay lógica aquí — solo locators, consumidos por tasks/GoToCursosLigeros.ts.
 */
export const MainMenu = {
  academicMenuToggle: '.navbar-nav > li.dropdown > a.dropdown-toggle:has-text("Académico")',
  educacionVirtualCategory: 'a[href="javascript:;"]:has-text("Educación virtual")',
  cursosLigerosLink: 'a[href="/EducacionVirtual/v3/CursosVirtuales"]',
  cursosLigerosUrl: 'https://site6.q10.com/EducacionVirtual/v3/CursosVirtuales',
} as const;
