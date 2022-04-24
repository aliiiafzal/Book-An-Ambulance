import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from "react-redux";
import PrivateBooking from './screens/PrivateBooking';
import MapScreen from './screens/MapScreen';
import { store } from './store';
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Check from './screens/SplashScreen';
import { DrawerContent } from './components/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import tw from 'tailwind-react-native-classnames';
import MobileNumber from './components/MobileNumber';
import SelectUser from './components/SelectUser'
import MainScreen from './screens/MainScreen'
import PublicBooking from './screens/PublicBooking'
import DriverMainComponent from './components/driverMainComponent'
import UserRequests from './components/userRequests'
import { TabDrawerDriver, TabDrawerUser } from './components/TabDrawer'
import DriverLogin from './components/driverLogin';
import DriverSignup from './components/driverSignup';
import DriverDetail from './components/driverDetail';
import SplashScreen from './screens/SplashScreen';
import FetchDriver from './components/FetchDriver';
import FindRider from './components/findRider';


export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
                name='splashscreen'
                component={SplashScreen}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen
                name='fetchdriver'
                component={FetchDriver}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen
                name='selectuser'
                component={SelectUser}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen
                name='registernumber'
                component={MobileNumber}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen
                name='drivermainscreen'
                component={TabDrawerDriver}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='driverLogin'
                component={DriverLogin}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='driverSignup'
                component={DriverSignup}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='driverDetail'
                component={DriverDetail}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='findrider'
                component={FindRider}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='userrequests'
                component={UserRequests}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='mainscreen'
                component={TabDrawerUser}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen
                name='privatebooking'
                component={PrivateBooking}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen
                name='publicbooking'
                component={PublicBooking}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                  headerShown: false,
                }} />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}


