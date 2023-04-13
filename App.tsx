import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
//import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import OpeningScreen from './components/OpeningScreen';
import TaskListScreen from './components/TaskScreen';
import TaskListPage from './components/ShowTasks';
import Ionicons from '@expo/vector-icons/Ionicons';

//const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen name='Home'
           component={OpeningScreen}
           options={{
            tabBarIcon: ({focused}) => (
              <Ionicons name={focused ? 'home' : 'home-outline'}
               size={26} 
               color='black'
              />
            ),
           }}  
           />
          <Tab.Screen name='Add Task'
           component={TaskListScreen}
           options={{
            tabBarIcon: ({focused}) => (
              <Ionicons name={focused ? 'add' : 'add-outline'}
              size={26}
              color='black'
              />
             ),
            }} 
            />
          <Tab.Screen name='Task List'      
           component={TaskListPage} 
           options={{
            tabBarIcon: ({focused}) => (
              <Ionicons name={focused ? 'list' : 'list-outline'}
              size={26}
              color='black'
              />
             ),
            }} 
           />
          </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style='auto' />
    </PaperProvider>
  );
}
