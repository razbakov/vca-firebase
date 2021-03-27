<template>
  <div>UID: {{ uid }}</div>
  <pre v-show="uid !== null">{{ accounts }}</pre>
  <button @click="signInAnonymously">Sign In Anonymously</button>
  <button @click="signInWithGoogle">Sign In with Google</button>
  <button @click="createAccount({ name: 'Join' })">Add</button>
  <button @click="signOut">Logout</button>
</template>

<script>
import { useAuth, useCollection, useDoc } from './src/index.js'

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
