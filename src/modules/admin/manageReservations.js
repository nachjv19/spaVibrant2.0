import axios from 'axios';
import { renderNavbar } from '../../components/navbar.js';

const RESERVATIONS_API = 'http://localhost:3000/reservations';
const USERS_API = 'http://localhost:3000/users';
const EVENTS_API = 'http://localhost:3000/events';

export async function renderManageReservations() {
  renderNavbar();

  const container = document.getElementById('reservationsContainer');
  container.innerHTML = '';

  try {
    const [resData, usersData, eventsData] = await Promise.all([
      axios.get(RESERVATIONS_API),
      axios.get(USERS_API),
      axios.get(EVENTS_API),
    ]);

    const reservations = resData.data;
    const users = usersData.data;
    const events = eventsData.data;

    reservations.forEach(res => {
      const user = users.find(u => u.id === res.userId) || {};
      const event = events.find(e => e.id === res.eventId) || {};

      const card = document.createElement('div');
      card.classList.add('bg-white', 'shadow', 'p-4', 'rounded-xl');

      const title = document.createElement('h3');
      title.classList.add('text-lg', 'font-bold');
      title.textContent = `Reserva de: ${user.name || 'Usuario desconocido'}`;

      const eventName = document.createElement('p');
      eventName.classList.add('text-sm', 'text-gray-700');
      eventName.textContent = `Evento: ${event.name || 'Evento no encontrado'}`;

      const eventDate = document.createElement('p');
      eventDate.classList.add('text-sm', 'text-gray-600');
      eventDate.textContent = `Fecha del evento: ${event.date || 'Desconocida'}`;

      const resDate = document.createElement('p');
      resDate.classList.add('text-sm', 'text-gray-600');
      resDate.textContent = `Fecha de reserva: ${res.date || 'No especificada'}`;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Cancelar Reserva';
      deleteBtn.classList.add('deleteBtn', 'mt-2', 'bg-red-600', 'text-white', 'px-3', 'py-1', 'rounded', 'hover:bg-red-700');
      deleteBtn.dataset.id = res.id;

      deleteBtn.addEventListener('click', async () => {
        if (confirm('¿Cancelar esta reserva?')) {
          await axios.delete(`${RESERVATIONS_API}/${res.id}`);
          renderManageReservations();
        }
      });

      card.appendChild(title);
      card.appendChild(eventName);
      card.appendChild(eventDate);
      card.appendChild(resDate);
      card.appendChild(deleteBtn);

      container.appendChild(card);
    });

  } catch (err) {
    console.error('Error al cargar reservas:', err);
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('text-red-600');
    errorMsg.textContent = 'No se pudieron cargar las reservas.';
    container.appendChild(errorMsg);
  }
}
