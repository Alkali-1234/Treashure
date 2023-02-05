import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Theme } from '../service/UniversalTheme'
import ExchangeSpotCard from '../components/ExchangeSpotCard'

const TrashExchange = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.exchangeSpotText}>Exchange Spots</Text>
      <Text style={styles.subHeading}>Exchange your trash for coins here!</Text>
      <View style={{marginTop: 15}}>
        <ExchangeSpotCard address="Jl. Raya Cirendeu" district="Tangerang Selatan" link="https://goo.gl/maps/wn7JAkDTpDVm7WfC9" />
      </View>
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
    }
    
})

export default TrashExchange;