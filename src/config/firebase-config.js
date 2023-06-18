import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzBvHnEElABsFIPJuIqDmWP4miSWWU1Vg",
  authDomain: "studypal-589e6.firebaseapp.com",
  projectId: "studypal-589e6",
  storageBucket: "studypal-589e6.appspot.com",
  messagingSenderId: "732644670725",
  appId: "1:732644670725:web:32331b173ff72373accb6c",
  measurementId: "G-47NGFTFNJ2"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);