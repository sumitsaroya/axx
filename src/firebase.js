import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';


const firebaseConfig = {
  apiKey: "AIzaSyDkieZcIMRukbAO5B8pvf3rpmgqt7YGMJ0",
  authDomain: "webcam-7d18e.firebaseapp.com",
  databaseURL: "https://webcam-7d18e-default-rtdb.firebaseio.com",
  projectId: "webcam-7d18e",
  storageBucket: "webcam-7d18e.appspot.com",
  messagingSenderId: "357663373695",
  appId: "1:357663373695:web:93c561bc8c46cdf2ca824a",
  measurementId: "G-7D6XPEMD2X"
};

firebase.initializeApp(config);
firebase.database();
firebase.storage();

export default firebase;
