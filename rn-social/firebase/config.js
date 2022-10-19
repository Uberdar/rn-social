import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjiok2fsvlCk2tLfJTXqyDqZYo9-aRL_M",
  authDomain: "rn-social-371ec.firebaseapp.com",
  projectId: "rn-social-371ec",
  storageBucket: "rn-social-371ec.appspot.com",
  messagingSenderId: "860572270711",
  appId: "1:860572270711:web:3239489bc3e24642c74672",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
