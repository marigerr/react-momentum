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

const wallpaperData = { id: 'U3F2o6vz3bs', created_at: '2016-10-16T07:23:27-04:00', updated_at: '2017-10-26T05:24:31-04:00', width: 5184, height: 2916, color: '#C9C5B0', description: null, urls: { raw: 'https://images.unsplash.com/photo-1476616853026-24c1f0309646', full: 'https://images.unsplash.com/photo-1476616853026-24c1f0309646?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=d7b3d48fe112c9a6a256b37c1319d5d8', regular: 'https://images.unsplash.com/photo-1476616853026-24c1f0309646?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=a26429b528cd5e1506aae95ebfa249a2', small: 'https://images.unsplash.com/photo-1476616853026-24c1f0309646?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=de61646059405c9d9c83cdca340483a1', thumb: 'https://images.unsplash.com/photo-1476616853026-24c1f0309646?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=1760d280a80bbd98fd23655306b66976' }, categories: [], links: { self: 'https://api.unsplash.com/photos/U3F2o6vz3bs', html: 'https://unsplash.com/photos/U3F2o6vz3bs', download: 'https://unsplash.com/photos/U3F2o6vz3bs/download', download_location: 'https://api.unsplash.com/photos/U3F2o6vz3bs/download' }, liked_by_user: false, likes: 105, user: { id: 'vzVXoYxqJJ8', updated_at: '2017-12-11T10:50:38-05:00', username: 'claudiotesta', name: 'Claudio Testa', first_name: 'Claudio', last_name: 'Testa', twitter_username: null, portfolio_url: 'http://testa-photography.com/', bio: null, location: 'Germany', links: { self: 'https://api.unsplash.com/users/claudiotesta', html: 'https://unsplash.com/@claudiotesta', photos: 'https://api.unsplash.com/users/claudiotesta/photos', likes: 'https://api.unsplash.com/users/claudiotesta/likes', portfolio: 'https://api.unsplash.com/users/claudiotesta/portfolio', following: 'https://api.unsplash.com/users/claudiotesta/following', followers: 'https://api.unsplash.com/users/claudiotesta/followers' }, profile_image: { small: 'https://images.unsplash.com/profile-1473615961770-80daa5118109?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=ac16e929c328020416f22902e62b9c69', medium: 'https://images.unsplash.com/profile-1473615961770-80daa5118109?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=b79bfeb94e13d34186e01b9ed0856045', large: 'https://images.unsplash.com/profile-1473615961770-80daa5118109?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=93e9c27ba21502412f30369e8d13a621' }, total_likes: 24, total_photos: 14, total_collections: 1 }, current_user_collections: [], slug: null, location: { title: 'Vogtsburg, Germany', name: 'Vogtsburg', city: 'Vogtsburg', country: 'Germany', position: { latitude: 48.0958982069307, longitude: 7.67772775112303 } }, exif: { make: 'Canon', model: 'Canon EOS 600D', exposure_time: '1/30', aperture: '8', focal_length: '10', iso: 100 }, views: 460926, downloads: 5349, wallpaperLiked: false };

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
