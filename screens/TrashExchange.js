import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../service/UniversalTheme'
import ExchangeSpotCard from '../components/ExchangeSpotCard'
import { UniversalTrashExchangeLocations } from '../service/UniversalService'


const TrashExchange = ({navigation}) => {
  const [trashExchangeLocations, setTrashExchangeLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    setTrashExchangeLocations(UniversalTrashExchangeLocations);
  }, [])
  
  const handlePress = async () => {
    const url = link;
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
    }
    
})

export default TrashExchange;