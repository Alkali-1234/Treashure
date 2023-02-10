import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native'
import { Ionicons, AntDesign } from 'react-native-vector-icons';
import { Theme } from '../service/UniversalTheme'
import { Dropdown } from 'react-native-element-dropdown';
import * as Value from '../constants/trashValueConstants';




const AdminPanel = () => {
    const [latestID, setLatestID] = useState(1);
    const [username, setUsername] = useState('');
    const [showConfirmTrashSubmissionModal, setShowConfirmTrashSubmissionModal] = useState(false);

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

    const changeDropDownValue = (index, value) => {
        const newTrashList = [...trashList];
        newTrashList[index].type = value;
        setTrashList(newTrashList);
    }

    const changeAmountValue = (index, value) => {
        const newTrashList = [...trashList];
        newTrashList[index].amount = value;
        setTrashList(newTrashList);
    }

    const submitTrash = () => {
        setShowConfirmTrashSubmissionModal(true);
    }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Admin Control Panel</Text>
        <ScrollView style={{marginTop: 30, width: "100%"}}>
            <View style={styles.cardContainer}>
                <View style={styles.cardHeaderContainer}><Text style={styles.cardHeaderText}>User Trash Submission</Text></View>
                <TextInput placeholder='Username' style={styles.genericTextInput} placeholderTextColor={Theme.text.secondary} onChangeText={(value) => setUsername(value)} />
                

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
                                {label: 'Cardboard Paper', value: 2},
                                {label: 'Paper', value: 3},
                                {label: 'Organic', value: 4},
                                {label: 'Metal', value: 5},
                                {label: 'Cloth', value: 6}
                            ]}
                            labelField="label"
                            valueField="value"
                            style={[styles.genericTextInput, {paddingHorizontal: 5}]} 
                            placeholder='Select Trash Type'
                            placeholderStyle={{
                                color: Theme.text.secondary,
                                fontSize: 16
                            }}
                            onChange={(value) => {changeDropDownValue(trashList.indexOf(item), value.value)}}
                            value={trashList[trashList.indexOf(item)].type}
                        />
                        <TextInput placeholder='Amount'
                        placeholderTextColor={Theme.text.secondary}
                        style={styles.genericTextInput}
                        value={trashList[trashList.indexOf(item)].amount}
                        onChangeText={(value) => changeAmountValue(trashList.indexOf(item), value)}
                        />

                    </View></>
                    
                    ))}


                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity onPress={() => addValue()}>
                            <Ionicons name="add-circle" size={48} color={Theme.text.secondary} /> 
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => submitTrash()}>
                        <View style={styles.submitContainer}>
                            <Text style={styles.submitText}>Submit</Text>
                        </View> 
                    </TouchableOpacity>
                    
                </View>
                
            </View>
        </ScrollView>
        
        <Modal
            visible={showConfirmTrashSubmissionModal}
            animationType='fade'
            transparent={true}
            onRequestClose={() => setShowConfirmTrashSubmissionModal(false)}
        >
            <View style={styles.confirmTrashSubmissionModalContainer}>
                <View style={styles.confirmTrashSubmissionModalMainContentContainer}>
                    <View>
                    
                    
                    <Text style={styles.acceptTrashText}>Accept Trash</Text>
                    <Text style={styles.acceptTrashUsername}>Username: {username}</Text>

                    
                    <View style={styles.acceptTrashDirectory}>
                            <ScrollView style={{width: "100%", height: 100}}>
                            {trashList.map((item, index) => (
                                <View style={styles.acceptTrashDirectoryContainer}>
                                    <Text style={styles.acceptTrashDirectoryText}>Plastic : 300 x 5/100G</Text>
                                    <Text style={styles.acceptTrashDirectoryTextAmount}>1500</Text>
                                </View>
                            ))}
                            </ScrollView>
                        
                        <View style={styles.totalCoinContainer}>
                            <Text>Total Coins: </Text>
                            <Text>12000</Text>
                        </View>
                        
                    </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "#40ac74"}]}>
                            <Text style={styles.buttonText} onPress={() => {}}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "#e03444"}]} onPress={() => setShowConfirmTrashSubmissionModal(false)}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>

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
        borderRadius: 10,
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
        backgroundColor: Theme.form.background,
        borderRadius: 10,
        width: "100%",
        height: 40,
        justifyContent: 'center',
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
    },
    submitContainer: {
        width: "100%",
        backgroundColor: "#40ac74",
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    submitText: {
        color: "white",
        textAlign: 'center'
    },
    confirmTrashSubmissionModalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmTrashSubmissionModalMainContentContainer: {
        backgroundColor: Theme.primary,
        width: "75%",
        height: "50%",
        borderRadius: 5,
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    acceptTrashText: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10
    },
    acceptTrashUsername: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    acceptTrashDirectory: {
        marginTop: 25,
    },
    acceptTrashDirectoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    acceptTrashDirectoryText: {
        color: Theme.text.primary
    },
    acceptTrashDirectoryTextAmount: {
        fontWeight: 'bold'
    },
    totalCoinContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonsContainer: {
        width: "100%",
        marginBottom: 20
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 5,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    }
})

export default AdminPanel;