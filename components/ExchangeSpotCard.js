import { View, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Theme } from '../service/UniversalTheme';
import { AntDesign } from 'react-native-vector-icons';


const ExchangeSpotCard = ({address, district, link}) => {

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
    <TouchableOpacity onPress={handlePress}>
        <View style={styles.container}>
        <View>
            <Text style={styles.title}>{address}</Text>
            <Text style={styles.district}>{district}</Text>
        </View>
        <View>
            <AntDesign name="right" size={40} color={Theme.text.primary} />
        </View>
        
        </View>
        
    </TouchableOpacity>
    
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.secondary,
        padding: 10,
        borderRadius: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: Theme.text.primary
    },
    district: {
        fontSize: 15,
        color: Theme.text.secondary
    }
})

export default ExchangeSpotCard;