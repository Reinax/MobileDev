// CreateAccount.js
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class CreateAccount extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Enter Email Address</Text>
        <TextInput
          placeholder="Example@gmail.com"
        ></TextInput>
        <Text>Enter Password</Text>
        <TextInput
        placeholder="***********"
        ></TextInput>
        <Button
          title="Create Account"  
          onPress={() =>
           alert("todo!")
          }
        />
        
        <Button
          title="Back to Sign In"
          onPress={() =>
            this.props.navigation.navigate('Sign In')
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


export default CreateAccount;