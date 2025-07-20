// src/router/router.js
import { renderLogin } from '../auth/login.js';
import { renderRegister } from '../auth/register.js';
import { renderNavbar } from '../components/navbar.js';
import { getCurrentUser } from '../auth/session.js';

// Importaciones de vistas por rol
import { renderAdminDashboard } from '../modules/admin/adminDashboard.js';
import { renderUserDashboard } from '../modules/user/userDashboard.js';
import { renderHosterDashboard } from '../modules/hoster/hosterDashboard.js';

// Vista pública o de bienvenida
import { renderLanding } from '../modules/guest/landing.js';

const routes = {
  '/': renderLanding,
  '/login': renderLogin,
  '/register': renderRegister,
  '/admin': renderAdminDashboard,
  '/user': renderUserDashboard,
  '/hoster': renderHosterDashboard
};

export function router() {
  const path = location.hash.slice(1) || '/';
  const view = routes[path];

  const user = getCurrentUser();
  renderNavbar();

  // Protección de rutas privadas
  if (['/admin', '/user', '/hoster'].includes(path)) {
    if (!user) {
      alert('Primero inicia sesión');
      window.location.href = '#/login';
      return;
    }

    if (path === '/admin' && user.role !== 'admin') {
      alert('Acceso denegado (solo admins)');
      window.location.href = '#/';
      return;
    }

    if (path === '/user' && user.role !== 'user') {
      alert('Acceso denegado (solo usuarios)');
      window.location.href = '#/';
      return;
    }

    if (path === '/hoster' && user.role !== 'hoster') {
      alert('Acceso denegado (solo anfitriones)');
      window.location.href = '#/';
      return;
    }
  }

  if (view) view();
  else document.getElementById('app').innerHTML = '<h2>Página no encontrada</h2>';
}

// Inicializa el router
export function initRouter(){

  window.addEventListener('hashchange', router);
  window.addEventListener('DOMContentLoaded', router);
}
