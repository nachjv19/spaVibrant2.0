// src/modules/hoster/ApplyHoster.js
export function renderApplyHoster(container) {
  // Limpia contenedor
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

  // Datos personales
  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4';
  form.appendChild(grid);

  grid.appendChild(createInputField('Nombre', 'hostName', 'text'));
  grid.appendChild(createInputField('Ciudad/Pueblo', 'hostCity', 'text'));

  // Descripción
  form.appendChild(createTextAreaField('Descripción de la Familia', 'hostDescription'));

  // Foto
  form.appendChild(createInputField('Foto (URL)', 'hostPhoto', 'url'));

  // Contenedor de planes
  const plansContainer = document.createElement('div');
  plansContainer.id = 'plansContainer';
  plansContainer.className = 'mb-6';
  form.appendChild(plansContainer);

  const plansTitle = document.createElement('h2');
  plansTitle.textContent = 'Planes de Experiencia';
  plansTitle.className = 'text-xl font-semibold mb-2';
  plansContainer.appendChild(plansTitle);

  plansContainer.appendChild(createPlanFields());

  // Botón agregar plan
  const addPlanBtn = document.createElement('button');
  addPlanBtn.type = 'button';
  addPlanBtn.id = 'addPlan';
  addPlanBtn.textContent = 'Agregar Otro Plan';
  addPlanBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mb-4';
  form.appendChild(addPlanBtn);

  addPlanBtn.addEventListener('click', () => {
    plansContainer.appendChild(createPlanFields());
  });

  // Botón enviar
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Registrar';
  submitBtn.className = 'bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 w-full';
  form.appendChild(submitBtn);

  // Listener para submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos a JSON Server
    console.log('Formulario enviado');
  });

  container.appendChild(section);
}

// 🔧 Helpers
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
