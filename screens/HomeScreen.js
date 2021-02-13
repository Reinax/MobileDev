import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {StyleSheet, Text, View, Button, ToastAndroid} from 'react-native';

class HomeScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: []
    }
}

componentDidMount() {
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
  });
  this.getData();
}

componentWillUnmount() {
  this.unsubscribe();
}

getData = async () => {
  const value = await AsyncStorage.getItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
        'headers': {
          'X-Authorization': value
        }
      })
      .then((response) => {
          if(response.status === 200){
              return response.json()
          } else if(response.status === 401) {
            ToastAndroid.show("You're not logged in", ToastAndroid.SHORT);
            this.props.navigation.navigate("SignIn");
          } else {
              throw 'Something went wrong!'
          }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          listData: responseJson
        })
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })
}

checkLoggedIn = async () => {
  const value = await AsyncStorage.getItem('@session_token');
  if (value == null) {
      this.props.navigation.navigate('SignIn');
  }
}


  render() {
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <Text>Yet to be Edited!</Text>

          <Button
          title = "Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default HomeScreen;
