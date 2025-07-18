// navbar.js placeholder

export function loadNavBar(){
    const user = getCurrentUser();
    const navbar = document.querySelector('#navbar');
    if(!navbar) return;


    navbar.innerHTML = `
        nav class="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <a href="#/" class="mr-4">Inicio</a>
        ${user?.role === 'admin' ? '<a href="#/admin" class="mr-4">Panel Admin</a>' : ''}
        ${user?.role === 'hoster' ? '<a href="#/hoster" class="mr-4">Panel Host</a>' : ''}
        ${user ? '<a href="#/reservas" class="mr-4">Mis Reservas</a>' : ''}
      </div>
      <div>
        ${user ? `
          <span class="mr-2">Hola, ${user.username}</span>
          <button id="logoutBtn" class="bg-red-500 px-2 py-1 rounded">Salir</button>
        ` : ''}
      </div>
    </nav>
  `;

  if (user) {
    document.querySelector('#logoutBtn')?.addEventListener('click', logout);
  }
}



export function NavigateTo(hash) {
    window.location.hash = hash;
}




