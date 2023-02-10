import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login_Signup from './screens/Login_Signup';
import Main from './screens/Main';
import TrashExchange from './screens/TrashExchange';
import CoinExchange from './screens/CoinExchange';
import AdminPanel from './screens/AdminPanel';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login_Signup" component={Login_Signup} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="TrashExchange" component={TrashExchange} />
          <Stack.Screen name="CoinExchange" component={CoinExchange} />
          <Stack.Screen name="AdminPanel" component={AdminPanel} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}