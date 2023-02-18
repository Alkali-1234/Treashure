import { getFirestore, getDoc, doc } from "firebase/firestore";


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
