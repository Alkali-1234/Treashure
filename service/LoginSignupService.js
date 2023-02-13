import * as firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export let message = "";

export function login(email, password) {
  if(email === "" || password === "") {
    message = "Failed! Please fill in all fields";
    return false;
  }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      message = "Success! Logged in as " + user.email;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      message = "Failed! " + errorMessage + " " + errorCode;
      return false;
    });
    return true;
}

export function signUp(username, email, password) {

  if(username === "" || email === "" || password === "") {
    message = "Failed! Please fill in all fields";
    return false;
  }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            message = "Success! Signed up as " + user.email;
        })
        .catch((error) => {
            message = "Failed! " + errorMessage + " " + errorCode;
            return false;
        });
    
    updateProfile(auth.currentUser, {
        displayName: username
    }).then(() => {
        console.log("Updated display name");
        return true;
    }).catch((error) => {
        message = "Failed! " + errorMessage + " " + errorCode;
        return false;
    }
    )
    
    
}

