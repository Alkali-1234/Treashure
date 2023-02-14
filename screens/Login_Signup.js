import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import { login, signUp, message } from '../service/LoginSignupService';
import { AntDesign, Feather } from '@expo/vector-icons';

function Login_Signup( {navigation} ) {
    
    const [signUp, toggleSignUp] = useState(false);
    //Login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [returnMessage, setReturnMessage] = useState('');
    const [buttonColor, setButtonColor] = useState('#003EDD');
    const [isLoading, setIsLoading] = useState(false);
    

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
                <TouchableOpacity style={styles.button} onPress={() => {
                    if(signUp(username, email, password)){
                        navigation.navigate("Main")
                    }

                }}>
                    {returnMessage === ""? <Text style={{color:'white'}}>Sign Up</Text> : <Text style={{color: "white"}}>{returnMessage}</Text>}
                </TouchableOpacity>
            </View> 
        ):(
            // Sign In
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
                <TouchableOpacity style={[styles.button, {backgroundColor: buttonColor}]} onPress={() => {
                    setIsLoading(true);
                    login(username, password).then((res) => {
                        setIsLoading(false);
                        setReturnMessage(res);
                        setButtonColor('green');
                        setTimeout(() => {
                            navigation.navigate("Main");
                        }, 1000);
                    }).catch((err) => {
                        setIsLoading(false);
                        setReturnMessage(err);
                        setButtonColor('red');
                    })
                }}>
                    {isLoading? <ActivityIndicator size="small" color="white" /> : null}
                    {returnMessage === "" && isLoading === false? <Text style={{color:'white'}}>Login</Text> : null}
                    {buttonColor === "red" && isLoading === false? 
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign name="close" color="white" size={20} />
                        <Text style={{color: "white", marginLeft: 5}}>{returnMessage}</Text>
                    </View> : <></>}
                    {buttonColor === "green" && isLoading === false? 
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Feather name="check" color="white" size={20} />
                    </View> : <></>}
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 60
    }
})

export default Login_Signup;