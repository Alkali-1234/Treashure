import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";



export async function login(email, password) {
  const LoginPromise = new Promise((resolve, reject) => {

  

  console.log("Logging in...")
  const auth = getAuth();
  if(email === "" || password === "") {
    reject("Failed! Please fill in all fields");
    return;
  }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      resolve("Success! Signed in as " + user.email);
      return;
    })
    .catch((error) => {
      const errorMessage = error.message;
      reject("Failed! " + errorMessage);
      return;
    });
    })
    return await LoginPromise;
}

export function signUp(username, email, password) {

  if(username === "" || email === "" || password === "") {
    message = "Failed! Please fill in all fields";
    return false;
  }

    // createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //         message = "Success! Signed up as " + user.email;
    //     })
    //     .catch((error) => {
    //         message = "Failed! " + errorMessage + " " + errorCode;
    //         return false;
    //     });
    
    // updateProfile(auth.currentUser, {
    //     displayName: username
    // }).then(() => {
    //     console.log("Updated display name");
    //     return true;
    // }).catch((error) => {
    //     message = "Failed! " + errorMessage + " " + errorCode;
    //     return false;
    // }
    // )
    
    
}

