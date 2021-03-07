import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';


import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import Profile from './screens/Profile';
import settingsScreen from './screens/settingsScreen';

navigator.geolocation = require('@react-native-community/geolocation');



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
          <Stack.Screen name="settingsScreen" component={settingsScreen} options={{ title: 'Settings'}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

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
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default App;
