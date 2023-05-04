import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Snackbar, RadioButton } from 'react-native-paper';
import { getDatabase, ref, push, set } from "firebase/database";
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from "firebase/app";
import styles from './StyleSheet';

const AddTaskPage = () => {
  const [taskName, setTaskName] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [priority, setPriority] = useState('low');

  const handleAddTask = async () => {
    if (taskName === '') {
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const tasksRef = ref(database, 'tasks');
      const newTaskRef = push(tasksRef);
      await set(newTaskRef, { name: taskName, priority });
      setTaskName('');
      setSnackbarVisible(true);
    } catch (error) {
      console.log('ERROR!', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label='Add task name'
          value={taskName}
          onChangeText={setTaskName}
          mode='outlined'
        />
      </View>
      <View style={{ marginBottom: 50 }}>
      <Text style={styles.radioHeader}>Choose priority:</Text>
        <RadioButton.Group onValueChange={newValue => setPriority(newValue)} value={priority}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton.Item label='Low' value='Low' />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton.Item label='Medium' value='Medium' />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton.Item label='High' value='High' />
          </View>
        </RadioButton.Group>
      </View>
      <Button
        mode='contained'
        onPress={handleAddTask}
        style={styles.button}
        labelStyle={{ fontSize: 16 }}
      >
        Add Task
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Task added successfully!
      </Snackbar>
    </View>
  );
};


export default AddTaskPage;
