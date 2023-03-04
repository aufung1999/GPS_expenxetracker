// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlU-34DtLpV-NBWCWnQXVy7yBx141Niu4",
  authDomain: "gps-expense-tracker.firebaseapp.com",
  projectId: "gps-expense-tracker",
  storageBucket: "gps-expense-tracker.appspot.com",
  messagingSenderId: "198678273948",
  appId: "1:198678273948:web:a120ef691e6ce3be90b259",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth()

export {auth}
