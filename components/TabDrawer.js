import * as React from 'react';
import { Button, Settings, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from '../screens/MainScreen';
import { DrawerContent } from './DrawerContent';
import Setting from './Settings'
import DriverMainComponent from './driverMainComponent';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Setting />
        </View>
    );
}

const Drawer = createDrawerNavigator();

function Root() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home1" component={MainScreen} />
        </Drawer.Navigator>
    );
}

function DriverDrawer() {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name=' ' component={DriverMainComponent} />
        </Drawer.Navigator>

    )
}

const Tab = createBottomTabNavigator();

function TabDrawerUser() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                //headerStyle: { backgroundColor: "yellow" },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                    }
                    return <Ionicons name={iconName} size={30} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={Root} />
            <Tab.Screen name="Settings" component={Setting} />
        </Tab.Navigator>
    );
}

function TabDrawerDriver() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                    }
                    return <Ionicons name={iconName} size={30} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={DriverDrawer} />
            <Tab.Screen name="Settings" component={Setting} />
        </Tab.Navigator>
    );
}

export { TabDrawerUser, TabDrawerDriver };