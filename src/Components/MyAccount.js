import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { useAuth } from './../Provider/AuthContext';
import { useNavigation } from '@react-navigation/native'
const MyAccount = () => {
    const { user, handleLogout, loading } = useAuth();
    const navigation = useNavigation();
    const handleLogoutPress = async () => {
        try {
            await handleLogout();
            Alert.alert('Success', 'You have been logged out.');
            navigation.navigate('SplashScreen')
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {user ? (
                <>
                    <View style={styles.profileContainer}>
                        <Image
                            source={require('./../../assets/Flashcard.png')}
                            style={styles.profileImage}
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>{user.name}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{user.email}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogoutPress}
                        disabled={loading}
                    >
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.message}>No user data available</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    detailsContainer: {
        width: '100%',
        marginBottom: 16,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#393E46',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#00ADB5',
    },
    logoutButton: {
        backgroundColor: '#00ADB5',
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 3,
        marginTop: 20,
    },
    logoutButtonText: {
        fontSize: 18,
        color: '#EEEEEE',
    },
    message: {
        fontSize: 18,
        color: 'gray',
    },
});

export default MyAccount;
