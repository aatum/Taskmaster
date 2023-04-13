import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from "firebase/app";
import styles from './StyleSheet';

const AddTaskPage = () => {
  const [taskName, setTaskName] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleAddTask = async () => {
    if (taskName === '') {
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const tasksRef = ref(database, 'tasks');
      const newTaskRef = push(tasksRef);
      await set(newTaskRef, { name: taskName });
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
