
function formatDate(timestamp) {
  let date = new Date(timestamp);
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

let months= [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let month= months[date.getMonth()];

let year= date.getFullYear();
let formattedDate=`${day}, ${month} ${year}`;
return formattedDate;

}

  let now= new Date();
  let date= document.querySelector("#date");
  date.innerHTML= `${formatDate(now)}`;

  function formatTime (timestamp) {
    let date= new Date (timestamp);
    let hours= date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedTime= `${hours}:${minutes}`;
  return formattedTime;
}

let time= document.querySelector("#time");
time.innerHTML=`${formatTime(now)}`;

function displayWeatherCondition(response) {
  let temperatureElement= document.querySelector("#temperature");
  let cityElement= document.querySelector("#city");
  let descriptionElement= document.querySelector("#description");
  let humidityElement= document.querySelector("#humidity");
  let windElement= document.querySelector("#wind");
  celsiusTemperature= response.data.main.temp;

  temperatureElement.innerHTML= Math.round (response.data.main.temp);
  cityElement.innerHTML= response.data.name;
  descriptionElement.innerHTML= response.data.weather[0].description;
  humidityElement.innerHTML= response.data.main.humidity;
  windElement.innerHTML= Math.round(response.data.wind.speed);
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
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement= document.querySelector ("#temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature= null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("El Paso");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink= document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);