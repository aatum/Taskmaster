import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import styles from './StyleSheet';

const TaskListPage = () => {
  const [tasks, setTasks] = useState<{ name: string }[]>([]);

  // Fetch the tasks from Firebase
  const fetchTasks = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const tasksRef = ref(database, 'tasks');
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTasks(Object.values(data));
        }
      });
    } catch (error) {
      console.log('ERROR!', error);
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
        </DataTable.Header>
        {tasks.map((task, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{task.name}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

export default TaskListPage;
