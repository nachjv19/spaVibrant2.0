import axios from 'axios';
import { getCurrentUser } from '../../auth/session.js';

const EVENTS_API = 'http://localhost:3000/events';
const RESERVATIONS_API = 'http://localhost:3000/reservations';

export async function renderUserDashboard() {
  const user = getCurrentUser();
  if (!user) return;

  // Mostrar nombre
  const nameEl = document.getElementById('userName');
  if (nameEl) nameEl.textContent = user.name;

  try {
    // Obtener eventos disponibles
    const eventsRes = await axios.get(EVENTS_API);
    const eventList = document.getElementById('eventList');
    if (eventList) {
      eventsRes.data.forEach(event => {
        const li = document.createElement('li');
        li.textContent = `${event.name} - ${event.date}`;
        li.className = 'border-b pb-1';
        eventList.appendChild(li);
      });
    }

    // Obtener reservas del usuario
    const resvRes = await axios.get(`${RESERVATIONS_API}?visitorId=${user.id}`);
    const reservationList = document.getElementById('reservationList');
    if (reservationList) {
      resvRes.data.forEach(reservation => {
        const li = document.createElement('li');
        li.textContent = `Evento ID: ${reservation.eventId} - Fecha: ${reservation.date}`;
        li.className = 'border-b pb-1';
        reservationList.appendChild(li);
      });
    }

  } catch (error) {
    console.error('Error cargando dashboard del usuario:', error);
  }
}
