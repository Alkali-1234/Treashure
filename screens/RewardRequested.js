import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { userDataSnapshot } from '../service/UserDataService';
import { deleteFirestoreDoc, requestItem } from '../service/UniversalService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from 'react-native-vector-icons';

const RewardRequested = ({route, navigation}) => {
    const [requestCode, setRequestCode] = useState('Loading Request Code...');

    const {item} = route.params;
    const {Theme} = route.params;
    

    useEffect(() => {
        navigation.setOptions({headerShown: false});
        handleRequest();
    }, [])


    //TODO If there is a request code pending, disable the touchable opacity.

    const handleRequest = async () => {
        const userAuthData = JSON.parse(await AsyncStorage.getItem("user"));

        console.log(userAuthData);
        const code = await requestItem(userAuthData["uid"], item.cost, item.name, userDataSnapshot.username, userDataSnapshot.email);
        setRequestCode(code);
    }

    const handleCancel = async () => {
        await deleteFirestoreDoc('requestCodes', requestCode);
        console.log("Canceled!")
        navigation.navigate('CoinExchange', {Theme: Theme});
    }

    return (
        <View style={{backgroundColor: Theme.primary, height: "100%", width: "100%", padding: 20, paddingTop: 50, justifyContent: 'space-between'}}>
            <View>
            <Text style={{fontSize: 30, textAlign: 'center', color: Theme.text.primary}}>Requested Reward</Text>
            <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 10, color: Theme.text.primary}}>{item.name}</Text>
            <FontAwesome name="paper-plane" size={256} color={Theme.text.primary} style={{alignSelf: 'center', marginTop: 10}}/>
            <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 10, color: Theme.text.primary}}>Your request has been sent!</Text>
            <Text style={{fontSize: 20, textAlign: 'center', fontStyle: 'italic', marginTop: 10, color: Theme.text.primary}}>Your code: {requestCode}</Text>
            <View style={{marginLeft: 35}}>
                <Text style={{textAlign: 'left', marginTop: 20, color: Theme.text.primary}}>How to claim: </Text>
                <Text style={{color: Theme.text.primary}}>1. Go to an exchange spot</Text>
                <Text style={{color: Theme.text.primary}}>2. Show this request code</Text>
                <Text style={{color: Theme.text.primary}}>3. Exchange your coins for the item</Text>
                <Text style={{color: Theme.text.primary}}>PS: Screenshot this screen to not lose it!</Text>
            </View>
            </View>
            <View>
                <TouchableOpacity style={{backgroundColor: '#40ac74', padding: 10, borderRadius: 5, marginTop: 10}} onPress={() => navigation.navigate('Home')}><Text style={{color: 'white', textAlign:'center'}}>Back to Home</Text></TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#e74c3c', padding: 10, borderRadius: 5, marginTop: 10}} disabled={requestCode === "Loading Request Code..."} onPress={() => handleCancel()}><Text style={{color: 'white', textAlign:'center'}}>Cancel Request</Text></TouchableOpacity>
            </View>
            
        </View>
    )
}

export default RewardRequested;