// modal.js placeholder
// src/components/modal.js

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalCloseBtn = document.getElementById("modal-close");

// Abrir modal con contenido dinámico
export function openModal(contentHTML) {
  modalContent.innerHTML = contentHTML;
  modal.classList.remove("hidden");
  modal.classList.add("flex"); // muestra con flex para centrar contenido
}

// Cerrar modal
export function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  modalContent.innerHTML = ""; // limpia contenido por si se reutiliza
}

// Cierre con botón de cerrar
modalCloseBtn.addEventListener("click", closeModal);

// Cierre al hacer clic fuera del contenido
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
