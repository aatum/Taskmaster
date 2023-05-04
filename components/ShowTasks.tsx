import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { DataTable, IconButton } from 'react-native-paper';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import styles from './StyleSheet';
import Ionicons from '@expo/vector-icons/Ionicons';

const TaskListPage = () => {
  const [tasks, setTasks] = useState<{ name: string; priority: string; key: string }[]>([]);

  const fetchTasks = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const tasksRef = ref(database, 'tasks');
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tasksWithKeys = Object.entries(data).map(([key, value]) => ({
            ...value as { name: string; priority: string },
            key,
          }));
          
          setTasks(tasksWithKeys);
        }
      });
    } catch (error) {
      console.log('ERROR!', error);
    }
  };

  const deleteTask = async (key: string) => {
    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const taskRef = ref(database, `tasks/${key}`);
      await remove(taskRef);
      console.log(`Task with key ${key} was successfully deleted.`);
      setTasks(tasks.filter((task) => task.key !== key));
    } catch (error) {
      console.error(`Error deleting task with key ${key}:`, error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.taskListContainer}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Task Name</DataTable.Title>
          <DataTable.Title>Priority</DataTable.Title>
        </DataTable.Header>
        {tasks.map((task) => (
          <DataTable.Row key={task.key}>
            <DataTable.Cell style={{ flex: 2.0 }}>{task.name}</DataTable.Cell>
            <DataTable.Cell>{task.priority}</DataTable.Cell>
            <DataTable.Cell>
              <IconButton
                icon={() => <Ionicons name='trash-outline' size={24} color='black' />}
                onPress={() => deleteTask(task.key)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
        }

export default TaskListPage;