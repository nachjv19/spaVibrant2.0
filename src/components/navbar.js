import { getCurrentUser, logout } from '../auth/session.js';

export function renderNavbar() {
  const user = getCurrentUser();
  const navbar = document.querySelector('#navbar');
  if (!navbar) return;

  // Limpiar contenido previo
  navbar.innerHTML = '';

  const nav = document.createElement('nav');
  nav.className = 'bg-gray-800 text-white p-4 flex justify-between';

  // Contenedor de enlaces
  const leftDiv = document.createElement('div');

  const homeLink = document.createElement('a');
  homeLink.href = '#/';
  homeLink.textContent = 'Inicio';
  homeLink.className = 'mr-4 hover:underline';
  leftDiv.appendChild(homeLink);

  if (user?.role === 'admin') {
    const adminLink = document.createElement('a');
    adminLink.href = '#/admin';
    adminLink.textContent = 'Panel Admin';
    adminLink.className = 'mr-4 hover:underline';
    leftDiv.appendChild(adminLink);
  }

  if (user?.role === 'hoster') {
    const hostLink = document.createElement('a');
    hostLink.href = '#/hoster';
    hostLink.textContent = 'Panel Host';
    hostLink.className = 'mr-4 hover:underline';
    leftDiv.appendChild(hostLink);
  }

  if (user?.role === 'user') {
    const reservasLink = document.createElement('a');
    reservasLink.href = '#/reservas';
    reservasLink.textContent = 'Mis Reservas';
    reservasLink.className = 'mr-4 hover:underline';
    leftDiv.appendChild(reservasLink);
  }

  // Contenedor de usuario/login
  const rightDiv = document.createElement('div');

  if (user) {
    const saludo = document.createElement('span');
    saludo.textContent = `Hola, ${user.username}`;
    saludo.className = 'mr-2';
    rightDiv.appendChild(saludo);

    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Salir';
    logoutBtn.className = 'bg-red-500 hover:bg-red-600 px-2 py-1 rounded';
    logoutBtn.addEventListener('click', () => {
      logout();
      loadNavBar(); // Recargar navbar tras logout
    });
    rightDiv.appendChild(logoutBtn);
  } else {
    const loginLink = document.createElement('a');
    loginLink.href = '#/login';
    loginLink.textContent = 'Login';
    loginLink.className = 'mr-4 hover:underline';
    rightDiv.appendChild(loginLink);

    const registerLink = document.createElement('a');
    registerLink.href = '#/register';
    registerLink.textContent = 'Registro';
    registerLink.className = 'hover:underline';
    rightDiv.appendChild(registerLink);
  }

  nav.appendChild(leftDiv);
  nav.appendChild(rightDiv);
  navbar.appendChild(nav);
}
