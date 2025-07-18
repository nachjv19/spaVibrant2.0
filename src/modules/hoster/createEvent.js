hostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const plans = Array.from(document.querySelectorAll('.plan')).map(plan => ({
      name: plan.querySelector('[name="planName"]').value,
      description: plan.querySelector('[name="planDescription"]').value,
      price: parseFloat(plan.querySelector('[name="planPrice"]').value),
      duration: parseInt(plan.querySelector('[name="planDuration"]').value),
    }));

    const host = {
      name: document.getElementById('hostName').value,
      city: document.getElementById('hostCity').value,
      description: document.getElementById('hostDescription').value,
      photo: document.getElementById('hostPhoto').value || 'https://via.placeholder.com/150',
      plans,
    };

    try {
      const response = await fetch('http://localhost:3000/hosts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(host),
      });
      if (response.ok) {
        alert('Anfitrión registrado con éxito');
        hostForm.reset();
        plansContainer.innerHTML = plansContainer.querySelector('.plan').outerHTML; // Resetear a un solo plan
        currentHostId = (await response.json()).id; // Simular login
      } else {
        alert('Error al registrar anfitrión');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  });