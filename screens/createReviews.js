import React from 'react';
import {Button, View, Text, TextInput} from 'react-native';

  class Review extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        overall_rating: "",
        price_rating: "",
        quality_raiting: "",
        clenliness_rating: "",
        review_body: ""
      }
    }


    createReview = async () => {
      //Validation here...
      let LocID = await AsyncStorage.getItem('@locationID');
      let token = await AsyncStorage.getItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + LocID +"review", {
        method: 'post',
        headers: {
            'X-Authorization': value,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then((response) => {
          if(response.status === 201){
            return response.json()
          } else if(response.status === 400){
            throw 'Bad Request';
          } else if(response.status === 401){
            throw 'Unauthorised';
          } else if(response.status === 404){
            throw 'Not Found';
          } else {
            throw 'something went wrong.';
          }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })
    }

    render() {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text></Text>
          <TextInput
            placeholder = "Overall rating"
            onChangeText={(overall_rating) => this.setState({overall_rating})}
            value={this.state.overall_rating}
          ></TextInput>
          <TextInput
            placeholder = "Price Rating"
            onChangeText={(price_rating) => this.setState({price_rating})}
            value={this.state.price_rating}
          ></TextInput>
          <TextInput
            placeholder = "Quality rating"
            onChangeText={(quality_raiting) => this.setState({quality_raiting})}
            value={this.state.quality_raiting}
          ></TextInput>
          <TextInput
            placeholder = "Clenliness rating"
            onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
            value={this.state.clenliness_rating}
          ></TextInput>
          <TextInput
            placeholder = "Description of Experience"
            onChangeText={(review_body) => this.setState({review_body})}
            value={this.state.review_body}
          ></TextInput>
          <Button
            title = "Submit Review"
            onPress={() =>
              this.props.navigation.navigate('Home Screen')
            }
          />
        </View>
      );
    }
}

export default Review;