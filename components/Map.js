import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline, LineCapType } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useRef } from 'react';
import { setTravelTimeInformation } from '../slices/navSlice';
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

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

    useEffect(() => {
        if (!origin || !destination) return;
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);



    useEffect(() => {
        if (!origin || !destination) return;
        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                });
            console.log(origin.location);
            console.log(destination.location);
            await AsyncStorage.setItem("UserStartinglat", origin.location.lat.toString());
            await AsyncStorage.setItem("UserStartinglng", origin.location.lng.toString());
            await AsyncStorage.setItem("UserDestinationlat", destination.location.lat.toString());
            await AsyncStorage.setItem("UserDestinationlng", destination.location.lng.toString());
        }
        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections

                    ref={_map}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    rotateEnabled={true}
                    zoomEnabled={true}
                    toolbarEnabled={true}

                    lineDashPattern={[1]}
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor='blue'
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{

                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title='Origin'
                    description={origin.description}
                    identifier='origin'
                />
            )}
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title='Destination'
                    description={destination.description}
                    identifier='destination'
                />
            )}
        </MapView>
    );
};

export default Map

const styles = StyleSheet.create({})
