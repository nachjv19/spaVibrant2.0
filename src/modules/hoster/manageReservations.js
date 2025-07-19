import axios from 'axios';
import { renderNavbar } from '../components/navbar.js';
import { getCurrentUser } from '../auth/session.js';
import { loadHTML } from '../utils/loadHTML.js';

const EVENTS_URL = 'http://localhost:3000/events';
const RESERVATIONS_URL = 'http://localhost:3000/reservations';

export async function renderManageReservations() {
  await loadHTML('views/manageReservations.html');
  renderNavbar();

  const user = getCurrentUser();
  if (!user || user.role !== 'host') {
    const container = document.querySelector('main');
    const message = document.createElement('p');
    message.className = 'text-center mt-10';
    message.textContent = 'Acceso denegado. Debes ser anfitrión para acceder.';
    container.innerHTML = ''; // limpiar contenido
    container.appendChild(message);
    return;
  }

  try {
    const [eventsRes, reservationsRes] = await Promise.all([
      axios.get(`${EVENTS_URL}?host_id=${user.id}`),
      axios.get(RESERVATIONS_URL)
    ]);

    const myEvents = eventsRes.data;
    const allReservations = reservationsRes.data;

    const wrapper = document.getElementById('eventsWrapper');
    const noEventsMsg = document.getElementById('noEventsMsg');

    if (myEvents.length === 0) {
      noEventsMsg.hidden = false;
      return;
    }

    myEvents.forEach(event => {
      const card = document.createElement('article');
      card.className = 'bg-white shadow p-4 rounded-xl';

      const title = document.createElement('h3');
      title.className = 'text-xl font-bold mb-2';
      title.textContent = event.name;

      const description = document.createElement('p');
      description.className = 'text-gray-700 mb-2';
      description.textContent = event.description;

      const city = document.createElement('p');
      city.className = 'text-sm text-gray-500';
      city.textContent = `Ciudad: ${event.city}`;

      const subtitle = document.createElement('h4');
      subtitle.className = 'mt-4 font-semibold';
      subtitle.textContent = 'Reservas:';

      const list = document.createElement('ul');
      list.className = 'mt-2';

      const reservasEvento = allReservations.filter(r => r.event_id === event.id);

      if (reservasEvento.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Sin reservas aún.';
        li.className = 'text-gray-500';
        list.appendChild(li);
      } else {
        reservasEvento.forEach(r => {
          const li = document.createElement('li');
          li.className = 'border-b py-1';

          const strong = document.createElement('strong');
          strong.textContent = r.user_name;

          const texto = document.createTextNode(` reservó ${r.tickets} entradas el ${new Date(r.date).toLocaleDateString()}`);

          li.appendChild(strong);
          li.appendChild(texto);
          list.appendChild(li);
        });
      }

      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(city);
      card.appendChild(subtitle);
      card.appendChild(list);

      wrapper.appendChild(card);
    });

  } catch (error) {
    console.error('Error al cargar eventos o reservas:', error);
    const container = document.querySelector('main');
    container.innerHTML = ''; // limpiar antes
    const errorMsg = document.createElement('p');
    errorMsg.className = 'text-red-500 text-center';
    errorMsg.textContent = 'Hubo un error al cargar la información.';
    container.appendChild(errorMsg);
  }
}
