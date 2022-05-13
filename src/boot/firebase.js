import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDHkeWkthaskcwCPIAijJQmxr3NL-9BYiE",

  authDomain: "duns-attendance.firebaseapp.com",

  databaseURL:
    "https://duns-attendance-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "duns-attendance",

  storageBucket: "duns-attendance.appspot.com",

  messagingSenderId: "587257479744",

  appId: "1:587257479744:web:39639412ff5732c57d55a5",
};

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
