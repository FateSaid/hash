import { LinkedList } from "./link-list.mjs";
import { loop } from "./logic.mjs";

function HashMap() {
  let array = [];

  let capacity = 16;
  let loadFactor = 0.75;
  if (capacity * loadFactor > 12) {
    capacity *= 2;
    let data = entries();
    array = data.forEach((element) => set(element[0], element[1]));
  }

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

    if (has(key)) {
      let entries = array[index].head;
      while (entries.key !== key) {
        entries = entries.nextNode;
      }
      return (entries.value = value);
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
    if (has(key)) {
      delete array[index];
      return true;
    } else {
      return false;
    }
  }
  function length() {
    let arrayMap = array.filter((element) => typeof element === "object");
    return arrayMap.reduce((a, b) => a + b.size, 0);
  }

  function clear() {
    for (let i = 0; i < array.length; i++) {
      delete array[i];
    }
  }
  function keys() {
    let arrayMap = array.filter((element) => typeof element === "object");
    return arrayMap.map((item) => item.head.key);
  }
  function values() {
    let arrayMap = array.filter((element) => typeof element === "object");
    return arrayMap.map((item) => item.head.value);
  }

  function entries() {
    let arrayMap = array.filter((element) => typeof element === "object");
    return arrayMap.map((item) => [item.head.key, item.head.value]);
  }

  return {
    set,
    array,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

const test = HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

console.log(test.array);
