/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import { View, TextInput, Button, } from 'react-native'

class App extends Component {

   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
   }
   handleClick() {
      alert("Hello");
   }

   render() {
      return (
         <View>
            <TextInput
            style = {{height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
            <Button 
               onClick={this.handleClick}
               title = "add"
            />
         </View>
      )
   }
}

export default App
