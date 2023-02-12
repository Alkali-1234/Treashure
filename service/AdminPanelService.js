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

export const handleAcceptItem = (item) => {
    console.log(item)
}

export const handleRejectItem = (item) => {
    console.log(item)
}

export const addAnnouncement = (announcement) => {
    console.log(announcement)
}

export const handleTrashSubmission = (item) => {
    console.log(item)
}