import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
    DrawerContentScrollView,
    DrawItem
} from '@react-navigation/drawer';
import profile from '../assets/profile.jpg';
import home from '../assets/home.png';
import search from '../assets/search.png';
import notifications from '../assets/bell.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';


export function DrawerContent(props) {
    const [currentTab, setCurrentTab] = useState("Home");

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: 'flex-start', padding: 15 }}>
                <Image source={profile} style={{
                    width: 120,
                    height: 150,
                    flex: 0,
                    borderRadius: 10,
                    marginTop: 15
                }}></Image>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: 20
                }}>Ali Afzal</Text>

                <TouchableOpacity>
                    <Text style={{
                        marginTop: 6,
                        color: 'white'
                    }}>View Profile</Text>
                </TouchableOpacity>

                <View style={{ flexGrow: 1, marginTop: 50 }}>

                    {TabButton(currentTab, setCurrentTab, "Home", home)}
                    {TabButton(currentTab, setCurrentTab, "Search", search)}
                    {TabButton(currentTab, setCurrentTab, "Notifications", notifications)}
                    {TabButton(currentTab, setCurrentTab, "Settings", settings)}

                </View>

                <View>
                    {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
                </View>
            </View>
        </SafeAreaView>
    );
}

const TabButton = (currentTab, setCurrentTab, title, image) => {
    return (
        <TouchableOpacity onPress={() => {
            if (title == "LogOut") {
            } else {
                setCurrentTab(title)
            }
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == title ? 'white' : 'transparent',
                paddingLeft: 13,
                paddingRight: 35,
                borderRadius: 8,
                marginTop: 15
            }}>

                <Image source={image} style={{
                    width: 25, height: 25,
                    tintColor: currentTab == title ? "#5359D1" : "white"
                }}></Image>

                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == title ? "#5359D1" : "white"
                }}>{title}</Text>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b22222',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
