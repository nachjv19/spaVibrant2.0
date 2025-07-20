// src/modules/host.js
import axios from 'axios';
import { getCurrentUser, saveSession } from '../../auth/session.js';
import { renderNavbar } from '../../components/navbar.js';

export async function initHostForm() {
  renderNavbar();

  const hoster = getCurrentUser();
  const app = document.getElementById('app');

  if (!hoster || hoster.role !== 'hoster') {
    app.innerHTML = `
      <div class="text-center p-4">
        <h2 class="text-xl font-bold">Acceso denegado</h2>
        <p class="text-gray-600">Debes ser un anfitrión para acceder a esta vista.</p>
      </div>
    `;
    return;
  }

  // Limpia solo el contenido visual
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'max-w-xl mx-auto p-4 bg-white rounded-xl shadow';

  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold mb-4';
  title.textContent = 'Perfil del Anfitrión';

  const form = document.createElement('form');
  form.id = 'hostProfileForm';
  form.className = 'grid gap-4';

  const fields = [
    { name: 'name', type: 'text', value: hoster.name, placeholder: 'Nombre completo' },
    { name: 'email', type: 'email', value: hoster.email, placeholder: 'Correo' },
    { name: 'phone', type: 'text', value: hoster.phone || '', placeholder: 'Teléfono' },
    { name: 'photo', type: 'url', value: hoster.photo || '', placeholder: 'Foto (URL)' }
  ];

  fields.forEach(f => {
    const input = document.createElement('input');
    input.name = f.name;
    input.type = f.type;
    input.value = f.value;
    input.placeholder = f.placeholder;
    input.required = true;
    input.className = 'input';
    form.appendChild(input);
  });

  const bio = document.createElement('textarea');
  bio.name = 'bio';
  bio.placeholder = 'Biografía';
  bio.className = 'input';
  bio.value = hoster.bio || '';
  form.appendChild(bio);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'bg-blue-600 text-white px-4 py-2 rounded';
  submitBtn.textContent = 'Guardar cambios';

  form.appendChild(submitBtn);
  container.appendChild(title);
  container.appendChild(form);
  app.appendChild(container);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedHost = {
      ...hoster,
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      photo: form.photo.value,
      bio: form.bio.value,
      updated_at: new Date().toISOString()
    };

    try {
      const { status } = await axios.put(`http://localhost:3000/users/${hoster.id}`, updatedHost);
      if (status === 200) {
        saveSession(updatedHost);
        alert('Perfil actualizado con éxito');
      } else {
        alert('No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar hoster:', error);
      alert('Error al actualizar el perfil');
    }
  });
}
