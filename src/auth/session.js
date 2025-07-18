// session.js placeholder

function showSection(section) {
    registerSection.classList.add('hidden');
    visitorSection.classList.add('hidden');
    reservationSection.classList.add('hidden');
    hostPanelSection.classList.add('hidden');
    visitorPanelSection.classList.add('hidden');
    section.classList.remove('hidden');
  }

  showRegisterBtn.addEventListener('click', () => showSection(registerSection));
  showVisitorBtn.addEventListener('click', () => {
    showSection(visitorSection);
    loadHosts();
  });
  showHostPanelBtn.addEventListener('click', () => {
    if (!currentHostId) {
      alert('Por favor, inicia sesión como anfitrión para ver tus reservas.');
      return;
    }
    showSection(hostPanelSection);
    loadReservations();
  });
  showVisitorPanelBtn.addEventListener('click', () => {
    showSection(visitorPanelSection);
    loadVisitorReservations();
  });