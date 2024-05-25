import { StyleSheet, Text, View, Button, TouchableOpacity,Image} from 'react-native'
import {useEffect} from 'react'
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('LoginScreen');
          }, 2000);
    }, [])
    
    return (
        <View style={styles.container}>
             <Image source={require('./../assets/Flashcard_transparent.png')} style={styles.splashImage}/>
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
    splashImage:{
        height:350,
        width:200
    }
})