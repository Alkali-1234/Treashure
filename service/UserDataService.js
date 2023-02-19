import { getFirestore, getDoc, doc, setDoc, Timestamp } from "firebase/firestore";


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
        return(dataSnapshot.data());
    }
}

export const initializeUserData = async (uuid, _username, _email, _profilePictureLink) => {
    console.log("Initializing user data...");
    const db = getFirestore();
    await setDoc(doc(db, "users", uuid), {
        username: _username,
        email: _email,
        profilePictureLink: _profilePictureLink,
        coins: 0,
        trash: 0,
        joined: Timestamp.now(),
        isAdmin: false
    });
    console.log("Initialized user data!")
    return true;
}
