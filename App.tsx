import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider as PaperProvider, DefaultTheme, MD2DarkTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import OpeningScreen from './components/OpeningScreen';
import TaskListScreen from './components/AddTask';
import TaskListPage from './components/ShowTasks';
import RegistrationScreen from './components/RegistrationScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function onLoginSuccess() {
    setLoggedIn(true);
  }

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...MD2DarkTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };

  function TabScreen() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={OpeningScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={26}
                color='black'
              />
            ),
          }}
        />
        <Tab.Screen
          name='Add Task'
          component={TaskListScreen}
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
          listeners={({  }) => ({
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
              options={{ title: 'Login' }}
            >
              {(props) => (
                <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name='Registration'
              component={RegistrationScreen}
              options={{ title: 'Registration' }}
            />
          </Stack.Navigator>
        )}
        <StatusBar style='auto' />
      </NavigationContainer>
    </PaperProvider>
  );
}
