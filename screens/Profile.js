import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Yet to be Edited!</Text>
        <Button
          title="Logout"
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
    justifyContent: 'space-around',
  },
});

export default Profile;

