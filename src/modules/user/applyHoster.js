// src/modules/hoster/ApplyHoster.js
import axios from 'axios';
import { getCurrentUser, saveSession } from '../../auth/session.js';
import { redirectToDashboard } from '../../router/router.js';

const USERS_API = 'http://localhost:3000/users';

export function renderApplyHoster(container) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    container.innerHTML = '<p class="text-center text-red-600">Debes iniciar sesión para aplicar como anfitrión.</p>';
    return;
  }

  container.innerHTML = '';

  const section = document.createElement('section');
  section.id = 'registerSection';
  section.classList.add('p-4');

  const title = document.createElement('h1');
  title.textContent = 'Conviértete en Anfitrión';
  title.className = 'text-3xl font-bold text-center mb-6';
  section.appendChild(title);

  const form = document.createElement('form');
  form.id = 'hostForm';
  form.className = 'bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto';
  section.appendChild(form);

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4';
  form.appendChild(grid);

  grid.appendChild(createInputField('Nombre', 'hostName', 'text'));
  grid.appendChild(createInputField('Ciudad/Pueblo', 'hostCity', 'text'));

  form.appendChild(createTextAreaField('Descripción de la Familia', 'hostDescription'));
  form.appendChild(createInputField('Foto (URL)', 'hostPhoto', 'url'));

  const plansContainer = document.createElement('div');
  plansContainer.id = 'plansContainer';
  plansContainer.className = 'mb-6';
  form.appendChild(plansContainer);

  const plansTitle = document.createElement('h2');
  plansTitle.textContent = 'Planes de Experiencia';
  plansTitle.className = 'text-xl font-semibold mb-2';
  plansContainer.appendChild(plansTitle);

  plansContainer.appendChild(createPlanFields());

  const addPlanBtn = document.createElement('button');
  addPlanBtn.type = 'button';
  addPlanBtn.id = 'addPlan';
  addPlanBtn.textContent = 'Agregar Otro Plan';
  addPlanBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mb-4';
  form.appendChild(addPlanBtn);

  addPlanBtn.addEventListener('click', () => {
    plansContainer.appendChild(createPlanFields());
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Registrar';
  submitBtn.className = 'bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 w-full';
  form.appendChild(submitBtn);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 🔍 Obtener los datos del form
    const updatedUser = {
      ...currentUser,
      role: 'hoster',
      name: form.hostName.value,
      city: form.hostCity.value,
      photo: form.hostPhoto.value,
      bio: form.hostDescription.value,
      plans: getPlansData(),
      updated_at: new Date().toISOString()
    };

    try {
      const { status } = await axios.put(`${USERS_API}/${currentUser.id}`, updatedUser);
      if (status === 200) {
        saveSession(updatedUser);
        alert('¡Ahora eres anfitrión!');
        redirectToDashboard('hoster');
      } else {
        alert('No se pudo registrar como anfitrión.');
      }
    } catch (err) {
      console.error('Error al guardar perfil de anfitrión:', err);
      alert('Hubo un error al enviar el formulario.');
    }
  });

  container.appendChild(section);
}

// Helpers
function createInputField(labelText, id, type = 'text') {
  const wrapper = document.createElement('div');

  const label = document.createElement('label');
  label.textContent = labelText;
  label.className = 'block text-gray-700 font-semibold';
  wrapper.appendChild(label);

  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.required = true;
  input.className = 'w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';
  wrapper.appendChild(input);

  return wrapper;
}

function createTextAreaField(labelText, id) {
  const wrapper = document.createElement('div');

  const label = document.createElement('label');
  label.textContent = labelText;
  label.className = 'block text-gray-700 font-semibold';
  wrapper.appendChild(label);

  const textarea = document.createElement('textarea');
  textarea.id = id;
  textarea.rows = 4;
  textarea.required = true;
  textarea.className = 'w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';
  wrapper.appendChild(textarea);

  return wrapper;
}

function createPlanFields() {
  const planWrapper = document.createElement('div');
  planWrapper.className = 'plan bg-gray-100 p-4 rounded-lg mb-4';

  planWrapper.appendChild(createInputField('Nombre del Plan', 'planName'));
  planWrapper.appendChild(createTextAreaField('Descripción (Vivienda, Alimentación, Actividades)', 'planDescription'));

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 mt-2';

  grid.appendChild(createInputField('Precio (por persona, en USD)', 'planPrice', 'number'));
  grid.querySelector('#planPrice').min = 0;

  grid.appendChild(createInputField('Duración (días)', 'planDuration', 'number'));
  grid.querySelector('#planDuration').min = 1;

  planWrapper.appendChild(grid);

  return planWrapper;
}

// 🔍 Recoge todos los planes del DOM
function getPlansData() {
  const plans = [];
  document.querySelectorAll('.plan').forEach(planEl => {
    const name = planEl.querySelector('#planName').value;
    const description = planEl.querySelector('#planDescription').value;
    const price = parseFloat(planEl.querySelector('#planPrice').value);
    const duration = parseInt(planEl.querySelector('#planDuration').value);

    if (name && description && price > 0 && duration > 0) {
      plans.push({ name, description, price, duration });
    }
  });
  return plans;
}
