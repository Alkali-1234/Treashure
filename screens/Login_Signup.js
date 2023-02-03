import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { login } from '../service/LoginSignupService';

function Login_Signup( {navigation} ) {
    
    const [signUp, toggleSignUp] = useState(false);
    //Login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    useEffect(() => {
        navigation.setOptions({headerShown: false})
    })

    return (
        signUp? (
            <View style={styles.container}>
                <View style={styles.mainTitleContainer}>
                    <Text style={{fontSize: 30, marginBottom: 5}}>Treashures</Text>
                    <Text style={{color: '#756666', fontStyle: 'italic'}}>"Heaps of treasures lie among'st our trash"</Text>
                </View>
                <View style={{marginTop: 75}}>
                    <TextInput style={styles.input} placeholder="Username" />
                    <TextInput style={styles.input} placeholder="Email" />
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
                    <TextInput style={styles.input} placeholder="Retype Password" secureTextEntry={true} />
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#756666'}}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => toggleSignUp(!signUp)}><Text style={{color: 'blue'}}>Log In</Text></TouchableOpacity> 
                    </View>              
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:'white'}}>Sign Up</Text>
                </TouchableOpacity>
            </View> 
        ):(
            <View style={styles.container}>
                <View style={styles.mainTitleContainer}>
                    <Text style={{fontSize: 30, marginBottom: 5}}>Treashures</Text>
                    <Text style={{color: '#756666', fontStyle: 'italic'}}>"Heaps of treasures lie among'st our trash"</Text>
                </View>
                <View style={{marginTop: 75}}>
                    <TextInput style={styles.input} placeholder="Email/Username" onChangeText={setUsername} />
                    <TextInput style={[styles.input, {marginTop:62}]} placeholder="Password" onChangeText={setPassword} secureTextEntry={true} />
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#756666'}}>Dont have an account? </Text>
                        <TouchableOpacity onPress={() => toggleSignUp(!signUp)}><Text style={{color: 'blue'}}>Sign Up!</Text></TouchableOpacity> 
                    </View>
                                  
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {if(login(username, password)){navigation.navigate("Home")}}}>
                    <Text style={{color:'white'}}>Login</Text>
                </TouchableOpacity>
            </View>  
        )

      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightblue'
    },
    mainTitleContainer: {
        alignItems: 'center',
        marginTop: 150
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 1,
        width: 265
    },
    button: {
        height: 40,
        width: 265,
        backgroundColor: "#003EDD",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 60
    }
})

export default Login_Signup;