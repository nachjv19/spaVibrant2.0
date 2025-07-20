import axios from 'axios';
import { saveSession } from './session.js';
import { redirectToDashboard } from '../utils/dashboard.js';

const USERS_API = 'http://localhost:3000/users';

export function renderLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const res = await axios.get(`${USERS_API}?email=${email}`);
      const user = res.data[0];

      if (!user || user.password !== password) {
        alert('Credenciales incorrectas.');
        return;
      }

      if (user.is_active === false) {
        alert('Tu cuenta está inactiva.');
        return;
      }

      saveSession(user);
      redirectToDashboard(user.role);

    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Hubo un problema al intentar iniciar sesión.');
    }
  });
}
