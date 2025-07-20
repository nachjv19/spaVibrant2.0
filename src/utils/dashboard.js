// src/utils/dashboard.js
export function redirectToDashboard(role) {
  switch (role) {
    case 'admin':
      window.location.href = '#/admin';
      break;
    case 'user':
      window.location.href = '#/user';
      break;
    case 'hoster':
      window.location.href = '#/hoster';
      break;
    default:
      window.location.href = '#/';
  }
}
