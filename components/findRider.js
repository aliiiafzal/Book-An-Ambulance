import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Button,
    Alert,
    ScrollView,
    ProgressBarAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import rider from '../assets/rider.png';

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
var check = [];
var count = 0;

const findRider = ({ route }) => {
    const [status, setstatus] = useState(null);
    const [datalist, setDataList] = useState(check);
    const navigation = useNavigation();
    const [location, setLocation] = useState();

    const checking = route.params.paramKey1;

    const checkPermission = async () => {
        const hasPermission = await Location.requestForegroundPermissionsAsync()
        if (hasPermission.status === 'granted') {
            return hasPermission
        }
        return true
    }

    const getLocation = async () => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync()
            if (!granted) return
            const {
                coords: { latitude, longitude }
            } = await Location.getCurrentPositionAsync()
            setLocation({ latitude: latitude, longitude: longitude })
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        checkPermission()
        getLocation(), [location]
    })

    const Booking = async (driverno) => {
        const [value, setValue] = useState([]);

        if (count == 0) {
            try {
                get(child(dbRef, `Driver Booking`)).then((snapshot) => {
                    if (snapshot.exists()) {

                        snapshot.forEach((child) => {
                            // && child.val().status == "Pending"
                            if (driverno == child.val().driverContact) {
                                check.push({
                                    key: child.val().driverContact,
                                    status: child.val().status,
                                })
                                if (child.val().status == "Accepted") {
                                    setstatus(child.val().status);
                                    setTimeout(() => {
                                        alert("Rider Accepted Your Request");
                                        navigation.navigate('mainscreen');
                                    }, 5000);

                                }
                                else if (child.val().status == "Pending") {
                                    setstatus(child.val().status);
                                    setTimeout(() => {
                                        check = [];
                                        count = 0;
                                    }, 10000);
                                }
                                else if (child.val().status == "Rejected") {
                                    setstatus(child.val().status);
                                    setTimeout(() => {
                                        alert("Rider Rejected Your Request");
                                        navigation.navigate('mainscreen');
                                    }, 5000);
                                }
                            }
                        })
                        setValue(check)
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
        count++;
    }

    Booking(checking);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 3 }}>
                {location && (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        followsUserLocation={true}
                        showsCompass={true}
                        showsUserLocation={true}
                        style={[{ flex: 3 }, tw``]}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.0055
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            title='Faisalabad'
                            description='This is Faisalabad City.'
                        >
                            <Image
                                source={rider}
                                style={{ height: 50, width: 45, resizeMode: "contain" }}
                            />
                        </Marker>
                    </MapView>
                )}
            </View>

            <View style={styles.container}>
                <Text style={{ fontSize: 20, }}>Find Your Rider</Text>
                <ProgressBarAndroid />
            </View>
        </View>
    );
};

export default findRider;

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 40;
const radius = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


