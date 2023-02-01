import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function Login_Signup( {navigation} ) {
    
    const navigateToHome = ()=>{
        navigation.navigate("Home");
    }

  return (
    <View>
        <Text>Login/SignupPage (real)</Text>
        <TouchableOpacity onPress={navigateToHome}>
            <Text>Navigate to Home</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
})

export default Login_Signup;