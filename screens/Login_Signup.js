import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import { login, signUp, message } from '../service/LoginSignupService';
import { AntDesign, Feather } from '@expo/vector-icons';

function Login_Signup( {navigation} ) {
    
    const [showSignUp, toggleSignUp] = useState(false);
    //Login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [returnMessage, setReturnMessage] = useState('');
    const [buttonColor, setButtonColor] = useState('#003EDD');
    const [isLoading, setIsLoading] = useState(false);
    //SignUp
    const [signUpUsername, setSignUpUsername] = useState('');
    const [email, setEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpRetypePassword, setSignUpRetypePassword] = useState('');
    
    

    useEffect(() => {
        navigation.setOptions({headerShown: false})
    })
    

    return (
        showSignUp? (
            <View style={styles.container}>
                <View style={styles.mainTitleContainer}>
                    <Text style={{fontSize: 30, marginBottom: 5}}>Treashures</Text>
                    <Text style={{color: '#756666', fontStyle: 'italic'}}>"Heaps of treasures lie among'st our trash"</Text>
                </View>
                <View style={{marginTop: 75}}>
                    <TextInput style={styles.input} onChangeText={setSignUpUsername} placeholder="Username" />
                    <TextInput style={styles.input} onChangeText={setEmail} placeholder="Email" />
                    <TextInput style={styles.input} onChangeText={setSignUpPassword} placeholder="Password" secureTextEntry={true} />
                    <TextInput style={styles.input} onChangeText={setSignUpRetypePassword} placeholder="Retype Password" secureTextEntry={true} />
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#756666'}}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => toggleSignUp(!showSignUp)}><Text style={{color: 'blue'}}>Log In</Text></TouchableOpacity> 
                    </View>              
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor: buttonColor}]} onPress={() => {
                    setIsLoading(true);
                    signUp(signUpUsername, email, signUpPassword, signUpRetypePassword).then((res) => {
                        setIsLoading(false);
                        setReturnMessage(res);
                        setButtonColor('green');
                        setTimeout(() => {
                            toggleSignUp(!showSignUp);
                            setButtonColor('#003EDD');
                            setReturnMessage('');
                        }, 1000);
                    }).catch((err) => {
                        setIsLoading(false);
                        setReturnMessage(err);
                        setButtonColor('red');
                        console.log(err)
                    })

                }}>
                    {isLoading? <ActivityIndicator size="small" color="white" /> : null}
                    {returnMessage === "" && isLoading === false? <Text style={{color:'white'}}>Sign Up</Text> : null}
                    {buttonColor === "red" && isLoading === false? 
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign name="close" color="white" size={20} />
                        <Text style={{color: "white", marginLeft: 5}}>{returnMessage}</Text>
                    </View> : null}
                    {buttonColor === "green" && isLoading === false? 
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Feather name="check" color="white" size={20} />
                    </View> : null}
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
                        <TouchableOpacity onPress={() => toggleSignUp(!showSignUp)}><Text style={{color: 'blue'}}>Sign Up!</Text></TouchableOpacity> 
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