import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const Settings = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#e0dcdc' }}>
            <View style={{ flex: 6, justifyContent: "center", alignItems: "center" }}>
                <Image
                    source={{
                        uri:
                            'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                    }}
                    style={{ width: 150, height: 150, borderRadius: 200 / 2 }}
                />
                <Text style={{
                    fontSize: 30,
                    fontWeight: "bold",
                }}>Ali Afzal</Text>
                <Text
                    style={{
                        fontSize: 20,

                    }}>aliafzal@gmail.com</Text>
            </View>

            <View style={{ flex: 1, marginLeft: 15 }}>
                <TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={require("../assets/home.png")}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                        <Text style={{ fontSize: 18, marginLeft: 12, marginTop: 2 }}>
                            Home
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, marginLeft: 15 }}>
                <TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={require("../assets/search.png")}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                        <Text style={{ fontSize: 18, marginLeft: 12, marginTop: 2 }}>
                            Search
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, marginLeft: 15 }}>
                <TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={require("../assets/bell.png")}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                        <Text style={{ fontSize: 18, marginLeft: 12, marginTop: 2 }}>
                            Notification
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, marginLeft: 15 }}>
                <TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={require("../assets/settings.png")}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                        <Text style={{ fontSize: 18, marginLeft: 12, marginTop: 2 }}>
                            Setting
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 2 }}></View>

            <View style={{ flex: 1, marginLeft: 15 }}>
                <TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={require("../assets/logout.png")}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                        <Text style={{ fontSize: 18, marginLeft: 12, marginTop: 2 }}>
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Settings;
const styles = StyleSheet.create({});


