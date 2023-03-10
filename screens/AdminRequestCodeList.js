import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Theme } from '../service/UniversalTheme';
import RequestCodeItem from '../components/RequestCodeItem';
import { getRequestCodes } from '../service/AdminPanelService';


const AdminRequestCodeList = ({navigation, route}) => {
    const [requestCodeList, setRequestCodeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {Theme} = route.params;

    useEffect(() => {
      getCodes();
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



    const getCodes = async () => {
        try {
            const codes = await getRequestCodes()
            setRequestCodeList(codes);
        } catch (error) {
            alert(error)
        } finally {
            setIsLoading(false);
        }
        
        
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

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Search Request Code</Text>
        <View style={styles.listContainer}>
            {isLoading ? <ActivityIndicator size="large" color={Theme.text.primary} animating={isLoading} /> : null}
            {requestCodeList.map((item) => (
                <RequestCodeItem key={item.id} item={item} getCodes={getCodes} Theme={Theme} />
            ))}
        </View>
    </View>
  )
}



export default AdminRequestCodeList;