// src/router/router.js
import { getCurrentUser } from '../auth/session.js';
import { renderNavbar } from '../components/navbar.js';

// Admin'
import { renderManageEvents } from '../modules/admin/manageEvents.js';
import { renderManageReservations } from '../modules/admin/manageReservations.js';
import { renderManageUsers } from '../modules/admin/manageUsers.js';

// Hoster
import { renderHosterDashboard } from '../modules/hoster/hosterDashboard.js';

// User
import { renderUserDashboard } from '../modules/user/userDashboard.js';

// Guest
import { renderLanding } from '../modules/guest/landing.js';
import { renderLogin } from '../auth/login.js';
import { renderRegister } from '../auth/register.js';

export function initRouter() {
  window.addEventListener('hashchange', loadView);
  loadView();
}

function loadView() {
  const route = window.location.hash || '#/';
  const user = getCurrentUser();

  const publicRoutes = [
    '#/',
    '#/landing',
    '#/login',
    '#/register',
  ];

  const routes = {
    admin: ['#/admin-products', '#/admin-events', '#/admin-reservations', '#/admin-users'],
    hoster: ['#/hoster-dashboard'],
    user: ['#/user-dashboard'],
  };

  const allPrivateRoutes = Object.values(routes).flat();
  const role = user?.role;

  // ⛔ Ruta privada sin login
  if (allPrivateRoutes.includes(route) && (!user || !user.is_active)) {
    window.location.hash = '#/login';
    return;
  }

  // ⛔ Ruta sin permiso del rol
  if (!publicRoutes.includes(route) && user && !routes[role]?.includes(route)) {
    window.location.hash = '#/unauthorized';
    return;
  }

  renderNavbar(); // navbar universal

  switch (route) {
    // 🟢 Público
    case '#/':
      renderLanding();
      break;

    case '#/landing':
      if (user && user.is_active) {
        // Redireccionar a dashboard según rol
        const dashboardByRole = {
          admin: '#/admin-products',
          hoster: '#/hoster-dashboard',
          user: '#/user-dashboard',
        };
        window.location.hash = dashboardByRole[user.role] || '#/';
      } else {
        import('../modules/guest/landing.js').then(mod => mod.renderLanding());
      }
      break;

    case '#/login':
      renderLogin();
      break;

    case '#/register':
      renderRegister();
      break;

    // 🔒 Admin
    case '#/admin-events':
      renderManageEvents();
      break;
    case '#/admin-reservations':
      renderManageReservations();
      break;
    case '#/admin-users':
      renderManageUsers();
      break;

    // 🔒 Hoster
    case '#/hoster-dashboard':
      renderHosterDashboard();
      break;

    // 🔒 Usuario
    case '#/user-dashboard':
      renderUserDashboard();
      break;

    // ❌ Ruta no autorizada
    case '#/unauthorized':
      document.getElementById('app').innerHTML = `
        <section class="p-6 text-center text-red-600">
          <h2 class="text-2xl font-bold">Acceso denegado</h2>
          <p>No tienes permisos para acceder a esta página.</p>
        </section>
      `;
      break;

    default:
      document.getElementById('app').innerHTML = `
        <section class="p-6 text-center text-gray-500">
          <h2 class="text-xl font-bold">404</h2>
          <p>Página no encontrada.</p>
        </section>
      `;
      break;
  }
}

export function redirectToDashboard() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return;

  if (user.rol === 'admin') {
    window.location.hash = '#/admin-dashboard';
  } else if (user.rol === 'hoster') {
    window.location.hash = '#/hoster-dashboard';
  } else {
    window.location.hash = '#/visitor-dashboard';
  }
}

