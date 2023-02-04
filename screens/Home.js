import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Theme } from '../service/UniversalTheme';
import { userDataSnapshot } from '../service/UserDataService';
import AnnouncementCard from '../components/AnnouncementCard';
import { FontAwesome5 } from 'react-native-vector-icons'

const dummyFlatListData = [
  {
    id: 1,
    title: "New Arrivals!",
    description: "Come check out these 3 new items: Red Beanie, Red Sweater, and a black-themed landyard. Get it before it's gone!",
    image: userDataSnapshot.profilePictureLink,
    author: "Alkaline",
    authorProfilePictureLink: userDataSnapshot.profilePictureLink

  },
  {
    id: 2,
    title: "New Update!",
    description: "Update 0.4.0 New update!",
    image: userDataSnapshot.profilePictureLink,
    author: "Alkaline",
    authorProfilePictureLink: userDataSnapshot.profilePictureLink

  }
]

function Home({navigation}) {
  
    useEffect(() => {
      navigation.setOptions({headerShown: false})
    })

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 15}}>
          <Image style={{height: 40, width: 40, borderRadius: 20}} source={{uri: userDataSnapshot.profilePictureLink}} />
          <Text style={styles.usernameText}>{userDataSnapshot.username}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 30, marginTop: 15}}>
          <FontAwesome5 name='coins' size={24} color="yellow" />
          <Text style={styles.numValTopBar}>{userDataSnapshot.coins}</Text>
          <FontAwesome5 name='trash-alt' size={24} color={Theme.text.primary} style={{marginLeft: 15}} />
          <Text style={styles.numValTopBar}>{userDataSnapshot.trash}</Text>
        </View>
      </View>
      <View style={styles.mainContentContainer} >
        <View>
          
          <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'center', justifyContent: 'center', width: 55, backgroundColor: Theme.secondary, borderRadius: 15}} >
              <FontAwesome5 name='bolt' size={24} color={Theme.text.primary} />
            </View>
            <View style={styles.recentActivities.textContainer}>
              
            <Text style={styles.recentActivities.text}>Announcements</Text>
            </View>
          </View>
          <View style={styles.recentActivities.container}>
            {dummyFlatListData.map((item) =>
              <TouchableOpacity>
                <AnnouncementCard key={item.id} title={item.title} description={item.description} imageLink={item.image} author={item.author} authorProfilePictureLink={item.authorProfilePictureLink} />
              </TouchableOpacity>
              
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.primary,
    height: '100%',
  },
  topBar: {
    backgroundColor: Theme.secondary,
    width: '100%',
    height: 85,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15
  },
  numValTopBar: {
    marginLeft: 5,
    fontSize: 15
  },
  mainContentContainer: {
    marginHorizontal: 30,
    marginTop: 15
  },
  recentActivities: {
    text: {
      color: Theme.text.primary,
      fontSize: 25,
      padding: 10,
    },
    textContainer: {
      width: 208,
      borderRadius: 15
    },
    container: {
      marginTop: 15,
      borderRadius: 15,
      height: 250,
      backgroundColor: Theme.secondary,
      alignItems: 'center',
    }
  }
})


export default Home;