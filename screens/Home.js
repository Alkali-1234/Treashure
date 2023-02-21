import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { Theme } from '../service/UniversalTheme';
import * as UserDataService from '../service/UserDataService';
import AnnouncementCard from '../components/AnnouncementCard';
import { FontAwesome5, Ionicons, AntDesign } from 'react-native-vector-icons'
import * as HomeService from '../service/HomeService';
import { UniversalAnnouncementData } from '../service/UniversalService';
import * as Value from '../constants/trashValueConstants';
import TrashValue from '../components/TrashValue';
import { getAnnouncementsData } from '../service/UniversalService';
import { deleteAnnouncement } from '../service/AdminPanelService';

function Home({navigation}) {

  const [showSelectedItemModal, setShowSelectedItemModal] = useState(false);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  const [announcementMessage, setAnnouncementMessage] = useState('Loading Announcements...');
  const [announcementsData, setAnnouncementsData] = useState(null);
  const [reloadAnnouncements, setReloadAnnouncements] = useState(false);
  const [userDataSnapshot, setUserDataSnapshot] = useState(null);
    useEffect(() => {
      setUserDataSnapshot(UserDataService.userDataSnapshot);
    }, [UserDataService.userDataSnapshot])

    useEffect(() => {
      navigation.setOptions({headerShown: false});
      getData();
    }, [reloadAnnouncements])

    const getData = async () => {
      setIsLoadingAnnouncements(true);
      const data = await getAnnouncementsData();
      if(typeof(data) === String){
        setAnnouncementMessage(data);
        setIsLoadingAnnouncements(false)
        return false;
      }
      setAnnouncementsData(data.filter((item) => item !== undefined));
      setIsLoadingAnnouncements(false);
      setReloadAnnouncements(false);
      return true;
    }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 15}}>
          <Image style={{height: 40, width: 40, borderRadius: 20}} source={{uri: userDataSnapshot?.profilePictureLink}} />
          <Text style={styles.usernameText}>{userDataSnapshot?.username}</Text>
          {/* Admin Badge */}
          {userDataSnapshot?.isAdmin ? 
          <View style={{backgroundColor: "darkred", borderRadius: 5, marginLeft: 10}}><Text style={{color: "white", fontWeight: 'bold', padding: 5}}>Admin</Text></View>

          : null}
        </View>

        {/* Coin and Trash display, show only for non-admins */}
        {!userDataSnapshot?.isAdmin ? 
        
        <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 30, marginTop: 15}}>
          <FontAwesome5 name='coins' size={24} color="yellow" />
          <Text style={styles.numValTopBar}>{userDataSnapshot?.coins}</Text>
          <FontAwesome5 name='trash-alt' size={24} color={Theme.text.primary} style={{marginLeft: 15}} />
          <Text style={styles.numValTopBar}>{userDataSnapshot?.trash}</Text>
        </View>
        
        : null}
        
      </View>
      <View style={styles.mainContentContainer} >
        <View>
          
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'center', justifyContent: 'center', width: 55, backgroundColor: Theme.secondary, borderRadius: 15}} >
            <FontAwesome5 name='bolt' size={24} color={Theme.text.primary} />
            </View>
            <View style={styles.recentActivities.textContainer}>

            <Text style={styles.recentActivities.text}>Announcements</Text>
            </View>
          </View>
          
          
          {userDataSnapshot?.isAdmin ? <View><TouchableOpacity onPress={() => navigation.navigate("AdminAddAnnouncements")}><Ionicons name='add' size={48} color={Theme.text.primary} /></TouchableOpacity></View> : null}
          
        </View>
        <View style={styles.recentActivities.container}>
          {isLoadingAnnouncements ? <ActivityIndicator size={24} color={Theme.text.primary} style={{marginTop: 15}} /> : null}
          
          

          <ScrollView style={{width: "100%"}} contentContainerStyle={{alignItems: 'center'}}>
          {announcementsData?.map((item) =>
            
            <TouchableOpacity onPress={() => {
              setShowSelectedItemModal(true);
              HomeService.setAnnouncementSelectedItem(item);
            }} key={item.id}>
              <AnnouncementCard key={item.id} title={item.title} description={item.description} imageLink={item.image} author={item.author} authorProfilePictureLink={item.authorProfilePictureLink} />
            </TouchableOpacity>
            
            
          )}
          </ScrollView>
        </View>
        
        {/* Trash Directory */}
        <View>
          <Text style={[styles.recentActivities.text, {padding: 0, marginVertical: 10, fontWeight: 'bold'}]}>Trash Values</Text>
          <Text style={{color: Theme.text.primary, fontSize: 12, backgroundColor: Theme.form.background, padding: 5, borderRadius: 5}}>Trash values are based on it's type and weight per 100g</Text>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
            {[
              {id: 1, type: 'Paper', iconColor1: '#C0C0BE', iconColor2: '#DBDBDB', textColor: '#000', multiplier: Value.PAPER_MULTIPLIER},
              {id: 2, type: 'Plastic', iconColor1: '#3EC965', iconColor2: '#ABF1B2', textColor: '#000', multiplier: Value.PLASTIC_MULTIPLIER},
              {id: 3, type: 'Organic', iconColor1: '#92B4AB', iconColor2: '#D0EAEC', textColor: '#000', multiplier: Value.ORGANIC_MULTIPLIER},
            
            ].map((item) => { return <TrashValue key={item.id} type={item.type} iconColor1={item.iconColor1} iconColor2={item.iconColor2} textColor={item.textColor} multiplier={item.multiplier} /> })}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
            {[
              {id: 1, type: 'Metal', iconColor1: '#DBBE58', iconColor2: '#F0A1A1', textColor: '#000', multiplier: Value.METAL_MULTIPLIER},
              {id: 2, type: 'Cloth', iconColor1: '#B79005', iconColor2: '#FFE600', textColor: '#000', multiplier: Value.CLOTH_MULTIPLIER},
              {id: 3, type: 'Cardboard', iconColor1: '#838383', iconColor2: '#FFCD1E', textColor: '#000', multiplier: Value.CARDBOARD_MULTIPLIER},
            ].map((item) => { return <TrashValue key={item.id} type={item.type} iconColor1={item.iconColor1} iconColor2={item.iconColor2} textColor={item.textColor} multiplier={item.multiplier} /> })}
          </View>
        </View>
        

        </View>
        <View style={styles.exchangeButtonContainer}>
          <TouchableOpacity style={styles.exchangeButton} onPress={() => navigation.navigate("TrashExchange")}>
            <Text style={styles.exchangeText}>Trash Exchange</Text>
            <AntDesign name="right" size={24} color={Theme.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.exchangeButton, {marginTop: 15}]} onPress={() => navigation.navigate("CoinExchange")}>
            <Text style={styles.exchangeText}>Coin Exchange</Text>
            <AntDesign name="right" size={24} color={Theme.text.primary} />
          </TouchableOpacity>
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
              <View style={{height: "80%", width: "100%"}}>
                <Image source={{uri: HomeService.announcementCurrentSelectedItem?.image}} style={styles.modalImage} />
                <View style={styles.modalTopContentContainer}>
                  <Text style={styles.modalTitle}>{HomeService.announcementCurrentSelectedItem?.title}</Text>
                  <Text style={styles.modalDescription}>{HomeService.announcementCurrentSelectedItem?.description}</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity style={{margin: 10, padding: 10, backgroundColor: "red", borderRadius: 5}} onPress={async () => {await deleteAnnouncement(HomeService.announcementCurrentSelectedItem.id); setReloadAnnouncements(true)}}>
                  <Text style={{color: "white", textAlign: 'center'}}>Delete Announcement</Text>
                </TouchableOpacity>
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
    marginTop: 15,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between'
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
      borderRadius: 10,
      height: 250,
      backgroundColor: Theme.secondary,
      alignItems: 'center',
      justifyContent: 'center',
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
    height: "75%",
    width: "75%",
    borderRadius: 15,
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
  },
  exchangeButtonContainer: {
    marginVertical: 15,
  },
  exchangeButton: {
    padding: 10,
    backgroundColor: Theme.secondary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  exchangeText: {
    color: Theme.text.primary,
    fontSize: 18
  }
})


export default Home;