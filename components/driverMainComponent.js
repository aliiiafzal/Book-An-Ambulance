import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from '@env'
import tw from 'tailwind-react-native-classnames'
import * as Location from 'expo-location'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import ambulance_icon from '../assets/ambulance_icon.jpeg'
import { useRef } from 'react'
import app from '../firebase'
import { getDatabase, ref, child, get, set } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage'

const driverMainComponent = () => {

  const navigation = useNavigation()
  const dbRef = ref(getDatabase())
  const [location, setLocation] = useState(null)
  const [Heading, setHeading] = useState()
  const [fitToMarker, setFitToMarker] = useState(['driver'])
  const mapRef = useRef(null)
  const [Destination, setDestination] = useState({
    latitude: 31.358373,
    longitude: 73.148167
  })
  const [pickupLocation, setPickupLocation] = useState(null)
  const [dropLocation, setDropLocation] = useState(null)
  const [pickupOrigin, setPickupOrigin] = useState(null)
  const [pickupDestination, setPickupDestination] = useState(null)
  const [dropOrigin, setDropOrigin] = useState(null)
  const [dropDestination, setDropDestination] = useState(null)
  const [Status, setStatus] = useState('false')
  const [enable, setEnable] = useState(false)

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
        coords: { latitude, longitude, heading }
      } = await Location.getCurrentPositionAsync()
      setLocation({ latitude: latitude, longitude: longitude })
      setHeading(heading)
    } catch (err) {
      alert(err)
    }
  }

  const _map = useRef(1)
  let timeout

  useEffect(() => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      checkPermission()
      getLocation()
      setPickupOrigin(location)
    }, 2000)
  }, [location])

  function fitToMarker2(value1) {
    mapRef.current.fitToSuppliedMarkers(value1, {
      edgePadding: { top: 80, right: 80, bottom: 80, left: 80 }
    })
  }


  const [count, setCount] = useState(0)
  const check = async () => {
    if (count === 0) {
      const driverph = await AsyncStorage.getItem('DriverPh')

      get(child(dbRef, `Driver Booking`)).then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(child => {
            if (driverph == child.val().driverContact) {
              setCount(5)
              //setStatus('Accepted')
              console.log('Hello  ' + driverph + '=' + count + '==> ' + Status)
              setPickupOrigin(location)
              setPickupLocation({
                latitude: parseFloat(child.val().UserStartingLat),
                longitude: parseFloat(child.val().UserStartingLng)
              })
              setPickupDestination({
                latitude: parseFloat(child.val().UserStartingLat),
                longitude: parseFloat(child.val().UserStartingLng)
              })
              setDropLocation({
                latitude: parseFloat(child.val().UserDestinationLat),
                longitude: parseFloat(child.val().UserDestinationLng)
              })
            }
          })
        }
      })
    } else {
      return
    }
  }

  function StartRide() {
    setPickupDestination(pickupLocation)
    setDropOrigin(pickupLocation)
    setEnable(true)
    setDropDestination(dropLocation)
  }

  function EndRide() {
    setPickupOrigin(null)
    setPickupDestination(null)
    setEnable(false)
    setDropOrigin(null)
    setDropDestination(null)
    fitToMarker2(['driver', 'pickup', 'drop'])
  }

  return (
    <View style={{ flex: 1 }}>
      {check() && location && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          followsUserLocation={enable}
          showsCompass={enable}
          showsTraffic={enable}
          showsUserLocation={enable}
          showsIndoorLevelPicker={enable}
          showsMyLocationButton={enable}
          style={[{ flex: 3 }, tw``]}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.0055
          }}
        >
          {
            <MapViewDirections
              ref={_map}
              provider={PROVIDER_GOOGLE}
              lineDashPattern={[1]}
              origin={pickupOrigin}
              destination={pickupDestination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={10}
              strokeColor='blue'
            />
          }
          {
            <MapViewDirections
              ref={_map}
              provider={PROVIDER_GOOGLE}
              lineDashPattern={[1]}
              origin={dropOrigin}
              destination={dropDestination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={10}
              strokeColor='black'
            />
          }

          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              title='Driver'
              identifier='driver'
            >
              <Image
                source={ambulance_icon}
                style={{
                  height: 50,
                  width: 45,
                  resizeMode: 'contain',
                  transform: [{ rotate: `${Heading}deg` }]
                }}
              />
            </Marker>
          )}
          {pickupLocation && (
            <Marker
              coordinate={{
                latitude: pickupLocation.latitude,
                longitude: pickupLocation.longitude
              }}
              title='User Pick'
              identifier='pickup'
            />
          )}
          {dropLocation && (
            <Marker
              coordinate={{
                latitude: dropLocation.latitude,
                longitude: dropLocation.longitude
              }}
              title='User Drop'
              identifier='drop'
            />
          )}
        </MapView>
      )}
      <View style={[{ flex: 0.5 }, tw` flex-col bg-white justify-evenly`]}>
        <View style={[{ backgroundColor: 'yellow' }, tw``]}></View>
        <View
          style={[
            {},
            tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`
          ]}
        >
          <TouchableOpacity
            style={tw`flex-row justify-between bg-black py-3 px-3 rounded-full`}
            onPress={() => navigation.navigate('userrequests')}
          >
            <Icon2 name='person-add' color='white' size={20} />

            <Text
              style={[{ color: 'white', margin: 1.5, paddingLeft: 2 }, tw` `]}
            >
              Requests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw` flex-row justify-evenly py-3 px-3 bg-black rounded-full`}
            disabled={"Accepted" != 'Accepted'}
            onPress={StartRide}
          >
            <Icon name='play' color='white' size={20} />
            <Text
              style={[{ color: 'white', margin: 1, paddingLeft: 2 }, tw` `]}
            >
              Start Ride
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw` flex-row justify-evenly py-3 px-3 bg-black rounded-full`}
            disabled={"Accepted" != 'Accepted'}
            onPress={EndRide}
          >
            <Icon name='closecircle' color='white' size={20} />
            <Text
              style={[{ color: 'white', margin: 2.5, paddingLeft: 2 }, tw` `]}
            >
              End Ride
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default driverMainComponent
const styles = StyleSheet.create({})