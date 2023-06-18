import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../../config/firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from "firebase/firestore"

const AuthContext = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise, 
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      // update the user login status 
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        setCurrentUser(userDoc.data() || user);
      } else {
        setCurrentUser(null);
      } 
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('The user is', currentUser)
  }, [currentUser])

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  async function logout() {
    return await signOut(auth)
  }




  // async function updateUserInfo(values, uid) {
  //   const userDoc = null
  //   const userRef = null
  //   try {
  //     userRef = doc(db, 'users', uid);
  //     userDoc = await getDoc(userRef);
  //   } catch (e) {
  //     console.log("Error getting cached document:", e);
  //   }
  
  //   // when the input value is empty, it preserves the original values
  //   const updatedValues = {
  //     uid: userDoc.data().uid,
  //     email: values.email || userDoc.data().email || null,
  //     displayName: values.displayName || userDoc.data().displayName || null,
  //     fullName: values.fullName || userDoc.data().fullName || null,
  //     major: values.major || userDoc.data().major || null,
  //     year: values.year || userDoc.data().year || null,
  //     teleName: values.teleName || userDoc.data().teleName || null,
  //     modules: values.modules || userDoc.data().modules || null,
  //   };
  
  //   await setDoc(userRef, updatedValues);
  // }


  const value = {
    currentUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    // updateUserInfo,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}