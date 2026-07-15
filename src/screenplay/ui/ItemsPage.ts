/**
 * Selectors for the Q10 "recursos virtuales" (virtual items) screen. No behavior here —
 * only locators, consumed by tasks/crud/*.ts through the generic Interactions.
 * Row-scoped selectors are plain string composition (no Page access, no async).
 */
export const ItemsPage = {
  createButton: '#btn-nuevo-recurso',
  nameInput: '#recurso-nombre',
  descriptionInput: '#recurso-descripcion',
  saveButton: '#btn-guardar-recurso',
  itemsTable: '#tabla-recursos',
  itemNameCells: '#tabla-recursos tbody tr td.nombre',
  toastMessage: '.toast-message',
  confirmDeleteButton: '#btn-confirmar-eliminar',
  rowFor: (name: string): string => `#tabla-recursos tr:has-text("${name}")`,
  editButtonFor: (name: string): string => `${ItemsPage.rowFor(name)} .btn-editar`,
  deleteButtonFor: (name: string): string => `${ItemsPage.rowFor(name)} .btn-eliminar`,
} as const;
