import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
    const dispatch = useDispatch();


    return (
        <SafeAreaView style={tw`bg-white h-full p-2`}>
            <View>
                <Image
                    style={{
                        width: 150,
                        height: 150,
                        resizeMode: "contain",
                    }}
                    source={require('../assets/1.jpeg')}
                />

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
                        language: 'en'
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={300}
                />

                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen

const styles = StyleSheet.create({
    Text: {
        color: "blue",
    },
});
