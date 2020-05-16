import { provideFirebase, useFirebase } from './firebase.js'
import { provideCollections, useCollection } from './collection.js'
import { provideAuth, useAuth } from './auth.js'
import useDoc from './doc.js'

function initFirebase(config) {
  provideFirebase(config)
  provideAuth()
  provideCollections()
}

export { initFirebase, useFirebase, useCollection, useAuth, useDoc }
