const SESSION_KEY = 'vibrant_session';

/**
 * Guarda el usuario activo en localStorage.
 * Este usuario puede tener los roles: guest, user, hoster.
 */
export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

/**
 * Retorna el usuario actual autenticado desde localStorage.
 * Si no existe, retorna null (equivalente a guest).
 */
export function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

/**
 * Comprueba si existe un usuario logueado (distinto de null).
 */
export function isLoggedIn() {
  return !!getCurrentUser();
}

/**
 * Elimina la sesión del usuario actual.
 */
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
