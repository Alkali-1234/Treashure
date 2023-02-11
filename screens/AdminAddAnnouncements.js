import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Theme } from '../service/UniversalTheme'

const AdminAddAnnouncements = ({navigation}) => {

    const handleSubmit = () => {
        //TODO Submit to database
        
        navigation.navigate("Home");
    }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Add Announcements</Text>
        <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Title" />
            <TextInput style={[styles.input, {height: "auto", paddingTop: 10}]} textAlignVertical="top" multiline={true} numberOfLines={10} placeholder="Description" />
            <TextInput style={styles.input} placeholder="Image Link" />
            <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                <Text style={{color: "white", textAlign: 'center', alignSelf: 'center'}}>Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
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

export default AdminAddAnnouncements