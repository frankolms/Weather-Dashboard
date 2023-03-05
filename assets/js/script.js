var currentDate = document.getElementById("city-and-date");
var searchCity = document.getElementById("search-city");
var cityName = document.getElementById("city-name");
var citySearch = document.getElementById("city-search");
var todaysDate = dayjs().format("M/D/YYYY");

currentDate.textContent = todaysDate;

searchCity.addEventListener("click", function () {
  var recentSearch = document.createElement("button");
  var cityNameCapitalized =
    cityName.value.charAt(0).toUpperCase() + cityName.value.slice(1);
  recentSearch.innerHTML = cityNameCapitalized;
  console.log(cityNameCapitalized);
  recentSearch.classList.add("recent-search");
  citySearch.appendChild(recentSearch);
  cityName.value = "";
  getLocation(cityNameCapitalized);
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
      console.log(cityLat);
      var cityLon = data[0].lon;
      console.log(cityLon);
      var city = data[0].name;
      console.log(city);
      getWeather(cityLat, cityLon, city);
    });
}

function getWeather(lat, lon, city) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1141a80686092d25c69d34727f3d9734`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentDate.textContent = city + " " + todaysDate;
    });
}
