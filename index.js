var weatherIcons;

// get json file to use as key to match up weather descriptions with weather icons
$.get("./icons/icons.json", function (response) {
  weatherIcons = JSON.parse(response);
});

if (localStorage.getItem("userLocationTimestamp") === null) {
  localStorage.setItem("userLocationTimestamp", "0");
  localStorage.setItem("weatherTimestamp", "0");
}

$(document).ready(function () {

  getUserLocation();
  setInterval(getUserLocation, 600000);  // update weather, userlocation every 10 minutes

  /*** Add Click Handlers  ***/
  // Switch to regular Chrome Search page when Chrome Icon in top-left is clicked
  $("#chrome-tab-link").click(function () {
    chrome.tabs.update({ url: 'chrome-search://local-ntp/local-ntp.html' });
  });
  // Switch to Chrome Apps page when Chrome Apps icon in top-left is clicked
  $("#chrome-apps-link").click(function () {
    chrome.tabs.update({ url: 'chrome://apps/' });
  });
  // Toggle Weather temperature scale when clicked
  $("#temp-scale").click(function () {
    changeTempScale();
  });
})

function getCurrentTime() {
  return new Date().getTime();
}

// use stored userLocation if not older than 20 minutes (1200000 ms) 
function getUserLocation() {
  var currentTime = getCurrentTime();
  if (localStorage.getItem("userLat") !== null && currentTime - localStorage.userLocationTimestamp < 1200000) {
    getWeather();
    console.log("using cached userlocation");
  } else {
    console.log("userlocation older than 20 minutes, getting new location");
    getUpdatedUserLocation();
  }
}

// get updated userLocation from ipinfo with fallback to HTML5 location if ipinfo blocked.  
function getUpdatedUserLocation() {
  $.getJSON("https://ipinfo.io/geo", function (response) {
  }, "jsonp")
    .done(function (response) {
      var latlon = response.loc.split(",");

      localStorage.setItem('userLat', latlon[0]);
      localStorage.setItem('userLon', latlon[1]);
      localStorage.setItem('userCity', response.city);
      localStorage.setItem('userCountry', response.country);
      localStorage.setItem('userLocationTimestamp', new Date().getTime());
      console.log('userLocation saved to storage');

      getWeather();
    })
    .fail(function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          localStorage.setItem('userLat', position.coords.latitude);
          localStorage.setItem('userLon', position.coords.longitude);
          localStorage.setItem('userLocationTimestamp', new Date().getTime());

          localStorage.removeItem('userCity');  // remove old userCity and userCountry from localstorage
          localStorage.removeItem('userCountry'); // they will be retrieved using weather api

          console.log('userLocation saved to storage');
          getWeather();
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    })
}

// use stored weather if not older than 10 minutes (600000 ms)
function getWeather() {
  var currentTime = getCurrentTime();

  if (localStorage.getItem("currentTemp") !== null) {
    addWeatherToPage();  // add stored weather to page temporarily to let load
    if (currentTime - localStorage.weatherTimestamp > 600000) {
      console.log("cached weather older than 10 minutes, getting new weather");
      getUpdatedWeather();
    }
  } else {
    getUpdatedWeather();
  }
}

// get updated weather using Glitch https proxy server
function getUpdatedWeather() {
  var api = "https://hickory-office.glitch.me/api.weather?";
  var lat = "lat=" + localStorage.userLat;
  var lon = "lon=" + localStorage.userLon;
  var urlString = [api, lat, "&", lon].join("");

  $.ajax({
    url: urlString,
    jsonp: true
  })
    .done(function (result) {
      if (localStorage.getItem("userCity") === null) {
        localStorage.setItem('userCity', result.name);
        localStorage.setItem('userCountry', result.sys.country);
      }

      localStorage.setItem('currentTemp', result.main.temp);
      localStorage.setItem('currentWeatherDesc', result.weather[0].description);
      localStorage.setItem('weatherId', result.weather[0].id);
      localStorage.setItem('weatherIconCode', result.weather[0].icon);
      localStorage.setItem('weatherTimestamp', new Date().getTime());
      console.log('currentWeather' + " saved to storage");
      addWeatherToPage();
    })
}

// add weather data to page and un-hide main element (hidden to avoid movement while loading)
function addWeatherToPage() {
  $("#city").text(localStorage.userCity);
  $("#temp").text(Math.round(localStorage.currentTemp) + " " + String.fromCharCode(176));
  $("#temp-scale").text("C");
  $("#weather-icon").removeClass();
  $("#weather-icon").addClass(pickIcon(localStorage.weatherId, localStorage.weatherIconCode));
  $('#weather-icon').prop('title', titleCase(localStorage.currentWeatherDesc));
  $("main").show();
}

// find correct icon based on weather information 
function pickIcon(weatherCode, iconCode) {
  var prefix = 'wi wi-';
  var icon = weatherIcons[weatherCode].icon;
  if (iconCode.charAt(2).toLowerCase() == 'n') {
    icon = 'night-alt-' + icon;
  } else {
    icon = 'day-' + icon;
  }
  if (icon == 'day-clear') {
    icon = 'day-sunny';
  }
  if (icon == 'night-alt-clear') {
    icon = 'night-clear';
  }
  return prefix + icon;
}

// utility function to change string to titlecase
function titleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

// toggle temperature between scales
function changeTempScale() {
  var currentTemp = parseInt($("#temp").text());
  var currentTempUnit = $("#temp-scale").text();
  var newTempUnit = currentTempUnit == "C" ? "F" : "C";
  $("#temp-scale").text(newTempUnit);
  if (newTempUnit == "F") {
    var tempInFahrenheit = Math.round(currentTemp * 9 / 5 + 32);
    $("#temp").text(tempInFahrenheit + " " + String.fromCharCode(176));
  } else {
    var tempInCelsius = Math.round((currentTemp - 32) * 5 / 9);
    $("#temp").text(tempInCelsius + " " + String.fromCharCode(176));
  }
}

