/* Sample HashMap slot:

this._slots[0] = {
  key: 'color',
  value: 'red',
  next: {
    key: 'cats',
    value: 'meow',
    next: {}
  }
}

*/

function HashMap(capacity = 8) {
  this._capacity = capacity;
  this.length = 0;
  this._slots = [];

  while (capacity--) {
    this._slots.push({});
  }
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

  let result = this._findKey(key);

  return result.value;

};

HashMap.prototype.set = function (key, value) {

  this._checkSize();

  let item = this._findKey(key);

  item.value = value;

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
    throw (`Key '${key}' not found.`);
  }

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

  this._slots = [];
  this.length = 0;
  this._capacity = newSize;

  while (newSize--) {
    this._slots.push({});
  }

  oldMap.forEach(item => {

    while (item && item.hasOwnProperty('key')) {

      this.set(item.key, item.value);
      item = item.next;

    }

  });

};
