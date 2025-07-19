// src/modules/createEvents.js
import axios from 'axios';
import { getCurrentUser } from '../auth/session.js'; // para saber qué hoster está logueado

const eventForm = document.getElementById('eventForm');
const plansContainer = document.getElementById('plansContainer');

eventForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const plans = Array.from(document.querySelectorAll('.plan')).map(plan => ({
    name: plan.querySelector('[name="planName"]').value,
    description: plan.querySelector('[name="planDescription"]').value,
    price: parseFloat(plan.querySelector('[name="planPrice"]').value),
    duration: parseInt(plan.querySelector('[name="planDuration"]').value),
  }));

  const currentHoster = getCurrentUser(); // suponemos que solo un hoster puede crear eventos

  const event = {
    title: document.getElementById('eventTitle').value,
    city: document.getElementById('eventCity').value,
    description: document.getElementById('eventDescription').value,
    photo: document.getElementById('eventPhoto').value || 'https://via.placeholder.com/150',
    plans,
    created_at: new Date().toISOString(),
    deleted_at: null,
    deleted_by: null,
    is_active: true,
    hoster_id: currentHoster.id // relacionamos el evento con el hoster
  };

  try {
    const response = await axios.post('http://localhost:3000/events', event);
    if (response.status === 201) {
      alert('Evento creado con éxito');
      eventForm.reset();
      plansContainer.innerHTML = plansContainer.querySelector('.plan').outerHTML;
    } else {
      alert('Error al crear evento');
    }
  } catch (error) {
    console.error('Error al conectar con el servidor', error);
    alert('Error al conectar con el servidor');
  }
});
