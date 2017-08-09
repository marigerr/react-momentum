import './manifest.json';
import './index.html';
import 'Images/chrome-grey.svg';
import 'Images/nine-squares-grey.svg';
import 'Images/sea-turtle16.png';
import 'Images/sea-turtle128.png';
import 'Stylesheets/index.css';
import 'Stylesheets/weather-icons.min.css';
import $ from "jQuery/jquery.min.js";
import { dislayCachedWeather, weatherIsCurrent, getLocationAndWeather } from "Components/weather.js";
import { addClickHandlers } from "Events/clickHandlers.js"

if (localStorage.getItem("userLocationTimestamp") === null) {
  localStorage.setItem("userLocationTimestamp", "0");
  localStorage.setItem("weatherTimestamp", "0");
}

$(document).ready(function () {
  dislayCachedWeather();
  if (!weatherIsCurrent()) {
    console.log("weather is not current");
    getLocationAndWeather();
  }
  addClickHandlers();
  setInterval(getLocationAndWeather, 600000);
})
