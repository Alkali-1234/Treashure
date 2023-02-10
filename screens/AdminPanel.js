import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons, AntDesign } from 'react-native-vector-icons';
import { Theme } from '../service/UniversalTheme'
import { Dropdown } from 'react-native-element-dropdown';



const AdminPanel = () => {
    const [latestID, setLatestID] = useState(1);

    const initialValue = {
            id: 1,
            type: 0,
            amount: 0
        }

    const [trashList, setTrashList] = useState([
        initialValue,
    ])

    const addValue = () => {
        setTrashList([...trashList, {...initialValue, id: latestID+1}]);
        setLatestID(latestID+1);
    }

    const deleteValue = (index) => {
        const newTrashList = [...trashList];
        newTrashList.splice(index, 1)
        setTrashList(newTrashList)
    }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Admin Control Panel</Text>
        <ScrollView style={{marginTop: 30, width: "100%"}}>
            <View style={styles.cardContainer}>
                <View style={styles.cardHeaderContainer}><Text style={styles.cardHeaderText}>User Trash Submission</Text></View>
                <TextInput placeholder='Username' style={styles.genericTextInput} placeholderTextColor={Theme.text.secondary} />
                

                <View>
                    {trashList?.map((item, index) => (
                    <><View key={index} style={styles.trashTypeCardContainer}>
                        <View style={styles.trashTypeCloseContainer}>
                            <TouchableOpacity onPress={() => deleteValue(index)}>
                                <AntDesign name="closecircle" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                        <Dropdown
                            data={[
                                {label: 'Plastic', value: 1},
                                {label: 'Paper', value: 2}
                            ]}
                            labelField="label"
                            valueField="value"
                            style={[styles.genericTextInput, {paddingHorizontal: 5}]} 
                            placeholder='Select Trash Type'
                            placeholderStyle={{
                                color: Theme.text.secondary,
                                fontSize: 16
                            }}
                            onChange={(value) => {console.log(value)}} 
                        />
                        <TextInput placeholder='Amount' placeholderTextColor={Theme.text.secondary} style={styles.genericTextInput} />

                    </View></>
                    
                    ))}


                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity onPress={() => addValue()}>
                            <Ionicons name="add-circle" size={48} color={Theme.text.secondary} /> 
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </ScrollView>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        paddingVertical: 20,
        paddingHorizontal: 55,
        alignItems: 'center',
        backgroundColor: Theme.primary
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        color: Theme.text.primary
    },
    cardContainer: {
        //pass
    },
    cardHeaderContainer: {
        backgroundColor: Theme.secondary,
        borderRadius: 12,
        width: "100%",
        height: 40,
        justifyContent: 'center',

    },
    cardHeaderText: {
        fontSize: 18,
        textAlign: 'center',
        color: Theme.text.primary
    },
    genericTextInput: {
        backgroundColor: Theme.primary,
        borderRadius: 12,
        width: "100%",
        height: 40,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        paddingLeft: 20,
        fontSize: 16,
        marginTop: 10
    },
    trashTypeCardContainer: {
        padding: 15,
        borderColor: Theme.secondary,
        width: "100%",
        marginTop: 10,
        borderColor: Theme.secondary,
        borderWidth: 1,
        borderRadius: 10
    },
    trashTypeCloseContainer: {
        position: "absolute",
        right: -1,
        top: -5
        
    },
    placeholderStyle: {
        color: Theme.text.secondary,
        fontSize: 16
    },
    addButtonContainer: {
        alignSelf: 'center',
        marginTop: 10
    }
})

export default AdminPanel;