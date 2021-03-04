// Homescreen.js
import React from 'react';
import { TextInput, View, Button, ToastAndroid, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { global_styles } from '../GblStyle/GlobalStyle';

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
        this.props.navigation.navigate('Home Screen');
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })

  }

  render() {
    return (
      <View style={global_styles.signInBackground}>
        <Text style={global_styles.logo}>Coffida</Text>
        <View style={global_styles.inputView}>
          <TextInput
            placeholder="Example@gmail.com..."
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            style={global_styles.inputText}
          />
        </View>
        <View style={global_styles.inputView}>
          <TextInput
            placeholder="Enter your password..."
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry
            style={global_styles.inputText}
          />
        </View>
        <Button
          style={global_styles.buttonStyle} 
          title="Sign in"
          onPress={() => this.login()}
        />
        <Button 
          style={global_styles.buttonStyle} 
          title="Create Account"
          onPress={() =>
            this.props.navigation.navigate('Create Account')
          }
        />
      </View>
    );
  }
}

export default SignIn;