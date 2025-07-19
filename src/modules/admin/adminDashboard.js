import { renderNavbar } from '../../components/navbar.js';

export function renderAdminDashboard() {
  renderNavbar();

  const goToUsers = document.getElementById('goToUsers');
  const goToEvents = document.getElementById('goToEvents');
  const goToReservations = document.getElementById('goToReservations');
  const goToInvoices = document.getElementById('goToInvoices');

  goToUsers.addEventListener('click', () => {
    window.location.hash = '#/admin/users';
  });

  goToEvents.addEventListener('click', () => {
    window.location.hash = '#/admin/events';
  });

  goToReservations.addEventListener('click', () => {
    window.location.hash = '#/admin/reservations';
  });

  goToInvoices.addEventListener('click', () => {
    window.location.hash = '#/admin/invoices';
  });
}
