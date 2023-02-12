import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login_Signup" component={Login_Signup} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="TrashExchange" component={TrashExchange} />
          <Stack.Screen name="CoinExchange" component={CoinExchange} />
          <Stack.Screen name="RewardRequested" component={RewardRequested} />
          <Stack.Screen name="AdminUserTrashSubmission" component={AdminUserTrashSubmission} />
          <Stack.Screen name="AdminAddAnnouncements" component={AdminAddAnnouncements} />
          <Stack.Screen name="AdminRequestCodeList" component={AdminRequestCodeList} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}