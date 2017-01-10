/* Sample HashMap slot:

this._slots[0] = {
  key: 'color',
  value: 'red',
  next: {
    key: 'cats',
    value: 'meow',
    next: {}   // empty slots and empty nodes represented by empty object
  }
}

*/

function HashMap(capacity = 8) {

  this._capacity = capacity;
  this.length = 0;

  // slots start as an array of empty object literals, basis of linked list
  // can't use fill({}) because it inserts reference to same object repeatedly
  // have to fill first -- map() skips undefined
  this._slots = Array(capacity).fill().map(() => ({}));

}

HashMap._MAX_LOAD_RATIO = 0.9;
HashMap._SIZE_RATIO = 3;

HashMap._hashString = function (string) {

    let hash = 5381;

    for (let i = 0; i < string.length; i++) {

        hash = (hash << 5) + hash + string.charCodeAt(i);
        hash = hash & hash;

    }

    return hash >>> 0;
};

HashMap.prototype.get = function (key) {

  return this._findKey(key).value;

};

HashMap.prototype.set = function (key, value) {

  this._checkSize();

  let item = this._findKey(key);

  // set or update value regardless of whether this is a new node
  item.value = value;

  // if no preexisting key in hashmap, add key and empty next object
  if (!item.hasOwnProperty('key')) {

    item.key = key;
    item.next = {};
    this.length += 1;

  }

  return this.length;

};

HashMap.prototype.remove = function (key) {

  let item = this._findKey(key);

  if (!item.hasOwnProperty('key')) {
    throw new Error(`Key '${key}' not found.`);
  }

  // since _findKey returns a ref to either the desired node or an empty node,
  // mutate item with child node or remove key-value pair info
  if (item.next.hasOwnProperty('key')) {

    item.key = item.next.key;
    item.value = item.next.value;
    item.next = item.next.next;

  } else {

    delete item.key;
    delete item.value;

  }

  this.length -= 1;

  return this.length;

};

HashMap.prototype._findSlot = function (key) {

  return HashMap._hashString(key) % this._capacity;

}

HashMap.prototype._findKey = function (key) {

  let index = this._findSlot(key);
  let item = this._slots[index]

  while (item.hasOwnProperty('key') && item.key !== key) {

    item = item.next;

  }

  return item;

};

HashMap.prototype._checkSize = function () {

  let loadRatio = (this.length + 1) / this._capacity;

  if (loadRatio <= HashMap._MAX_LOAD_RATIO) {
    return;
  }

  let newSize = this._capacity * HashMap._SIZE_RATIO;
  let oldMap = this._slots;

  this._slots = Array(newSize).fill().map(() => ({}));
  this.length = 0;
  this._capacity = newSize;

  oldMap.forEach(item => {

    while (item && item.hasOwnProperty('key')) {

      this.set(item.key, item.value);
      item = item.next;

    }

  });

};
