import { getFirestore, getDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";


//Placeholder data
export let userDataSnapshot = {
    'username':"",
    'profilePictureLink':"https://picsum.photos/200",
    'email': "",
    'password': "",
    'coins': 0,
    'trash': 0,
    'joined': '1/1/2023',
    'isAdmin': false,
}

export let userAuthenticationSnapshot = {

}

export const updateUserProfile = async (username, email, profilePictureLink) => {
    console.log("Updating user profile...");
    const db = getFirestore();
    const auth = getAuth();
    try {
        if(userDataSnapshot.username != username && username != "" && username != null){
        await updateProfile(auth.currentUser, {
            displayName: username,
        })
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            username,
        });
        }
        if(userDataSnapshot.email != email && email != "" && email != null){
            await updateEmail(auth.currentUser, email);
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                email,
            }, {merge: true});
        }
        if(userDataSnapshot.profilePictureLink != profilePictureLink && profilePictureLink != "" && profilePictureLink != null){
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                profilePictureLink,
            }, {merge: true});
        }
    } catch (error) {
        alert(error);
    }
    

    try {
        console.log("Refreshing user data...");
        const authData = JSON.parse(await AsyncStorage.getItem("user"));
        await getUserData(authData.uid);
        console.log("Refreshed user data!") 
    } catch (error) {
        alert(error);
    }
    
}

export const getUserData = async (uuid) => {
    //Pull data from firebase
    console.log("Getting user data...")
    const db = getFirestore();
    const dataSnapshot = await getDoc(doc(db, 'users/', uuid));
    if(dataSnapshot.empty){
        return("No data found");
    }else{
        userDataSnapshot = dataSnapshot.data();
        console.log(dataSnapshot.data());
        AsyncStorage.setItem("userData", JSON.stringify(dataSnapshot.data()));
        return(dataSnapshot.data());
    }
}

export const initializeUserData = async (uuid, username, email, profilePictureLink) => {
    console.log("Initializing user data...");
    const db = getFirestore();
    await setDoc(doc(db, "users", uuid), {
        username,
        email,
        profilePictureLink,
        coins: 0,
        trash: 0,
        joined: Timestamp.now(),
        isAdmin: false
    });
    console.log("Initialized user data!")
    return true;
}

export const logout = async () => {
    const auth = getAuth();
    await auth.signOut();
    await AsyncStorage.removeItem("user");
    console.log("Removed Trace")
    return true;
}

