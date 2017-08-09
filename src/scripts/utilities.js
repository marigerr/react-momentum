import $ from "jQuery/jquery.min.js";

function getCurrentTime() {
  return new Date().getTime();
}

// utility function to change string to titlecase
function titleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

function getUserLocation() {
  return $.getJSON("https://ipinfo.io/geo", function (response) { }, "jsonp")
    .done(function (response) {
      var latlon = response.loc.split(",");
      localStorage.setItem('userLat', latlon[0]);
      localStorage.setItem('userLon', latlon[1]);
      localStorage.setItem('userCity', response.city);
      localStorage.setItem('userCountry', response.country);
      localStorage.setItem('userLocationTimestamp', new Date().getTime());
      console.log('userLocation saved to storage');
    })
};

// Need to fix fallback HTML5 if ipinfo fails

// function getHtml5Location() {
//   return Promise.resolve(
//     navigator.geolocation.getCurrentPosition(function (position) {
//       localStorage.setItem('userLat', position.coords.latitude);
//       localStorage.setItem('userLon', position.coords.longitude);
//       localStorage.setItem('userLocationTimestamp', new Date().getTime());
//       localStorage.removeItem('userCity');  // remove old userCity and userCountry from localstorage
//       localStorage.removeItem('userCountry'); // they will be retrieved using weather api
//       console.log('userLocation saved to storage');
//     })
//   )
//   if (navigator.geolocation) {
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }
// };

export { titleCase, getCurrentTime, getUserLocation }
