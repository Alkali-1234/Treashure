import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Theme } from '../service/UniversalTheme';

const RewardRequested = ({route, navigation}) => {
    const {item} = route.params;
    const {requestCode} = route.params;
    useEffect(() => {
        navigation.setOptions({headerShown: false});
    }, [])
    return (
        <View style={{backgroundColor: Theme.primary, height: "100%", width: "100%", padding: 20, paddingTop: 50, justifyContent: 'space-between'}}>
            <View>
            <Text style={{fontSize: 30, textAlign: 'center'}}>Requested Reward</Text>
            <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>{item.name}</Text>
            <Image source={require('../assets/images/RequestRewardImage.png')} style={{width: 250, height: 250, borderRadius: 5, marginTop: 60, resizeMode: 'stretch', alignSelf: 'center'}} />
            <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>Your request has been sent!</Text>
            <Text style={{fontSize: 20, textAlign: 'center', fontStyle: 'italic', marginTop: 10}}>Your code: {requestCode}</Text>
            <View style={{marginLeft: 35}}>
                <Text style={{textAlign: 'left', marginTop: 20}}>How to claim: </Text>
                <Text>1. Go to an exchange spot</Text>
                <Text>2. Show this request code</Text>
                <Text>3. Exchange your coins for the item</Text>
                <Text>PS: Screenshot this screen to not lose it!</Text>
            </View>
            </View>
            <View>
                <TouchableOpacity style={{backgroundColor: '#40ac74', padding: 10, borderRadius: 5, marginTop: 10}} onPress={() => navigation.navigate('Home')}><Text style={{color: 'white', textAlign:'center'}}>Back to Home</Text></TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#e74c3c', padding: 10, borderRadius: 5, marginTop: 10}} onPress={() => navigation.navigate('CoinExchange')}><Text style={{color: 'white', textAlign:'center'}}>Cancel Request</Text></TouchableOpacity>
            </View>
            
        </View>
    )
}

export default RewardRequested;