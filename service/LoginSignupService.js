import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getUserData, initializeUserData } from "./UserDataService";


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
      AsyncStorage.setItem("user", JSON.stringify(user));
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
      console.log(errorMessage)
      reject("Failed! " + errorMessage);
      return;
    });


    })
    return await LoginPromise;
}

export async function signUp(username, email, password, retypePassword) {

  const auth = getAuth();


  

  const createUserPromise = new Promise(async (resolve, reject) => {
    let user;
    if(username === "" || email === "" || password === "" || retypePassword === "") {
      reject("Failed! Please fill in all fields");
      return false;
    }

    if(password !== retypePassword) {
      reject("Failed! Passwords do not match");
      return false;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      user = userCredential.user;
      console.log("Success! Signed up as " + user.email);
      })
      .catch((error) => {
      const errorMessage = error.message;
      const errorCode = error.code;
      reject("Failed! " + errorMessage + " " + errorCode);
      return false;
    });
    
    await updateProfile(auth.currentUser, {
        displayName: username
    }).then(() => {
        console.log("Updated display name");
    }).catch((error) => {
        const errorMessage = error.message;
        const errorCode = error.code;
        reject("Failed! " + errorMessage + " " + errorCode);
        return false;
    })
    await initializeUserData(user.uid, user.displayName, user.email, 
      "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=")
      resolve();
    })
    
    return await createUserPromise;
    
}

