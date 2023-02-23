import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme, darkTheme, lightTheme } from '../service/UniversalTheme'
import ExchangeSpotCard from '../components/ExchangeSpotCard'
import { UniversalTrashExchangeLocations } from '../service/UniversalService';
import WebView from 'react-native-webview';
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { userDataSnapshot } from '../service/UserDataService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const TrashExchange = ({navigation}) => {
  const [trashExchangeLocations, setTrashExchangeLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setTrashExchangeLocations(UniversalTrashExchangeLocations);
  }, [])

  useEffect(() => {
    if (isFocused) {
      getThemeFromAsyncStorage();
    }
  }, [isFocused]);

  const getThemeFromAsyncStorage = async () => {
    console.log("e")
    const themeVal = await AsyncStorage.getItem('theme');
    if(themeVal !== null){
      if(themeVal === 'light'){
        setIsDarkMode(false);
        navigation.setOptions({
          headerStyle: {
            backgroundColor: lightTheme.primary,
          },
          headerTitleStyle: {
            color: lightTheme.text.primary,
          },
          headerTintColor: lightTheme.text.primary,
        })
      } else {
        setIsDarkMode(true);
        navigation.setOptions({
          headerStyle: {
            backgroundColor: darkTheme.primary,
          },
          headerTitleStyle: {
            color: darkTheme.text.primary,
          },
          headerTintColor: darkTheme.text.primary,
        })
      }

    } else {
      await AsyncStorage.setItem('theme', 'light');
      setIsDarkMode(false);
      getThemeFromAsyncStorage();
    }
    console.log(themeVal)
    
  }
  
  const handlePress = async () => {
    const url = selectedLocation.link;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url);
    } else {
        alert(`Don't know how to open URI: ${url}`);
    }
 }
  const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: isDarkMode ? darkTheme.primary : lightTheme.primary,
        padding: 30,
    },
    exchangeSpotText: {
        color: isDarkMode ? darkTheme.text.primary : lightTheme.text.primary,
        fontSize: 30,
        textAlign: 'center'

    },
    subHeading: {
        fontSize: 15,
        textAlign: 'center',
        color: isDarkMode ? darkTheme.text.secondary : lightTheme.text.secondary,
    },
    modalView: {
      height: "100%",
      width: "100%",
      backgroundColor: 'rgba(20, 19, 19, 0.64)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalCard: {
      backgroundColor: isDarkMode ? darkTheme.primary : lightTheme.primary,
      height: "75%",
      width: "75%",
      borderRadius: 15,
      padding: 15
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      color: isDarkMode ? darkTheme.text.primary : lightTheme.text.primary,
    },
    textView: {
      backgroundColor: isDarkMode ? darkTheme.secondary : lightTheme.secondary,
      borderRadius: 15,
      padding: 10,
      marginTop: 10
    },
    buttonContainer: {
      height: 40,
      backgroundColor: '#40ac74',
      justifyContent: 'center',
      borderRadius: 5
    }
    
  })
  return (
    <View style={styles.container}>
      <Text style={styles.exchangeSpotText}>Exchange Spots</Text>
      <Text style={styles.subHeading}>Exchange your trash for coins here!</Text>
      <View style={{marginTop: 15}}>
        {trashExchangeLocations?.map((item) => 
          <TouchableOpacity key={trashExchangeLocations.indexOf(item)} onPress={() => {setSelectedLocation(item); setShowLocationModal(true)}}>
            <ExchangeSpotCard address={item.address} district={item.district} link={item.link} Theme={isDarkMode ? darkTheme : lightTheme} />
          </TouchableOpacity>
        )}
        {/* Show button when user is an admin */}
        {userDataSnapshot.isAdmin ? <TouchableOpacity onPress={() => navigation.navigate('AdminUserTrashSubmission', {Theme: isDarkMode ? darkTheme : lightTheme})} style={{marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: "#40ac74", padding: 10, borderRadius: 5}}><Text style={{color: "white", fontSize: 16}}>View Admin Exchange Trash Screen</Text></TouchableOpacity> : null}
        </View>
        <Modal
          animationType='fade'
          visible={showLocationModal}
          transparent={true}
          onRequestClose={() => setShowLocationModal(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalCard}>
              <Text style={styles.title}>{selectedLocation?.address}</Text>
              <TouchableOpacity onPress={async () => {await Clipboard.setStringAsync(selectedLocation?.fullAddress); alert("Copied to clipboard")}}>
                <View style={styles.textView}>
                  <Text style={{fontSize: 15, color: isDarkMode ? darkTheme.text.primary : lightTheme.text.primary}}>{selectedLocation?.fullAddress} <MaterialCommunityIcons name="content-copy" size={15} color={isDarkMode ? darkTheme.text.primary : lightTheme.text.primary}/> </Text>
                </View>
              </TouchableOpacity>
              
              <WebView 
                source={{html: selectedLocation?.embedLink}}
                style={{marginTop: 10, borderRadius: 15, backgroundColor: isDarkMode ? darkTheme.primary : lightTheme.primary, height: "50%"}}
              />
              <TouchableOpacity onPress={() => handlePress()}>
                <View style={styles.buttonContainer}>
                  <Text style={{textAlign: 'center', color: 'white'}}>View on Google Maps</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowLocationModal(false)}>
                <View style={[styles.buttonContainer, {marginTop: 10, backgroundColor: '#e03444',}]}>
                  <Text style={{textAlign: 'center', color: 'white'}}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View>
  )
}



export default TrashExchange;