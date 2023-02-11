
//Placeholder data
export let userDataSnapshot = {
    'username':"Lorem",
    'profilePictureLink':"https://picsum.photos/200",
    'email': "lorem.ipsum@mail.com",
    'password': "loremIpsum1234",
    'coins': 100,
    'trash': 572,
    'joined': '1/1/2023',
    'isAdmin': false,


}

export function setUserData(data) {
    userDataSnapshot = data;
}
