import React, { useState } from 'react'
import { StyleSheet, Text, View, Icon } from 'react-native'
import { Picker } from '@react-native-picker/picker';

const SelectDisease = () => {

    const [pickerValue, setPickerValue] = useState('SelectDisease')
    return (
        <View style={styles.container}>
            <Picker
                style={styles.picker}
                selectedValue={pickerValue}
                onValueChange={(itemValue) => setPickerValue(itemValue)}
            >
                <Picker.Item label='Select Disease' style={{ fontSize: 18 }} value='SelectDisease' />
                <Picker.Item label='Heart Attack                          دل کا دورہ' value='HeartAttack' />
                <Picker.Item label='Parturation Pain               پیدائش کا درد' value='LabourPain' />
                <Picker.Item label='Accident                                      حادثہ' value='Accident' />
                <Picker.Item label='Heat Stroke                            گرمی لگنا' value='HeatStroke' />
                <Picker.Item label='Asthma Attack                    دمہ کا اٹیک' value='AsthmaAttack' />
            </Picker>
        </View>
    )
}

export default SelectDisease

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        justifyContent: "center",
        backgroundColor: "lightgray",
        resizeMode: 'contain',
    },
    picker: {
        resizeMode: "contain",
        color: 'black',
    }
})
