import { addFirestoreDoc, deleteFirestoreDoc, getFirestoreDocs, updateFirestoreDoc } from './UniversalService';
import { where, collection, query, getDocs, getFirestore, updateDoc, doc } from 'firebase/firestore';
import { userDataSnapshot } from './UserDataService';

export let requestCodeList = [
    {
        'requestID': 1,
        'requester': 'Lorem',
        'requesterEmail': 'lorem.ipsum@lorem.com',
        'code': '1234',
        'status': 'Pending',
        'item': 'Red Beanie',
    },
    {
        'requestID': 2,
        'requester': 'Ipsum',
        'requesterEmail': 'ipsum.lorem@lorem.com',
        'code': '5678',
        'status': 'Pending',
        'item': 'Black Themed Landyard',
    },
]

export const getRequestCodes = async () => {
    const getRequestCodesFromFirestore = await getFirestoreDocs('requestCodes');
    const requestCodes = [];
    getRequestCodesFromFirestore.forEach(item => {
        const id = item.id;
        requestCodes.push({id, ...item.data()});
    });
    return requestCodes;
}

export const handleAcceptItem = (item) => {
    console.log(item)
    // const ref = collections(db, "users");
    // const usernameQueryRef = query(ref, where("username", "==", username));
    // const docSnap = getDoc(usernameQueryRef);
}

export const handleRejectItem = (item) => {
    console.log(item)
}

export const addAnnouncement = async (announcement) => {
    console.log("Adding announcements...", announcement);
    await addFirestoreDoc("announcements", announcement);
    console.log("Added announcement!");
    console.log("Refreshing...");
}

export const deleteAnnouncement = async (announcementID) => {
    console.log("Deleting announcement...", announcementID);
    await deleteFirestoreDoc("announcements", announcementID);
    console.log("Deleted announcement!");
}

export const handleTrashSubmission = async (username, amount, trashAmount) => {
    const db = getFirestore();
    let userID = "";
    let userCoins = 0;
    let userTrash = 0;
    try {
        const q = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            userID = doc.id;
            userCoins = doc.data().coins;
            userTrash = doc.data().trash;
        });
        console.log("Submitting trash...", username, amount, trashAmount);
    } catch (error) {
        alert(error)
        return false;
    }
    try {
        await updateFirestoreDoc("users", userID, {
            coins: userCoins + amount,
            trash: userTrash + trashAmount
        })
        return true;
    } catch (error) {
        alert(error);
        return false;
    }
    
    
}