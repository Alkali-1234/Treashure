import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Theme } from '../service/UniversalTheme'
import { Ionicons } from 'react-native-vector-icons';
import { handleAcceptItem, handleRejectItem } from '../service/AdminPanelService';

const RequestCodeItem = (item) => {
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'space-evenly', width: "50%"}}>
        <Text style={{color: Theme.text.primary, fontSize: 16, fontWeight: 'bold'}}>{item.item.item}</Text>
        <Text style={{color: Theme.text.primary}}>{item.item.requester}</Text>
        <Text style={{color: Theme.text.primary}}>Request code: <Text style={{fontWeight: 'bold'}}>{item.item.code}</Text></Text>
      </View>
      <View style={styles.acceptRejectContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={() => handleAcceptItem(item)}>
            <View style={{backgroundColor: '#40ac74', width: 36, height: 36, borderRadius: 2, justifyContent: 'center', alignItems:  'center'}}>
                <Ionicons name="checkmark" size={24} color="#000" />
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRejectItem(item)}>
        <View style={{backgroundColor: '#e74c3c', width: 36, height: 36, borderRadius: 2, justifyContent: 'center', alignItems:  'center'}}>
                <Ionicons name="close" size={24} color="white" />
        </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: "10%",
        width: '100%',
        backgroundColor: Theme.secondary,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    acceptRejectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    acceptButton: {
        marginRight: 10,
    },
})

export default RequestCodeItem;