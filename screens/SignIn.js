// Homescreen.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

class SignIn extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Email</Text>
        <TextInput>Sign In Screen</TextInput>
        <Text>Password</Text>
        <TextInput>Sign In Screen</TextInput>

        <Button 
          title="Sign in"
          onPress={() =>
            alert("Todo!")
          }
          />
        <Button 
          title="Create Account"
          onPress={() =>
            this.props.navigation.navigate('Create Account')
          }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default SignIn;