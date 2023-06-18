import { aut, db } from '../config/firebase-config'
import { doc, setDoc, getDoc } from "firebase/firestore"

async function getUserDoc(uid) {
    const userDoc = null
    const userRef = null
    try {
      userRef = doc(db, 'users', uid);
      userDoc = await getDoc(userRef);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
    return userDoc
  }

