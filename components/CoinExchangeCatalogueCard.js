import { View, Text, Linking, StyleSheet, Image } from 'react-native';
import React from 'react';
import { AntDesign } from 'react-native-vector-icons';


const CoinExchangeCatalogueCard = ({name, description, image, Theme}) => {
        const styles = StyleSheet.create({
            container: {
                backgroundColor: Theme.secondary,
                padding: 10,
                borderRadius: 15,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
            },
            title: {
                fontSize: 20,
                color: Theme.text.primary
            },
            subTitle: {
                fontSize: 15,
                color: Theme.text.secondary,
                width: 220
            },
            image: {
                height: 50,
                width: 50,
                borderRadius: 15
            }
        })
  return (
        <View style={styles.container}>
        <View>
            <Text style={styles.title} numberOfLines={1} >{name}</Text>
            <Text style={styles.subTitle} numberOfLines={1}>{description}</Text>
        </View>
        <View>
            <Image source={{uri: image}} style={styles.image} />
        </View>
        
        </View>
    
  )
}




export default CoinExchangeCatalogueCard;