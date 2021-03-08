import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, View, Button, ToastAndroid, ImageBackground} from 'react-native';
import { global_styles } from '../GblStyle/GlobalStyle';

class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      firstName: "",
      lastName: "",
      userEmail: "",
      password: ""
    }
}

logout = async () => {
  let token = await AsyncStorage.getItem('@session_token');
  await AsyncStorage.removeItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
    method: 'post',
    headers: {
      'X-Authorization': token
    }
  })

  .then((response) => {
    if(response.status === 200){
      ToastAndroid.show("Log Out Successful!", ToastAndroid.SHORT);
      this.props.navigation.navigate("Sign In");
    }else if(response.status === 401){
      ToastAndroid.show("You weren't even logged in...", ToastAndroid.SHORT);
      throw 'Request Unauthorised';
    } else {
      throw 'something went wrong.';
    }
  })
  .catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
  })
}

getUserData = async() => {
  let userID = await AsyncStorage.getItem('@user_id');
  let token = await AsyncStorage.getItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + userID, {
    method: 'get',
    headers: {
      'X-Authorization': token
    },
  })

  .then((response) => {
    if(response.status === 200){
      ToastAndroid.show("Data loaded.", ToastAndroid.SHORT);
      return response.json()
    } else if(response.status === 401){
      throw 'Unauthorised'
    } else if(response.status === 404){
      throw 'Not found'
    } else {
      throw 'something went wrong'
    }
  })
  .then((json) => {
    console.log(json);
    this.setState({
      firstName: json.first_name,
      lastName: json.last_name,
      userEmail: json.email
    });
  })
  .catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
  })
}

changeUserData = async() => {
  let userID = await AsyncStorage.getItem('@user_id');
  let token = await AsyncStorage.getItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + userID, {
    method: 'PATCH',
    headers: {
      'X-Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password:this.state.password})
  })

  .then((response) => {
    if(response.status === 200){
      ToastAndroid.show("Password Changed", ToastAndroid.SHORT);
    } else if(response.status === 400){
      throw 'Bad Request'
    }else if(response.status === 401){
      throw 'Unauthorised'
    }else if(response.status === 403){
      throw 'Forbidden'
    } else if(response.status === 404){
      throw 'Not found'
    } else {
      throw 'something went wrong'
    }
  })
  .then((json) => {
    console.log(json);
  })
  .catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
  })
}

componentDidMount() {
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
    this.getUserData();
  });
}

componentWillUnmount() {
  this.unsubscribe();
}

checkLoggedIn = async () => {
  const value = await AsyncStorage.getItem('@session_token');
  if (value !== null) {
      this.setState({token:value});
  } else {
      this.props.navigation.navigate("Sign In");
      this.setState({
        isLoading: false
      })
  }
}

  render() {
    if(this.state.isLoading){
    return (
        <View style={global_styles.background}>
          <ImageBackground source={require('B:/MobileDev/myProject/MobileDev/assets/coffeeProfile.jpeg')} style={{flex: 1}}>
            <View style={global_styles.profileContainer}>
              <Text style={global_styles.profileText}>Account First Name: {this.state.firstName}</Text>
              <Text style={global_styles.profileText}>Account Surname: {this.state.lastName}</Text>
              <Text style={global_styles.profileText}>Account Email: {this.state.userEmail}</Text>
              <TextInput 
                placeholder="Change password..."
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                secureTextEntry
              />
              <Button
                title="Change Password"
                onPress={() => this.changeUserData()}
              >

              </Button>
            </View>
            <View style={global_styles.buttonContainer}>
            <Button
              style={global_styles.buttonStyle}  
              title="Logout"
              onPress={() => this.logout()}
            />
            <Button
              style={global_styles.buttonStyle}  
              title="Settings"
              onPress={() =>
                this.props.navigation.navigate('settingsScreen')
              }
            />
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

export default Profile;