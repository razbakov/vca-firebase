# Vue Firebase Composition Api

Powered by Vite

## Setup

```
yarn add vca-firebase
```

Create `firebase.config.js`:

- Generate `config` object in Firebase Console.
- Enable/disable plugins, i.e. `analytics`.

```js
export default {
  config: {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  },
  analytics: false,
};
```

Add to html:

```html
<script src="/node_modules/firebase/firebase.js"></script>
```

## Usage

```html
<template>
  <div>UID: {{ uid }}</div>
  <pre>{{ accounts }}</pre>
  <button @click="signInWithGoogle">Sign In with Google</button>
  <button @click="createAccount({ name: 'Join' })">Add</button>
</template>

<script>
  import { initFirebase, useAuth, useCollection, useDoc } from "vca-firebase";
  import firebaseConfig from "./firebase.config.js";

  export default {
    setup() {
      initFirebase(firebaseConfig);

      const { uid, signInWithGoogle } = useAuth();
      const { docs: accounts } = useCollection("accounts");
      const { create: createAccount } = useDoc("accounts");

      return {
        signInWithGoogle,
        uid,
        accounts,
        createAccount,
      };
    },
  };
</script>
```
