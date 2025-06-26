const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Required to resolve file paths for static files

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Dummy database
let users = [];
let buses = [
    { busNumber: '101', location: 'Main Station', status: 'On time' },
    { busNumber: '102', location: 'Central Park', status: 'Delayed' },
    { busNumber: '103', location: 'City Mall', status: 'On time' }
];

// User registration route
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const newUser = { name, email, password };
    users.push(newUser);

    res.status(201).json({ message: 'Registration successful!' });
});

// User login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password!' });
    }

    res.status(200).json({ message: 'Login successful!', user });
});

// Get all buses
app.get('/buses', (req, res) => {
    res.status(200).json(buses);
});

//User logut Route
app.post('/logout', (req, res) => {
    if (err) {
        return res.status(500).send('Error logging out');
    }
    res.status(200).send('Logout successful!');
});

// Find a bus by bus number
app.get('/buses/:busNumber', (req, res) => {
    const { busNumber } = req.params;
    const bus = buses.find(b => b.busNumber === busNumber);

    if (!bus) {
        return res.status(404).json({ message: 'Bus not found!' });
    }

    res.status(200).json(bus);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
