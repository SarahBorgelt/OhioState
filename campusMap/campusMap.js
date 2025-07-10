
// Google maps API
const osuCoords = {lat: 40.0076, lng: -83.0309}

window.initMap = function (){
     

     const map = new google.maps.Map(document.getElementById("map"),{
          center: osuCoords,
          zoom: 15,
     });

     new google.maps.Marker({
          position: osuCoords,
          map: map,
          title: "Ohio State University"
     })
}

//Switch to weather API

const weatherDiv = document.getElementById('weather');
const weatherApiKey = '7682138d627713b69e416b03205aac64';
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${osuCoords.lat}&lon=${osuCoords.lng}&units=imperial&appid=${weatherApiKey}`)
     .then (response => response.json())
     .then(data => {
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

     .catch(err => {
          weatherDiv.innerHTML = '<p>Unable to load weather data.</p>';
          console.error(err);
     });
