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
var fiveDay = document.getElementById("five-day-cards");
var fiveDayChild1 = document.getElementById("forecast-0");
var fiveDayChild2 = document.getElementById("forecast-1");
var fiveDayChild3 = document.getElementById("forecast-2");
var fiveDayChild4 = document.getElementById("forecast-3");
var fiveDayChild5 = document.getElementById("forecast-4");
currentDate.textContent = todaysDate;

var locationData;
var weather;
var appendSearchLocationData;

var cities = [];
cities = JSON.parse(localStorage.getItem("cityName")) || [];
for (var i = 0; i < cities.length; i++) {
  var renderSearches = document.createElement("button");
  renderSearches.classList.add("recent-search");
  renderSearches.innerHTML = cities[i];
  citySearch.appendChild(renderSearches);
  renderSearches.addEventListener("click", function (event) {
    var getLatLonUrl =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      event.target.innerHTML +
      "&limit=5&appid=1141a80686092d25c69d34727f3d9734";
    fetch(getLatLonUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        appendSearchLocationData = data;
        return fetch(
          "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
            data[0].lat +
            "&lon=" +
            data[0].lon +
            "&appid=1141a80686092d25c69d34727f3d9734"
        );
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        currentDate.textContent =
          appendSearchLocationData[0].name + " " + todaysDate;
        curTemp.textContent = "Temp: " + data.main.temp + "°F";
        curWind.textContent = "Wind: " + data.wind.speed + " MPH";
        curHumid.textContent = "Humidity: " + data.main.humidity + "%";
        conditionsIcon.src =
          "https://openweathermap.org/img/wn/" +
          data.weather[0].icon +
          "@2x.png";
        conditionsIcon.classList.add("weather-icon");
      });

    fetch(getLatLonUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        appendSearchLocationData = data;
        return fetch(
          "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" +
            appendSearchLocationData[0].lat +
            "&lon=" +
            appendSearchLocationData[0].lon +
            "&appid=1141a80686092d25c69d34727f3d9734"
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            displayFiveDayForecast(data);
          });
      });
  });
}

searchCity.addEventListener("click", function () {
  if (!cityName.value) {
    currentDate.textContent = "Please Search for a City";
  } else {
    var cityNameCapitalized =
      cityName.value.charAt(0).toUpperCase() + cityName.value.slice(1);

    cities.push(cityNameCapitalized);
    localStorage.setItem("cityName", JSON.stringify(cities));
    getLocation(cityNameCapitalized);
  }
});

function getLocation(cityNameCapitalized) {
  var getLatLonUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityNameCapitalized +
    "&limit=5&appid=1141a80686092d25c69d34727f3d9734";
  fetch(getLatLonUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      locationData = data;
      return fetch(
        "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
          locationData[0].lat +
          "&lon=" +
          locationData[0].lon +
          "&appid=1141a80686092d25c69d34727f3d9734"
      );
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherData) {
      weather = weatherData;
      displayCurrentWeather();
      appendSearches();
      fiveDayForecast();
    });
}

function fiveDayForecast() {
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" +
    locationData[0].lat +
    "&lon=" +
    locationData[0].lon +
    "&appid=1141a80686092d25c69d34727f3d9734";

  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayFiveDayForecast(data);
    });
}

function displayFiveDayForecast(data) {
  fiveDayChild1.textContent = " ";
  fiveDayChild2.textContent = " ";
  fiveDayChild3.textContent = " ";
  fiveDayChild4.textContent = " ";
  fiveDayChild5.textContent = " ";
  for (var i = 0; i < data.list.length; i++) {
    if (data.list[i].dt_txt.split(" ")[1] === "12:00:00") {
      var futureDate = document.createElement("p");
      futureDate.textContent =
        "(" + dayjs(data.list[i].dt_txt.split(" ")[0]).format("M/D/YYYY") + ")";
      futureDate.classList.add("future-weather");
      fiveDayChild1.append(futureDate);
      var futureIcon = document.createElement("img");
      futureIcon.src =
        "https://openweathermap.org/img/wn/" +
        data.list[i].weather[0].icon +
        "@2x.png";
      futureIcon.classList.add("weather-icon");
      fiveDayChild2.append(futureIcon);

      var futureTemp = document.createElement("p");
      futureTemp.classList.add("future-weather");
      futureTemp.textContent = "Temp: " + data.list[i].main.temp + "°F";
      fiveDayChild3.append(futureTemp);

      var futureWind = document.createElement("p");
      futureWind.classList.add("future-weather");
      futureWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
      fiveDayChild4.append(futureWind);

      var futureHumidity = document.createElement("p");
      futureHumidity.classList.add("future-weather");
      futureHumidity.textContent =
        "Humidity: " + data.list[i].main.humidity + "%";
      fiveDayChild5.append(futureHumidity);
    }
  }
}

function displayCurrentWeather() {
  currentDate.textContent = locationData[0].name + " " + todaysDate;
  curTemp.textContent = "Temp: " + weather.main.temp + "°F";
  curWind.textContent = "Wind: " + weather.wind.speed + " MPH";
  curHumid.textContent = "Humidity: " + weather.main.humidity + "%";
  conditionsIcon.src =
    "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
  conditionsIcon.classList.add("weather-icon");
}

function appendSearches() {
  var recentSearch = document.createElement("button");
  var cityNameCapitalized =
    cityName.value.charAt(0).toUpperCase() + cityName.value.slice(1);
  recentSearch.innerHTML = cityNameCapitalized;
  recentSearch.classList.add("recent-search");
  citySearch.appendChild(recentSearch);
  cityName.value = "";
  recentSearch.addEventListener("click", function (event) {
    var getLatLonUrl =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      event.target.innerHTML +
      "&limit=5&appid=1141a80686092d25c69d34727f3d9734";
    fetch(getLatLonUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        appendSearchLocationData = data;
        return fetch(
          "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
            data[0].lat +
            "&lon=" +
            data[0].lon +
            "&appid=1141a80686092d25c69d34727f3d9734"
        );
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        currentDate.textContent =
          appendSearchLocationData[0].name + " " + todaysDate;
        curTemp.textContent = "Temp: " + data.main.temp + "°F";
        curWind.textContent = "Wind: " + data.wind.speed + " MPH";
        curHumid.textContent = "Humidity: " + data.main.humidity + "%";
        conditionsIcon.src =
          "http://openweathermap.org/img/wn/" +
          data.weather[0].icon +
          "@2x.png";
        conditionsIcon.classList.add("weather-icon");
      });

    fetch(getLatLonUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        appendSearchLocationData = data;
        return fetch(
          "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" +
            appendSearchLocationData[0].lat +
            "&lon=" +
            appendSearchLocationData[0].lon +
            "&appid=1141a80686092d25c69d34727f3d9734"
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            displayFiveDayForecast(data);
          });
      });
  });
}
