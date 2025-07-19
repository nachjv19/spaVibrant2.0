// src/views/guest/registerView.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export async function renderRegister() {
  const app = document.getElementById('app');
  app.innerHTML = ''; // Limpia el contenedor principal

  // Crea estructura del formulario
  const section = document.createElement('section');
  section.className = 'max-w-md mx-auto mt-10 p-6 bg-white rounded shadow';

  const title = document.createElement('h2');
  title.textContent = 'Registro';
  title.className = 'text-2xl font-bold mb-4';

  const form = document.createElement('form');
  form.id = 'registerForm';
  form.className = 'space-y-4';

  const campos = [
    { label: 'Nombre', type: 'text', name: 'name' },
    { label: 'Correo electrónico', type: 'email', name: 'email' },
    { label: 'Contraseña', type: 'password', name: 'password' },
    { label: 'Confirmar contraseña', type: 'password', name: 'confirmPassword' },
  ];

  campos.forEach(({ label, type, name }) => {
    const div = document.createElement('div');

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    labelEl.htmlFor = name;
    labelEl.className = 'block font-medium';

    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.id = name;
    input.required = true;
    input.className = 'w-full border px-3 py-2 rounded';

    div.appendChild(labelEl);
    div.appendChild(input);
    form.appendChild(div);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Registrarse';
  submitBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600';

  form.appendChild(submitBtn);
  section.appendChild(title);
  section.appendChild(form);
  app.appendChild(section);

  // Lógica de registro
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const { data: users } = await axios.get(`${API_URL}?email=${email}`);
      if (users.length > 0) {
        alert('El correo ya está registrado');
        return;
      }

      const newUser = {
        name,
        email,
        password,
        role: 'user',
        is_active: true,
        create_at: new Date().toISOString(),
        delete_at: null,
        deleted_by: null
      };

      await axios.post(API_URL, newUser);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      window.location.href = '#/login';
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un problema al registrar. Intenta más tarde.');
    }
  });
}
