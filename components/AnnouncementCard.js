import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Theme } from '../service/UniversalTheme';


function AnnouncementCard({title, description, imageLink, author, authorProfilePictureLink}) {
  return (
       <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'space-between',}}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description} numberOfLines={1} >{description}</Text>
            </View>
            
            
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
                <Image style={styles.authorProfilePicture} source={{uri: authorProfilePictureLink}} />
                <Text style={styles.authorUsername}>{author}</Text>
            </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center',}}>
            <Image style={styles.image} source={{uri: imageLink}} />
        </View>
    </View> 
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.primary,
        height: 85,
        width: '90%',
        marginTop: 15,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        color: Theme.text.primary
    },
    description: {
        fontSize: 10,
        width: '90%',
        color: Theme.text.secondary,
        fontStyle: 'italic'
    },
    authorProfilePicture: {
        height: 20,
        width: 20,
        borderRadius: 10,
    },
    authorUsername: {
        marginLeft: 5,
        fontSize: 10
    },
    image: {
        height: '90%',
        width: 65,
        backgroundColor: 'red',
        borderRadius: 5
    }
})

export default AnnouncementCard;