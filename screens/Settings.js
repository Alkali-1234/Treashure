import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Theme, toggleTheme } from '../service/UniversalTheme';
import * as UserDataService from '../service/UserDataService';
import { FontAwesome5 } from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Settings({navigation}) {
  const [newUserName, setNewUserName] = useState(userDataSnapshot?.username);
  const [newEmail, setNewEmail] = useState(userDataSnapshot?.email);
  const [userDataSnapshot, setUserDataSnapshot] = useState(UserDataService.userDataSnapshot);
  const [profilePictureLink, setProfilePictureLink] = useState(userDataSnapshot?.profilePictureLink);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    console.log(result.assets[0].uri);

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${result.assets[0].uri.lastIndexOf('/')+1}`);
      const uploadResult = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log("Uploaded Image! " + downloadURL);
      setProfilePictureLink(downloadURL);
    }

  }

    useEffect(() => {
      setUserDataSnapshot(UserDataService.userDataSnapshot);
    }, [UserDataService.userDataSnapshot])
  
    useEffect(() => {
      navigation.setOptions({headerShown: false})
    })
    const handleUpdateProfile = () => {
      UserDataService.updateUserProfile(newUserName, newEmail, profilePictureLink);
    }
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topProfileMain}>
          <Image style={styles.profilePicture} source={{uri: userDataSnapshot?.profilePictureLink}} />
          <Text style={{fontSize: 32, marginLeft: 10}}>{userDataSnapshot?.username}</Text>
        </View>
        <View style={styles.topProfileMain}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5 name="coins" size={36} color="green" />
            <Text style={{marginLeft: 5, fontWeight: 'bold', fontSize: 24}}>{userDataSnapshot?.coins}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
            <FontAwesome5 name="trash-alt" size={36} color={Theme.text.primary} />
            <Text style={{marginLeft: 5, fontWeight: 'bold', fontSize: 24}}>{userDataSnapshot?.trash}</Text>
          </View>
        </View>
        <View>
          {/* Account Info */}
          <TextInput onChangeText={setNewUserName} style={{backgroundColor: Theme.form.background, color: Theme.text.primary, padding: 10, borderRadius: 10, marginTop: 20}} defaultValue={userDataSnapshot?.username} placeholder="Username" placeholderTextColor={Theme.text.secondary} />
          <TextInput onChangeText={setNewEmail} style={{backgroundColor: Theme.form.background, color: Theme.text.primary, padding: 10, borderRadius: 10, marginTop: 20}} defaultValue={userDataSnapshot?.email} placeholder="Email" placeholderTextColor={Theme.text.secondary} />
          {/* Pick Profile Picture */}
          <TouchableOpacity onPress={() => pickImage()} style={{backgroundColor: Theme.form.background, padding: 10, borderRadius: 10, marginTop: 20}}><Text style={{color: Theme.text.primary, textAlign: 'center'}}>Pick Profile Picture</Text></TouchableOpacity>
        </View>
      </View>
      <View>
        {/* Toggle theme button */}
        <TouchableOpacity onPress={() => toggleTheme()} style={{backgroundColor: Theme.form.background, padding: 10, borderRadius: 10, marginTop: 20}}><Text style={{color: Theme.text.primary, textAlign: 'center'}}>Toggle Theme</Text></TouchableOpacity>
        {/* Update User Profile button */}
        <TouchableOpacity onPress={handleUpdateProfile} style={{backgroundColor: "#40ac74", padding: 10, borderRadius: 10, marginTop: 10}}><Text style={{color: "white", textAlign: 'center'}}>Update Profile</Text></TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primary,
    height: "100%",
    width: "100%",
    padding: 20,
    justifyContent: 'space-between',
  },
  topProfileMain: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center'
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Theme.secondary,
    backgroundColor: Theme.secondary,
  },
});


export default Settings;