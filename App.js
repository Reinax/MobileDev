import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import Profile from './screens/Profile';

navigator.geolocation = require('@react-native-community/geolocation');
const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => (
    <Tab.Navigator
    initialRouteName="Home Screen"
    tabBarOptions={{
      activeTintColor: '#e91e63',
    }}
    >
      <Tab.Screen name="Home Screen" component={HomeScreen}
        options={{
          title: 'Home Screen',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
);


const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignIn} options={{ title: 'Sign in' }}/>
          <Stack.Screen name="Create Account" component={CreateAccount} options={{ title: 'Create Account' }}/>
          <Stack.Screen name="Home Screen" component={BottomTab} options={{ headerShown: false}}/>
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
