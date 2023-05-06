import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, Title, Text, TextInput } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import styles from './StyleSheet';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = async () => {
    if (password.length < 7) {
      Alert.alert('Password must be at least 7 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(`User registered successfully: ${userCredential.user.email}`);
      navigation.navigate('Login')
      Alert.alert('Registration successful!')
      
    } catch (error) {
      console.log('Error registering user:', error);
      Alert.alert('Failed to register user.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainer}
        onChangeText={setEmail}
        keyboardType='email-address'
        label='Email'
      />
      <TextInput
        style={styles.inputContainer}
        onChangeText={setPassword}
        secureTextEntry={true}
        label='Password'
      />
      <TextInput
        style={styles.inputContainer}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        label='Confirm Password'
      />
      <Button
        mode='contained'
        onPress={register}
        style={styles.button}
        labelStyle={{ fontSize: 16}}>
        Register
      </Button>    
    </View>
  );
};
