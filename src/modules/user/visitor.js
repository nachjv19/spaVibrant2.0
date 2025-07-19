// src/modules/visitors.js

import axios from 'axios';

const visitorsAPI = 'http://localhost:3000/visitors';

export function initVisitorView() {
  const container = document.getElementById('visitorList');
  if (!container) return;

  axios.get(visitorsAPI)
    .then(response => {
      container.innerHTML = '';
      response.data.forEach(visitor => {
        const div = document.createElement('div');
        div.className = 'p-2 border-b';
        div.innerText = `Nombre: ${visitor.name} | Email: ${visitor.email}`;
        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error al cargar visitantes:', error);
    });
}
