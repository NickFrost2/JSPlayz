const weatherForm = document.querySelector('.weatherForm');
const cityInput = weatherForm.querySelector('.userInput');
const weatherInfo = document.querySelector('.weather-info');
const cityDisplay = weatherInfo.querySelector('.cityDisplay');
const temperatureDisplay = weatherInfo.querySelector('.temperatureDisplay');
const humidityDisplay = weatherInfo.querySelector('.humidityDisplay');
const weatherEmoji = weatherInfo.querySelector('.weatherEmoji');
const descriptionDisplay = weatherInfo.querySelector('.descriptionDisplay');

const errorDisplay = weatherInfo.querySelector('.errorDisplay');

const APIkey = 'a6a52ce0a6b61453dde9049194b4cf4c';

weatherForm.addEventListener('submit', async event => {
   event.preventDefault();
   const city = (cityInput.value).toLowerCase().trim();

   errorDisplay.textContent = "";

   if (city) {
      try {
         const weatherData = await getWeatherData(city);
         displayWeatherInfo(weatherData);
      }
      catch (error) {
         displayError(error);
         console.error(error);
      }
   }
   else {
      return displayError('Please enter a city name!');
   }
});

async function getWeatherData(city) {
   const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
   const response = await fetch(APIurl);
   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`City not found`);
   }
   else {
      const data = await response.json();
      return data;
   }
};

function displayWeatherInfo(data) {
   console.log(data);
   const city = data.name;
   const temperature = Math.round(data.main.temp - 273.15).toFixed(1);
   const humidity = data.main.humidity;
   const weatherId = data.weather[0].id;
   const country = data.sys.country;
   cityDisplay.innerHTML = `${city} <span class="countryCode">${country}</span>`;

   temperatureDisplay.textContent = `${temperature}°C`;
   humidityDisplay.textContent = `Humidity: ${humidity}%`;
   weatherEmoji.textContent = getEmoji(weatherId);
   let description = data.weather[0].description;
   descriptionDisplay.textContent = description.charAt(0).toUpperCase() + description.slice(1);

   weatherInfo.style.display = 'flex';
};

function getEmoji(weatherId) {
   if (weatherId >= 200 && weatherId < 300) return "⛈️";
   if (weatherId >= 300 && weatherId < 500) return "🌧️";
   if (weatherId >= 500 && weatherId < 600) return "🌧️";
   if (weatherId >= 600 && weatherId < 700) return "❄️";
   if (weatherId >= 700 && weatherId < 800) return "🌫️";
   if (weatherId === 800) return "☀️";
   if (weatherId > 800) return "☁️";
   return "❓";
}

function displayError(message) {
   cityDisplay.textContent = "";
   temperatureDisplay.textContent = "";
   humidityDisplay.textContent = "";
   weatherEmoji.textContent = "";
   descriptionDisplay.textContent = "";
   cityInput.value = "";

   errorDisplay.textContent = message;
   errorDisplay.style.color = 'red';
   weatherInfo.style.display = 'flex';
}
