// src/modules/views/guest/landing.js
import { renderNavbar } from "../../components/navbar.js";
import axios from "axios";

const API_EVENTS_URL = "http://localhost:3000/events";

export async function renderLanding() {
  await renderNavbar();
  await cargarVistaHTML(); // Carga el HTML de la vista landing
  cargarEventosDestacados();
  configurarModal();
  configurarBotonRegistro();
}

async function cargarVistaHTML() {
  const main = document.getElementById("main-view");
  if (!main) return;

  try {
    const res = await axios.get("/src/modules/views/guest/landing.html");
    const template = document.createElement("template");
    template.innerHTML = res.data.trim(); // Parseamos a DOM
    const vista = template.content.cloneNode(true);
    main.replaceChildren(vista); // Sin innerHTML
  } catch (error) {
    console.error("Error cargando landing.html:", error);
  }
}

function cargarEventosDestacados() {
  const contenedor = document.getElementById("landingEvents");
  if (!contenedor) return;

  axios.get(API_EVENTS_URL)
    .then(res => {
      const eventos = res.data.slice(0, 6);
      eventos.forEach(evento => {
        const card = crearTarjetaEvento(evento);
        contenedor.appendChild(card);
      });
    })
    .catch(err => console.error("Error al cargar eventos:", err));
}

function crearTarjetaEvento(evento) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition";
  card.addEventListener("click", () => mostrarModal(evento));

  const titulo = document.createElement("h3");
  titulo.className = "text-xl font-bold mb-2";
  titulo.textContent = evento.title;

  const descripcion = document.createElement("p");
  descripcion.className = "text-gray-600 text-sm";
  descripcion.textContent = evento.description;

  card.appendChild(titulo);
  card.appendChild(descripcion);

  return card;
}

function mostrarModal(evento) {
  const modal = document.getElementById("eventModal");
  const titulo = document.getElementById("modalTitle");
  const descripcion = document.getElementById("modalDescription");
  const fecha = document.getElementById("modalDate");

  if (modal && titulo && descripcion && fecha) {
    titulo.textContent = evento.title;
    descripcion.textContent = evento.description;
    fecha.textContent = `Fecha del evento: ${evento.date}`;
    modal.classList.remove("hidden");
  }
}

function configurarModal() {
  const modal = document.getElementById("eventModal");
  const cerrarBtn = document.getElementById("closeModalBtn");

  if (modal && cerrarBtn) {
    cerrarBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }
}

function configurarBotonRegistro() {
  const boton = document.getElementById("registerBtn");
  if (boton) {
    boton.addEventListener("click", () => {
      window.location.hash = "#/register";
    });
  }
}
