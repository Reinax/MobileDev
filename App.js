import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class App extends Component{
  constructor(props){
    super(props);
  }

  render(){


    return(
    <View style = {styles.container}>
      <Text>Enter Email:</Text>
        <TextInput 
        style = {styles.input}
        placeholder='e.g User@hotmail.com'

        />
      <Text>Enter Password:</Text>
        <TextInput 
        style = {styles.input}
        placeholder='********'
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
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,

  }
 
});

export default App;