//main.js
import { createApp } from 'vue'
import App from './App.vue'
import { InitFirebasePlugin } from './src/index.js'
import firebaseConfig from './firebase.config.js'

const app = createApp(App)
app.use(InitFirebasePlugin, firebaseConfig)
app.mount('#app')