import { provide, inject } from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const FirebaseSymbol = Symbol('Firebase')

export function useFirebase() {
  const result = inject(FirebaseSymbol)

  if (!result) {
    throw new Error('No Firebase provided')
  }

  return result
}

export function getFirebase(options) {
  if (firebase.apps.length > 0) {
    return {
      firebase,
      firestore: firebase.firestore(),
    }
  }

  firebase.initializeApp(options.config)

  if (options.analytics) {
    firebase.analytics()
  }

  firebase
    .firestore()
    .enablePersistence()
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        throw new Error(
          'Multiple tabs open, persistence can only be enabled in one tab at a a time.'
        )
      } else if (err.code === 'unimplemented') {
        throw new Error(
          'The current browser does not support all of the features required to enable persistence'
        )
      }
    })

  const firestore = firebase.firestore()

  return {
    firebase,
    firestore,
  }
}

export function provideFirebase(firebaseApp, app) {
  const provideFn = app ? app.provide : provide
  provideFn(FirebaseSymbol, firebaseApp)
}
