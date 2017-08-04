$(document).ready(function () {

  // Add Click Handlers

  // Update existing tab to regular Chrome Search page  (without extension addons) when Chrome Icon in top-left is clicked
  $("#chrome-tab-link").click(function () {
    chrome.tabs.update({url:'chrome-search://local-ntp/local-ntp.html'});
  });    
  // Update existing tab to Chrome Apps page when Chrome Apps icon in top-left is clicked
  $("#chrome-apps-link").click(function () {
    chrome.tabs.update({url:'chrome://apps/'});
  });  
})

