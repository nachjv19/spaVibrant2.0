import axios from 'axios';
import { getCurrentUser } from '../../auth/session.js';

export async function renderHosterDashboard() {
  const hosterContainer = document.getElementById('hosterContainer');
  hosterContainer.innerHTML = ''; // Limpiar antes de renderizar

  const user = getCurrentUser();
  if (!user) {
    hosterContainer.textContent = 'Debes iniciar sesión como anfitrión.';
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3000/hosters?user_id=${user.id}`);
    const hosters = response.data;

    if (hosters.length === 0) {
      const msg = document.createElement('p');
      msg.textContent = 'No has registrado ningún evento como anfitrión.';
      hosterContainer.appendChild(msg);
      return;
    }

    hosters.forEach((host) => {
      const card = document.createElement('div');
      card.classList.add('border', 'p-4', 'rounded', 'shadow-md', 'mb-4');

      const title = document.createElement('h2');
      title.classList.add('text-xl', 'font-bold');
      title.textContent = `Nombre: ${host.name}`;

      const city = document.createElement('p');
      city.textContent = `Ciudad: ${host.city}`;

      const desc = document.createElement('p');
      desc.textContent = `Descripción: ${host.description}`;

      const photo = document.createElement('img');
      photo.src = host.photo;
      photo.alt = host.name;
      photo.classList.add('w-32', 'h-32', 'object-cover', 'mt-2');

      const plansList = document.createElement('ul');
      plansList.classList.add('mt-2');

      host.plans.forEach(plan => {
        const li = document.createElement('li');
        li.textContent = `📝 ${plan.name}: $${plan.price} por ${plan.duration} días`;
        plansList.appendChild(li);
      });

      card.appendChild(title);
      card.appendChild(city);
      card.appendChild(desc);
      card.appendChild(photo);
      card.appendChild(plansList);

      hosterContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Error al cargar anfitriones:', error);
    hosterContainer.textContent = 'Ocurrió un error al cargar tu información.';
  }
}
