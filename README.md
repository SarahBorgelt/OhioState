# OSU Website with Campus Map & Weather App

![This screenshot shows the financial aid page in action](/Images/FinancialAid.png)

## Overview
This project is a web application that displays the Ohio State University campus map alongside current weather data. It also includes a financial aid calculator, campus life section, and more. The frontend uses the Google Maps API to render the campus map and fetches weather data through a Node.js backend built with Express, which communicates with the OpenWeather API to provide live weather information.

## Features
- Interactive Google Map showing the OSU campus with a marker.
- Live weather data fetched based on the OSU campus coordinates
- Backend proxy to securely handle API keys for OpenWeather and Google Maps.
- Responsive UI with a navigation sidebar and clean layout.
- JavaScript-based financial aid calculator to estimate a student's payment responsibility.

## Problem-Solving Process

### Backend API Architecture
- Developed a RESTful Express API with endpoints for weather data and Google Maps API key retrieval.
- Proxied OpenWeather API calls to keep API keys secure on the server side.
- Implemented robust error handling with appropriate HTTP status codes.

### Frontend Integration
- Dynamically loaded the Google Maps script after securely retrieving the API key from the backend.
- Asynchronously fetched map and weather data to ensure smooth user experience.
- Handled different environments by dynamically setting the backend base URL depending on whether running locally or on Heroku.

### Edge Cases and Error Handling
- Displayed user-friendly messages on the frontend for weather fetch failures.
- Used default map center and fallback content to prevent blank screens.

## Performance and Security Awareness
- Protected API keys using environment variables; only necessary data is sent to the frontend.
- Locked dependency versions in `package.json` to avoid unexpected updates.
- Validated backend input to guard against invalid requests.
- Handled error states with `try/catch` blocks and displayed frontend notifications.

![This screenshot shows the weather and google maps API for OSU campus coordinates](/Images/APIDisplay.png)

## Installation

**1. Clone the repository:**
   ```bash
   git clone https://github.com/SarahBorgelt/OhioState.git
   ```

**2. Update the `.env` file in the backend root with your API keys:**
   ```
   WeatherAPI=your_openweather_api_key
   GoogleMapsAPI=your_google_maps_api_key
   ```

**3. Start the application:**

- **macOS/Linux:** Double-click the start-mac-or-linux.command file in the project folder to launch the app in a terminal.

- **Windows:** Double-click the start-windows.bat file to launch the app.

**4. The app will start on http://localhost:5000**

## Technologies Used
- Node.js & Express.js  
- Axios for HTTP requests  
- Google Maps JavaScript API  
- OpenWeather API  
- CORS middleware  
- dotenv for environment variable management  

## Contact
For questions or contributions, please contact:  
📧 **borgelt.sarah@gmail.com**
