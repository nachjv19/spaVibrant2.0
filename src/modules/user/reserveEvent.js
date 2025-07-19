import axios from 'axios';
import { getCurrentUser } from '../../auth/session.js';

const EVENTS_API = 'http://localhost:3000/events';
const RESERVATIONS_API = 'http://localhost:3000/reservations';

export async function initReservation() {
  const user = getCurrentUser();
  if (!user) return;

  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('id');

  if (!eventId) {
    alert('ID de evento no especificado.');
    return;
  }

  try {
    const { data: event } = await axios.get(`${EVENTS_API}/${eventId}`);

    // Rellenar datos del evento
    document.getElementById('eventTitle').textContent = event.name;
    document.getElementById('eventDescription').textContent = event.description;
    document.getElementById('eventDate').textContent = event.date;
    document.getElementById('eventLocation').textContent = event.location;
    document.getElementById('eventId').value = event.id;

    // Manejo del formulario de reserva
    const form = document.getElementById('reservationForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const date = document.getElementById('date').value;

      const nuevaReserva = {
        eventId: event.id,
        visitorId: user.id,
        date: date
      };

      try {
        await axios.post(RESERVATIONS_API, nuevaReserva);
        document.getElementById('reservationSuccess').classList.remove('hidden');
        form.reset();
      } catch (err) {
        console.error('Error al reservar:', err);
      }
    });

  } catch (error) {
    console.error('Error al obtener el evento:', error);
  }
}
