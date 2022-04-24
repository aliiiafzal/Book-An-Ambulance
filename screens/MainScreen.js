import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { colors, parameters } from '../global/styles';
const SCREEN_WIDTH = Dimensions.get('window').width;
import { selectOrigin } from '../slices/navSlice';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Tabdrawer from '../components/TabDrawer';

const MainScreen = ({ }) => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#b22222' barStyle='light-content' />
            <View style={{ flex: 6 }}>
                <View style={styles.header}>
                </View>
                <ScrollView bounces={false}>
                    <View style={styles.home}>
                        <Text style={styles.text1}>Having Emergency?</Text>
                        <View style={styles.view1}>
                            <View style={styles.view8}>
                                <Text style={styles.text2}>Lets Book a ride for emergency</Text>
                                <View style={styles.button1}>
                                    <Text style={styles.button1Text}>Lets Ride</Text>
                                </View>
                            </View>

                            <View>
                                <Image
                                    style={styles.image1}
                                    source={require('../assets/car.png')}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <View style={{ flexDirection: "row", flex: 5, justifyContent: "center" }}>
                <View style={{ flex: 5, backgroundColor: "lightgray", justifyContent: "center", alignItems: "center", margin: 15, borderRadius: 15 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('privatebooking')}
                    >
                        <Image
                            style={{
                                width: 110,
                                height: 110,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: "https://www.pngrepo.com/png/275738/180/hospital-bed-bed.png" }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>Private Booking</Text>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            name='arrowright'
                            color='white'
                            type='antdesign'
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, backgroundColor: "lightgray", justifyContent: "center", alignItems: "center", margin: 15, borderRadius: 15 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('publicbooking')}
                    >
                        <Image
                            style={{
                                width: 110,
                                height: 110,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: "https://www.pngrepo.com/png/75189/180/alarm.png" }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>Public Booking</Text>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            name='arrowright'
                            color='white'
                            type='antdesign'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 2 }}></View>
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: parameters.statusBarHeight,
    },
    header: {
        backgroundColor: "#b22222",
        height: parameters.headerHeight,
        alignItems: "flex-start"
    },
    home: {
        backgroundColor: "#b22222",
        paddingLeft: 20,
    },
    text1: {
        color: colors.white,
        fontSize: 21,
        paddingBottom: 20,
        paddingTop: 20
    },
    view1: {
        flexDirection: "row",
        flex: 1,
        paddingTop: 30
    },
    view8: {
        flex: 4,
        marginTop: -25
    },
    text2: {
        color: colors.white,
        fontSize: 16
    },
    button1: {
        height: 40,
        width: 150,
        backgroundColor: colors.black,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    button1Text: {
        color: colors.white,
        fontSize: 17,
        marginTop: -2
    },
    image1: {
        height: 100,
        width: 100,
    },
})




