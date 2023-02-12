import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

function Settings({navigation}) {
  
    useEffect(() => {
      navigation.setOptions({headerShown: false})
    })

  return (
    <View>
      <Text>Settings</Text>
    </View>
  )
}

export default Settings;