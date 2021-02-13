// Homescreen.js
import React from 'react';
import { StyleSheet, TextInput, View, Button, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignIn extends React.Component {
  constructor(props){
      super(props);

      this.state = {
        email: "",
        password: ""
      }
  }

  login = async () => {
    //Validation here...
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
        if(response.status === 200){
          return response.json()
        } else if(response.status === 400){
          throw 'Invalid email or password';
        } else {
          throw 'something went wrong';
        }
    })
    .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id));
        this.props.navigation.navigate("Home Screen");
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
        placeholder="Example@gmail.com..."
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
        style={{padding:5, borderWidth: 1, margin:5}}
        />
        <TextInput
        placeholder="Enter your password..."
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        secureTextEntry
        style={{padding:5, borderWidth: 1, margin:5}}

        
        />
        <Button 
          title="Sign in"
          onPress={() => this.login()}
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