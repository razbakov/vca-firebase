import { reactive, toRefs, inject } from 'vue'
import { useFirebase } from './firebase'

const AuthSymbol = Symbol('FirebaseAuth')

export function useAuth() {
  const result = inject(AuthSymbol)

  if (!result) {
    throw Error('No Auth provided')
  }

  return result
}

export function provideAuth(app) {
  const state = reactive({
    loading: true,
    signingIn: false,
    uid: null,
    user: null,
  })
  const { auth } = useFirebase()

  auth.onAuthStateChanged(setUser)

  if (auth.isSignInWithEmailLink(window.location.href)) {
    signInWithEmailLink(window.location.href)
  }

  async function setUser(user) {
    state.user = user
    state.uid = user ? user.uid : null
    state.loading = false
    state.signingIn = false
  }

  async function signOut() {
    await auth.signOut()
    setUser(null)
  }

  async function signInAnonymously() {
    await auth.signInAnonymously()
  }

  async function signInWithEmailLink(link) {
    state.signingIn = true

    // todo: add email extraction from url
    let email = ''
    if (!email) {
      console.error('email is missing')
    }

    await auth.signInWithEmailLink(email, link)
  }

  async function sendSignInLinkToEmail(email) {
    const actionCodeSettings = {
      // todo: add to url: ?email=email
      url: window.location.href,
      handleCodeInApp: true,
    }

    await auth.sendSignInLinkToEmail(email, actionCodeSettings)
  }

  function signInWithGoogle() {
    state.signingIn = true

    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/userinfo.email')
    auth.signInWithRedirect(provider)
  }

  app.provide(AuthSymbol, {
    ...toRefs(state),
    signInWithGoogle,
    sendSignInLinkToEmail,
    signOut,
    signInAnonymously,
    signInWithEmailLink,
  })
}
