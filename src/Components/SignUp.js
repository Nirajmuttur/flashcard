import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Provider/AuthContext';

const SignUp = () => {
    const { handleCreateAccount, loading } = useAuth();
    const navigation = useNavigation();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handleInputChange = (name, value) => {
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (values) => {
        try {
            const { email, password, name } = values;
            const response = await handleCreateAccount(email, password, name);
            Alert.alert('Account created', `Welcome, ${name}`);
            navigation.navigate('LoginScreen');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Create Account</Text>

            <Formik
                initialValues={{ email: '', password: '', name: '', confirmPassword: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.inputContainer}>
                            <Icon name="user" size={20} color="#888" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="User Name"
                                value={values.name}
                                placeholderTextColor="#888"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                            />
                        </View>
                        {touched.name && errors.name && (
                            <Text style={styles.errorText}>{errors.name}</Text>
                        )}

                        <View style={styles.inputContainer}>
                            <Icon name="envelope" size={20} color="#888" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={values.email}
                                placeholderTextColor="#888"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
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
                                value={values.password}
                                placeholderTextColor="#888"
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                        </View>
                        {touched.password && errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}

                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={20} color="#888" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                value={values.confirmPassword}
                                placeholderTextColor="#888"
                                secureTextEntry
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                            />
                        </View>
                        {touched.confirmPassword && errors.confirmPassword && (
                            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                        )}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
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
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 20,
        marginLeft: 10,
        marginBottom:0
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
        marginTop: 30,
        marginRight: 20,
        marginLeft: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginLeft: 15,
    },
});

export default SignUp;
