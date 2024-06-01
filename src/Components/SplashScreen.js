
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from './../Provider/AurhContext'
import { useEffect } from 'react'
const SplashScreen = () => {
    const navigation = useNavigation();
    const { user, loading } = useAuth();
    useEffect(() => {
        if (user) {
            navigation.navigate('MainTabNavigator');
        }

    }, [user, navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('./../../assets/Flashcard_transparent.png')} style={styles.splashImage} />
            <TouchableOpacity style={styles.signin} onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.signinText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}>No account? Create one</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
    },
    splashImage: {
        height: 350,
        width: 200
    },
    signin: {
        backgroundColor: '#00ADB5',
        paddingHorizontal: 120,
        paddingVertical: 15,
        borderRadius: 25,
        elevation: 3,
        marginBottom: 20
    },
    signinText: {
        fontSize: 20,
        color: '#EEEEEE'
    },
    link: {
        fontSize: 16,
        textAlign: 'center',
        color: '#4a90e2',
        marginBottom: 10,
    },
})