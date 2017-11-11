import axios from 'axios';

function getUnsplashPhoto() {
  const unsplashBaseUrl = 'https://api.unsplash.com/photos/random?';
  const myClientId = 'client_id=4469e676a2a92f3481a1546533824178cbf5eed9d773394924d93a70e77c6ab8';
  const collectionNumber = 'collections=1065861';
  const urlString = [unsplashBaseUrl, myClientId, collectionNumber].join('&');

  return axios.get(urlString);
}

function getWeather(userLat, userLon, tempScale) {
  const api = 'https://hickory-office.glitch.me/api.weather?';
  const lat = `lat=${userLat}`;
  const lon = `lon=${userLon}`;
  const units = `units=${tempScale === 'C' ? 'metric' : 'imperial'}`;
  const urlString = [api, lat, '&', lon, '&', units].join('');
  return axios.get(urlString);
}

function getIpInfoLocation() {
}

/*
Need to add/fix fallback HTML5 geolocation if ipinfo fails
*/

// function getHtml5Location() {
//   return Promise.resolve(
//     navigator.geolocation.getCurrentPosition(function (position) {
//       localStorage.setItem('userLat', position.coords.latitude);
//       localStorage.setItem('userLon', position.coords.longitude);
//       localStorage.setItem('userLocationTimestamp', new Date().getTime());
//       // remove old userCity and userCountry from localstorage
//       // they will be retrieved using weather api
//       localStorage.removeItem('userCity');
//       localStorage.removeItem('userCountry');
//     })
//   )
//   if (navigator.geolocation) {
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }
// };

export { getUnsplashPhoto, getWeather, getIpInfoLocation };
