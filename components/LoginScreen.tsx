import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Button, Title, Text } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import styles from './StyleSheet';

  export default function LoginScreen({ navigation, onLoginSuccess }: { navigation: any, onLoginSuccess: any }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user.email);
      onLoginSuccess(true);
    } catch (error) {
      console.log('Error logging in:', error);
      Alert.alert('Error', 'Failed to login. Please check your email and password.');
    }
  };

  const handleRegistration = () => {
    navigation.navigate('Registration');
  };

  return (
    
    <View style={styles.container}>
        <Title>Taskmaster</Title>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder='Email'
        autoComplete='email'
        keyboardType='email-address'
      />
      <TextInput
        style={styles.inputContainer}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder='Password'
        secureTextEntry={true}
      />
    <View style={styles.buttonContainer}>
        <Button
        mode='contained'
        onPress={handleLogin}
        style={styles.button}
        labelStyle={{ fontSize: 16 }}>
        Login
      </Button>
      <Button
        mode='contained'
        onPress={handleRegistration}
        style={styles.button}
        labelStyle={{ fontSize: 16 }}>
        Register
      </Button>
    </View>
    </View>
  );
};

