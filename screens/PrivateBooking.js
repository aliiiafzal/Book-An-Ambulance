import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, StatusBar } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';
import Selectdisease from '../components/SelectDisease';

const PrivateBooking = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full p-2`}>
            <View style={{ flex: 1, minHeight: Math.round(Dimensions.get('window').height) }}>
                <StatusBar backgroundColor='black' barStyle='light-content' />
                <View style={{ flex: 3, top: 20 }}>
                    <View style={tw`p-5`}>
                        <GooglePlacesAutocomplete
                            placeholder='Where From?'
                            styles={{
                                container: {
                                    flex: 0,
                                },
                                textInput: {
                                    fontSize: 18,
                                },
                            }}
                            onPress={(data, details = null) => {
                                dispatch(
                                    setOrigin({
                                        location: details.geometry.location,
                                        description: data.description,
                                    })
                                );
                                dispatch(setDestination(null));
                            }}
                            fetchDetails={true}
                            returnKeyType={"search"}
                            enablePoweredByContainer={false}
                            minLength={2}
                            query={{
                                key: GOOGLE_MAPS_APIKEY,
                                language: 'en',
                            }}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            debounce={100}
                        />
                    </View>
                </View>

                <View style={{ flex: 2, justifyContent: "center" }}>
                    <Selectdisease />
                </View>

                <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
                    <NavOptions />
                </View>

                <View style={{ flex: 3.5, justifyContent: "center" }}>
                    <NavFavourites />
                </View>
                <View style={{ flex: 3 }}></View>
            </View>
        </SafeAreaView>
    );
};

export default PrivateBooking
const styles = StyleSheet.create({
});
