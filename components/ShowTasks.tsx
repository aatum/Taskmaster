import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { IconButton } from 'react-native-paper';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import styles from './StyleSheet';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';

const TaskListPage = () => {

  const [tasks, setTasks] = useState<{
    name: string;
    priority: string;
    date: string;
    time: string;
    key: string;
  }[]>([]);

  const [selectedTask, setSelectedTask] = useState<{
    name: string;
    priority: string;
    date: string;
    time: string;
    key: string;
  } | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchTasks = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const tasksRef = ref(database, `users/${user.uid}/tasks`);
        onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const tasksWithKeys = Object.entries(data).map(([key, value]) => {
              const { name, priority, time, date } = value as {
                name: string;
                priority: string;
                time: { hours: string; minutes: string };
                date: string;
              };

              return { name, priority, date, time: `${time.hours}:${time.minutes}`, key };
            });

            setTasks(tasksWithKeys);
          }
        });
      } else {
        console.log('User not authenticated');
      }
    } catch (error) {
      console.log('ERROR!', error);
    }
  };

  const deleteTask = async (key: string) => {
    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const taskRef = ref(database, `users/${user.uid}/tasks/${key}`);
        await remove(taskRef);
        console.log(`Task with key ${key} was successfully deleted.`);
        setTasks(tasks.filter((task) => task.key !== key));
      } else {
        console.log('User not authenticated');
      }
    } catch (error) {
      console.error(`Error deleting task with key ${key}:`, error);
    }
  };

  const openTaskDetails = (task: {
    name: string;
    priority: string;
    date: string;
    time: string;
    key: string;
  }) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderTaskItem = ({
    item,
  }: {
    item: {
      name: string;
      priority: string;
      date: string;
      time: string;
      key: string;
    };
  }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => openTaskDetails(item)}>
      <Text style={styles.taskName}>{item.name}</Text>
      <IconButton
        icon={() => <Ionicons name='trash-outline' size={24} color='black' />}
        onPress={() => deleteTask(item.key)}
      />
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.taskListContainer}>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.key}
      />
  
      <Modal isVisible={isModalVisible} style={styles.modalContainer}>
        {selectedTask && (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTask.name}</Text>
            <Text style={styles.modalSubtitle}>Priority: {selectedTask.priority}</Text>
            <Text style={styles.modalSubtitle}>Date: {selectedTask.date}</Text>
            <Text style={styles.modalSubtitle}>Time: {selectedTask.time}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
        }  
export default TaskListPage;
