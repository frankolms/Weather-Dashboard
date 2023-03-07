var currentDate = document.getElementById("city-and-date");
var searchCity = document.getElementById("search-city");
var cityName = document.getElementById("city-name");
var citySearch = document.getElementById("city-search");
var todaysDate = "(" + dayjs().format("M/D/YYYY") + ")";
var curTemp = document.getElementById("current-temp");
var curWind = document.getElementById("current-wind");
var curHumid = document.getElementById("current-humidity");
var weatherImage = document.getElementById("weather-img");
var conditionsIcon = document.getElementById("conditions-icon");
currentDate.textContent = todaysDate;

var cities = [];
cities = JSON.parse(localStorage.getItem("cityName")) || [];
for (var i = 0; i < cities.length; i++) {
  var renderSearches = document.createElement("button");
  renderSearches.classList.add("recent-search");
  renderSearches.innerHTML = cities[i];
  citySearch.appendChild(renderSearches);
}

searchCity.addEventListener("click", function () {
  if (!cityName.value) {
    console.log("Please search for a city");
    currentDate.textContent = "Please Search for a City";
  } else {
    var recentSearch = document.createElement("button");
    var cityNameCapitalized =
      cityName.value.charAt(0).toUpperCase() + cityName.value.slice(1);
    recentSearch.innerHTML = cityNameCapitalized;
    console.log(cityNameCapitalized);
    recentSearch.classList.add("recent-search");
    citySearch.appendChild(recentSearch);
    cityName.value = "";

    cities.push(cityNameCapitalized);
    console.log(cities);
    console.log(cities.length);
    localStorage.setItem("cityName", JSON.stringify(cities));
    getLocation(cityNameCapitalized);
  }
});

function getLocation(cityNameCapitalized) {
  var getLatLonUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityNameCapitalized +
    "&limit=5&appid=1141a80686092d25c69d34727f3d9734";
  fetch(getLatLonUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var cityLat = data[0].lat;
      var cityLon = data[0].lon;
      var city = data[0].name;
      getWeather(cityLat, cityLon, city);
    });
}

function getWeather(lat, lon, city) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=1141a80686092d25c69d34727f3d9734`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentDate.textContent = city + " " + todaysDate;
      var currentTemp = data.main.temp;
      var currentWind = data.wind.speed;
      var currentHumidity = data.main.humidity;
      var currentConditions = data.weather[0].icon;
      console.log(currentTemp);
      console.log(currentConditions);
      displayCurrentWeather(
        currentTemp,
        currentWind,
        currentHumidity,
        currentConditions
      );
    });
}

function displayCurrentWeather(
  currentTemp,
  currentWind,
  currentHumidity,
  currentConditions
) {
  curTemp.textContent = "Temp: " + currentTemp + "°F";
  curWind.textContent = "Wind: " + currentWind + " MPH";
  curHumid.textContent = "Humidity: " + currentHumidity + "%";
  conditionsIcon.src =
    "http://openweathermap.org/img/wn/" + currentConditions + "@2x.png";
  conditionsIcon.classList.add("weather-icon");
}
