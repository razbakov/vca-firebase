import { createApp } from 'vue'
import App from './App.vue'
import FirebasePlugin from './src/index.js'
import firebaseConfig from './firebase.config.js'

const app = createApp(App)
app.use(FirebasePlugin, firebaseConfig)
app.mount('#app')
