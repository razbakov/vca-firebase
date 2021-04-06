import { initializeApp } from './firebase.js'
import { provideCollections, useCollection } from './collection.js'
import { provideAuth, useAuth } from './auth.js'
import useDoc from './doc.js'

export default {
  install: (app, options) => {
    initializeApp(options)
    provideAuth(app)
    provideCollections(app)
  },
}

export { useCollection, useAuth, useDoc }
