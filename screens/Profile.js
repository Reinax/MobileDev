import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, View, Button, ToastAndroid} from 'react-native';
import { global_styles } from '../GblStyle/GlobalStyle';

class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      token: ''
    }
}

componentDidMount() {
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
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

userData = async() => {
  let token = await AsyncStorage.getItem('@user_id');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + token, {
    method: 'get',
    headers: {
      'X-Authorization': token
    }
  })

  .then((response) => {
    if(response.status === 200){

    } else if(response.status === 401){
      throw 'Unauthorised'
    } else if(response.status === 404){
      throw 'Not found'
    } else {
      throw 'something went wrong'
    }
  })
  .catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
  })
}

  render() {
    return (
      <View style={global_styles.background}>
        <Text></Text>
        <Text>Change Password</Text>
        <TextInput 
          placeholder="Change password..."
          secureTextEntry
        />
        <Text>Yet to be Edited!</Text>
        <Button
          title="Logout"
          onPress={() => this.logout()}
        />
      </View>
    );
  }
}

export default Profile;