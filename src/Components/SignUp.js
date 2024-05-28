import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,Alert} from 'react-native';
import {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
const SignUp = () => {
    const [user, setUser] = useState({
        email:'',
        password:'',
        confirmPassword:''
    })
    const handleInputChange=(name,e)=>{
        setUser({...user,[name]:e})
    }
    const handleSubmit = async () => {
        if (!user.email || !user.password) {
          Alert.alert('Validation Error', 'Email and Password are required.');
          return;
        }
        if(user.password != user.confirmPassword){
            Alert.alert('Validation Error', 'Passwords are not matching')
        }
    
        try {
          const res = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/create`, user);
          if (res.status === 200) {
            Alert.alert('Account Created Successfully');
            navigation.navigate('LoginScreen');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Login Failed', 'Something went wrong');
        }
      };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Create Account</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
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