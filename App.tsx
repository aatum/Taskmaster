import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import TaskListPage from './components/ShowTasks';
import RegistrationScreen from './components/RegistrationScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddTaskPage from './components/AddTask';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function onLoginSuccess() {
    setLoggedIn(true);
  }

  function TabScreen() {
    return (
      <>
        <Appbar.Header style={{ backgroundColor: '#663399' }}>
          <Appbar.Content title='Taskmaster' color='white' />
        </Appbar.Header>
        <Tab.Navigator>
          <Tab.Screen
            name='Add Task'
            component={AddTaskPage}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? 'add' : 'add-outline'}
                  size={26}
                  color='black'
                />
              ),
            }}
          />
          <Tab.Screen
            name='Task List'
            component={TaskListPage}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? 'list' : 'list-outline'}
                  size={26}
                  color='black'
                />
              ),
            }}
          />
          <Tab.Screen
            name='Logout'
            listeners={({ }) => ({
              tabPress: (e) => {
                e.preventDefault();
                setLoggedIn(false);
              },
            })}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? 'log-out' : 'log-out-outline'}
                  size={26}
                  color='black'
                />
              ),
            }}
          >
            {(props) => (
              <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </>
    );
  }
  return (
    <PaperProvider>
      <NavigationContainer>
        {loggedIn ? (
          <Stack.Navigator>
            <Stack.Screen
              name='OpeningScreen'
              component={TabScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name='Login'
              options={{ title: 'Login',
              headerStyle: { backgroundColor: '#663399' },
              headerTitleStyle: { color: 'white' },
            }}
            >
              {(props) => (
                <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name='Registration'
              component={RegistrationScreen}
              options={{ title: 'Registration',          
              headerStyle: { backgroundColor: '#663399' },
              headerTitleStyle: { color: 'white' },
              }}
            />
            </Stack.Navigator>          
        )}
        <StatusBar style='auto' />
      </NavigationContainer>
    </PaperProvider>
  );
}
