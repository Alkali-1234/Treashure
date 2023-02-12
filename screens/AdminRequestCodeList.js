import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Theme } from '../service/UniversalTheme';
import { requestCodeList } from '../service/AdminPanelService';
import RequestCodeItem from '../components/RequestCodeItem';

const AdminRequestCodeList = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Search Request Code</Text>
        <View style={styles.listContainer}>
            {requestCodeList.map((item) => (
                <RequestCodeItem key={item.requestID} item={item} />
            ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Theme.primary,
    },
    header: {
        fontSize: 24,
        color: Theme.text.primary,
        marginTop: 20,
    },
    listContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
    }
})

export default AdminRequestCodeList;