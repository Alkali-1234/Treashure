import { getDatabase, ref, set, get, child } from "firebase/database";


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
    const getDatabasePromise = new Promise(async (resolve, reject) => {

    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/' + uuid)).then((snapshot) => {
        
        if (snapshot.exists()) {
            userDataSnapshot = snapshot.val();
            resolve("Success! Pulled user data");
        } else {
            reject("Failed! No data available");
        }
    }).catch((error) => {
        reject("Failed! " + error);
    });
    })

    return await getDatabasePromise;
}
