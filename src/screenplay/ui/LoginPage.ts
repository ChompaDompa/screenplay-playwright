/**
 * Selectors for the Q10 login screen. No behavior here — only locators,
 * consumed by tasks/Login.ts through the generic Interactions.
 */
export const LoginPage = {
  usernameInput: '#NombreUsuario',
  passwordInput: '#Contrasena',
  submitButton: '#submit-btn',
  errorMessage: '.alert-danger',
} as const;
