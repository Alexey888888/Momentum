const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=2ea972ee680a265e8dfa10d6c6846a4b&units=metric
  `;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod) {
    city.value = data.message;
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.innerHTML = "";
    humidity.innerHTML = "";
  }
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.innerHTML = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  city.value = data.name;
}

function setLocalStorage() {
  localStorage.setItem("city", city.value);
  getWeather();
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
  getWeather();
}
window.addEventListener("load", getLocalStorage);

city.addEventListener("change", setLocalStorage);
