export let UniversalAnnouncementData = [
    {
      id: 1,
      title: "New Arrivals!",
      description: "Come check out these 3 new items: Red Beanie, Red Sweater, and a black-themed landyard. Get it before it's gone!",
      image: "https://picsum.photos/200",
      author: "Alkaline",
      authorProfilePictureLink: "https://picsum.photos/200"
  
    },
    {
      id: 2,
      title: "New Update!",
      description: "Update 0.4.0 New update!",
      image: "https://picsum.photos/200",
      author: "Alkaline",
      authorProfilePictureLink: "https://picsum.photos/200"
  
    }
  ]


export let UniversalTrashExchangeLocations = [
    {
        address:"Jl. Raya Cirendeu",
        district:"Tangerang Selatan",
        link:"https://goo.gl/maps/wn7JAkDTpDVm7WfC9"
    },
    {
        address:"Gg. Sawo 1",
        district:"Jakarta Selatan",
        link:"https://goo.gl/maps/8MrDDp7ruWXBpyJT9"
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


export const setAnnouncementData = (data) => {
    UniversalAnnouncementData = data;
}

export const setTrashExchangeLocationsData = (data) => {
    UniversalTrashExchangeLocations = data;
}

export const setCoinExchangeCatalogue = (data) => {
    UniversalCoinExchangeCatalogue = data;
}