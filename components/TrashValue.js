import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Theme } from '../service/UniversalTheme'



const TrashValue = ({iconColor1, iconColor2, type, multiplier, textColor}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={[styles.iconTop, {backgroundColor: iconColor1}]}>
            <View style={[styles.iconTop, {backgroundColor: iconColor2, width: "80%", height: "80%", alignSelf: 'center'}]}>
                <Text style={{textAlign: 'center'}}>{multiplier}</Text>
            </View>
        </View>
        <Text style={{color: textColor, marginLeft: 10}}>{type}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100/3 + "%",
    },
    iconTop: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
    },
})

export default TrashValue;