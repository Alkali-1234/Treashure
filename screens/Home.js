import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

function Home({navigation}) {
  
    useEffect(() => {
      navigation.setOptions({headerShown: false})
    })

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home;