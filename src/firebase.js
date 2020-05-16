import { provide, inject } from "vue";

const FirebaseSymbol = Symbol();

export function useFirebase() {
  const result = inject(FirebaseSymbol);

  if (!result) {
    throw Error("No Firebase provided");
  }

  return result;
}

export function provideFirebase(firebase, options) {
  if (firebase.apps.length > 0) {
    return;
  }

  firebase.initializeApp(options.config);

  if (options.analytics) {
    firebase.analytics();
  }

  firebase
    .firestore()
    .enablePersistence()
    .catch((err) => {
      if (err.code === "failed-precondition") {
        console.error(
          "Multiple tabs open, persistence can only be enabled in one tab at a a time."
        );
      } else if (err.code === "unimplemented") {
        console.error(
          "The current browser does not support all of the features required to enable persistence"
        );
      }
    });

  const firestore = firebase.firestore();

  provide(FirebaseSymbol, {
    firebase,
    firestore,
  });
}
