// import axios from 'axios';

function getCurrentTime() {
  return new Date().getTime();
}

function isNotANewDay(prevTimestamp, currTimestamp) {
  const current = new Date(parseInt(currTimestamp, 10)).setHours(0, 0, 0, 0);
  const previous = new Date(parseInt(prevTimestamp, 10)).setHours(0, 0, 0, 0);
  // console.log(prevTimestamp, currTimestamp);
  // console.log(previous, current);
  return current === previous;
}

// utility function to change string to titlecase
function titleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');
}

function addToLocalStorage(key, value) {
  // console.log('adding to local storage');
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  // console.log('get from Local Storage');
  return JSON.parse(localStorage.getItem(key));
}

function localStorageKeyExists(key) {
  return localStorage.getItem(key) !== null;
}

// function getUserLocation() {
//   return axios.get('https://ipinfo.io/geo')
//     .then((response) => {
//       const latlon = response.data.loc.split(',');
//       const userLocation = response.data;
//       userLocation.lat = latlon[0];
//       userLocation.lon = latlon[1];
//       addToLocalStorage('userLocation', userLocation);
//       addToLocalStorage('userLocationTimestamp', getCurrentTime());
//     });
// }


// Need to fix fallback HTML5 if ipinfo fails

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

export { titleCase, getCurrentTime, addToLocalStorage, getFromLocalStorage, localStorageKeyExists, isNotANewDay };
