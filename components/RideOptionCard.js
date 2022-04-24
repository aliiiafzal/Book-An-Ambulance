import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList, View, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { title } from '../global/styles';

const data = [
    {
        id: "Bolan-123",
        title: "Bolan",
        multiplier: 1,
        image: "https://2.bp.blogspot.com/-iUQktxvflRM/Wy3hNxl4d1I/AAAAAAAAEtc/2mDnijZA0TAyQM4_hLjtojn2utN8UoYMwCLcBGAs/s1600/Army%2Bcopy.png",
    },
    {
        id: "FAW-XPV-789",
        title: "Faw XPV",
        multiplier: 1.2,
        image: "https://rwe.net.pk/wp-content/uploads/FAW-1.jpg",
    },
    {
        id: "Uber-XL-456",
        title: "Hiace",
        multiplier: 1.75,
        image: "https://rwe.net.pk/wp-content/uploads/Joylong-1.jpg",
    },
];

const SURGE_CHARGE_RATE = 20;

const RideOptionCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.2 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("NavigateCard")}
                        style={tw`absolute top-2.5 left-5 z-50 p-3 rounded-full`}>
                        <Icon
                            name="chevron-left"
                            type="fontawesome"
                        />
                    </TouchableOpacity>
                    <Text
                        style={tw`text-center top-2.5 p-2 text-xl`}>
                        Select a Ride - {travelTimeInformation?.distance?.text}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", flex: 0.675 }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item: { id, title, multiplier, image }, item }) => (
                            <TouchableOpacity
                                onPress={() => setSelected(item)}
                                style={tw`flex-row justify-between items-center   ${id === selected?.id && "bg-gray-200"
                                    }`}
                            >
                                <View style={{ flex: 0.2, margin: 1, }}>
                                    <Image
                                        style={{
                                            width: 90,
                                            height: 90,
                                            //margin: 1,
                                            resizeMode: "contain",
                                        }}
                                        source={{ uri: image }}
                                    />
                                </View>

                                <View style={{ flex: 0.5, marginLeft: 10 }}>
                                    <Text style={tw`text-xl font-semibold`}>{title}</Text>
                                    <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                                </View>

                                <View style={{ flex: 0.3, margin: 1, }}>
                                    <Text style={{ fontSize: 17 }}>
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "PKR",
                                        }).format(
                                            (travelTimeInformation?.duration.value *
                                                SURGE_CHARGE_RATE * multiplier) / 100
                                        )}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <View style={tw`mt-auto border-t border-gray-200`}>
                    <TouchableOpacity
                        disabled={!selected}
                        onPress={() => navigation.navigate('fetchdriver', {
                            paramKey1: selected?.title,
                            paramKey2: selected?.image,
                        })}
                        style={tw`bg-black py-3 m-3 bottom-5 rounded-full ${!selected && "bg-gray-300"}`}>
                        <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}
export default RideOptionCard
const styles = StyleSheet.create({})
