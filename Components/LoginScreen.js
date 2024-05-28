// screens/SignInScreen.js
import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign in to BrightCard</Text>
      </View>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Log in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Log in with Apple</Text>
      </TouchableOpacity>
      <Text style={styles.or}>or</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <View style={styles.rememberMeRow}>
        <TouchableOpacity style={styles.checkbox} />
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.link}>Reset password</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>No account? Create one</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  socialButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  socialButtonText: {
    fontSize: 16,
  },
  or: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#aaa',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  rememberMeText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    color: '#4a90e2',
    marginBottom: 10,
  },
});
