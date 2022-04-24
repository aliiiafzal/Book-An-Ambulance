import React, { useState, useEffect } from 'react';
import {
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
} from 'react-native';
import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cond } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 40;
const radius = 20;

const FetchDriver = ({ route }) => {
    const app = initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase());
    const navigation = useNavigation();
    const [value, setValue] = useState([]);
    const [count, setCount] = useState(0);
    var main = [];

    const check = () => {
        get(child(dbRef, `DriverRecord`)).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    console.log(child.val());
                    if (child.val().AmbulanceType == `${route.params.paramKey1}`) {
                        main.push({
                            key: child.val().Cnic,
                            Name: child.val().Name,
                            Contact: child.val().Contact,
                            NoPlate: child.val().AmbNo,
                        })
                    }
                })
                setValue(main)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const countchild = () => {
        get(child(dbRef, `Driver Booking`)).then((snapshot) => {
            setCount(snapshot.size + 1);
        });
        console.log(count);
    }

    const BookDriver = async (drivercontact, drivername) => {
        console.log(drivercontact);
        countchild();
        try {
            const ph = await AsyncStorage.getItem('Phone');
            const UserStartLat = await AsyncStorage.getItem('UserStartinglat');
            const UserStartLng = await AsyncStorage.getItem('UserStartinglng');
            const UserDestLat = await AsyncStorage.getItem('UserDestinationlat');
            const UserDestLng = await AsyncStorage.getItem('UserDestinationlng');

            console.log(ph);

            get(child(dbRef, `User Detail`)).then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((child) => {
                        if (ph == child.val().PhoneNo) {
                            const value1 = child.val().UserName;
                            console.log(value1);
                            if (ph !== null && value1 !== null) {

                                const driverContact = drivercontact;
                                const driverName = drivername;
                                const userContact = ph;
                                const userName = value1;
                                const status = "Pending";
                                const UserStartingLat = UserStartLat;
                                const UserStartingLng = UserStartLng;
                                const UserDestinationLat = UserDestLat;
                                const UserDestinationLng = UserDestLng;

                                set(ref(getDatabase(), "Driver Booking/" + "Booking " + count), {
                                    driverName, driverContact, userContact, userName, status, UserStartingLat, UserStartingLng, UserDestinationLat, UserDestinationLng,
                                })
                            }
                        }
                    })
                    navigation.navigate('findrider', {
                        paramKey1: drivercontact,
                    });
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


    useEffect(() => {
        check();
    }, []);

    const renderSeperator = () => (
        <View
            style={{
                marginTop: 20,
                height: 0.5,
            }}
        />
    );

    const renderItem = ({ item }) => (
        <View style={styles.container1}>
            <View style={styles.cardContainer}>
                <View style={{ flex: 0.7 }}></View>
                <View
                    style={{
                        flex: 2,
                        flexDirection: "row",
                    }}
                >
                    <Image style={{ width: 23, height: 23, margin: 5, color: "black" }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png" }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.titleStyle}>{item.Name}</Text>
                    </View>
                    <Image style={styles.imageStyle} source={{ uri: route.params.paramKey2 }} />
                    <View style={{ flex: 0.05 }}></View>
                </View>

                <View
                    style={{
                        flex: 2,
                        flexDirection: "row",
                    }}
                >
                    <Image style={{ width: 23, height: 23, margin: 5, color: "black" }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/597/597177.png" }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.titleStyle}>{item.Contact}</Text>
                    </View>
                    <View style={{ flex: 0.05 }}></View>
                </View>

                <View
                    style={{
                        flex: 0.01,
                        top: 3,
                        width: deviceWidth - 60,
                        left: 10,
                        backgroundColor: "white",
                    }}
                />
                <View style={{ flex: 4, top: 10 }}>
                    <View
                        style={{
                            flex: 1.1,
                            flexDirection: "row",
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Image style={{ width: 23, height: 23, margin: 5, color: "black" }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/1743/1743637.png" }} />
                            <Text style={{ left: 5, color: "white" }}>{item.NoPlate}</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Image style={{ width: 25, height: 25, margin: 5, color: 'black' }} source={{ uri: "https://cdn-icons.flaticon.com/png/512/3097/premium/3097158.png?token=exp=1649783543~hmac=bc92253d1e6c5453dcd56525f05551ca" }} />
                            <Text style={{ left: 5, color: "white" }}>{route.params.paramKey1}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 2,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => BookDriver(item.Contact, item.Name)}
                        >
                            <Text style={styles.text1}>Book</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.5 }}></View>
                </View>
            </View>
        </View>

    );

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ScrollView>
                <View style={{ flex: 0.5, justifyContent: "center" }}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'black',
                        textAlign: "center",
                        paddingTop: 35
                    }}> Choose Your Rider</Text>
                </View>
                <FlatList
                    style={{ marginTop: 10, paddingBottom: 30 }}
                    data={value}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={renderSeperator}
                />
            </ScrollView>
        </View>
    )
}

export default FetchDriver

const styles = StyleSheet.create({
    container1: {
        width: deviceWidth - 20,
        alignItems: "center",
        marginTop: 25,
    },
    cardContainer: {
        flexDirection: "column",
        width: deviceWidth - offset,
        backgroundColor: "#b22222",
        height: 250,
        borderRadius: radius,
        shadowColor: "white",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
    },
    imageStyle: {
        height: 75,
        width: 75,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        opacity: 0.9,
        alignContent: "center",
        alignSelf: "center",
        justifyContent: "center",
    },
    titleStyle: {
        left: 5,
        color: "white",
        fontSize: 20,
        fontWeight: "800",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 7,
        width: 300,
        elevation: 3,
        backgroundColor: "black",
    },
    text1: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
})