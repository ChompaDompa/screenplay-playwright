/**
 * Selectores del área de "Cursos ligeros" de Q10: el listado y la vista de un curso
 * ya abierto. No hay lógica aquí — solo locators, consumidos por
 * tasks/GoToCursosLigeros.ts, tasks/EnterVirtualCourse.ts y tasks/crud/CreateTextResource.ts.
 */
export const CursosLigerosPage = {
  createCourseButton: 'a[href="/EducacionVirtual/v3/CursosVirtuales/Crear"]',
  firstCourseEntryLink: 'a[data-original-title="Ingresar al curso"] >> nth=0',
  courseContentHeading: 'h5:has-text("Contenido del curso")',
  addResourcesButton: '.btn.dropdown-toggle:has-text("Agregar recursos")',
  textResourceOption: 'li > a.open-body:has-text("Texto"):visible',
} as const;
