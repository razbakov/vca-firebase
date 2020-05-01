<template>
  <div>UID: {{ uid }}</div>
  <pre>{{ accounts }}</pre>
  <button @click="signInWithGoogle">Sign In with Google</button>
  <button @click="createAccount({ name: 'Join' })">Add</button>
</template>

<script>
import firebaseConfig from "./firebase.config.js";
import { initFirebase, useAuth, useCollection, useDoc } from "./src/index.js";

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
