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

## length()
get storage length.
```javascript
storage.length().then(len => {
  console.log(len);
});
```

## key(index)
get key by index.
+ *index:* An integer representing the number of the key you want to get the name of. 
```javascript
storage.key(0).then(key => {
  console.log(key);
});
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

## clear()
clean storage.
```javascript
storage.clear();
```
