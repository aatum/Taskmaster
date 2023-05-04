import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Button, Title, Text } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import styles from './StyleSheet';

const RegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(`User registered successfully: ${userCredential.user.email}`);
    } catch (error) {
      console.log('Error registering user:', error);
      Alert.alert('Error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainer}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder='Password'
        secureTextEntry={true}
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)}
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

export default RegistrationScreen;
