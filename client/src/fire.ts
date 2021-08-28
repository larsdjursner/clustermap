import firebase from "firebase";
// import * as firebaseConfig from "./firebaseConfig.json";


// ENV
const firebaseConfig = {
  apiKey: "AIzaSyCv_4OUcLR6vf_VoCjeW2AnsB6gFNT0OW4",
  authDomain: "clustermap-c4830.firebaseapp.com",
  projectId: "clustermap-c4830",
  storageBucket: "clustermap-c4830.appspot.com",
  messagingSenderId: "893842102714",
  appId: "1:893842102714:web:4b647e10a5d78c03126583"
};

// const firebaseParams = {
//   apiKey: firebaseConfig.apiKey,
//   appId: firebaseConfig.appId,
//   authDomain: firebaseConfig.authDomain,
//   projectId: firebaseConfig.projectId,
//   messagingSenderId: firebaseConfig.messagingSenderId,
//   storageBucket: firebaseConfig.storageBucket,
// };

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const fire = firebase;
export default fire;
