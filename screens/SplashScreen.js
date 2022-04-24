import React from 'react'
import {
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>

            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: "center",
                    //flex: 1,
                    paddingTop: 40
                }}> Book An Ambulance</Text>
            </View>

            <View style={{ flex: 4, justifyContent: "center" }}>
                <ImageBackground source={require('../assets/splash2.gif')} resizeMode="contain" style={styles.image}>
                </ImageBackground>

            </View>

            <View style={{ flex: 1, justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("registernumber")}
                    style={styles.Button1}>
                    <Text style={styles.TextStyle}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default SplashScreen
const styles = StyleSheet.create({
    image: {
        flex: 20,
        justifyContent: "center",
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    Button1: {
        marginTop: 55,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#00BCD4',
        //backgroundColor: "#000",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        color: '#fff',
        textAlign: "center",
    },
})
