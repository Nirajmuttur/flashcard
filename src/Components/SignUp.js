import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,Alert, ActivityIndicator} from 'react-native';
import {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import { createAccount } from '../service/authService';
import { useNavigation } from '@react-navigation/native'
const SignUp = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        email:'',
        password:'',
        name:'',
        confirmPassword:''
    })
    const handleInputChange=(name,e)=>{
        setUser({...user,[name]:e})
    }
    const handleCreateAccount = async () => {
        setIsLoading(true)
        try {
            const response = await createAccount(user.email, user.password, user.name);
            Alert.alert('Account created', `Welcome, ${response.name}`);
            navigation.navigate('LoginScreen')
        } catch (error) {
            Alert.alert('Error', error.message);
        }
        setIsLoading(false)
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Create Account</Text>
            <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#888" style={styles.icon} />
                <TextInput name="name" style={styles.input} placeholder="User Name" value={user.name} placeholderTextColor="#888" onChangeText={(e)=>handleInputChange('name',e)}/>
            </View>
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#888" style={styles.icon} />
                <TextInput name="email" style={styles.input} placeholder="Email" value={user.email} placeholderTextColor="#888" onChangeText={(e)=>handleInputChange('email',e)}/>
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#888" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Password" value={user.password} placeholderTextColor="#888" secureTextEntry onChangeText={(e)=>handleInputChange('password',e)}/>
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#888" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Confirm Password" value={user.confirmPassword} placeholderTextColor="#888" secureTextEntry onChangeText={(e)=>handleInputChange('confirmPassword',e)} />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                {
                    isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> :
                    <Text style={styles.buttonText}>Sign Up</Text>
                }
                
            </TouchableOpacity>
        </SafeAreaView>

    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#222831',
        marginBottom: 10,
        marginTop: 10,
        padding: 10
    },
    subtitle: {
        fontSize: 16,
        color: '#222831',
        marginBottom: 5,
        padding: 11
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        borderColor: '#222831',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 20,
        marginLeft: 10
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: '#222831',
        paddingRight: 10
    },
    button: {
        backgroundColor: '#00ADB5',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
        marginRight: 20,
        marginLeft: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orText: {
        color: '#222831',
        textAlign: 'center',
        marginBottom: 20,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
});