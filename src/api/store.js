export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getAll() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey));
    } catch (error) {
      return {};
    }
  }

  setItem(key, value) {
    const store = this.getAll();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(Object.assign({}, store, {[key]: value})));
  }

  getItem(key) {
    const store = this.getAll();
    return store[key];
  }

  removeItem(key) {
    const store = this.getAll();
    delete store[key];
    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store)));
  }
}
