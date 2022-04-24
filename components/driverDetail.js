import React, { useState, Component } from 'react'
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
    Image,
    Alert
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import DatePicker from 'react-native-datepicker'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import tw from 'tailwind-react-native-classnames'
import { useTheme } from 'react-native-paper'

import app from '../firebase'
import { child, get, getDatabase, ref, set } from 'firebase/database'
import { getDownloadURL, getStorage, ref as sRef, uploadBytes } from 'firebase/storage';
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification
} from '@firebase/auth'
const auth = getAuth()

const driverDetail = ({ route, navigation }) => {
    const S_data = route.params
    const dbref = getDatabase(app)
    const [url, setUrl] = useState();
    const [date1, setDate] = useState(null)
    const [image, setImage] = useState(null)
    const [Organization, setOrganization] = useState('Select Organization')
    const [AmbulanceType, setAmbulanceType] = useState('Select Ambulance Type')
    const [data, setData] = React.useState({
        drivername: '',
        contact: '',
        license_no: '',
        ambulance_no: '',
        cnic: '',
        address: '',
        secureTextEntry: true,
        confirm_secureTextEntry: true,

        isValidName: false,
        isValidContact: false,
        isValidLicenceNo: false,
        isValidAmbulanceNo: false,
        isValidCnic: false,
        isValidAddress: false
    })
    var count = 1

    function Signup() {
        console.log(data)
        createUserWithEmailAndPassword(auth, S_data.email, S_data.password)
            .then(userCredential => {
                console.log('Account created')
                Alert.alert('Sign Up Successfully', null, [{ text: 'Okay' }])
                navigation.navigate('driverlogin');
                sendEmailVerification(auth.currentUser, auth.applyActionCode).then(
                    () => {
                    }
                )
            }, null)
            .catch(error => {
                console.log(error)
                Alert.alert('Error', error.message, [{ text: 'Okay' }])
            })
    }

    function submitrecord() {
        data.Organization = Organization
        data.AmbulanceType = AmbulanceType
        data.DOB = date1
        const Name = data.drivername
        const Contact = data.contact
        const LicNo = data.license_no
        const AmbNo = data.ambulance_no
        const Image = url;
        const Cnic = data.cnic
        const Email = S_data.email
        const Address = data.address
        const DOB = data.DOB

        set(ref(dbref, 'DriverRecord/' + Cnic), {
            Name,
            Contact,
            LicNo,
            AmbNo,
            Image,
            Cnic,
            Address,
            DOB,
            Organization,
            AmbulanceType
        })
        Signup()
    }

    const { colors } = useTheme()
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.cancelled) {
            setImage(result.uri)

            const storage = getStorage();
            const storageRef = sRef(storage, 'Images/' + data.cnic);
            const img = await fetch(result.uri);
            const bytes = await img.blob();
            await uploadBytes(storageRef, bytes).then((x) => {
                getDownloadURL(storageRef).then((x) => {
                    setUrl(x);
                })
            });
            console.log(url);
        }
    }

    const handleDriverUsername = val => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                drivername: val,
                isValidName: true
            })
        } else {
            setData({
                ...data,
                drivername: val,
                isValidName: false
            })
        }
    }

    const handleDriverContact = val => {
        if (val.trim().length >= 11) {
            setData({
                ...data,
                contact: val,
                isValidContact: true
            })
        } else {
            setData({
                ...data,
                contact: val,
                isValidContact: false
            })
        }
    }

    const handleDriverLicenseno = val => {
        if (val.trim().length >= 11) {
            setData({
                ...data,
                license_no: val,
                isValidLicenceNo: true
            })
        } else {
            setData({
                ...data,
                license_no: val,
                isValidLicenceNo: false
            })
        }
    }

    const handleDriverAmbulanceno = val => {
        if (val.trim().length >= 5) {
            setData({
                ...data,
                ambulance_no: val,
                isValidAmbulanceNo: true
            })
        } else {
            setData({
                ...data,
                ambulance_no: val,
                isValidAmbulanceNo: false
            })
        }
    }

    const handleDriverCnic = val => {
        if (val.trim().length >= 13) {
            setData({
                ...data,
                cnic: val,
                isValidCnic: true
            })
        } else {
            setData({
                ...data,
                cnic: val,
                isValidCnic: false
            })
        }
    }

    const handleDriverAddress = val => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                address: val,
                isValidAddress: true
            })
        } else {
            setData({
                ...data,
                address: val,
                isValidAddress: false
            })
        }
    }

    function validateInputs() {
        if (
            data.drivername.length == 0 ||
            data.contact.length == 0 ||
            data.license_no.length == 0 ||
            data.ambulance_no.length == 0 ||
            data.cnic.length == 0 ||
            data.address.length == 0 ||
            Organization.length == 19 ||
            AmbulanceType.length == 21 ||
            date1 == null ||
            image == null ||
            !data.isValidName ||
            !data.isValidAddress ||
            !data.isValidCnic ||
            !data.isValidContact ||
            !data.isValidLicenceNo ||
            !data.isValidAmbulanceNo
        ) {
            Alert.alert('ERROR!', 'Empty Field or Wrong Input.', [{ text: 'Okay' }])
            return
        } else {
            submitrecord()
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#b22222' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>Personal Information</Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <ScrollView>
                    {/* username of driver */}
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                color: colors.text
                            }
                        ]}
                    >
                        Driver Name
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color={colors.text} size={20} />
                        <TextInput
                            placeholder='Your Name'
                            placeholderTextColor='#666666'
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text
                                }
                            ]}
                            autoCapitalize='none'
                            onChangeText={val => handleDriverUsername(val)}
                            onEndEditing={e => handleDriverUsername(e.nativeEvent.text)}
                        />
                        {data.isValidName ? (
                            <Animatable.View animation='bounceIn'>
                                <Feather name='check-circle' color='black' size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>
                    {data.isValidName || data.drivername.length == 0 ? null : (
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>
                                Username must be 4 characters long.
                            </Text>
                        </Animatable.View>
                    )}

                    {/* contact of driver */}
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Contact
                    </Text>
                    <View style={styles.action}>
                        <Feather name='phone' color='black' size={20} />
                        <TextInput
                            placeholder='Your Number'
                            placeholderTextColor='#666666'
                            keyboardType={'phone-pad'}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text
                                }
                            ]}
                            autoCapitalize='none'
                            onChangeText={val => handleDriverContact(val)}
                            onEndEditing={e => handleDriverContact(e.nativeEvent.text)}
                        />
                        {data.isValidContact ? (
                            <Animatable.View animation='bounceIn'>
                                <Feather name='check-circle' color='black' size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>
                    {data.isValidContact || data.contact.length == 0 ? null : (
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>
                                Contact must be 11 digit long.
                            </Text>
                        </Animatable.View>
                    )}

                    {/* Image of License */}
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'center',
                            marginTop: 25
                        }}
                    >
                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 200, height: 200 }}
                            />
                        )}
                    </View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        License Image
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome name='image' color='black' size={20} />
                        <View style={{ flex: 2 }}>
                            <TouchableOpacity
                                style={[styles.btnCover, { marginBottom: 15 }]}
                                onPress={pickImage}
                            >
                                <Text style={[styles.btn, tw`pl-10 pr-10 `]}>Browse</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* License No of Driver */}
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        License No
                    </Text>
                    <View style={styles.action}>
                        <Feather name='truck' color='black' size={20} />
                        <TextInput
                            placeholder='Ambulance License No'
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text
                                }
                            ]}
                            autoCapitalize='none'
                            onChangeText={val => handleDriverLicenseno(val)}
                            onEndEditing={e => handleDriverLicenseno(e.nativeEvent.text)}
                        />
                        {data.isValidLicenceNo ? (
                            <Animatable.View animation='bounceIn'>
                                <Feather name='check-circle' color='black' size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>
                    {data.isValidLicenceNo || data.license_no.length == 0 ? null : (
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>
                                License No must be 11 digit long.
                            </Text>
                        </Animatable.View>
                    )}

                    {/* Ambulance No of Driver */}
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Ambulance Number
                    </Text>
                    <View style={styles.action}>
                        <Feather name='truck' color='black' size={20} />
                        <TextInput
                            placeholder='Ambulance Number'
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text
                                }
                            ]}
                            autoCapitalize='none'
                            onChangeText={val => handleDriverAmbulanceno(val)}
                            onEndEditing={e => handleDriverAmbulanceno(e.nativeEvent.text)}
                        />
                        {data.isValidAmbulanceNo ? (
                            <Animatable.View animation='bounceIn'>
                                <Feather name='check-circle' color='black' size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>
                    {data.isValidAmbulanceNo || data.ambulance_no.length == 0 ? null : (
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>
                                Ambulance No must be at least 5 characters long.
                            </Text>
                        </Animatable.View>
                    )}

                    {/* CNIC of Driver */}
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Your CNIC
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome name='flag' color='black' size={20} />
                        <TextInput
                            placeholder='CNIC'
                            keyboardType={'phone-pad'}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text
                                }
                            ]}
                            autoCapitalize='none'
                            onChangeText={val => handleDriverCnic(val)}
                            onEndEditing={e => handleDriverCnic(e.nativeEvent.text)}
                        />
                        {data.isValidCnic ? (
                            <Animatable.View animation='bounceIn'>
                                <Feather name='check-circle' color='black' size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>
                    {data.isValidCnic || data.cnic.length == 0 ? null : (
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>CNIC must be 13 digit long.</Text>
                        </Animatable.View>
                    )}

                    {/* Address of Driver */}
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Your Address
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome name='home' color='black' size={20} />
                        <TextInput
                            placeholder='Your Address'
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text
                                }
                            ]}
                            autoCapitalize='none'
                            onChangeText={val => handleDriverAddress(val)}
                            onEndEditing={e => handleDriverAddress(e.nativeEvent.text)}
                        />
                        {data.isValidAddress ? (
                            <Animatable.View animation='bounceIn'>
                                <Feather name='check-circle' color='black' size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>
                    {data.isValidAddress || data.address.length == 0 ? null : (
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Must have Valid Address.</Text>
                        </Animatable.View>
                    )}

                    {/* DOB of Driver */}
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Your DOB
                    </Text>
                    <View style={styles.action}>
                        <DatePicker
                            style={{
                                alignSelf: 'center',
                                width: '86%',
                                paddingTop: 7,
                                paddingBottom: 7,
                            }}
                            date={date1}
                            mode='date'
                            placeholder='Date of Birth'
                            format='DD-MM-YYYY'
                            minDate='01-01-1970'
                            maxDate='31-12-2005'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={date => {
                                setDate(date)
                            }}
                        />
                    </View>

                    {/* Organization of Driver */}
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Your Organization
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            paddingBottom: 5
                        }}
                    >
                        <Picker
                            selectedValue={Organization}
                            onValueChange={itemValue => setOrganization(itemValue)}
                        >
                            <Picker.Item
                                label='Select Organization'
                                style={{ fontSize: 18, fontWeight: 'bold' }}
                                value='Select Organization'
                            />

                            <Picker.Item
                                label='Private'
                                style={{ fontSize: 18 }}
                                value='Private'
                            />
                            <Picker.Item
                                label='Public'
                                style={{ fontSize: 18 }}
                                value='Public'
                            />
                        </Picker>
                    </View>

                    {/* AmbulanceType of Driver */}
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Your Ambulance Type
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            paddingBottom: 5
                        }}
                    >
                        <Picker
                            selectedValue={AmbulanceType}
                            onValueChange={itemValue => setAmbulanceType(itemValue)}
                        >
                            <Picker.Item
                                label='Select Ambulance Type'
                                style={{ fontSize: 18, fontWeight: 'bold' }}
                                value='Select Ambulance Type'
                            />
                            <Picker.Item
                                label='Bolan'
                                style={{ fontSize: 18 }}
                                value='Bolan'
                            />

                            <Picker.Item
                                label='Faw XPV'
                                style={{ fontSize: 18 }}
                                value='Faw XPV'
                            />
                            <Picker.Item
                                label='Hiace'
                                style={{ fontSize: 18 }}
                                value='Hiace'
                            />
                            <Picker.Item
                                label='Rescue 1122'
                                style={{ fontSize: 18 }}
                                value='Rescue 1122'
                            />
                            <Picker.Item
                                label='EDHI'
                                style={{ fontSize: 18 }}
                                value='EDHI'
                            />
                        </Picker>
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
                        <TouchableOpacity style={styles.signIn} onPress={validateInputs}>
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
                                    Sign Up
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
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
                                Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    )
}

export default driverDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b22222'
    },
    btn: {
        fontSize: 15,
        padding: 10,
        color: '#fff'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    input: {
        fontSize: 18,
        borderRadius: 10,
        margin: 18,
        elevation: 2
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: 'black'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14
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
        color: '#05375a'
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
    },
    btnCover: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 25,
        margin: 15,
        marginBottom: 30,
        elevation: 3,
        backgroundColor: '#000'
    }
})