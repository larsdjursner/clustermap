import firebase from "firebase";
import * as firebaseConfig from "./firebaseConfig.json";

const firebaseParams = {
  apiKey: firebaseConfig.apiKey,
  appId: firebaseConfig.appId,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  messagingSenderId: firebaseConfig.messagingSenderId,
  storageBucket: firebaseConfig.storageBucket,
};

try {
  firebase.initializeApp(firebaseParams);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const fire = firebase;
export default fire;
