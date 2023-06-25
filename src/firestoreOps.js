import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './config/firebase-config'
import { doc, setDoc, getDoc, addDoc, collection, deleteDoc, serverTimestamp, query, where, getDocs, updateDoc } from "firebase/firestore"

// Function to update user information in Firestore
export async function updateUserInfo(values, uid) {
    let userDoc = null
    let userRef = null
    try {
      userRef = doc(db, 'users', uid);
      userDoc = await getDoc(userRef);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  
    // when the input value is empty, it preserves the original values
    const updatedValues = {
      displayName: values.displayName || userDoc.data().displayName || null,
      fullName: values.fullName || userDoc.data().fullName || null,
      major: values.major || userDoc.data().major || null,
      year: values.year || userDoc.data().year || null,
      teleName: values.teleName || userDoc.data().teleName || null,
      modules: values.modules || userDoc.data().modules || null,
    };
  
    await updateDoc(userRef, updatedValues);
  }

  export async function registerUserInfo(values, uid) {
    let userDoc = null
    let userRef = null
    try {
      userRef = doc(db, 'users', uid);
      userDoc = await getDoc(userRef);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  
    // when the input value is empty, it preserves the original values
    const updatedValues = {
      uid: uid || userDoc.data().uid ,
      email: values.email || userDoc.data().email || null,
      displayName: values.displayName || userDoc.data().displayName || null,
      fullName: values.fullName || userDoc.data().fullName || null,
      major: values.major || userDoc.data().major || null,
      year: values.year || userDoc.data().year || null,
      teleName: values.teleName || userDoc.data().teleName || null,
      modules: values.modules || userDoc.data().modules || null,
    };
  
    await setDoc(userRef, updatedValues);
  }

  /**
   * handle studying session firestore access request
   */

  export async function createStudyingJio(values) {
    await addDoc(collection(db, "studySessions"), {
      date: values.date,
      time: values.time,
      venue: values.venue,
      capacity: values.capacity,
      description: values.description,
      participants: values.participants
    })
    .then(alert("Jio created! The page will refresh to show the update"))
    .then(window.location.reload())
    .catch(error => console.log("Error adding document: ", error.message));
  }

  export async function joinStudyingJio(joinUser, session) {
      if(!joinUser || !session) {
        console.log("Error input")
      }

      // fetch jio's data from firestore
      let sessionRef = null
      let sessionDoc = null
      try {
        sessionRef = doc(db, 'studySessions', session.sessionId);
        sessionDoc = await getDoc(sessionRef);
        console.log(sessionDoc)
        console.log(sessionDoc.data())
      } catch (e) {
        console.log("Error getting cached document:", e);
      }

      // check if the user is in the jio already
      const initialParticipants = sessionDoc.data().participants
      if (initialParticipants.some(participant => participant.uid === joinUser.uid)) {
        alert("You are in the Jio already!")
      } else if (session.participants.length == session.capacity) {
        alert("No more capacity!")
      } else {
        const updatedValues = {
          participants : [...initialParticipants, joinUser]
        }
      
        await updateDoc(sessionRef, updatedValues);
        alert("Join Successfully! The page will refresh to show the update");
        window.location.reload();
      }
  }

  export async function leaveStudyingJio(joinUser, session) {
      if(!joinUser || !session) {
        console.log("Error input")
      }

      // fetch jio's data from firestore
      let sessionRef = null
      let sessionDoc = null
      try {
        sessionRef = doc(db, 'studySessions', session.sessionId);
        sessionDoc = await getDoc(sessionRef);
        console.log(sessionDoc)
        console.log(sessionDoc.data())
      } catch (e) {
        console.log("Error getting cached document:", e);
      }

      // check if the user is in the jio already
      const initialParticipants = sessionDoc.data().participants
      const userExists = initialParticipants.find(participant => participant.uid === joinUser.uid);

      if (!userExists) {
        alert("You are not in the Jio!");
        return;
      } else if (session.participants[0].uid == joinUser.uid) {
        await deleteDoc(doc(db, "studySessions", session.sessionId));
        alert("Studying session deleted! Refresh to check!")
      } else {
        const updatedParticipants = initialParticipants.filter(participant => participant.uid !== joinUser.uid);

        const updatedValues = {
          participants: updatedParticipants
        };
      
        await updateDoc(sessionRef, updatedValues);
        alert("Leave Successfully! The page will refresh to show the update");
        window.location.reload();
      }
  }



  // export async function requestToJoinSession(values) {
  //   const docRef = await addDoc(collection(db, "sessionRequests"), {
  //     hostUid: values.hostUid,
  //     requesterUid: values.requesterUid,
  //     session: values.session,
  //     createdAt: serverTimestamp(),
  //   })
  //   .then(alert("Request sent!"))
  //   .catch(error => console.log("Error adding document: ", error.message));
  // }



  // /**
  //  * 
  //  * @param {*} hostUid 
  //  * @returns an array of request stored in firestore
  //  */
  // export async function displayRequest(hostUid) {
  //   // let querySnapshot = null
  //   const requestArray = []
  //     const requestsQuery = query(collection(db, "sessionRequests"), where("hostUid", "==", hostUid))
  //     await getDocs(requestsQuery)
  //     .then(querySnapshot => querySnapshot.forEach((doc) => requestArray.push({...doc.data(), id: doc.id})))
  //     .catch(error => console.log("Error getting cached document:", error))
  //       // doc.data() is never undefined for query doc snapshots
  //       // console.log(doc.id, " => ", doc.data());
        
  //   //   });
  //   // } catch (e) {
  //   //   console.log("Error getting cached document:", e);
  //   // }
  //   // console.log(requestArray)
  //   return requestArray
  // }

  // export async function acceptRequest(requestUid, sessionUid) {
  //   // delete requestUid
  //   // append participant in sessionUid: updasetDoc
  // }

  // export async function rejectRequest(requestUid, sessionUid) {
  //   // delete requestUid
  // }

