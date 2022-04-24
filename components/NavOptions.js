import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../slices/navSlice';
import { useSelector } from 'react-redux';

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin)

    return (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('MapScreen')}
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 rounded-xl`}
                disabled={!origin}
            >
                <View style={tw`${!origin && "opacity-20"}`}>
                    <Image
                        style={{
                            width: 90,
                            height: 90,
                            resizeMode: 'contain'
                        }}
                        source={{ uri: "https://www.pngrepo.com/png/171022/180/ambulance.png" }}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>Get a ride</Text>
                    <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name='arrowright'
                        color='white'
                        type='antdesign'
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => alert("Hospital Suggestion Comming Soon")}
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 rounded-xl`}
                disabled={!origin}
            >
                <View style={tw`${!origin && "opacity-20"}`}>
                    <Image
                        style={{
                            width: 90,
                            height: 90,
                            resizeMode: 'contain'
                        }}
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3063/3063176.png" }}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>Hospitals</Text>
                    <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name='arrowright'
                        color='white'
                        type='antdesign'
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default NavOptions


