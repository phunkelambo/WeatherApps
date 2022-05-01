let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
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

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let day = days[now.getDay()];
let dates = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();

let date = document.querySelector("#date");
date.innerHTML = `${day}, ${month} ${dates}, ${year}`;

let time = document.querySelector("#time");
time.innerHTML = `${hours}:${minutes}`;

function displayWeatherInfo(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#cont").innerHTML = response.data.weather[0].main;

  document.querySelector("#tempC").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#tempF").innerHTML = Math.round(
    document.getElementById("#tempC".value * 9) / 5 + 32
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchInput(city) {
  let apikey = "3867ba5bddd3dc3e708c90982a1135dd";
  let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(Url).then(displayWeatherInfo);
}

function searchInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#cityName").value;
  searchInput(city);
}

function searchLocation(position) {
  let apiKey = "3867ba5bddd3dc3e708c90982a1135dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#cityDetails");
form.addEventListener("submit", searchInfo);

let currentLocation = document.querySelector("#currentlocation");
currentLocation.addEventListener("click", getCurrentLocation);

function convertToF(celsius) {
  return "#tempF";
}

let tempF = document.querySelector("#tempF");
tempF.addEventListener("click", convertToF);

searchInput("Toronto");
