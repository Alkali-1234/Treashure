import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { Entypo, MaterialIcons } from 'react-native-vector-icons';
import Settings from './Settings';
import { Theme } from '../service/UniversalTheme';
import Home from './Home';
const Tab = createBottomTabNavigator();


function Main({navigation}) {

  useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
  })

  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={
            {
                tabBarIcon: ({size, color}) => (<Entypo name='home' size={24} color={Theme.text.primary}/>)
                
            }
        } />
        <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({size, color}) => (<MaterialIcons name='settings' size={24} color={Theme.text.primary} />)
                
            }} />
    </Tab.Navigator>
  )
}

export default Main;