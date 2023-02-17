import { getDatabase, ref, set, get, child } from "firebase/database";


export let UniversalAnnouncementData;
export let UniversalAnnouncementData2 = [];

export let UniversalTrashExchangeLocations = [
    {
        address:"Jl. Raya Cirendeu",
        district:"Tangerang Selatan",
        link:"https://goo.gl/maps/wn7JAkDTpDVm7WfC9",
        fullAddress: "Jl. Raya Cirendeu No.40, Pisangan, Kec. Ciputat Tim., Kota Tangerang Selatan, Banten 15419",
        embedLink: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.7927420227484!2d106.76769263181914!3d-6.318052829077691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69efe7cd5f622b%3A0xaed037a1b8403f01!2sSMP%20-%20SMA%20Labschool%20Cirendeu%20UNJ!5e0!3m2!1sen!2sid!4v1675915665720!5m2!1sen!2sid" width="100%" height="50%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        address:"Gg. Sawo 1",
        district:"Jakarta Selatan",
        link:"https://goo.gl/maps/8MrDDp7ruWXBpyJT9",
        fullAddress: "Jl. Sawo I, No. 19/Kavling A/B/C/D/E/F, Jl. Raya Jagakarsa No.4, RT.1/RW.4, Jagakarsa, South Jakarta City, Jakarta 12620",
        embedLink: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1402.0309153622857!2d106.80921144967031!3d-6.3236893867115525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ee724af85557%3A0x8311e58e08767de6!2sLINEA%20Haus!5e0!3m2!1sen!2sid!4v1675915697236!5m2!1sen!2sid" width="100%" height="50%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    }
    
]

export let UniversalCoinExchangeCatalogue = [
    {
        name: "Red Beanie",
        description: "Red Beanie for everyone, youth sized and adult sized",
        image: "https://picsum.photos/200",
        cost: 200
    },
    {
        name: "Black themed landyard",
        description: "The perfect landyard for the perfect card",
        image: "https://picsum.photos/200",  
        cost: 350
    }
]


export const getAnnouncementsData = async () => {
    console.log("Getting announcements data")
    // try {
        const dbRef = ref(getDatabase());
        
        const snapshot = await get(child(dbRef, 'announcements/'))
        if (snapshot.exists()) {
            UniversalAnnouncementData = snapshot.val();
            console.log("Console logged from Universal Service ", snapshot.val());
            return snapshot.val();
        } else {
            return("Failed! No data available");
        }
    // } catch (error) {
    //     console.log(error);
    // }
}

export const setTrashExchangeLocationsData = (data) => {
    UniversalTrashExchangeLocations = data;
}

export const setCoinExchangeCatalogue = (data) => {
    UniversalCoinExchangeCatalogue = data;
}