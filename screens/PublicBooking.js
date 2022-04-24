import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, ScrollView, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { colors, parameters } from '../global/styles';
import { NavigationContainer } from '@react-navigation/native';
import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from "firebase/database";
import { child as Schild } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { useRef } from 'react';


const NavFavourites = () => {
    const app = initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase());
    const navigation = useNavigation();
    const mapRef = useRef(null);

    const [latlng, setLatLng] = useState({});
    const checkPermission = async () => {
        const hasPermission = await Location.requestForegroundPermissionsAsync();
        if (hasPermission.status === 'granted') {
            const permission = await askPermission();
            return permission;
        }
        return true;
    };

    const askPermission = async () => {
        const permission = await Location.requestForegroundPermissionsAsync()
        return permission.status === 'granted';
    };

    const getLocation = async () => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (!granted) return;
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync();
            setLatLng({ latitude: latitude, longitude: longitude })

        } catch (err) {

        }
    }

    const _map = useRef(1);

    useEffect(() => {
        checkPermission();
        getLocation()
            //console.log(latlng)
            , []
    })

    const AlertForRescue = async (name) => {
        //console.log(name);
        try {
            const ph = await AsyncStorage.getItem('Phone');
            console.log(ph);

            get(child(dbRef, `User Detail`)).then((snapshot) => {
                if (snapshot.exists()) {

                    snapshot.forEach((child) => {

                        if (ph == child.val().PhoneNo) {
                            const value1 = child.val().UserName;
                            //console.log(value1);
                            get(Schild(dbRef, `DriverRecord`)).then((snapshot) => {
                                if (snapshot.exists()) {

                                    snapshot.forEach((child) => {
                                        //console.log(child.val());
                                        if (child.val().AmbulanceType == name) {
                                            const DriverName = child.val().Name;
                                            const DriverContact = child.val().Contact;
                                            const UserName = value1;
                                            const UserContact = ph;
                                            const UserCurrentLat = latlng.latitude;
                                            const UserCurrentLng = latlng.longitude;

                                            set(ref(getDatabase(), "Emergency Rescue Booking/" + DriverContact), {
                                                DriverName, DriverContact, UserName, UserContact, UserCurrentLat, UserCurrentLng,
                                            })
                                            setTimeout(() => {
                                                alert("Emergency Alert Generated For Rescue");
                                                navigation.navigate('mainscreen');
                                            }, 5000);
                                        }
                                    })
                                } else {
                                    console.log("No data available");
                                }
                            }).catch((error) => {
                                console.error(error);
                            });
                        }
                    })
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        } catch (error) {
            // Error retrieving data
        }
    }

    const AlertForEdhi = async (name) => {
        try {
            const ph = await AsyncStorage.getItem('Phone');
            get(child(dbRef, `User Detail`)).then((snapshot) => {
                if (snapshot.exists()) {

                    snapshot.forEach((child) => {

                        if (ph == child.val().PhoneNo) {
                            const value1 = child.val().UserName;
                            get(Schild(dbRef, `DriverRecord`)).then((snapshot) => {
                                if (snapshot.exists()) {
                                    snapshot.forEach((child) => {
                                        if (child.val().AmbulanceType == name) {
                                            const DriverName = child.val().Name;
                                            const DriverContact = child.val().Contact;
                                            const UserName = value1;
                                            const UserContact = ph;
                                            const UserCurrentLat = latlng.latitude;
                                            const UserCurrentLng = latlng.longitude;

                                            set(ref(getDatabase(), "Emergency Edhi Booking/" + DriverContact), {
                                                DriverName, DriverContact, UserName, UserContact, UserCurrentLat, UserCurrentLng,
                                            })
                                            setTimeout(() => {
                                                alert("Emergency Alert Generated For Edhi");
                                                navigation.navigate('mainscreen');
                                            }, 5000);
                                        }
                                    })
                                } else {
                                    console.log("No data available");
                                }
                            }).catch((error) => {
                                console.error(error);
                            });
                        }
                    })
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        } catch (error) {
            // Error retrieving data
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.55 }}>
                <View style={styles.header}>
                </View>

                <ScrollView bounces={false}>
                    <View style={styles.home}>
                        <Image
                            style={{ width: 100, height: 100, top: 40 }}
                            source={require('../assets/output-onlinepngtools.png')}
                        />
                        <Text style={styles.text1}>Having Emergency?</Text>
                        <View style={styles.view1}>
                            <View style={styles.view8}>
                                <Text style={styles.text2}>Get your ride now</Text>
                                <View style={styles.button1}>
                                    <Text style={styles.button1Text}>Lets Go</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <View style={{ flex: 0.37 }}>
                <View style={{ flex: 0.5, margin: 8 }}>
                    <TouchableOpacity
                        style={tw`flex-col pl-5 pb-10 mb-4 `, { backgroundColor: 'lightgray', margin: 20, borderRadius: 15 }}
                        onPress={() => AlertForEdhi("Edhi")}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                style={{
                                    width: 70,
                                    height: 70,
                                    marginRight: 15,
                                    marginTop: 20,
                                    margin: 10,
                                    resizeMode: 'contain'
                                }}
                                source={{ uri: "https://www.pngrepo.com/png/18991/180/ambulance.png" }}
                            />
                            <View>
                                <Text style={tw`font-semibold text-lg mt-7 ml-2`}>Edhi</Text>
                                <Text style={tw`text-gray-500 ml-2`}>Book Edhi Now</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`flex-col pl-5 pb-10 mb-4 `, { backgroundColor: 'lightgray', margin: 20, borderRadius: 15 }}
                        onPress={() => AlertForRescue("Rescue 1122")}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                style={{
                                    width: 70,
                                    height: 70,
                                    marginRight: 15,
                                    marginTop: 20,
                                    margin: 10,
                                    resizeMode: 'contain'
                                }}
                                source={{ uri: "https://www.pngrepo.com/png/3035/180/ambulance.png" }}
                            />
                            <View>
                                <Text style={tw`font-semibold text-lg mt-7 ml-2`}>Rescue 1122</Text>
                                <Text style={tw`text-gray-500 ml-2`}>Book Rescue 1122 Now</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default NavFavourites
const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: "white"
    },
    header: {
        backgroundColor: '#b22222',
        height: parameters.publicheaderheigth,
        alignItems: "flex-start",
    },
    home: {
        backgroundColor: '#b22222',
        paddingLeft: 20,
    },
    text1: {
        color: colors.white,
        fontSize: 25,
        paddingBottom: 20,
        paddingTop: 60
    },
    view1: {
        paddingTop: 30,
        marginBottom: 20,
    },
    view8: {
        marginTop: -25
    },
    text2: {
        color: colors.white,
        fontSize: 18,
        marginBottom: 8
    },
    button1Text: {
        color: colors.white,
        fontSize: 17,
        marginTop: -2
    },
})