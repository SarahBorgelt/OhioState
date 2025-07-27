# OSU Website with Campus Map & Weather App

## Overview
This project is a full-stack web application that displays the Ohio State University campus map alongside current weather data for the location. It also includes a financial aid calculator, campus life section, and more. The frontend uses the Google Maps API to render the campus map and fetches weather data from a custom Express backend, which interacts with the OpenWeather API.

## Features
- Interactive Google Map showing the OSU campus with a marker.
- Live weather data fetched dynamically based on geolocation.
- Backend proxy to securely handle API keys for OpenWeather and Google Maps.
- Responsive UI with a navigation sidebar and clean layout.
- Error handling with user feedback for failed data fetches.
- JavaScript-based financial aid calculator to estimate a student's payment responsibility.

## Problem-Solving Process

### Backend API Architecture
- Developed a RESTful Express API with endpoints for weather data and Google Maps API key retrieval.
- Proxied OpenWeather API calls to keep API keys secure on the server side.
- Supported flexible queries via city names or latitude/longitude parameters.
- Implemented robust error handling with appropriate HTTP status codes.

### Frontend Integration
- Dynamically loaded the Google Maps script after securely retrieving the API key from the backend.
- Asynchronously fetched map and weather data to ensure smooth user experience.
- Handled different environments by dynamically setting the backend base URL depending on whether running locally or on Heroku.

### Edge Cases and Error Handling
- Validated query parameters on the backend; returned `400` errors when fields were missing.
- Displayed user-friendly messages on the frontend for weather fetch failures.
- Used default map center and fallback content to prevent blank screens.

### Database Schema Design
- No database is required, as the app only displays live API data.
- Future features like saved locations could require a schema for user data.

## Performance and Security Awareness
- Protected API keys using environment variables; only necessary data is sent to the frontend.
- Locked dependency versions in `package.json` to avoid unexpected updates.
- Validated backend input to guard against invalid requests.
- Handled error states with `try/catch` blocks and displayed frontend notifications.
- Reduced load time by conditionally loading the Google Maps API.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/osu-campus-map-weather.git
   ```

2. Navigate to the project directory and install dependencies:
   ```bash
   cd osu-campus-map-weather
   npm install
   ```

3. Create a `.env` file in the backend root with your API keys:
   ```
   WeatherAPI=your_openweather_api_key
   GoogleMapsAPI=your_google_maps_api_key
   ```

4. Start the backend server locally:
   ```bash
   npm run dev
   ```

5. Open the frontend in your browser by either:
   - Running a local server, or
   - Opening the `index.html` file directly.

## Deployment
The app is deployed on **Heroku**.

🔗 **Live App**: [https://osuwebsite-9314a874767a.herokuapp.com](https://osuwebsite-9314a874767a.herokuapp.com)

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
