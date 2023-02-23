import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons } from 'react-native-vector-icons';
import Settings from './Settings';
import * as UniversalTheme from '../service/UniversalTheme';
import Home from './Home';
const Tab = createBottomTabNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

function Main({navigation}) {
  const isFocused = useIsFocused();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getThemeFromAsyncStorage();
    }
  }, [isFocused]);

  useEffect(()=>{
    navigation.setOptions({
      headerShown: false,
    })
    getThemeFromAsyncStorage();
  }, [])

  const getThemeFromAsyncStorage = async () => {
    const themeVal = await AsyncStorage.getItem('theme');
    if(themeVal !== null){
      if(themeVal === 'light'){
        setIsDarkMode(false);
      } else {
        setIsDarkMode(true);
      }
    } else {
      await AsyncStorage.setItem('theme', 'light');
      setIsDarkMode(false);
      getThemeFromAsyncStorage();
    }

    console.log(themeVal)
  }


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkMode ? UniversalTheme.darkTheme.secondary : UniversalTheme.lightTheme.secondary,
          borderTopColor: isDarkMode ? UniversalTheme.darkTheme.primary : UniversalTheme.lightTheme.primary,
          borderWidth: 1,
        },
      }}
      screenListeners={{
        'state': () => {
          getThemeFromAsyncStorage();
        }
      }}
    >
        <Tab.Screen name="Home" component={Home} options={
            {
                tabBarIcon: ({size, color}) => (<Entypo name='home' size={24} color={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary}/>)
                
            }
        } />
        <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({size, color}) => (<MaterialIcons name='settings' size={24} color={isDarkMode ? UniversalTheme.darkTheme.text.primary : UniversalTheme.lightTheme.text.primary} />)
                
            }}

            />
    </Tab.Navigator>
  )
}

export default Main;