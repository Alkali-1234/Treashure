import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'



function Home({navigation}) {
    const navigateToLogin_Signup = () => {
        navigation.navigate("Login_Signup");
    }

  return (
    <View>
        <Text>Home</Text>
        <TouchableOpacity onPress={navigateToLogin_Signup}><Text>Navigate to Login_Signup</Text></TouchableOpacity>
    </View>
  )
}

export default Home;