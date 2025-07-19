import axios from 'axios';
import { renderNavbar } from '../../components/navbar.js';

const EVENTS_API = 'http://localhost:3000/events';

export async function renderManageEvents() {
  renderNavbar();

  const eventsContainer = document.getElementById('eventsContainer');
  eventsContainer.innerHTML = '';

  try {
    const { data: events } = await axios.get(EVENTS_API);

    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'bg-white shadow p-4 rounded-xl flex justify-between items-center';

      card.innerHTML = `
        <div>
          <h3 class="text-lg font-bold">${event.name}</h3>
          <p class="text-sm text-gray-600">Fecha: ${event.date}</p>
          <p class="text-sm text-gray-600">Lugar: ${event.location}</p>
        </div>
        <button data-id="${event.id}" class="deleteEventBtn bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
          Eliminar
        </button>
      `;

      eventsContainer.appendChild(card);
    });

    // Eliminar evento
    document.querySelectorAll('.deleteEventBtn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        if (confirm('¿Eliminar este evento?')) {
          await axios.delete(`${EVENTS_API}/${id}`);
          renderManageEvents(); // Recargar
        }
      });
    });

  } catch (err) {
    console.error('Error al cargar eventos', err);
    eventsContainer.innerHTML = '<p class="text-red-600">No se pudieron cargar los eventos.</p>';
  }
}
