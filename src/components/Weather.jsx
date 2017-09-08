import React from 'react';
import axios from 'axios';
import 'Stylesheets/top-right-weather.css';
import weatherIcons from 'Json/icons.json';
import { titleCase, getCurrentTime, localStorageKeyExists, addToLocalStorage, getFromLocalStorage } from 'Scripts/utilities';
import { getWeather } from 'Scripts/apiCalls';

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
        tempScale: this.props.tempScale,
        currentWeatherIconClass: pickIcon(weatherData.weather[0].id, weatherData.weather[0].icon),
        weatherDesc: titleCase(weatherData.weather[0].description),
      };
    }
  }

  componentDidMount() {
    const currentTime = getCurrentTime();
    const weatherIsCurrent = this.state && currentTime - localStorage.weatherTimestamp < 600000;
    if (!weatherIsCurrent) {
      axios.get('https://ipinfo.io/geo')
        .then((response) => {
          const latlon = response.data.loc.split(',');
          const userLocation = response.data;
          userLocation.lat = latlon[0];
          userLocation.lon = latlon[1];
          addToLocalStorage('userLocation', userLocation);
          addToLocalStorage('userLocationTimestamp', getCurrentTime());
          this.setState({
            userCity: userLocation.city,
            userLat: userLocation.lat,
            userLon: userLocation.lon,
          });
        })
        .then(() => {
          getWeather(this.state.userLat, this.state.userLon, this.props.tempScale)
            .then((result) => {
              addToLocalStorage('weather', result.data);
              addToLocalStorage('weatherTimestamp', getCurrentTime());
              this.setState({
                currentTemp: `${Math.round(result.data.main.temp)} ${String.fromCharCode(176)}`,
                weatherDesc: titleCase(result.data.weather[0].description),
                currentWeatherIconClass: pickIcon(result.data.weather[0].id, result.data.weather[0].icon),
                tempScale: this.props.tempScale,
                // userCity: result.data.name,
              });
            });
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const newTempScale = nextProps.tempScale;
    if (newTempScale !== this.props.tempScale) {
      this.setState({
        tempScale: newTempScale,
      });
      this.convertTemp(newTempScale);
    }
  }

  changeTempScale() {
    const currentTempScale = this.state.tempScale;
    const newTempScale = currentTempScale === 'C' ? 'F' : 'C';
    this.setState({ tempScale: newTempScale });
    this.convertTemp(newTempScale);
    const userSettings = getFromLocalStorage('userSettings');
    userSettings.options.tempScale = newTempScale;
    addToLocalStorage('userSettings', userSettings);
  }

  convertTemp(newTempScale) {
    const currentTemp = parseInt(this.state.currentTemp, 10);
    let newTemp;
    if (newTempScale === 'F') {
      newTemp = Math.round((currentTemp * 9 / 5) + 32);
    } else {
      newTemp = Math.round((currentTemp - 32) * 5 / 9);
    }
    this.setState({ currentTemp: `${newTemp} ${String.fromCharCode(176)}` });
    const weather = getFromLocalStorage('weather');
    weather.main.temp = newTemp;
    delete weather.main.temp_min;
    delete weather.main.temp_max;
    addToLocalStorage('weather', weather);
  }

  render() {
    if (this.props.showWeather && this.state && this.state.currentTemp) {
      return (
        <div className="top-right-flex">
          <div><i title={this.state.weatherDesc} className={this.state.currentWeatherIconClass} ></i> <span>{this.state.currentTemp}</span><span className="tempScale" onClick={this.changeTempScale.bind(this)} >{this.state.tempScale}</span></div>
          <div><span className="user-city"></span>{this.state.userCity}</div>
        </div>
      );
    }
    return (
      <div></div>
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
