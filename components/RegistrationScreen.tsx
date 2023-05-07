import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, Dialog, Portal, Provider } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import styles from './StyleSheet';

export default function RegistrationScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const register = async () => {
    if (password.length < 7) {
      showDialog();
      return;
    }

    if (password !== confirmPassword) {
      showDialog();
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Login');
      showDialog();
    } catch (error) {
      showDialog();
    }
  };

  return (
    <Provider>
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
          labelStyle={{ fontSize: 16 }}>
          Register
        </Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text>
                {password.length < 7
                  ? 'Password must be at least 7 characters long.'
                  : 'Passwords do not match.'}
              </Text>
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
