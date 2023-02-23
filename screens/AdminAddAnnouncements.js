import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addAnnouncement } from '../service/AdminPanelService'
import { userDataSnapshot } from '../service/UserDataService'

const AdminAddAnnouncements = ({navigation, route}) => {
    const {Theme} = route.params;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: Theme.primary,
            },
            headerTitleStyle: {
                color: Theme.text.primary,
            },
            headerTintColor: Theme.text.primary,
        })
    }, [])

    const handleSubmit = async () => {
        console.log("Handling submit...");
        await addAnnouncement({title, description, image, author: userDataSnapshot.username, authorProfilePictureLink: userDataSnapshot.profilePictureLink});
        navigation.navigate("Home");
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Theme.primary,
            paddingHorizontal: 50,
        },
        header: {
            fontSize: 30,
            color: Theme.text.primary,
            marginTop: 20,
        },
        formContainer: {
            width: '100%',
            marginTop: 20,
        },
        input: {
            backgroundColor: Theme.form.background,
            borderRadius: 10,
            paddingLeft: 10,
            height: 40,
            color: Theme.text.primary,
            marginTop: 10,
        },
        submitButton: {
            backgroundColor: "#40ac74",
            borderRadius: 10,
            height: 40,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Add Announcements</Text>
        <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholderTextColor={Theme.text.primary} placeholder="Title" onChangeText={(text) => setTitle(text)} />
            <TextInput style={[styles.input, {height: "auto", paddingTop: 10}]} placeholderTextColor={Theme.text.primary} textAlignVertical="top" multiline={true} numberOfLines={10} placeholder="Description" onChangeText={(text) => setDescription(text)} />
            <TextInput style={styles.input} placeholderTextColor={Theme.text.primary} placeholder="Image Link" onChangeText={(text) => setImage(text)} />
            <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                <Text style={{color: "white", textAlign: 'center', alignSelf: 'center'}}>Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}



export default AdminAddAnnouncements