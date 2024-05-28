import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const SignUp = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>SignUp</Text>
            </View>
        </SafeAreaView>

    )
}

export default SignUp

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#EEEEEE',

    }
})