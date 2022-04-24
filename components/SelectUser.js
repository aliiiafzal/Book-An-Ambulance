import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet, TextInput, SafeAreaView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import MainScreen from '../screens/MainScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const SelectUser = ({ route }) => {

    const app = initializeApp(firebaseConfig);
    const dbref = getDatabase();
    const navigation = useNavigation();
    const [SetName, Name] = React.useState({ name: null, isValid: false, });
    const checkField = (val) => {
        if (val.length > 2) {
            Name({
                name: val,
                isValid: true,
            });
        }
        else {
            Name({
                isValid: false,
            });
        }
    };

    const PostUserName = async () => {

        const PhoneNo = `${route.params.paramKey1}`;
        const UserName = SetName.name;
        set(ref(dbref, "User Detail/" + `${route.params.paramKey1}`), {
            UserName, PhoneNo,
        })
        await AsyncStorage.setItem("Phone", PhoneNo);
        navigation.navigate('mainscreen');
    };

    const PostDriverName = async () => {

        const PhoneNo = `${route.params.paramKey1}`;
        const DriverName = SetName.name;
        set(ref(dbref, "Driver Data/" + `${route.params.paramKey1}`), {
            DriverName, PhoneNo,
        })
        await AsyncStorage.setItem("DriverPh", PhoneNo);
        navigation.navigate('driverLogin');
    };



    return (
        <View style={styles.background}>
            <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
                <Image
                    style={styles.logo}
                    source={require('../assets/giphy.gif')}
                />
            </View>

            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <Text style={styles.text} > Enter Name </Text>
            </View>

            <View style={{ flex: 2, justifyContent: "center" }}>
                <TextInput
                    style={styles.textinput}
                    placeholder="i.e John"
                    autoCorrect={false}
                    onChangeText={(val) => checkField(val)}
                />
                {SetName.isValid ? null : (
                    <Text style={{ color: "red", textAlign: "center" }}>
                        Must Have Valid Name
                    </Text>
                )}
            </View>

            <View style={{ flexDirection: "row", flex: 5, justifyContent: "center" }}>
                <View style={{ flex: 5, backgroundColor: "lightgray", justifyContent: "center", alignItems: "center", margin: 15, borderRadius: 15 }}>
                    <TouchableOpacity
                        onPress={PostUserName}
                        disabled={SetName.isValid == false}
                        style={SetName.isValid == false ? styles.btn2 : styles.btn3}
                    >
                        <Image
                            style={{
                                width: 90,
                                height: 90,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: "https://www.pngrepo.com/png/4529/180/user.png" }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>I'am User</Text>
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
                        disabled={SetName.isValid == false}
                        style={SetName.isValid == false ? styles.btn2 : styles.btn3}
                        onPress={PostDriverName}
                    >
                        <Image
                            style={{
                                width: 90,
                                height: 90,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/1464/1464721.png" }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>I'am Driver</Text>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            name='arrowright'
                            color='white'
                            type='antdesign'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 3 }}></View>
        </View>
    );
}

export default SelectUser

const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: "white",
        minHeight: Math.round(Dimensions.get('window').height)
    },
    logo: {
        width: 250,
        height: 170,
    },
    text: {
        fontSize: 20,
    },
    textinput: {
        height: 50,
        marginLeft: 55,
        marginRight: 55,
        backgroundColor: "white",
        borderWidth: 0.5,
        paddingLeft: 10,
        borderRadius: 10,
    },
    btn2: {
        opacity: 0.5,
    },
    btn3: {
    }
})
