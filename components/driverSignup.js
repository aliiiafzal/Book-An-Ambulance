import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification
} from '@firebase/auth'
const auth = getAuth()

const SignupScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true
    })

    const textInputChange = val => {
        if (val.length !== 0) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (re.test(String(val).toLowerCase())) {
                setData({
                    ...data,
                    email: val,
                    check_textInputChange: true
                })
            } else {
                setData({
                    ...data,
                    email: val,
                    check_textInputChange: false
                })
            }
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            })
        }
    }

    const handlePasswordChange = val => {
        setData({
            ...data,
            password: val
        })
    }

    const handleConfirmPasswordChange = val => {
        setData({
            ...data,
            confirm_password: val
        })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#b22222' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <ScrollView>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color='black' size={20} />
                        <TextInput
                            placeholder='Your Email'
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={val => textInputChange(val)}
                        />
                        {data.check_textInputChange ? (
                            <Animatable.View animation='bounceIn'>
                                <Feather name='check-circle' color='black' size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>

                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Password
                    </Text>
                    <View style={styles.action}>
                        <Feather name='lock' color='black' size={20} />
                        <TextInput
                            placeholder='Your Password'
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={val => handlePasswordChange(val)}
                        />
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ? (
                                <Feather name='eye-off' color='black' size={20} />
                            ) : (
                                <Feather name='eye' color='black' size={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Confirm Password
                    </Text>
                    <View style={styles.action}>
                        <Feather name='lock' color='black' size={20} />
                        <TextInput
                            placeholder='Confirm Your Password'
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={val => handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                            {data.confirm_secureTextEntry ? (
                                <Feather name='eye-off' color='black' size={20} />
                            ) : (
                                <Feather name='eye' color='black' size={20} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                        </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
                            {' '}
                            Terms of service
                        </Text>
                        <Text style={styles.color_textPrivate}> and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
                            {' '}
                            Privacy policy
                        </Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            disabled={data.check_textInputChange == false}
                            style={data.check_textInputChange == false ? styles.signInn : styles.signIn}
                            onPress={() => navigation.navigate('driverDetail', data)}
                        >
                            <LinearGradient
                                colors={['black', 'black']}
                                style={styles.signIn}
                            >
                                <Text
                                    style={[
                                        styles.textSign,
                                        {
                                            color: '#fff'
                                        }
                                    ]}
                                >
                                    Next
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('driverLogin')}
                            style={[
                                styles.signIn,
                                {
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    marginTop: 15
                                }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.textSign,
                                    {
                                        color: 'black'
                                    }
                                ]}
                            >
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b22222'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: 'black',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: 'black'
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    signInn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        opacity: 0.8,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'black'
    }
})
