import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './config/firebase-config'
import { doc, setDoc, getDoc, addDoc, collection, deleteDoc, serverTimestamp, query, where, getDocs, updateDoc } from "firebase/firestore"
import { toast } from 'react-toastify'


const DatabaseContext = React.createContext();

export function useDatabase() {
    return useContext(DatabaseContext);
}

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

  //Post new discussion to firestore
  export async function createDiscussion(title, description, moduleCode, username) {
    function toMonthEnglishName(month) {
      var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      month = monthNames[month-1];
      return month;
    }
    function getTimeWithAmPm(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + '' + ampm;
      return strTime;
    }
    var date = new Date();
    date = getTimeWithAmPm(date) + ' ' + date.getDate() + '-' + toMonthEnglishName(date.getMonth()+1) + '-' + date.getFullYear() 
    await addDoc(collection(db, "forum-" + moduleCode), {
      title: title,
      description: description,
      username: username,
      comments: [],
      createdAt: date,
    })
    .then(alert("Discussion created!"))
    .catch(error => alert("Error adding document: ", error.message));
  }

  //retrive all discussions from firestore by module code
  export async function getDiscussions(moduleCode) {
    const querySnapshot = await getDocs(collection(db, "forum-" + moduleCode), where("moduleCode", "==", moduleCode));
    //create a new array of discussions with id
    const discussions = querySnapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()}
    })
    return discussions;
  }

  export async function createComment(text, moduleCode, username, discussionId) {
    function toMonthEnglishName(month) {
      var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      month = monthNames[month-1];
      return month;
    }
    function getTimeWithAmPm(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + '' + ampm;
      return strTime;
    }
    var date = new Date();
    date = getTimeWithAmPm(date) + ' ' + date.getDate() + '-' + toMonthEnglishName(date.getMonth()+1) + '-' + date.getFullYear() 
    var commentObj = {
      username: username,
      text: text,
      createdAt: date,
    }
    const docRef = doc(db, "forum-" + moduleCode, discussionId);
    const existingComments = (await getDoc(docRef)).data().comments;
    existingComments.push(commentObj);
    await updateDoc(doc(db, "forum-" + moduleCode, discussionId), {
      comments: existingComments
    })

    .then(alert("Comment created!"))
    .catch(error => alert("Error adding document: ", error.message));
    

  }
    

  //telegram link functions
  //createTelegramLink, getTelegramLinks
  export async function createTelegramLink(link, description, moduleCode, username) {
    await addDoc(collection(db, "telegram-link-" + moduleCode ), {
      link: link,
      description: description,
      uploadBy: username,
    })
    .then(alert("Link created!"))
    .catch(error => alert("Error adding document: ", error.message));
  }

  export async function getTelegramLinks(moduleCode) {
    const querySnapshot = await getDocs(collection(db, "telegram-link-" + moduleCode), where("moduleCode", "==", moduleCode));
    //create a new array of discussions with id
    const links = querySnapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()}
    })
    return links;
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

