//logic functions that iterates over linked-list objects

export function loop(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "object") {
      if (searchLink(array[i], value)) {
        return true;
      }
    }
  }
  return false;
}

function searchLink(obj, key) {
  if (Object.values(obj).length === 0) {
    return;
  } else {
    for (let prop in obj) {
      if (obj[prop] === key) {
        return true;
      }
      if (typeof obj[prop] === "object" && obj[prop] !== null) {
        return searchLink(obj[prop], key);
      }
    }
  }
}
