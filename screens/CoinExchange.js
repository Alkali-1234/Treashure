import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UniversalCoinExchangeCatalogue } from '../service/UniversalService'
import CoinExchangeCatalogueCard from '../components/CoinExchangeCatalogueCard'
import { FontAwesome5 } from 'react-native-vector-icons'
import { userDataSnapshot } from '../service/UserDataService'

const CoinExchange = ({navigation, route}) => {
  const [coinExchangeCatalogue, setCoinExchangeCatalogue] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {Theme} = route.params;
  
  useEffect(() => {
    setCoinExchangeCatalogue(UniversalCoinExchangeCatalogue);
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Theme.primary,
      },
      headerTitleStyle: {
        color: Theme.text.primary,
      },
      headerTintColor: Theme.text.primary,
    })
  }, [])
  
  const requestReward = () => {
    setShowItemModal(false);
    
    setTimeout(() => {
    navigation.navigate('RewardRequested', {item: selectedItem});
    }, 100);
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
        fontSize: 25,
        textAlign: 'center'

    },
    subHeading: {
        fontSize: 15,
        textAlign: 'center',
        color: Theme.text.secondary
    }
    
})

  return (
    <View style={styles.container}>
      <Text style={styles.exchangeSpotText}>Exchange Coin Catalogue</Text>
      <Text style={styles.subHeading}>Exchange your coins for items here!</Text>
      {!userDataSnapshot.isAdmin ? 
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
        <FontAwesome5 name="coins" size={24} color="green" />
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>{userDataSnapshot.coins}</Text>
      </View>
      
      : null}
      
      
      <View>
        {coinExchangeCatalogue?.map((item, index) => 
          <TouchableOpacity key={index} onPress={() => {setShowItemModal(true); setSelectedItem(item)}}>
            <CoinExchangeCatalogueCard name={item.name} description={item.description} image={item.image} Theme={Theme} />
          </TouchableOpacity>
      
        )}
        {/* Show button when user is an admin */}
        {userDataSnapshot.isAdmin ? <TouchableOpacity style={{backgroundColor: '#40ac74', padding: 10, borderRadius: 5, marginTop: 15}} onPress={() => navigation.navigate('AdminRequestCodeList', {Theme : Theme})}><Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>View Request Code List</Text></TouchableOpacity> : null}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showItemModal}
          onRequestClose={() => {
            setShowItemModal(!showItemModal);
          }}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View style={{backgroundColor: Theme.primary, width: '80%', height: '75%', borderRadius: 5, justifyContent: 'space-between'}}>
              
              <View style={{height: "80%"}}>
                <Image source={{uri: selectedItem?.image}} style={{width: '100%', height: '50%', borderRadius: 5}} />
                <View style={{paddingHorizontal: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                  
                  <Text numberOfLines={1} style={{fontSize: 24, width: "75%", color: Theme.text.primary}}>{selectedItem?.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                    <FontAwesome5 name='coins' size={24} color="green" />
                    <Text style={{marginLeft: 5, color: Theme.text.primary}}>{selectedItem?.cost}</Text>
                  </View>
                  
                </View>
                <Text style={{marginHorizontal: 15, marginTop: 10, fontStyle: 'italic', height: "10%", color: Theme.text.primary}}>
                    {selectedItem?.description}
                </Text>
              </View>

              <View style={{paddingHorizontal: 5, marginBottom: 5}}>
                <TouchableOpacity style={{backgroundColor: '#40ac74', padding: 10, borderRadius: 5, marginTop: 15}} onPress={() => requestReward()}><Text style={{color: "white", textAlign: 'center'}}>Request Reward</Text></TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#e74c3c', padding: 10, borderRadius: 5, marginTop: 5}} onPress={() => setShowItemModal(false)}><Text style={{color: "white", textAlign: 'center'}}>Close</Text></TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
    </View>
  )
}



export default CoinExchange;