require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const WeatherAPI = process.env.WeatherAPI;
const GoogleMapsAPI = process.env.GoogleMapsAPI;

// Root route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

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

// Google Maps API key endpoint
app.get('/apikey', (req, res) => {
  res.json({ key: GoogleMapsAPI });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});