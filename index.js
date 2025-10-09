require('dotenv').config(); //loads environment variables from .env file to keep API keys secret
const express = require('express'); //loads express framework to create a server and handle HTTP requests
const axios = require('axios'); //library for making HTTP requests (used to fetch weather data from OpenWeatherMap API)
const cors = require('cors'); //Middleware to enable Cross-Origin Resource Sharing (CORS)
const path = require('path'); //Node.js module to handle file paths in a platofmr independent way

const app = express(); //my server instance
app.use(cors()); //allows frontend to make requests to backend from different domain or port

const PORT = process.env.PORT || 5000; //Uses the port specified in the environment variable PORT or defaults to 5000

//Retrieve API keys from environment variables
const WeatherAPI = process.env.WeatherAPI;
const GoogleMapsAPI = process.env.GoogleMapsAPI;

// Serve static files from Public/Frontend. Makes the frontend accessible when visiting from the server
app.use(express.static(path.join(__dirname, 'Public', 'Frontend')));

// Root route (optional, since frontend will serve index.html). Sends index.html from the frontend folder when someone visits the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'Frontend', 'index.html'));
});

// This creates a backend endpoint that the frontend can call to get weather data. It accepts
//query parameters likw city name or latitude and longitude coordinates.
app.get('/weather', async (req, res) => {
  const { city, lat, lon } = req.query;

  // Validate input: either city or lat and lon must be provided
  if (!city && (!lat || !lon)) {
    return res.status(400).json({ error: 'Please provide a city or lat and lon parameters.' });
  }

  //Builds a URL to call the OpenWeatherMap API based on the provided parameters
  let url = `https://api.openweathermap.org/data/2.5/weather?appid=${WeatherAPI}&units=imperial`;

  if (city) {
    url += `&q=${city}`;
  } else {
    url += `&lat=${lat}&lon=${lon}`;
  }

  //Fetches data via axios and sends it back using JSON
  try {
    const weatherResponse = await axios.get(url);
    res.json(weatherResponse.data);
    //Catches errors and responds as appropriate
  } catch (err) {
    res.status(500).json({ error: 'Weather fetch failed' });
  }
});

// Google Maps API key endpoint
app.get('/apikey', (req, res) => {
  res.json({ key: GoogleMapsAPI });
});

// Catch-all route to serve frontend index.html (for client-side routing or refresh) and handles all requests not serviced above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'Frontend', 'index.html'));
});

//Listens for requests on the specified port and logs a message to the console when the server is running
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
