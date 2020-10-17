//SEARCH ENGINE
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name.toUpperCase();
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#temperatureDescription").innerHTML =
    response.data.weather[0].main;
    celsiusTemperature = response.data.main.temp;
//HUMIDITY/WINDSPEED
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
//WEATHER ICON
  let weatherIcon = document.querySelector(".weatherInfo img");
  let imgCode = {
    "01d": "https://ssl.gstatic.com/onebox/weather/256/sunny.png",
    "01n": "https://ssl.gstatic.com/onebox/weather/256/sunny.png",
    "02d": "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png",
    "02n": "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png",
    "03d": "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png",
    "03n": "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png",
    "04d": "https://ssl.gstatic.com/onebox/weather/256/cloudy.png",
    "04n": "https://ssl.gstatic.com/onebox/weather/256/cloudy.png",
    "09d": "https://ssl.gstatic.com/onebox/weather/256/rain_heavy.png",
    "09n": "https://ssl.gstatic.com/onebox/weather/256/rain_heavy.png",
    "10d": "https://ssl.gstatic.com/onebox/weather/256/rain.png",
    "10n": "https://ssl.gstatic.com/onebox/weather/256/rain.png",
    "11d": "https://ssl.gstatic.com/onebox/weather/256/thunderstorms.png",
    "11n": "https://ssl.gstatic.com/onebox/weather/256/thunderstorms.png",
    "13d": "https://ssl.gstatic.com/onebox/weather/256/snow.png",
    "13n": "https://ssl.gstatic.com/onebox/weather/256/snow.png",
    "50d": "https://ssl.gstatic.com/onebox/weather/256/snow.png",
    "50n": "https://ssl.gstatic.com/onebox/weather/256/snow.png",
  };
  weatherIcon.src = imgCode[response.data.weather[0].icon];
}

function searchCity(city) {
  let apiKey = "c21c69cfcac20320f0c03c2e080dbc19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function returnCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  searchCity(city);
}

function showLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "c21c69cfcac20320f0c03c2e080dbc19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let city = document.querySelector("#searchForm");
city.addEventListener("submit", returnCity);

let currentLocation = document.querySelector("#locationButton");
currentLocation.addEventListener("click", getLocation);

searchCity("Amsterdam");

//FORECAST
function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

   let imgCodeForeCast = {
    "01d": "https://ssl.gstatic.com/onebox/weather/256/sunny.png",
    "01n": "https://ssl.gstatic.com/onebox/weather/256/sunny.png",
    "02d": "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png",
    "02n": "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png",
    "03d": "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png",
    "03n": "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png",
    "04d": "https://ssl.gstatic.com/onebox/weather/256/cloudy.png",
    "04n": "https://ssl.gstatic.com/onebox/weather/256/cloudy.png",
    "09d": "https://ssl.gstatic.com/onebox/weather/256/rain_heavy.png",
    "09n": "https://ssl.gstatic.com/onebox/weather/256/rain_heavy.png",
    "10d": "https://ssl.gstatic.com/onebox/weather/256/rain.png",
    "10n": "https://ssl.gstatic.com/onebox/weather/256/rain.png",
    "11d": "https://ssl.gstatic.com/onebox/weather/256/thunderstorms.png",
    "11n": "https://ssl.gstatic.com/onebox/weather/256/thunderstorms.png",
    "13d": "https://ssl.gstatic.com/onebox/weather/256/snow.png",
    "13n": "https://ssl.gstatic.com/onebox/weather/256/snow.png",
    "50d": "https://ssl.gstatic.com/onebox/weather/256/snow.png",
    "50n": "https://ssl.gstatic.com/onebox/weather/256/snow.png",
  };

  for (let index = 0; index < 40; index += 8) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2 forecastWeather">
      <h3>
        ${formatForecastDay(forecast.dt * 1000)}
        </br>
        ${formatForecast(forecast.dt * 1000)}
      </h3>
      <img src="${imgCodeForeCast[forecast.weather[0].icon]}"
      id="forecastIcon"
      width="25" />
      <div class="forecastTemperature">
          ${Math.round(forecast.main.temp)}°C
      </div>
    </div>
  `;
  }
}

//CELCIUS TO FAHRENHEIT
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#changeFahr");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#changeCels");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//DATE FORMULA
/*
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
*/

function formatForecastDay(timestamp) {
  let formatdate = new Date(timestamp);
  let day = days[formatdate.getDay()];
  return `${day}`;
}

function formatForecast(timestamp) {
  let formatdate = new Date(timestamp);
  let date = formatdate.getDate();
  let month = formatdate.getMonth();
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  return `${date}/${month}`;
}

let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
  }
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = weekday[now.getDay()];

let curMonth = [
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
  "December",
];
let month = curMonth[now.getMonth()];

h2.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes}`;
