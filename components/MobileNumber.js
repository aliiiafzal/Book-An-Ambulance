import React, { Component, setState, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Button, StatusBar, DismissKeyboard, Dimensions, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import SelectUser from './SelectUser';
import { OperationType } from '@firebase/auth';

export default class MobileNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            otp: '',
            requestId: '',
        };
    }

    sendOtp = () => {
        let { phoneNumber } = this.state;
        VerifyCode.sendOtp(phoneNumber)
            .then((requestId) => {
                this.setState({ requestId: requestId });
                Alert.alert('Success', 'OTP Sent');
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Error', err.message);
            });

    }


    verifyOtp = () => {
        let { otp, requestId } = this.state;
        VerifyCode.verifyOtp(requestId, otp)
            .then((isVerified) => {
                Alert.alert('Is Verified', `OTP is Verified: ${isVerified}`);
                if (`${isVerified}` == 'true') {
                    this.props.navigation.navigate('selectuser', { paramKey1: this.state.phoneNumber });
                }

            })
            .catch((err) => {
                Alert.alert('Error', err.message);
            });

    }

    render() {

        let { phoneNumber, otp } = this.state;

        return (
            <View style={{
                flex: 1, minHeight: Math.round(Dimensions.get('window').height)
            }
            }>
                <StatusBar backgroundColor='#b22222' barStyle='light-content' />
                <View style={{ flex: 3, backgroundColor: "#b22222", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flex: 3, marginTop: 150 }}>
                        <Image
                            style={{ width: 260, height: 200 }}
                            source={require('../assets/verifypic.png')}
                        />
                    </View>
                </View>

                <View style={{ flex: 1 }}></View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        keyboardType={'phone-pad'}
                        style={styles.input}
                        placeholder='+923456789123'
                        onChangeText={(text) => this.setState({ phoneNumber: text })}
                    />
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        //style={styles.text}
                        disabled={!phoneNumber}
                        style={!phoneNumber ? styles.btn : styles.text}
                        onPress={this.sendOtp.bind(this)}
                    >
                        <Text style={styles.main1}>Send Code</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        keyboardType={'phone-pad'}
                        style={styles.input1}
                        placeholder='Enter OTP'
                        onChangeText={(text) => this.setState({ otp: text })}
                    />
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        disabled={!phoneNumber || !otp}
                        style={!phoneNumber || !otp ? styles.btn : styles.text}
                        onPress={this.verifyOtp.bind(this)}
                    >
                        <Text style={styles.main1}>Verify</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }} >
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    input: {
        backgroundColor: "white",
        height: 50,
        textAlign: "center",
        width: 300,
        borderRadius: 8,
    },
    text: {
        marginRight: 100,
        marginLeft: 100,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    input1: {
        backgroundColor: "white",
        height: 50,
        textAlign: "center",
        width: 300,
        borderRadius: 8
    },
    text1: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    main1: {
        width: 130,
        color: "#fff",
        textAlign: "center",
    },
    btn: {
        marginRight: 100,
        marginLeft: 100,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.4
    }
})

const VerifyCode = {
    sendOtp: async (phoneNumber) => {
        return new Promise((resolver, reject) => {
            axios
                .post('https://www.getapistack.com/api/v1/otp/send',
                    {
                        phoneNumber: phoneNumber,
                        messageFormat: 'Your Code is ${otp} as your OTP. NEVER share this with anyone. Book an Ambulance will never call and ask for this code, do not give it to anyone',
                    },
                    {
                        headers:
                        {
                            'x-as-apikey': '4523f58e-13c3-4a30-aa58-b3578d686998',
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((resp) => resp.data)
                .then((resp) => {
                    resolver(resp.data.requestId);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    verifyOtp: async (requestId, otp) => {
        return new Promise((resolver, reject) => {
            axios
                .post('https://www.getapistack.com/api/v1/otp/verify', {
                    requestId: requestId,
                    otp: otp,
                },
                    {
                        headers:
                        {
                            'x-as-apikey': '4523f58e-13c3-4a30-aa58-b3578d686998',
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((resp) => resp.data)
                .then((resp) => {
                    resolver(resp.data.isOtpValid);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};



