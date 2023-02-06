import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../service/UniversalTheme'
import { UniversalCoinExchangeCatalogue } from '../service/UniversalService'
import CoinExchangeCatalogueCard from '../components/CoinExchangeCatalogueCard'

const CoinExchange = ({navigation}) => {
  const [coinExchangeCatalogue, setCoinExchangeCatalogue] = useState(null);
  
  useEffect(() => {
    setCoinExchangeCatalogue(UniversalCoinExchangeCatalogue);
  }, [])
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.exchangeSpotText}>Exchange Coin Catalogue</Text>
      <Text style={styles.subHeading}>Exchange your coins for items here!</Text>
      <View style={{marginTop: 15}}>
        {coinExchangeCatalogue?.map((item) => 
          <TouchableOpacity key={coinExchangeCatalogue.indexOf(item)} >
            <CoinExchangeCatalogueCard name={item.name} description={item.description} image={item.image} />
          </TouchableOpacity>
      
        )}
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
        fontSize: 25,
        textAlign: 'center'

    },
    subHeading: {
        fontSize: 15,
        textAlign: 'center',
        color: Theme.text.secondary
    }
    
})

export default CoinExchange;