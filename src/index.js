import $ from 'jQuery/jquery.min';
import 'Src/manifest.json';
import 'Src/index.html';
import 'Stylesheets/index.css';
import 'Stylesheets/top-left-search.css';
import 'Stylesheets/weather-icons.min.css';
import 'Images/chrome-grey.svg';
import 'Images/search-grey.svg';
import 'Images/nine-squares-grey.svg';
import 'Images/sea-turtle16.png';
import 'Images/sea-turtle128.png';
import { dislayCachedWeather, weatherIsCurrent, getLocationAndWeather } from 'Components/weather';
import addClickHandlers from 'Events/clickHandlers';

if (localStorage.getItem('userLocationTimestamp') === null) {
  localStorage.setItem('userLocationTimestamp', '0');
  localStorage.setItem('weatherTimestamp', '0');
}

$(document).ready(() => {
  dislayCachedWeather();
  if (!weatherIsCurrent()) {
    getLocationAndWeather();
  }
  addClickHandlers();
  setInterval(getLocationAndWeather, 600000);
});
