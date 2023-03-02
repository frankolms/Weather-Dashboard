var currentDate = document.getElementById("city-and-date");
var searchCity = document.getElementById("search-city");
var cityName = document.getElementById("city-name");
var citySearch = document.getElementById("city-search");

currentDate.textContent = "" + dayjs().format("M/D/YYYY");

searchCity.addEventListener("click", function () {
  var recentSearch = document.createElement("button");
  var cityNameCapitalized =
    cityName.value.charAt(0).toUpperCase() + cityName.value.slice(1);
  recentSearch.innerHTML = cityNameCapitalized;
  console.log(cityNameCapitalized);
  recentSearch.classList.add("recent-search");
  citySearch.appendChild(recentSearch);
  cityName.value = "";
  getApi();
});

function getApi() {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=33.75&lon=-84.38&appid=1141a80686092d25c69d34727f3d9734";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
