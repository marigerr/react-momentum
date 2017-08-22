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
}

// add an object to an existing local storage array or creates new one
function addToLocalStorageArray(localStorageKey, objectToAdd) {
  if (localStorageKeyExists(localStorageKey)) {
    const storageArray = getFromLocalStorage(localStorageKey);
    storageArray.push(objectToAdd);
    addToLocalStorage(localStorageKey, storageArray);
  } else {
    addToLocalStorage(localStorageKey, [objectToAdd]);
  }
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
  console.log(updatedArray);
  addToLocalStorage(localStorageKey, updatedArray);
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
  console.log(result);
  return result;
}

export { titleCase, getCurrentTime, addToLocalStorage, getFromLocalStorage, localStorageKeyExists, updateLocalStorageObjProp, isNotANewDay, addToLocalStorageArray, removeFromLocalStorageArray, objIsInArray };
