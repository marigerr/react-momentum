## Momentum Clone

[Waffle Board](https://waffle.io/chingu-voyage-turtles-team-5/momentum-clone)  

[![Stories in Ready](https://badge.waffle.io/chingu-voyage-turtles-team-5/momentum-clone.png?label=ready&title=Ready)](https://waffle.io/chingu-voyage-turtles-team-5/momentum-clone?utm_source=badge)
[![Stories in Progress](https://badge.waffle.io/chingu-voyage-turtles-team-5/momentum-clone.png?label=In%20Progress&title=In%20Progress)](https://waffle.io/chingu-voyage-turtles-team-5/momentum-clone?utm_source=badge)

## Setup

1. After forking and cloning repo, open Chrome and navigate to `chrome://extensions`  
1. Check `developer mode` checkbox at top of page   
1. Click `Load unpacked extension` button 
1. In the popup that opens, navigate and open the folder that project was cloned to, **then select the "dist" folder.**
1. New tabs should now open with extension's index.html page
1. Disable extension at `chrome://extensions` page,  unchecking `Enabled` for Team Turtle 5 extension.

## Webpack info

### New files

- Add javascript to src/scripts  
- Add images to src/assets/images  
- Add css files to src/assets/css (or add css to existing css file)  

### Exporting / Importing javascript functions
1. At bottom of added script file, export any functions that will be accessed in index.js file    
`export { getUserLocation };`      
1. Change index.js to import functions.  Only need to import functions that will be used in index.js  
`import { getUserLocation } from "Javascript/geolocation.js";`

### Importing images
- Change index.js to import images
`import 'Images/chrome-grey.svg';`
- Images are added to the dist folder by file-loader  

### Aliases
- Path aliases Javascript, Image, and Stylesheets folders
- Instead of using full path can reference with aliases  
`Javascript/yourfile.js`  
`Image/yourimage.svg`  
`Stylesheets/yourcss.css` 

### Scripts  
`npm run build`  manually build  
`npm run watch`  detect saved changes and re-build  
`npm run dev-server`  opens index.html in chrome (as regular webpage). Rebuilds and reloads webpage with every saved change.  Chrome extension specific code won't work, but using the dev-server can be handy sometimes.

If webpack.config file is changed, need restart watching or dev-server

## Misc Notes

[Turtle icon](https://www.flaticon.com/free-icon/sea-turtle_67985) downloaded from Flaticon  
[Chrome icon](https://www.flaticon.com/free-icon/chrome_152759) downloaded from Flaticon  
[Nine Square icon](https://www.flaticon.com/free-icon/keyboard-buttons-or-visualization-button-of-nine-squares_56844) downloaded from Flaticon  

Chrome and Nine Square Icon color hex code #D3D3D3

Icon credit required if project published:  
Turtle icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
