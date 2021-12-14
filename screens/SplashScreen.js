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
        <View style={tw`bg-white h-full p-2`}>
            <Image
                style={{
                    width: 150,
                    height: 150,
                    resizeMode: "contain",
                }}
                source={require('../assets/1.jpeg')}
            />
            <ImageBackground source={require('../assets/splash2.gif')} resizeMode="contain" style={styles.image}>
            </ImageBackground>
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
                style={styles.Button1}>
                <Text style={styles.TextStyle}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    Button1: {
        marginTop: 5,
        marginBottom: 20,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
})
