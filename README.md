# Vue Firebase Composition Api

Powered by Vite

Also checkout a fork [Firebase Composition for Nuxt](https://github.com/razbakov/nuxt-firebase-composition)

## Usage

### Init the plugin in the main.js file

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import FirebasePlugin from './src/index.js'
import firebaseConfig from './firebase.config.js'

const app = createApp(App)
app.use(FirebasePlugin, firebaseConfig)
app.mount('#app')
```

### In the view or component

```html
<!-- SomeComponent.vue-->
<template>
  <div>UID: {{ uid }}</div>
  <pre>{{ accounts }}</pre>
  <button @click="signInAnonymously">Sign In Anonymously</button>
  <button @click="signInWithGoogle">Sign In with Google</button>
  <button @click="createAccount({ name: 'Join' })">Add</button>
  <button @click="signOut">Logout</button>
</template>

<script>
  import { useAuth, useCollection, useDoc } from 'vca-firebase'

  export default {
    setup() {
      const { uid, signInWithGoogle, signInAnonymously, signOut } = useAuth()
      const { docs: accounts } = useCollection('accounts')
      const { create: createAccount } = useDoc('accounts')

      return {
        signInWithGoogle,
        signInAnonymously,
        signOut,
        uid,
        accounts,
        createAccount,
      }
    },
  }
</script>
```

## Setup

```bash
yarn create vite-app test-vca-firebase
cd test-vca-firebase
yarn add firebase
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
}
```

## Development

Setup project and run:

```bash
yarn dev
```

See the power of Vite! Project is available in less than 1 second!
