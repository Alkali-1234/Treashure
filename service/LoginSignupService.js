import * as firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export function login(email, password) {
    

    signInWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(userCredential);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    console.log(error);
    });
    return true;
}

export function signUp(username, email, password) {
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then((userCredential) => {
    //         console.log("Sign up successful ", userCredential);
    //     })
    //     .catch((error) => {
    //         console.log("Sign up failed ", error);
    //     });
    
    
}

