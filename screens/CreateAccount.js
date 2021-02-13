// CreateAccount.js
import React from 'react';
import {StyleSheet, View, Button, TextInput, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CreateAccount extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }
  }

  createAccount = async () => {
    //Validation here...
    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
        if(response.status === 201){
          return response.json()
        } else if(response.status === 400){
          throw 'Bad Request';
        } else {
          throw 'something went wrong.';
        }
    })
    .then(async (responseJson) => {
      console.log(responseJson);
      await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id));
      this.props.navigation.navigate("SignIn");
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput 
          placeholder="Enter First Name..."
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
        />
        <TextInput 
          placeholder="Enter Last Name..."
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.last_name} 
        />
        <TextInput 
          placeholder="Example@gmail.com..."
          onChangeText={(email) => this.setState({email})}
          value={this.state.email} 
        />
        <TextInput 
          placeholder="Enter your password..."
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry
        />

        <Button 
        title="Create Account" 
        onPress={() => this.createAccount()} 
        />
        <Button
          title="Back to Sign In" 
          onPress={() => this.props.navigation.navigate('Sign In')}
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