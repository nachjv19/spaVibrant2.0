// src/main.js
import { initRouter } from './src/router/router.js';
import { showSection } from './src/modules/sectionManager.js';
import { initHostForm } from './src/modules/hoster/host.js';
import { initVisitorView } from './src/modules/user/visitor.js';
import { initReservation } from './src/modules/user/reserveEvent.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar SPA con router
  initRouter();

  // Botones de navegación dentro de secciones (si existen)
  document.getElementById('btnRegister')?.addEventListener('click', () => {
    showSection('registerSection');
  });

  document.getElementById('btnVisitor')?.addEventListener('click', () => {
    showSection('visitorSection');
    initVisitorView();
  });

  document.getElementById('btnHostPanel')?.addEventListener('click', () => {
    showSection('hostPanelSection');
  });

  document.getElementById('btnVisitorPanel')?.addEventListener('click', () => {
    showSection('visitorPanelSection');
  });

  // Inicializar formularios/modulos necesarios
  initHostForm();
  initReservation();
});
