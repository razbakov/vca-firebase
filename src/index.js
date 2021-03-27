import { provideFirebase, useFirebase, getFirebase } from './firebase.js'
import { provideCollections, useCollection } from './collection.js'
import { provideAuth, useAuth } from './auth.js'
import useDoc from './doc.js'

//Init Firebase Plugin
const InitFirebasePlugin =  {
  install: (app, options) => {
      const firebaseApp = getFirebase(options)
      provideFirebase(firebaseApp, app)
      provideAuth(firebaseApp.firebase, app)
      provideCollections(app)
  }
}

function initFirebase(config) {
  InitFirebasePlugin.install(null, config)
}



export { initFirebase, useFirebase, useCollection, useAuth, useDoc, InitFirebasePlugin }
