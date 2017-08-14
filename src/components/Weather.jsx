import React from 'react';
import axios from 'axios';
import 'Stylesheets/weather-icons.min.css';
import 'Stylesheets/top-right-weather.css';
import weatherIcons from 'Json/icons.json';
import { titleCase, getCurrentTime, localStorageKeyExists, addToLocalStorage, getFromLocalStorage } from 'Scripts/utilities';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);

    if (localStorageKeyExists('userLocation') && localStorageKeyExists('weather')) {
      const userLocation = getFromLocalStorage('userLocation');
      const weatherData = getFromLocalStorage('weather');
      this.state = {
        userCity: userLocation.city,
        userLat: userLocation.lat,
        userLon: userLocation.lon,
        currentTemp: `${Math.round(weatherData.main.temp)} ${String.fromCharCode(176)}`,
        tempScale: 'C',
        currentWeatherIconClass: pickIcon(weatherData.weather[0].id, weatherData.weather[0].icon),
        weatherDesc: titleCase(weatherData.weather[0].description),
      };
    } else if (localStorageKeyExists('userLocation')) {
      const userLocation = getFromLocalStorage('userLocation');
      this.state = {
        userCity: userLocation.city,
        userLat: userLocation.lat,
        userLon: userLocation.lon,
      };
    }
  }

  componentDidMount() {
    const currentTime = getCurrentTime();
    const weatherIsCurrent = this.state && currentTime - localStorage.weatherTimestamp < 600000;
    if (!weatherIsCurrent) {
      const api = 'https://hickory-office.glitch.me/api.weather?';
      const lat = `lat=${this.state.userLat}`;
      const lon = `lon=${this.state.userLon}`;
      const urlString = [api, lat, '&', lon].join('');

      axios.get(urlString)
        .then((result) => {
          addToLocalStorage('weather', result.data);
          addToLocalStorage('weatherTimestamp', getCurrentTime());
          // this.setState({ userCity: result.data.name });
          this.setState({ currentTemp: `${Math.round(result.data.main.temp)} ${String.fromCharCode(176)}` });
          this.setState({ tempScale: 'C' });
          this.setState({ weatherDesc: titleCase(result.data.weather[0].description) });
          this.setState({ currentWeatherIconClass: pickIcon(result.data.weather[0].id, result.data.weather[0].icon) });
        });
    }
  }

  changeTempScale() {
    let newTemp;
    const currentTemp = parseInt(this.state.currentTemp, 10);
    const currentTempUnit = this.state.tempScale;
    const newTempUnit = currentTempUnit === 'C' ? 'F' : 'C';
    if (newTempUnit === 'F') {
      newTemp = Math.round((currentTemp * 9 / 5) + 32);
    } else {
      newTemp = Math.round((currentTemp - 32) * 5 / 9);
    }
    this.setState({ currentTemp: `${newTemp} ${String.fromCharCode(176)}` });
    this.setState({ tempScale: newTempUnit });
  }

  render() {
    if (this.state) {
      return (
        <div className="top-right-flex">
          <div><i title={this.state.weatherDesc} className={this.state.currentWeatherIconClass} ></i> <span>{this.state.currentTemp}</span><span className="tempScale" onClick={this.changeTempScale.bind(this)} >{this.state.tempScale}</span></div>
          <div><span className="user-city"></span>{this.state.userCity}</div>
        </div>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}

function pickIcon(weatherCode, iconCode) {
  const prefix = 'wi wi-';
  let icon = weatherIcons[weatherCode].icon;
  if (iconCode.charAt(2).toLowerCase() === 'n') {
    icon = `night-alt-${icon}`;
  } else {
    icon = `day-${icon}`;
  }
  if (icon === 'night-alt-clear') {
    icon = 'night-clear';
  }
  if (icon === 'day-clear') {
    icon = 'day-sunny';
  }
  return prefix + icon;
}
