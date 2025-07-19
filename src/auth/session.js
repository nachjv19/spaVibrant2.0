const SESSION_KEY = 'vibrant_session';

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

export function isLoggedIn() {
  return !!getCurrentUser();
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
