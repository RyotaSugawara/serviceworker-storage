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
    return storage.purge()
      .then(() => storage.getItem(key_name))
      .then(name => {
        assert(name === undefined);
      });
  });
});
