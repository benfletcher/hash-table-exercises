function HashMap(capacity) {
  this._capacity = capacity || 8;
  this.length = 0;
  this._deleted = 0;
  this._slots = [];

  // sample data
  // this._slots[0] = {
  //   key: 'color',
  //   value: 'red',
  //   deleted: false
  // }
}


HashMap._maxLoadRatio = 0.9;
HashMap._sizeRatio = 3;

HashMap._hashString = function(string) {
    var hash = 5381;
    for (var i=0; i<string.length; i++) {
        hash = (hash << 5) + hash + string.charCodeAt(i);
        hash = hash & hash;
    }
    return hash >>> 0;
};

HashMap.prototype.get = function(key) {
  var index = this._find(key);

  if (index === undefined) {
    throw ('find() returned "undefined"');
  }

  console.log(index);
  if (this._slots[index] === undefined) {
    return 'not found';
  }

  return this._slots[index].value;
};

HashMap.prototype.set = function(key, value) {
  let loadRatio = HashMap._maxLoadRatio;
  let sizeRatio = HashMap._sizeRatio;
  if (((this.length + this._deleted + 1) / this._capacity) > loadRatio) {
    this._resize(this._capacity * sizeRatio);
  }
  let index = this._find(key);
  if (this._slots[index] === undefined) {
    this.length++;
  }
  this._slots[index] = {
    key: key,
    value: value,
    deleted: false
  };

};

HashMap.prototype.remove = function(key) {
  let index = this._find(key);

  if (this._slots[index] === undefined) {
    throw ("Not found");
  }

  this._slots[index].deleted = true;
  this.length--;
  this._deleted++;
};

HashMap.prototype._find = function(key) {
  let hash = HashMap._hashString(key);
  let start = hash % this._capacity;
  for (let i = start; i < start + this._capacity; i++) {
    let index = i % this._capacity;
    if (this._slots[index] === undefined || (this._slots[index].key === key && this._slots[index].deleted !== true)) {
      return index;
    }
  }
};

HashMap.prototype._resize = function(newSize) {
  let oldMap = this._slots;
  this._slots = [];
  this.length = 0;
  this._deleted = 0;
  this._capacity = newSize;

  for (let i = 0; i < oldMap.length; i++) {
    if (oldMap[i] !== undefined && oldMap[i].deleted !== true) {
      this.set(oldMap[i].key, oldMap[i].value);
    }
  }
};

let myHash = new HashMap(3);
