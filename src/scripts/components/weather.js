import { getCurrentTime, titleCase, getUserLocation } from 'Scripts/utilities.js';
import $ from "jQuery/jquery.min.js";
import weatherIcons from 'Json/icons.json';

function dislayCachedWeather() {
  if (localStorage.getItem("currentTemp") !== null)
    addWeatherToPage()
}

// use stored weather if not older than 10 minutes (600000 ms)
function weatherIsCurrent() {
  var currentTime = getCurrentTime();
  return localStorage.getItem("currentTemp") !== null && currentTime - localStorage.weatherTimestamp < 600000
}

// promise to get location and then get weather
function getLocationAndWeather() {
  getUserLocation()
    .then(getWeather)
    .catch(function () {
      console.log("error in getting location");
    });
}

// get weather using Glitch https proxy server
function getWeather() {
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

  if (icon == 'night-alt-clear') {
    icon = 'night-clear';
  }
  if (icon == 'day-clear') {
    icon = 'day-sunny';
  }
  return prefix + icon;
}

export { dislayCachedWeather, weatherIsCurrent, getLocationAndWeather };
