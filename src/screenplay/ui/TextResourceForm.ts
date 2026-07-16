/**
 * Selectores del formulario "Texto" (uno de los tipos de recurso virtual del menú
 * "Agregar recursos", dentro de un curso). No hay lógica aquí — solo locators,
 * consumidos por tasks/crud/CreateTextResource.ts.
 */
export const TextResourceForm = {
  titleInput: '#Texto_rec_nombre',
  descriptionEditor: '.ck-editor__editable[contenteditable="true"]',
  dateRestrictionSwitchLabel: '.bootstrap-switch-label',
  acceptButton: '#edv-submit-btn',
  createdResourceHeadingFor: (title: string): string =>
    `h5:has-text("${title.replace(/"/g, '\\"')}")`,
} as const;
