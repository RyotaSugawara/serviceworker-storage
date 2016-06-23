# serviceworker-storage
Storage that can be used like a localStorage easy-to-use on ServiceWorker.


# install
```
npm install git://github.com/RyotaSugawara/serviceworker-storage.git
```

# usage

## new ServiceWorkerStorage(name, version)
create instance.
+ *name<string>:* your storage name.
+ *version<number>:* version number.
```javascript
import ServiceWorkerStorage from 'serviceworker-storage';
const storage = new ServiceWorkerStoarge('MyStorage', 1);
```

## getItem(key)
get item by key.
+ *key<string>:* storage unique key.
```javascript
storage.getItem('key').then(value => {
  console.log(value);
});
```

## setItem(key, value)
set item to key.
+ *key<string>:* storage unique key.
+ *value<any>:* value you want to save.
```javascript
storage.setItem(key, value);
```

## removeItem(key)
remove item by key.
+ *key<string>:* storage unique key.
```javascript
storage.removeItem(key);
```

## clean()
clean storage.
```javascript
storage.clean();
```
