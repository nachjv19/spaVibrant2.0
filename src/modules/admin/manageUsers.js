import axios from 'axios';
import { renderNavbar } from '../../components/navbar.js';

const USERS_API = 'http://localhost:3000/users';

export async function renderManageUsers() {
  renderNavbar();

  const container = document.getElementById('usersContainer');
  container.innerHTML = '';

  try {
    const response = await axios.get(USERS_API);
    const users = response.data;

    users.forEach(user => {
      const card = document.createElement('div');
      card.classList.add('bg-white', 'shadow', 'p-4', 'rounded-xl');

      const name = document.createElement('h3');
      name.classList.add('text-lg', 'font-bold');
      name.textContent = user.name;

      const email = document.createElement('p');
      email.classList.add('text-sm', 'text-gray-600');
      email.textContent = `Correo: ${user.email}`;

      const role = document.createElement('p');
      role.classList.add('text-sm', 'text-gray-600');
      role.textContent = `Rol: ${user.role}`;

      const activeLabel = document.createElement('label');
      activeLabel.classList.add('text-sm', 'flex', 'items-center', 'gap-2', 'mt-2');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = user.is_active;
      checkbox.classList.add('accent-green-500');
      checkbox.addEventListener('change', async () => {
        await axios.patch(`${USERS_API}/${user.id}`, { is_active: checkbox.checked });
      });

      activeLabel.appendChild(checkbox);
      activeLabel.appendChild(document.createTextNode('Activo'));

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar Usuario';
      deleteBtn.classList.add('mt-2', 'bg-red-600', 'text-white', 'px-3', 'py-1', 'rounded', 'hover:bg-red-700');
      deleteBtn.addEventListener('click', async () => {
        if (confirm(`¿Eliminar a ${user.name}?`)) {
          await axios.delete(`${USERS_API}/${user.id}`);
          renderManageUsers();
        }
      });

      card.appendChild(name);
      card.appendChild(email);
      card.appendChild(role);
      card.appendChild(activeLabel);
      card.appendChild(deleteBtn);

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('text-red-600');
    errorMsg.textContent = 'No se pudieron cargar los usuarios.';
    container.appendChild(errorMsg);
  }
}
