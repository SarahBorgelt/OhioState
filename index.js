require('dotenv').config();
const express = require('express');
const axios = require('axios');  // Fixed import here
const cors = require('cors');

const app = express();
app.use(cors());

// Use Heroku's port or 5000 locally
const PORT = process.env.PORT || 5000;

// Match your actual env var names here
const WeatherAPI = process.env.WeatherAPI;
const GoogleMapsAPI = process.env.GoogleMapsAPI;

// Weather endpoint
app.get('/weather', async (req, res) => {
  const { city, lat, lon } = req.query;

  if (!city && (!lat || !lon)) {
    return res.status(400).json({ error: 'Please provide a city or lat and lon parameters.' });
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?appid=${WeatherAPI}&units=imperial`;

  if (city) {
    url += `&q=${city}`;
  } else {
    url += `&lat=${lat}&lon=${lon}`;
  }

  try {
    const weatherResponse = await axios.get(url);
    res.json(weatherResponse.data);
  } catch (err) {
    res.status(500).json({ error: 'Weather fetch failed' });
  }
});

// Endpoint to securely send Google Maps API key to frontend
app.get('/apikey', (req, res) => {
  res.json({ key: GoogleMapsAPI });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});