import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../service/UniversalTheme'
import ExchangeSpotCard from '../components/ExchangeSpotCard'
import { UniversalTrashExchangeLocations } from '../service/UniversalService';
import WebView from 'react-native-webview';
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons } from 'react-native-vector-icons';



const TrashExchange = ({navigation}) => {
  const [trashExchangeLocations, setTrashExchangeLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    setTrashExchangeLocations(UniversalTrashExchangeLocations);
  }, [])
  
  const handlePress = async () => {
    const url = selectedLocation.link;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url);
    } else {
        alert(`Don't know how to open URI: ${url}`);
    }
 }

  return (
    <View style={styles.container}>
      <Text style={styles.exchangeSpotText}>Exchange Spots</Text>
      <Text style={styles.subHeading}>Exchange your trash for coins here!</Text>
      <View style={{marginTop: 15}}>
        {trashExchangeLocations?.map((item) => 
          <TouchableOpacity key={trashExchangeLocations.indexOf(item)} onPress={() => {setSelectedLocation(item); setShowLocationModal(true)}}>
            <ExchangeSpotCard address={item.address} district={item.district} link={item.link} />
          </TouchableOpacity>
                    
        )}
        </View>
        {/* TODO: Finish modal */}
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
                  <Text style={{fontSize: 15}}>{selectedLocation?.fullAddress} <MaterialCommunityIcons name="content-copy" size={15} color={Theme.text.primary}/> </Text>
                </View>
              </TouchableOpacity>
              
              <WebView 
                source={{html: selectedLocation?.embedLink}}
                style={{marginTop: 10, borderRadius: 15}}
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

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: Theme.primary,
        padding: 30,
    },
    exchangeSpotText: {
        color: Theme.text.primary,
        fontSize: 30,
        textAlign: 'center'

    },
    subHeading: {
        fontSize: 15,
        textAlign: 'center',
        color: Theme.text.secondary
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
      backgroundColor: Theme.primary,
      height: "75%",
      width: "75%",
      borderRadius: 15,
      padding: 15
    },
    title: {
      fontSize: 24,
      textAlign: 'center'
    },
    textView: {
      backgroundColor: Theme.secondary,
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

export default TrashExchange;