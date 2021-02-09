/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import { View, TextInput, Text, Button, StyleSheet, Alert } from 'react-native';

class HomeScreen extends Component {

   constructor(props) {
      super(props);

   }


   render() {
      return (
         <View>
            <Text>Home Screen</Text>
            <Button
            title="About Me"
            onPress={() => this.props.navigation.navigate('About')}
            />
            <Button
            title="Additional Info"
            onPress={() => this.props.navigation.navigate('About')}
            />

         </View>
      )
   }
}

const styles = StyleSheet.create({

});

export default HomeScreen