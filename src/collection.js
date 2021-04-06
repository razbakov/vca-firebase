import { computed, toRefs, watchEffect, reactive, inject } from 'vue'
import { useFirebase } from './firebase.js'

const CollectionSymbol = Symbol('FirebaseCollection')

export function provideCollections(app) {
  app.provide(CollectionSymbol, reactive({}))
}

export function useCollection(name, filter) {
  const { firestore } = useFirebase()
  const state = inject(CollectionSymbol)

  if (!state) {
    throw Error('No Collection provided')
  }

  let field = ''
  let value = ''

  if (filter) {
    field = Object.keys(filter)[0]
    value = filter[field]
  }

  const hash = `${name}-${field}-${value}`

  if (!state[hash]) {
    let collection = firestore.collection(name)

    state[hash] = {}

    watchEffect(() => {
      if (field) {
        collection = collection.where(field, '==', value)
      }

      collection.onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'removed') {
            delete state[hash][change.doc.id]
          } else {
            state[hash][change.doc.id] = change.doc.data()
          }
        })
      })
    })
  }

  function get(id) {
    if (!state[hash]) {
      return {}
    }

    return state[hash][id]
  }

  const docs = computed(() => {
    if (!state[hash]) {
      return []
    }

    return Object.keys(state[hash]).map((key) => ({
      ...state[hash][key],
      id: key,
    }))
  })

  return {
    ...toRefs(state),
    get,
    docs,
  }
}
