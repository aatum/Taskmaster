import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Title, Text, TextInput, Dialog, Portal, Provider } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import styles from './StyleSheet';

export default function LoginScreen({ navigation, onLoginSuccess }: { navigation: any, onLoginSuccess: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleLogin = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user.email);
      onLoginSuccess(true);
    } catch (error) {
      console.log('Error logging in:', error);
      showDialog();
    }
  };

  const handleRegistration = () => {
    navigation.navigate('Registration');
  };

  const getCurrentDate = () => {
    const dateObj = new Date();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.getDate();
    let dayStr;
    switch (day) {
      case 1:
      case 21:
      case 31:
        dayStr = day + 'st';
        break;
      case 2:
      case 22:
        dayStr = day + 'nd';
        break;
      case 3:
      case 23:
        dayStr = day + 'rd';
        break;
      default:
        dayStr = day + 'th';
        break;
    }
    const year = dateObj.getFullYear();
    return `${month} ${dayStr}, ${year}`;
  };


  const currentDate = getCurrentDate();


  return (
    <Provider>
      <View style={styles.container}>
      <Text style={styles.dateText}>{currentDate}</Text>
      <Title>Welcome to Taskmaster!</Title>
        <TextInput
          style={styles.inputContainer}
          onChangeText={setEmail}
          value={email}
          keyboardType='email-address'
          label='Email'
        />
        <TextInput
          style={styles.inputContainer}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          label='Password'
        />
        <View style={styles.buttonContainer}>
          <Button
            mode='contained'
            onPress={handleLogin}
            style={[styles.button, { marginRight: 5 }]}
            labelStyle={{ fontSize: 16 }}>
            Login
          </Button>
          <Button
            mode='contained'
            onPress={handleRegistration}
            style={[styles.button, { marginLeft: 5 }]}
            labelStyle={{ fontSize: 16 }}>
            Register
          </Button>
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Text>Failed to login. Please check your email and password.</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};
