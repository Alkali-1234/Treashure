import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, Modal } from 'react-native';
import { Theme } from '../service/UniversalTheme';
import { userDataSnapshot } from '../service/UserDataService';
import AnnouncementCard from '../components/AnnouncementCard';
import { FontAwesome5, Ionicons } from 'react-native-vector-icons'
import * as HomeService from '../service/HomeService';


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

  const [showSelectedItemModal, setShowSelectedItemModal] = useState(false);

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
              <TouchableOpacity onPress={() => {
                setShowSelectedItemModal(true);
                HomeService.setAnnouncementSelectedItem(item);
              }} key={item.id}>
                <AnnouncementCard key={item.id} title={item.title} description={item.description} imageLink={item.image} author={item.author} authorProfilePictureLink={item.authorProfilePictureLink} />
              </TouchableOpacity>
              
            )}
          </View>
        </View>
      </View>
      <Modal
        animationType='fade'
        visible={showSelectedItemModal}
        onRequestClose={() => setShowSelectedItemModal(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
            <View style={styles.modalMainContent}>
              <View style={{height: "90%", width: "100%"}}>
                <Image source={{uri: HomeService.announcementCurrentSelectedItem?.image}} style={styles.modalImage} />
                <View style={styles.modalTopContentContainer}>
                  <Text style={styles.modalTitle}>{HomeService.announcementCurrentSelectedItem?.title}</Text>
                  <Text style={styles.modalDescription}>{HomeService.announcementCurrentSelectedItem?.description}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.modalFooter}>
                <Image source={{uri: HomeService.announcementCurrentSelectedItem?.authorProfilePictureLink}} style={styles.modalFooterImage} />
                <Text style={styles.footerText}>{HomeService.announcementCurrentSelectedItem?.author}</Text>
                </View>
                <View style={styles.modalCloseButtonContainer}>
                  <TouchableOpacity onPress={() => setShowSelectedItemModal(false)}>
                    <Ionicons name="exit-outline" size={24} color={Theme.text.primary} />
                  </TouchableOpacity>
                  
                </View>
              </View>
              
            </View>
        </View>
      </Modal>
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
  },
  modalContainer: {
    backgroundColor: 'rgba(20, 19, 19, 0.64)',
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalMainContent: {
    backgroundColor: Theme.primary,
    height: "60%",
    width: "60%",
    borderRadius: 10,
    justifyContent: 'space-between'
  },
  modalImage: {
    width: "100%",
    height: "35%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  modalTopContentContainer: {
    marginHorizontal: 10
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Theme.text.primary
  },
  modalDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: Theme.text.primary,
    fontStyle: 'italic'
  },
  modalFooter: {
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalFooterImage: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  footerText: {
    marginLeft: 5,
    fontSize: 15
  },
  modalCloseButtonContainer: {
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: Theme.secondary,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5
  }
})


export default Home;