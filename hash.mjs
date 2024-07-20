import { LinkedList } from "./link-list.mjs";
import { loop } from "./logic.mjs";

function HashMap() {
  let array = [];

  let capacity = 16;
  let loadFactor = 0.8;

  function hash(key) {
    let hashCode = 0;
    let primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }
    return hashCode;
  }

  function set(key, value) {
    let index = hash(key);
    if (index < 0 || index >= capacity) {
      throw new Error("Trying to access index out of bound");
    }

    if (array[index] !== undefined) {
      return array[index].append(value);
    }
    let link = new LinkedList();
    link.prepend(key, value);
    array[index] = link;
  }

  function get(key) {
    let index = hash(key);
    if (index < 0 || index >= capacity) {
      throw new Error("Trying to access index out of bound");
    }

    for (let prop in array[index].head) {
      if (array[index].head[prop] === key) {
        return array[index].head.value;
      } else {
        return null;
      }
    }
  }
  function has(key) {
    return loop(array, key);
  }
  function remove(key) {
    let index = hash(key);
    if (index < 0 || index >= capacity) {
      throw new Error("Trying to access index out of bound");
    }
  }

  return {
    set,
    array,
    get,
    has,
  };
}

const test = HashMap();

test.set("apple", "red");
test.set("banana", "yellow");

console.log(test.array);

console.log(test.get("apple"));
