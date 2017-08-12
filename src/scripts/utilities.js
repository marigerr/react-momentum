import $ from 'jQuery/jquery.min';

function getCurrentTime() {
  return new Date().getTime();
}

// utility function to change string to titlecase
function titleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');
}

function getUserLocation() {
  return $.getJSON({
    url: 'https://ipinfo.io/geo',
    jsonp: true,
  })
    .done((response) => {
      const latlon = response.loc.split(',');
      localStorage.setItem('userLat', latlon[0]);
      localStorage.setItem('userLon', latlon[1]);
      localStorage.setItem('userCity', response.city);
      localStorage.setItem('userCountry', response.country);
      localStorage.setItem('userLocationTimestamp', new Date().getTime());
    });
}

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

export { titleCase, getCurrentTime, getUserLocation };
