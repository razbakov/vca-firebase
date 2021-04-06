import { provideFirebase, useFirebase, getFirebase } from './firebase.js'
import { provideCollections, useCollection } from './collection.js'
import { provideAuth, useAuth } from './auth.js'
import useDoc from './doc.js'

export default {
  install: (app, options) => {
    const firebaseApp = getFirebase(options)
    provideFirebase(firebaseApp, app)
    provideAuth(firebaseApp.firebase, app)
    provideCollections(app)
  },
}

export { useFirebase, useCollection, useAuth, useDoc }
