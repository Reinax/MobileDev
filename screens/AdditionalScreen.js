/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import { View, TextInput, Text, Button, StyleSheet, Alert } from 'react-native';

class AdditionalScreen extends Component {

   constructor(props) {
      super(props);

   }


   render() {
      return (
         <View>
            <Text>Additional Screen</Text>

            <Button
            title="Home Screen"
            onPress={() => this.props.navigation.navigate('About')}
            />
            <Button
            title="About Me"
            onPress={() => this.props.navigation.navigate('About')}
            />
         </View>
      )
   }
}

const styles = StyleSheet.create({

});

export default AdditionalScreen