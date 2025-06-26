// Register Page
document.getElementById('registerForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    alert(data.message);
    if (data.message === 'Registration successful!') {
        window.location.href = 'login.html';
    }
});

// Login Page
document.getElementById('loginForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    alert(data.message);
    if (data.message === 'Login successful!') {
        window.location.href = 'tracker.html';
    }
});

// Bus Tracker Page
async function loadBuses() {
    const response = await fetch('http://localhost:3000/buses');
    const buses = await response.json();
    
    let busListDiv = document.getElementById('busList');
    buses.forEach(bus => {
        let busItem = document.createElement('div');
        busItem.innerHTML = `<strong>Bus Number: ${bus.busNumber}</strong><br>Location: ${bus.location}<br>Status: ${bus.status}<hr>`;
        busListDiv.appendChild(busItem);
    });
}

if (document.getElementById('busList')) {
    loadBuses();
}

// Find Bus Page
async function findBus() {
    const busNumber = document.getElementById('busNumber').value;
    const response = await fetch(`http://localhost:3000/buses/${busNumber}`);
    
    const bus = await response.json();
    
    let busDetails = document.getElementById('busDetails');
    if (bus.message) {
        busDetails.innerHTML = `<p>${bus.message}</p>`;
    } else {
        busDetails.innerHTML = `
            <strong>Bus Number: ${bus.busNumber}</strong><br>
            Location: ${bus.location}<br>
            Status: ${bus.status}
        `;
    }
}
