import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAK-ntX2zcIbNl1L0ZjatvXYKj7n6UHngQ",
  authDomain: "styleit-1157c.firebaseapp.com",
  databaseURL: "https://styleit-1157c.firebaseio.com",
  projectId: "styleit-1157c",
  storageBucket: "styleit-1157c.appspot.com",
  messagingSenderId: "334932835711",
  appId: "1:334932835711:web:5f25b163253ef0c0916e4a"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore();
