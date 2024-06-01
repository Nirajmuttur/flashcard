import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { checkEmailVerification, login, logout } from '../service/authService';
import { useNavigation } from '@react-navigation/native'
export default function LoginScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handleInputChange = (name, e) => {
    setUser({ ...user, [name]: e })
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await login(user.email, user.password);

      const isEmailVerified = await checkEmailVerification();
      if (!isEmailVerified) {
        Alert.alert('Email not verified', 'Please verify your email before logging in.');
        await logout(); 
      } else {
        navigation.navigate('MainTabNavigator');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" onChangeText={(e) => handleInputChange('email', e)} />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry onChangeText={(e) => handleInputChange('password', e)} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        {
          isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> :
            <Text style={styles.buttonText}>Sign in</Text>
        }

      </TouchableOpacity>
      <Text style={styles.orText}>Or Sign in with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#DB4437' }]}>
          <Icon name="google" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
