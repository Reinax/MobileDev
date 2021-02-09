// Reviews.js
import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default Review = () => {
   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Reviews</Text>
      <Button
        title="Go to Reviews... again"
        onPress={() => navigation.push('Reviews')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('HomeScreen')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}