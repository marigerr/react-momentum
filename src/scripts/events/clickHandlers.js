import $ from "jQuery/jquery.min.js";

/*** Add Click Handlers  ***/
function addClickHandlers() {
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

export {addClickHandlers};
