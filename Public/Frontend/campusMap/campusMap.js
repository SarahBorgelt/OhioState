const osuCoords = { lat: 40.0061, lng: -83.0283 }; // Ohio State University coordinates
const weatherDiv = document.getElementById('weather'); //Obtains the DOM element to display weather info

// Change this to your backend base URL (set dynamically or hardcoded for production)
const backendBaseURL = 'http://localhost:5000' || process.env.BACKEND_URL;

// Load Google Maps script (asynchronously) dynamically after fetching the key from backend
async function loadGoogleMaps() {
  try {
    //Fetch the Google Maps API key from the backend
    const response = await fetch(`${backendBaseURL}/apikey`);

    //Converts the response to JSON format
    const data = await response.json();

    //Retrieves the actual API key securely from the backend
    const googleMapsKey = data.key;

    //Create a new script element in memory to dynamically add JavaScript to the page
    const script = document.createElement('script');

    //Sets the source of the script to the Google Maps API URL with the retrieved key and a callback to initMap
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&callback=initMap`;

    //The script is loaded asynchronously and does not block page rendering
    //Defer ensures the script is executed after the document has been parsed
    script.async = true;
    script.defer = true;

    //Adds the script element to the <head> of HTML
    document.head.appendChild(script);

    //Creates an error handler in case the script fails to load
  } catch (err) {
    console.error('Failed to load Google Maps API key:', err);
  }
}

//Defines a global function to initialize the map. Google Maps script will automatically call this function once loaded
//because of the callback=initMap in the script URL
window.initMap = function () {
  
  //Creates a new Google map object
  const map = new google.maps.Map(document.getElementById('map'), {

    //Centers the map at Ohio State University coordinates with a zoom level of 15
    center: osuCoords,
    zoom: 15,
  });

  //Adds a marker on the map at Ohio State University coordinates
  new google.maps.Marker({
    position: osuCoords, //Places it at Ohio State University coordinates
    map: map, //Specifies which map to place the marker on
    title: 'Ohio State University', //shows this text when hovering over the marker
  });
};

//Defines a function to fetch and display current weather information
function loadWeather() {

  //Calls the backend endpoint to get weather data for Ohio State University coordinates
  //Base URL ensures that it works locally and in production
  fetch(`${backendBaseURL}/weather?lat=${osuCoords.lat}&lon=${osuCoords.lng}`)

    //Converts the response to JSON format
    .then((response) => response.json())

    //Extract relevant weather data after the network call completes
    .then((data) => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      //Updates the HTML content inside of the weatherDiv element and replaces any existing content
      //with new weather card
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
    //Handles any errors that occur during the fetch or data processing
    .catch((err) => {
      weatherDiv.innerHTML = '<p>Unable to load weather data.</p>';
      console.error(err);
    });
}

// Run both loaders when page loads (i.e., the code runs both the map and weather functions, ensuring that the 
//map is displayed and the weather data is fetched without errors)
window.onload = () => {
  loadGoogleMaps();
  loadWeather();
};