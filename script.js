// Wait until the full HTML document is loaded before running any JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Get references to DOM elements
  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityNameDisplay = document.getElementById('city-name');
  const temperatureDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  const errorMessageDisplay = document.getElementById('error-message');

  // OpenWeatherMap API key (replace with yours if needed)
  const API_KEY = "8288cee41975a8361749958ce0c17be0";

  // Event listener for button click to fetch weather
  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim(); // Remove extra spaces
    if (!city) return; // Do nothing if input is empty

    try {
      // Try to fetch weather data
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData); // Show the data if successful
    } catch (error) {
      showError(); // Show error if city not found or API fails
    }
  });

  // Function to fetch weather data from OpenWeatherMap API
  async function fetchWeatherData(city) {
    // Construct the API URL with city and API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    const response = await fetch(url); // Make the API request
    console.log(typeof response);
    console.log("Response:", response);

    if (!response.ok) {
      // If response is not OK (e.g., city not found), throw error
      throw new Error("City not found!");
    }

    const data = await response.json(); // Parse response to JSON
    return data;
  }

  // Function to display weather data on the page
  function displayWeatherData(data) {
    console.log(data);

    // Destructure useful values from the data
    const { name, main, weather } = data;

    // Update DOM elements with weather data
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    // Show weather info and hide error message if previously shown
    weatherInfo.classList.remove('hidden');
    errorMessageDisplay.classList.add('hidden');
  }

  // Function to show an error message if fetch fails
  function showError() {
    // Show the info section in case it was hidden
    weatherInfo.classList.remove('hidden');
    // Show the error message
    errorMessageDisplay.classList.remove('hidden');
  }
});
