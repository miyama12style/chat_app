import firebase from "firebase/app";
import 'firebase/firestore';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCZwHgeUvWRTswvOA2jeGdC-ZYD32UVKbM",
  authDomain: "chatapp-52.firebaseapp.com",
  projectId: "chatapp-52",
  storageBucket: "chatapp-52.appspot.com",
  messagingSenderId: "432845587292",
  appId: "1:432845587292:web:80c0500d519078c84b3799",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
