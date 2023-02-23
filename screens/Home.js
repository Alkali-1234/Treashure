import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, Modal, ActivityIndicator, ScrollView } from 'react-native';
import * as UniversalTheme from '../service/UniversalTheme';
import * as UserDataService from '../service/UserDataService';
import AnnouncementCard from '../components/AnnouncementCard';
import { FontAwesome5, Ionicons, AntDesign } from 'react-native-vector-icons'
import * as HomeService from '../service/HomeService';
import { UniversalAnnouncementData } from '../service/UniversalService';
import * as Value from '../constants/trashValueConstants';
import TrashValue from '../components/TrashValue';
import { getAnnouncementsData } from '../service/UniversalService';
import { deleteAnnouncement } from '../service/AdminPanelService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home({navigation}) {

  const [showSelectedItemModal, setShowSelectedItemModal] = useState(false);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  const [announcementMessage, setAnnouncementMessage] = useState('Loading Announcements...');
  const [announcementsData, setAnnouncementsData] = useState(null);
  const [reloadAnnouncements, setReloadAnnouncements] = useState(false);
  const [userDataSnapshot, setUserDataSnapshot] = useState(null);
  const isFocused = useIsFocused();
  const [Theme, setThemeValue] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      navigation.addListener('beforeRemove', (e) => {
        if(e.data.action.type == 'GO_BACK'){
          e.preventDefault();
        }else{
          return;
        }
      });
    }, [navigation])

    useEffect(() => {
      if(isFocused){
        getUserDataFromAsyncStorage();}
        getThemeFromAsyncStorage();
    }, [isFocused])

    useEffect(() => {
      navigation.setOptions({headerShown: false});
      getData();
    }, [reloadAnnouncements])

    useEffect(() => {
      checkIfHasLoggedInBefore();
    }, []);

    const checkIfHasLoggedInBefore = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const authData = await AsyncStorage.getItem("user");
      if(userData === null || authData === null){
        navigation.navigate("Login_Signup");
      }
    }

    const getUserDataFromAsyncStorage = async () => {
      console.log(await AsyncStorage.getItem("userData"));
      const userDataVal = JSON.parse(await AsyncStorage.getItem('userData'));
      setUserDataSnapshot(userDataVal);
      
    }

    const getThemeFromAsyncStorage = async () => {
      const themeVal = await AsyncStorage.getItem('theme');
      if(themeVal !== null){
        if(themeVal === 'light'){
          setIsDarkMode(false);
          setThemeValue(UniversalTheme.lightTheme);
        } else {
          setIsDarkMode(true);
        }
      } else {
        await AsyncStorage.setItem('theme', 'light');
        setIsDarkMode(false);
        getThemeFromAsyncStorage();
      }
    }

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: isDarkMode ? UniversalTheme.darkTheme.primary : UniversalTheme.lightTheme.primary,
    height: '100%',
  },
  topBar: {
    backgroundColor: isDarkMode ? UniversalTheme.darkTheme.secondary : UniversalTheme.lightTheme.secondary,
    width: '100%',
    height: 65,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usernameText: {
    color: isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15
  },
  numValTopBar: {
    marginLeft: 5,
    fontSize: 15,
    color: isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary,
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
      color: isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary,
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
      backgroundColor: isDarkMode ? UniversalTheme.darkTheme.secondary : UniversalTheme.lightTheme.secondary,
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
    backgroundColor: isDarkMode ? UniversalTheme.darkTheme.primary : UniversalTheme.lightTheme.primary,
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
    color: isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary
  },
  modalDescription: {
    fontSize: 14,
    fontWeight: '400',
    color : isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary,
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
    fontSize: 15,
    color: isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary
  },
  modalCloseButtonContainer: {
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: isDarkMode ? UniversalTheme.darkTheme.secondary : UniversalTheme.lightTheme.secondary,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5
  },
  exchangeButtonContainer: {
    marginVertical: 15,
  },
  exchangeButton: {
    padding: 10,
    backgroundColor : isDarkMode ? UniversalTheme.darkTheme.secondary : UniversalTheme.lightTheme.secondary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  exchangeText: {
    color: isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary,
    fontSize: 18
  },
  // temp: {
  //   padding: 15,
  //   backgroundColor: isDarkMode ? UniversalTheme.darkTheme.secondary : UniversalTheme.lightTheme.secondary,
  //   borderRadius: 10,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center'
  // }
})



  return (
    <SafeAreaView style={{backgroundColor: isDarkMode ? UniversalTheme.darkTheme.secondary : UniversalTheme.lightTheme.secondary}}>
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30}}>
          <Image style={{height: 40, width: 40, borderRadius: 20}} source={{uri: userDataSnapshot?.profilePictureLink}} />
          <Text style={styles.usernameText}>{userDataSnapshot?.username}</Text>
          {/* Admin Badge */}
          {userDataSnapshot?.isAdmin ? 
          <View style={{backgroundColor: "darkred", borderRadius: 5, marginLeft: 10}}><Text style={{color: "white", fontWeight: 'bold', padding: 5}}>Admin</Text></View>

          : null}
        </View>

        {/* Coin and Trash display, show only for non-admins */}
        {!userDataSnapshot?.isAdmin ? 
        
        <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 30}}>
          <FontAwesome5 name='coins' size={24} color="yellow" />
          <Text style={styles.numValTopBar}>{userDataSnapshot?.coins}</Text>
          <FontAwesome5 name='trash-alt' size={24} color={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} style={{marginLeft: 15}} />
          <Text style={styles.numValTopBar}>{userDataSnapshot?.trash}</Text>
        </View>
        
        : null}
        
      </View>
      <View style={styles.mainContentContainer} >
        <View>
          
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={{
                width: 55,
                height: 55,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isDarkMode ? UniversalTheme.darkTheme.secondary : UniversalTheme.lightTheme.secondary,
              }}>
                <FontAwesome5 name='bolt' size={24} color={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} />
              </View>
            
            </View>
            <View style={styles.recentActivities.textContainer}>

            <Text style={styles.recentActivities.text}>Announcements</Text>
            </View>
          </View>
          
          
          {userDataSnapshot?.isAdmin ? <View><TouchableOpacity onPress={() => navigation.navigate("AdminAddAnnouncements", {
            Theme: isDarkMode ? UniversalTheme.darkTheme : UniversalTheme.lightTheme
          })}><Ionicons name='add' size={48} color={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} /></TouchableOpacity></View> : null}
          
        </View>
        <View>
          <View style={styles.recentActivities.container}>

          
          {isLoadingAnnouncements ? <ActivityIndicator size={24} color={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} style={{marginTop: 15}} /> : null}
          
          

          <ScrollView style={{width: "100%"}} contentContainerStyle={{alignItems: 'center'}}>
          {announcementsData?.map((item) =>
            
            <TouchableOpacity onPress={() => {
              setShowSelectedItemModal(true);
              HomeService.setAnnouncementSelectedItem(item);
            }} key={item.id}>
              <AnnouncementCard key={item.id} title={item.title} description={item.description} imageLink={item.image} author={item.author} authorProfilePictureLink={item.authorProfilePictureLink} bgColor={isDarkMode ? UniversalTheme.darkTheme.primary : UniversalTheme.lightTheme.primary} textPrimaryColor={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} textSecondaryColor={isDarkMode ? UniversalTheme.darkTheme.text.secondary : UniversalTheme.lightTheme.text.secondary} />
            </TouchableOpacity>
            
            
          )}
          </ScrollView>
          </View>
        </View>
        
        {/* Trash Directory */}
        <View>
          <Text style={[styles.recentActivities.text, {padding: 0, marginVertical: 10, fontWeight: 'bold'}]}>Trash Values</Text>
          <Text style={{color: Theme?.text?.primary, fontSize: 12, backgroundColor: isDarkMode ? UniversalTheme.darkTheme.secondary : UniversalTheme.lightTheme.secondary, padding: 5, borderRadius: 5, color: isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary}}>Trash values are based on it's type and weight per 100g</Text>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
            {[
              {id: 1, type: 'Paper', iconColor1: '#C0C0BE', iconColor2: '#DBDBDB', textColor: '#000', multiplier: Value.PAPER_MULTIPLIER},
              {id: 2, type: 'Plastic', iconColor1: '#3EC965', iconColor2: '#ABF1B2', textColor: '#000', multiplier: Value.PLASTIC_MULTIPLIER},
              {id: 3, type: 'Organic', iconColor1: '#92B4AB', iconColor2: '#D0EAEC', textColor: '#000', multiplier: Value.ORGANIC_MULTIPLIER},
            
            ].map((item) => { return <TrashValue key={item.id} type={item.type} iconColor1={item.iconColor1} iconColor2={item.iconColor2} textColor={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} multiplier={item.multiplier} /> })}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
            {[
              {id: 1, type: 'Metal', iconColor1: '#DBBE58', iconColor2: '#F0A1A1', textColor: '#000', multiplier: Value.METAL_MULTIPLIER},
              {id: 2, type: 'Cloth', iconColor1: '#B79005', iconColor2: '#FFE600', textColor: '#000', multiplier: Value.CLOTH_MULTIPLIER},
              {id: 3, type: 'Cardboard', iconColor1: '#838383', iconColor2: '#FFCD1E', textColor: '#000', multiplier: Value.CARDBOARD_MULTIPLIER},
            ].map((item) => { return <TrashValue key={item.id} type={item.type} iconColor1={item.iconColor1} iconColor2={item.iconColor2} textColor={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} multiplier={item.multiplier} /> })}
          </View>
        </View>
        

        </View>
        <View style={styles.exchangeButtonContainer}>
          <TouchableOpacity style={styles.exchangeButton} onPress={() => navigation.navigate("TrashExchange")}>
            <Text style={styles.exchangeText}>Trash Exchange</Text>
            <AntDesign name="right" size={24} color={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.exchangeButton, {marginTop: 15}]} onPress={() => navigation.navigate("CoinExchange", {
            Theme : isDarkMode ? UniversalTheme.darkTheme : UniversalTheme.lightTheme,
          })}>
            <Text style={styles.exchangeText}>Coin Exchange</Text>
            <AntDesign name="right" size={24} color={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} />
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
                {userDataSnapshot?.isAdmin ?
                <TouchableOpacity style={{margin: 10, padding: 10, backgroundColor: "red", borderRadius: 5}} onPress={async () => {await deleteAnnouncement(HomeService.announcementCurrentSelectedItem.id); setReloadAnnouncements(true)}}>
                  <Text style={{color: "white", textAlign: 'center'}}>Delete Announcement</Text>
                </TouchableOpacity>
                : null}
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.modalFooter}>
                <Image source={{uri: HomeService.announcementCurrentSelectedItem?.authorProfilePictureLink}} style={styles.modalFooterImage} />
                <Text style={styles.footerText}>{HomeService.announcementCurrentSelectedItem?.author}</Text>
                </View>
                <View style={styles.modalCloseButtonContainer}>
                  <TouchableOpacity onPress={() => setShowSelectedItemModal(false)}>
                    <Ionicons name="exit-outline" size={24} color={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} />
                  </TouchableOpacity>
                  
                </View>
              </View>
              </View>
              
              
            </View>
        </View>
      </Modal>
    </View>
    </SafeAreaView>
  )
}



export default Home;