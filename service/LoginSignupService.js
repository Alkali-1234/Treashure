import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getUserData } from "./UserDataService";


export async function login(email, password) {
  const LoginPromise = new Promise((resolve, reject) => {

  

  console.log("Logging in...")
  const auth = getAuth();
  if(email === "" || password === "") {
    reject("Failed! Please fill in all fields");
    return;
  }

    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const userDataResult = await getUserData(user.uid);
      if(userDataResult === "No data found"){
        reject("Failed! User data not found");
      }else{
        resolve("Success! Logged in as " + user.email);
      }
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

export async function signUp(username, email, password, retypePassword) {

  const auth = getAuth();


  

  const createUserPromise = new Promise((resolve, reject) => {

    if(username === "" || email === "" || password === "" || retypePassword === "") {
      reject("Failed! Please fill in all fields");
      return false;
    }

    if(password !== retypePassword) {
      reject("Failed! Passwords do not match");
      return false;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            resolve("Success! Signed up as " + user.email);
        })
        .catch((error) => {
            const errorMessage = error.message;
            const errorCode = error.code;
            reject("Failed! " + errorMessage + " " + errorCode);
            return false;
        });
    
    updateProfile(auth.currentUser, {
        displayName: username
    }).then(() => {
        console.log("Updated display name");
        return true;
    }).catch((error) => {
        const errorMessage = error.message;
        const errorCode = error.code;
        reject("Failed! " + errorMessage + " " + errorCode);
        return false;
    }
    )
    })
    
    return await createUserPromise;
    
}

