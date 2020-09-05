import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCa8_ZbHPu3as89uR-gQYZY7QS0-qBHWvs",
  authDomain: "paper-f866e.firebaseapp.com",
  databaseURL: "https://paper-f866e.firebaseio.com",
  projectId: "paper-f866e",
  storageBucket: "paper-f866e.appspot.com",
  messagingSenderId: "654987006907",
  appId: "1:654987006907:web:6fa5dd132cf5915e71ea9e"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;