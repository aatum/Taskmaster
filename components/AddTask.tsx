import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Snackbar, RadioButton } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { enGB, registerTranslation } from 'react-native-paper-dates';
registerTranslation('en-GB', enGB);
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getDatabase, ref, push, set } from 'firebase/database';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import styles from './StyleSheet';

const AddTaskPage = () => {
  const [taskName, setTaskName] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [priority, setPriority] = useState('low');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0 });
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [error, setError] = useState('');

  const handleAddTask = async () => {
  if (taskName === '' || priority === '' || date === null || time.hours === 0 || time.minutes === 0) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const tasksRef = ref(database, `users/${user.uid}/tasks`);
        const newTaskRef = push(tasksRef);
        await set(newTaskRef, { name: taskName, priority, date: date.toDateString(), time });
        setTaskName('');
        setSnackbarVisible(true);
        setError('');
      }
    } catch (error) {
    }
  };

  const onDismissSingle = () => {
    setOpen(false);
  };

  const onConfirmSingle = (params: { date: string }) => {
    setOpen(false);
    const selectedDate = new Date(params.date);
    setDate(selectedDate);
  };

  const onDismissTimePicker = () => {
    setTimePickerVisible(false);
  };

  const onConfirmTimePicker = (params: { hours: number; minutes: number }) => {
    setTime({ hours: params.hours, minutes: params.minutes });
    setTimePickerVisible(false);
  };

  return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              label='Add task name'
              value={taskName}
              onChangeText={setTaskName}
              mode='outlined'
            />
          </View>
          <View>
            <Text style={styles.radioHeader}>Choose priority:</Text>
            <RadioButton.Group onValueChange={setPriority} value={priority}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton.Item label='Low' value='low' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton.Item label='Medium' value='medium' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton.Item label='High' value='high' />
              </View>
            </RadioButton.Group>
            <View style={styles.space} />
          </View>
          <View style={{ marginBottom: -200 }}>
            <Button
              onPress={() => setOpen(true)}
              uppercase={false}
              mode='outlined'
            >
              Pick date
            </Button>
            <DatePickerModal
              locale='en-GB'
              mode='single'
              visible={open}
              onDismiss={onDismissSingle}
              date={date}
              onConfirm={({ date }) =>
                onConfirmSingle({ date: date?.toISOString().split('T')[0] ?? '' })
              }
            />
            <View style={styles.space} />
            <Button
              onPress={() => setTimePickerVisible(true)}
              uppercase={false}
              mode='outlined'
            >
              Pick time
            </Button>
            <TimePickerModal
              visible={timePickerVisible}
              onDismiss={onDismissTimePicker}
              onConfirm={onConfirmTimePicker}
              hours={time.hours}
              minutes={time.minutes}
            />
            <View style={styles.addTaskButtonContainer}>
              <Button
                mode='contained'
                onPress={handleAddTask}
                style={styles.button}
                labelStyle={{ fontSize: 16 }}
              >
                Add Task
              </Button>
            </View>
          </View>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
          >
            Task added successfully!
          </Snackbar>
          {error !== '' && (
            <Snackbar
              visible={true}
              onDismiss={() => setError('')}
              duration={3000}
            >
              {error}
            </Snackbar>
          )}
        </View>
      </SafeAreaProvider>
    );
          }
  export default AddTaskPage;
