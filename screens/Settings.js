import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

function Settings({navigation}) {
  
    useEffect(() => {
      navigation.setOptions({headerShown: false})
    })

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("AdminPanel")} style={{marginTop: 20}}><Text>admin</Text></TouchableOpacity>
    </View>
  )
}

export default Settings;