import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import HomeScreen from './screens/HomeScreen';



const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sign In"
          component={SignIn}
        />
        <Stack.Screen
          name="Create Account"
          component={CreateAccount}
        />
        <Stack.Screen
          name="Home Screen"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

export default App;