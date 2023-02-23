import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login_Signup from './screens/Login_Signup';
import Main from './screens/Main';
import TrashExchange from './screens/TrashExchange';
import CoinExchange from './screens/CoinExchange';
import AdminUserTrashSubmission from './screens/AdminUserTrashSubmission';
import RewardRequested from './screens/RewardRequested';
import AdminAddAnnouncements from './screens/AdminAddAnnouncements';
import AdminRequestCodeList from './screens/AdminRequestCodeList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp } from 'firebase/app';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDIZUnxXRBLlJ8l0xho3Bv7K1ARnw4f964",
  authDomain: "treashure-c61c6.firebaseapp.com",
  databaseURL: "https://treashure-c61c6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "treashure-c61c6",
  storageBucket: "treashure-c61c6.appspot.com",
  messagingSenderId: "266595362378",
  appId: "1:266595362378:web:96a5a6e422f52893a668b3",
  measurementId: "G-K17FQNSPM8",
  storageBucket: "gs://treashure-c61c6.appspot.com"
};


initializeApp(firebaseConfig);


const Stack = createNativeStackNavigator();

export default function App() {



  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login_Signup'>
          <Stack.Screen name="Login_Signup" component={Login_Signup} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="TrashExchange" component={TrashExchange} options={{title: "Trash Exchange"}} />
          <Stack.Screen name="CoinExchange" component={CoinExchange} options={{title: "Coin Exchange"}} />
          <Stack.Screen name="RewardRequested" component={RewardRequested} />
          <Stack.Screen name="AdminUserTrashSubmission" component={AdminUserTrashSubmission} />
          <Stack.Screen name="AdminAddAnnouncements" component={AdminAddAnnouncements} />
          <Stack.Screen name="AdminRequestCodeList" component={AdminRequestCodeList} />
        </Stack.Navigator>
      </NavigationContainer>
      
  );
}