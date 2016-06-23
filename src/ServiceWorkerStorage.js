/**
 * ServiceWorkerStorage
 */

export const IDB_TRANSACTION_MODE = {
  readonly: 'readonly',
  readwrite: 'readwrite',
  versionchange: 'versionchange'
};

export function promisify(idbRequest) {
  return new Promise(function(resolve, reject) {
    idbRequest.onsuccess = function() {
      resolve(idbRequest.result);
    };
    idbRequest.onerror = reject;
  });
}

export class ServiceWorkerStorage {
  constructor(db_name, version) {
    if (typeof db_name !== 'string') throw new TypeError('db_name must be string.');
    if (typeof version !== 'number') throw new TypeError('version must be number.');
    const VERSION = version;
    this.DB_NAME = db_name;
    this.STORE_NAME = 'sw_storage';

    const db = self.indexedDB.open(this.DB_NAME, VERSION);
    db.onupgradeneeded = event => {
      const _db = event.target.result;
      if (_db.objectStoreNames && _db.objectStoreNames.contains(this.STORE_NAME)) return;
      _db.createObjectStore(this.STORE_NAME);
    };
    this.__db = promisify(db);
  }
  accessAsyncStore(mode) {
    return this.__db.then(db => {
      const transaction = db.transaction(this.STORE_NAME, mode);
      return transaction.objectStore(this.STORE_NAME);
    });
  }
  getItem(key) {
    return this.accessAsyncStore(IDB_TRANSACTION_MODE.readonly)
      .then(store => store.get(key))
      .then(promisify);
  }
  setItem(key, value) {
    return this.accessAsyncStore(IDB_TRANSACTION_MODE.readwrite)
      .then(store => store.put(value, key))
      .then(promisify);
  }
  removeItem(key) {
    return this.accessAsyncStore(IDB_TRANSACTION_MODE.readwrite)
      .then(store => store['delete'](key))
      .then(promisify);
  }
  clean() {
    return this.__db
      .then(db => {
        const transaction = db.transaction(db.objectStoreNames, IDB_TRANSACTION_MODE.readwrite);
        const q = [];
        for (let i = 0, len = db.objectStoreNames.length; i < len; i++) {
          let store_name = db.objectStoreNames[i];
          q.push(promisify(transaction.objectStore(store_name).clear()));
        }
        return Promise.all(q);
      });
  }
}

