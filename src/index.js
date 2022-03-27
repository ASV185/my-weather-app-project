//Function for Date
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
let formattedDate=`${day},`;
return formattedDate;

}
  //QuerySelector for Date and format for Date
  let now= new Date();
  let date= document.querySelector("#date");
  date.innerHTML= `${formatDate(now)}`;
  //Function for time
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
//Format for time, and  QuerySelector
let time= document.querySelector("#time");
time.innerHTML=`${formatTime(now)}`;
//QuerySelectors for weather information
function displayWeatherCondition(response) {
  let temperatureElement= document.querySelector("#temperature");
  let cityElement= document.querySelector("#city");
  let descriptionElement= document.querySelector("#description");
  let humidityElement= document.querySelector("#humidity");
  let windElement= document.querySelector("#wind");
  let tempMinElement= document.querySelector("#temp-min");
  let tempMaxElement= document.querySelector("#temp-max");
  celsiusTemperature= response.data.main.temp;

  temperatureElement.innerHTML= Math.round (response.data.main.temp);
  cityElement.innerHTML= response.data.name;
  descriptionElement.innerHTML= response.data.weather[0].description;
  humidityElement.innerHTML= response.data.main.humidity;
  windElement.innerHTML= Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML= Math.round (response.data.main.feels_like);
  tempMinElement.innerHTML= Math.round (response.data.main.temp_min);
  tempMaxElement.innerHTML= Math.round (response.data.main.temp_max);
}
// Search city using API
function searchCity(city) {
  let apiKey = "ba0e4799e1fd496cce3683dfddd87bcc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
// Submit event for city and queryselector for city input
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
// position function for searching location using API
function searchLocation(position) {
  let apiKey = "ba0e4799e1fd496cce3683dfddd87bcc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
// search event for current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
// Receive Fahrenheit temperature and queryselector for Fahrenheit ( when you click F)
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature= (celsiusTemperature*9)/5+32;
  let temperatureElement= document.querySelector ("#temperature");
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
// Receive Celsius temperature and queryselector for Celsius ( when you click C)
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement= document.querySelector ("#temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature= null;
// EventListeners for search form, current location, Fahrenheit and Celsius
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-pin");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("El Paso");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink= document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);