const osuCoords = { lat: 40.0076, lng: -83.0309 };
const weatherDiv = document.getElementById('weather');

// Change this to your backend base URL (set dynamically or hardcoded for production)
const backendBaseURL = 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
    ? 'http://localhost:5000' 
    : 'https://osuwebsite-9314a874767a.herokuapp.com';

// Load Google Maps script dynamically after fetching the key from backend
async function loadGoogleMaps() {
  try {
    const response = await fetch(`${backendBaseURL}/apikey`);
    const data = await response.json();
    const googleMapsKey = data.key;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  } catch (err) {
    console.error('Failed to load Google Maps API key:', err);
  }
}

window.initMap = function () {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: osuCoords,
    zoom: 15,
  });

  new google.maps.Marker({
    position: osuCoords,
    map: map,
    title: 'Ohio State University',
  });
};

// Fetch and display weather data from backend
function loadWeather() {
  fetch(`${backendBaseURL}/weather?lat=${osuCoords.lat}&lon=${osuCoords.lng}`)
    .then((response) => response.json())
    .then((data) => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      weatherDiv.innerHTML = `
        <div class="weather-card">
          <h2>Current Weather</h2>
          <div class="weather-info">
            <img src="${iconUrl}" alt="${desc}">
            <div>
              <p><strong>${desc.charAt(0).toUpperCase() + desc.slice(1)}</strong></p>
              <p>${temp} °F</p>
            </div>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      weatherDiv.innerHTML = '<p>Unable to load weather data.</p>';
      console.error(err);
    });
}

// Run both loaders when page loads
window.onload = () => {
  loadGoogleMaps();
  loadWeather();
};