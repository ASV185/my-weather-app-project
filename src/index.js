
function formatDate(timestamp) {
  let date = newDate(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

let day = days[date.getDay()];
return `${day}${hours}:${minutes}`;

}

function displayWeatherCondition(response) {
  let temperatureElement= document.querySelector("#temperature");
  let cityElement= document.querySelector("#city");
  let descriptionElement= document.querySelector("#description");
  let humidityElement= document.querySelector("#humidity");
  let windElement= document.querySelector("#wind");
  let dateElement= document.querySelector("#date");
  celsiusTemperature= response.data.main.temp;

  temperatureElement.innerHTML= Math.round (response.data.main.temp);
  cityElement.innerHTML= response.data.name;
  descriptionElement.innerHTML= response.data.weather[0].description;
  humidityElement.innerHTML= response.data.main.humidity;
  windElement.innerHTML= Math.round(response.data.wind.speed);
  dateElement.innerHTML= formatDate(response.data.dt*1000);
}

function searchCity(city) {
  let apiKey = "5560976f4c6da3010becbefe98ff5b86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5560976f4c6da3010becbefe98ff5b86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature= (celsiusTemperature*9)/5+32;
  let temperatureElement= document.querySelector ("#temperature");
  celsiuslink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement= document.querySelector ("#temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
}

let celsiusTemperature= null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("El Paso");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let CelsiusLink= document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);