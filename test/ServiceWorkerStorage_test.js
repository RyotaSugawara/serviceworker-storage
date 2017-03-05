/* eslint env: "mocha" */

import assert from 'power-assert';
import {
  ServiceWorkerStorage
} from '../src/ServiceWorkerStorage';

describe('ServiceWorkerStorage', function() {
  const storage = new ServiceWorkerStorage('MyStorage', 1);
  const key_name = 'test_key';
  const test_name = 'test-001';
  before(function() {
    return storage.setItem(key_name, test_name);
  });
  after(function() {
    return storage.__db.then(db => {
      indexedDB.deleteDatabase('MyStorage');
      return;
    });
  });

  it('should returns number', function() {
    return storage.length().then(len => {
      assert(typeof len === 'number');
      assert(len === 1);
    });
  });

  it('should return key name', function() {
    return storage.key(0).then(key => {
      assert(key === key_name);
    });
  });

  it('should return null if not exists.', function() {
    return storage.key(1).then(key => {
      assert(key === null);
    });
  });

  it('should be removed target', function() {
    return storage.removeItem(key_name).then(name => {
      assert(name === undefined);
    });
  });

  it('could set and get item', function() {
    return storage.setItem(key_name, test_name)
      .then(() => storage.getItem(key_name))
      .then(name => {
        assert(name === test_name);
      });
  });

  it('should success to purge storage', function() {
    return storage.clear()
      .then(() => storage.getItem(key_name))
      .then(name => {
        assert(name === undefined);
      });
  });
});

