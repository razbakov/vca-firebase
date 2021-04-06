import Firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/auth'

export const initializeApp = (options) => {
  if (Firebase.apps.length > 0) {
    return
  }

  Firebase.initializeApp(options.config)

  if (options.persistence) {
    Firebase.firestore().enablePersistence()
  }
}

export function useFirebase() {
  return {
    firebase: Firebase,
    analytics: Firebase.analytics(),
    firestore: Firebase.firestore(),
    auth: Firebase.auth(),
  }
}
