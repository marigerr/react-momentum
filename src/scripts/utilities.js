function getCurrentTime() {
  return new Date().getTime();
}

function isNotANewDay(prevTimestamp, currTimestamp) {
  const current = new Date(parseInt(currTimestamp, 10)).setHours(0, 0, 0, 0);
  const previous = new Date(parseInt(prevTimestamp, 10)).setHours(0, 0, 0, 0);
  return current === previous;
}

// utility function to change string to titlecase
function titleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');
}

const wallpaperData = { id: 'JEq_2UJoTtg', created_at: '2017-01-02T22:09:34-05:00', updated_at: '2017-10-31T17:18:45-04:00', width: 4896, height: 2968, color: '#F4C4BA', description: 'Colorful sunset over the beautiful Grand Canyon', urls: { raw: 'https://images.unsplash.com/photo-1483412919093-03a22057d0d7', full: 'https://images.unsplash.com/photo-1483412919093-03a22057d0d7?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=90cca32b9ff905435ef1b18867254491', regular: 'https://images.unsplash.com/photo-1483412919093-03a22057d0d7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=eabefbdeeb4750d7d251e9723a79975b', small: 'https://images.unsplash.com/photo-1483412919093-03a22057d0d7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=58051e25d72306ad7bba740e6446083b', thumb: 'https://images.unsplash.com/photo-1483412919093-03a22057d0d7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=c45b612073c2162d71a96824621b447b' }, categories: [], links: { self: 'https://api.unsplash.com/photos/JEq_2UJoTtg', html: 'https://unsplash.com/photos/JEq_2UJoTtg', download: 'https://unsplash.com/photos/JEq_2UJoTtg/download', download_location: 'https://api.unsplash.com/photos/JEq_2UJoTtg/download' }, liked_by_user: false, likes: 116, user: { id: 'a8idre8uow0', updated_at: '2017-12-04T09:21:38-05:00', username: 'jadlimcaco', name: 'Jad Limcaco', first_name: 'Jad', last_name: 'Limcaco', twitter_username: 'jadlimcaco', portfolio_url: 'http://jadlimcaco.com/', bio: 'Designer trying to get better at photography.', location: 'San Jose, CA', links: { self: 'api.unsplash.com/users/jadlimcaco', html: 'https://unsplash.com/@jadlimcaco', photos: 'api.unsplash.com/users/jadlimcaco/photos', likes: 'api.unsplash.com/users/jadlimcaco/likes', portfolio: 'api.unsplash.com/users/jadlimcaco/portfolio', following: 'api.unsplash.com/users/jadlimcaco/following', followers: 'api.unsplash.com/users/jadlimcaco/followers' }, profile_image: { small: 'https://images.unsplash.com/profile-1483412032475-495a753f5d55?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=964f68eede501da984480750f3ee476b', medium: 'https://images.unsplash.com/profile-1483412032475-495a753f5d55?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=d17aa34c410043344c591e3b72d79576', large: 'https://images.unsplash.com/profile-1483412032475-495a753f5d55?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=39ae3af1427d5fc88890a9331993c060' }, total_likes: 1000, total_photos: 39, total_collections: 1 }, current_user_collections: [], slug: 'grand-canyon-at-sunset', location: { title: 'Grand Canyon National Park, United States', name: 'Grand Canyon National Park', city: null, country: 'United States', position: { latitude: 36.1069652, longitude: -112.1129972 } }, exif: { make: 'FujiFilm', model: 'X-T10', exposure_time: '30', aperture: '7.1', focal_length: '40.7', iso: 200 }, views: 748307, downloads: 4456, wallpaperLiked: false };

function initializeLocalStorage() {
  addToLocalStorage('localStorageInitialized', true);
  addToLocalStorage('arrLikedWallpapers', []);
  addToLocalStorage('wallpaper', wallpaperData);
  addToLocalStorage('wallpaperTimestamp', 0);
  addToLocalStorage('weatherTimestamp', 0);
  addToLocalStorage('arrLikedQuotes', []);
  addToLocalStorage('userSettings', {
    showFeatures: {
      showChromeTab: true,
      showSearch: true,
      showWeather: true,
      showFocus: true,
      showQuote: true,
      showTodo: true,
      showApps: true,
    },
    options: {
      tempScale: 'C',
      clockFormat: '24hour',
      quoteFrequency: '6hour',
      wallpaperFrequency: '6hour',
    },
  });
}

function addToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function localStorageKeyExists(key) {
  return localStorage.getItem(key) !== null;
}

// updates 1 property of an object stored in local storage
function updateLocalStorageObjProp(localStorageKey, propertyToUpdate, newValue) {
  const objectNeedingUpdate = getFromLocalStorage(localStorageKey);
  objectNeedingUpdate[propertyToUpdate] = newValue;
  addToLocalStorage(localStorageKey, objectNeedingUpdate);
  return getFromLocalStorage(localStorageKey);
}

// add an object to an existing local storage array or creates new one
function addToLocalStorageArray(localStorageKey, objectToAdd) {
  const storageArray = getFromLocalStorage(localStorageKey);
  if (localStorageKeyExists(localStorageKey)) {
    storageArray.push(objectToAdd);
    addToLocalStorage(localStorageKey, storageArray);
  } else {
    addToLocalStorage(localStorageKey, [objectToAdd]);
  }
  return storageArray || [objectToAdd];
}

/*
  removeFromLocalStorageArray() - removes an object from a local storage object array.
  Parameters :
    - localStorageKey = name of local storage array
    - idProp = name of object property that is used to identify the object to remove
    - idToRemove = value of object property for object that should be removed
*/
function removeFromLocalStorageArray(localStorageKey, idProp, idToRemove) {
  const storageArray = getFromLocalStorage(localStorageKey);
  const updatedArray = storageArray.filter(item =>
    item[idProp] !== idToRemove,
  );
  addToLocalStorage(localStorageKey, updatedArray);
  return updatedArray;
}

/*
  objIsInArray() - checks if object is in array.
  Parameters:
  - array
  - idProp = name of property that is used to identify the object to find
  - id = value of id for objec to find
*/
function objIsInArray(array, idProp, id) {
  const result = array.some(obj => obj[idProp] === id);
  return result;
}

export { titleCase, getCurrentTime, initializeLocalStorage, addToLocalStorage, getFromLocalStorage, localStorageKeyExists, updateLocalStorageObjProp, isNotANewDay, addToLocalStorageArray, removeFromLocalStorageArray, objIsInArray };
