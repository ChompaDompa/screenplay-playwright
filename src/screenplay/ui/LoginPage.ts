/**
 * Selectores de la pantalla de login de Q10. No hay lógica aquí — solo locators,
 * consumidos por tasks/Login.ts a través de las Interactions genéricas.
 */
export const LoginPage = {
  usernameInput: '#NombreUsuario',
  passwordInput: '#Contrasena',
  submitButton: '#submit-btn',
  errorMessage: '.alert-danger',
} as const;
