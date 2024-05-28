import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

export default function BookMarkScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Bookmarks</Text>
            <View style={styles.content}>
                <Text style={styles.placeholderText}>No bookmarks yet.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#333333',
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 18,
        color: '#666666',
    },
});
