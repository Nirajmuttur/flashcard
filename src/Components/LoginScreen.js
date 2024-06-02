import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Provider/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { checkEmailVerification } from '../service/authService';

const LoginScreen = () => {
    const { emailVerified,handleLogin, handleLogout, loading,handleVerification } = useAuth();
    const navigation = useNavigation();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });

    const handleLoginSubmit = async (values) => {
        const { email, password } = values;
        try {
            await handleLogin(email, password);
            if (!emailVerified) {
                Alert.alert('Email not verified', 'Please verify your email before logging in.');
            } else {
                navigation.navigate('MainTabNavigator');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleLoginSubmit}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.inputContainer}>
                            <Icon name="envelope" size={20} color="#888" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#888"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                        </View>
                        {touched.email && errors.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        )}

                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={20} color="#888" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#888"
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        {touched.password && errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                <Text style={styles.buttonText}>Sign in</Text>
                            )}
                        </TouchableOpacity>
                    </>
                )}
            </Formik>

            <Text style={styles.orText}>Or Sign in with</Text>
            <View style={styles.socialContainer}>
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#DB4437' }]}>
                    <Icon name="google" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#222831',
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#222831',
        marginBottom: 5,
        padding: 11,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        borderColor: '#222831',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 20,
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: '#222831',
        paddingRight: 10,
    },
    button: {
        backgroundColor: '#00ADB5',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
        marginRight: 20,
        marginLeft: 10,
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
    errorText: {
        fontSize: 12,
        color: 'red',
        marginBottom: 5,
        marginLeft: 10,
    },
});

export default LoginScreen;
