import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native'
import { Ionicons, AntDesign } from 'react-native-vector-icons';
import { Theme } from '../service/UniversalTheme'
import { Dropdown } from 'react-native-element-dropdown';
import * as Value from '../constants/trashValueConstants';
import { handleTrashSubmission } from '../service/AdminPanelService';




const AdminUserTrashSubmission = () => {
    const [latestID, setLatestID] = useState(1);
    const [username, setUsername] = useState('');
    const [showConfirmTrashSubmissionModal, setShowConfirmTrashSubmissionModal] = useState(false);
    const [totalCoins, setTotalCoins] = useState(0);

    const initialValue = {
            id: 1,
            name: "",
            type: 0,
            amount: 0,
            multiplier: 0,
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

    const changeDropDownValue = (index, value, multiplier, name) => {
        const newTrashList = [...trashList];
        newTrashList[index].type = value;
        newTrashList[index].multiplier = multiplier;
        newTrashList[index].name = name;
        setTrashList(newTrashList);
    }

    const changeAmountValue = (index, value) => {
        const newTrashList = [...trashList];
        newTrashList[index].amount = value;
        setTrashList(newTrashList);
    }
    const calculateTotal = () => {
        let total = 0;
        trashList.forEach(item => {
            total = total+(item.amount*item.multiplier);
        });
        setTotalCoins(total);
    }
    const submitTrash = () => {
        handleTrashSubmission(username, totalCoins);
    }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>User Trash Submission</Text>
        <ScrollView style={{marginTop: 30, width: "100%"}}>
            <View style={styles.cardContainer}>
                <TextInput placeholder='Username' style={styles.genericTextInput} placeholderTextColor={Theme.text.secondary} onChangeText={(value) => setUsername(value)} />
                

                <View>
                    {trashList?.map((item, index) => (
                    <View key={index}><View key={index} style={styles.trashTypeCardContainer}>
                        <View style={styles.trashTypeCloseContainer}>
                            <TouchableOpacity onPress={() => deleteValue(index)}>
                                <AntDesign name="closecircle" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                        <Dropdown
                            data={[
                                {label: 'Paper', value: 1, multiplier: Value.PAPER_MULTIPLIER},
                                {label: 'Plastic', value: 2, multiplier: Value.PLASTIC_MULTIPLIER},
                                {label: 'Organic', value: 3, multiplier: Value.ORGANIC_MULTIPLIER},
                                {label: 'Metal', value: 4, multiplier: Value.METAL_MULTIPLIER},
                                {label: 'Cloth', value: 5, multiplier: Value.CLOTH_MULTIPLIER},
                                {label: 'Cardboard', value: 6, multiplier: Value.CARDBOARD_MULTIPLIER},
                            ]}
                            labelField="label"
                            valueField="value"
                            style={[styles.genericTextInput, {paddingHorizontal: 5}]} 
                            placeholder='Select Trash Type'
                            placeholderStyle={{
                                color: Theme.text.secondary,
                                fontSize: 16
                            }}
                            onChange={(value) => {changeDropDownValue(trashList.indexOf(item), value.value, value.multiplier, value.label)}}
                            value={trashList[trashList.indexOf(item)].type}
                        />
                        <TextInput placeholder='Amount'
                        placeholderTextColor={Theme.text.secondary}
                        style={styles.genericTextInput}
                        value={trashList[trashList.indexOf(item)].amount}
                        onChangeText={(value) => changeAmountValue(trashList.indexOf(item), value)}
                        />

                    </View></View>
                    
                    ))}


                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity onPress={() => addValue()}>
                            <Ionicons name="add-circle" size={48} color={Theme.text.secondary} /> 
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => {setShowConfirmTrashSubmissionModal(true); calculateTotal()}}>
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
                                <View key={index} style={styles.acceptTrashDirectoryContainer}>
                                    <Text style={styles.acceptTrashDirectoryText}>{item.name} : {item.amount} x {item.multiplier}/100G</Text>
                                    <Text style={styles.acceptTrashDirectoryTextAmount}>{item.amount * item.multiplier}</Text>
                                </View>
                            ))}
                            </ScrollView>
                        
                        <View style={styles.totalCoinContainer}>
                            <Text>Total Coins: </Text>
                            <Text>{totalCoins}</Text>
                        </View>
                        
                    </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "#40ac74"}]}>
                            <Text style={styles.buttonText} onPress={() => {submitTrash()}}>Accept</Text>
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
        fontSize: 24,
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

export default AdminUserTrashSubmission;