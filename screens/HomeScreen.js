import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, ActivityIndicator, ToastAndroid, PermissionsAndroid, FlatList, TouchableOpacity, Button} from 'react-native';
import { global_styles } from '../GblStyle/GlobalStyle';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class HomeScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: "",
      coffeeData: [],
      isFavourite: false,
      favouriteLocs: [],
      locReviews: [],
      favLocationIDs: [],
      likedLocations: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
    this.requestLocationPermission();
    this.getData();
    this.findLocations();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async requestLocationPermission(){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Lab04 Location Permission',
          message:
            'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }


  findCoordinates = () => {
  if(!this.state.locationPermission){
    this.state.locationPermission = requestLocationPermission();
    Geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      (error) => {
        Alert.alert(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
      );
    }
  }

  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const userID = await AsyncStorage.getItem('@user_id');
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + userID, {
          'headers': {
            'X-Authorization': value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            } else if(response.status === 401) {
              ToastAndroid.show("You're not logged in", ToastAndroid.SHORT);
              this.props.navigation.navigate("Sign In");
            } else {
                throw 'Something went wrong!'
            }
        })
        .then(async (responseJson) => {
          this.setState({
            favouriteLocs: responseJson.favourite_locations,
            favLocationIDs: responseJson.favourite_locations?.map(location => location.location_id) ?? [],
            likedLocations: responseJson.liked_reviews?.map(review => review.review.id) ?? []
          })
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show(error, ToastAndroid.SHORT);
        })
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

  findLocations = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
      method: "GET",
      'headers' : {
        'X-Authorization': value
      }
    })
    .then((response) => {
      if(response.status === 200){
        ToastAndroid.show("Data loaded.", ToastAndroid.SHORT);
        return response.json()
      } else if(response.status === 400){
          ToastAndroid.show("Bad Request", ToastAndroid.SHORT);
          throw 'Unauthorised'
      } else if(response.status === 401){
          ToastAndroid.show("Unauthorised", ToastAndroid.SHORT);
          throw 'Not found'
      } else {
          throw 'something went wrong'
      }
    })
    .then((json) => {
      this.setState({
        isLoading: false,
        coffeeData: json,
      })
    })
    .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
    })
  }

  locationInfo = async (locationID) => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locationID ,{
      method: "GET"
    })
    .then((response) => {
      if(response.status === 200){
        ToastAndroid.show("Data loaded.", ToastAndroid.SHORT);
        return response.json()
      } else if(response.status === 400){
          ToastAndroid.show("Bad Request", ToastAndroid.SHORT);
          throw 'Unauthorised'
      } else if(response.status === 401){
          ToastAndroid.show("Unauthorised", ToastAndroid.SHORT);
          throw 'Not found'
      } else {
          throw 'something went wrong'
      }
    })
    .then( async (json) => {
      console.log(json);
      this.setState({
        locReviews: json.location_reviews,
      })
    })
    .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
    })
  }

  favouriteLocation = async (locationID) => {

    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locationID + "/favourite", {
      method: 'POST',
      headers: {
          'X-Authorization': value,
          'Content-Type': 'application/json'
      },
    })
    .then((response) => {
        if(response.status === 200){
          ToastAndroid.show("Fav.", ToastAndroid.SHORT);
          this.getData();
        } else if(response.status === 400){
          throw 'Bad Request';
        } else if(response.status === 401){
          throw 'Unauthorised';
        } else if(response.status === 404){
          throw 'Not Found';
        } else {
          throw 'Server Error';
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

  likeReview = async (locationID, reviewID) => {

    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locationID + "/review/"+ reviewID + "/like" , {
      method: 'POST',
      headers: {
          'X-Authorization': value,
          'Content-Type': 'application/json'
      },
    })
    .then((response) => {
        if(response.status === 200){
          ToastAndroid.show("like.", ToastAndroid.SHORT);
          this.getData();
        } else if(response.status === 400){
          throw 'Bad Request';
        } else if(response.status === 401){
          throw 'Unauthorised';
        } else if(response.status === 404){
          throw 'Not Found';
        } else {
          throw 'Server Error';
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

  unlikeReview = async (locationID, reviewID) => {

    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locationID + "/review/"+ reviewID + "/like" , {
      method: 'DELETE',
      headers: {
          'X-Authorization': value,
          'Content-Type': 'application/json'
      },
    })
    .then((response) => {
        if(response.status === 200){
          ToastAndroid.show("unlike.", ToastAndroid.SHORT);
          this.getData();
        } else if(response.status === 400){
          throw 'Bad Request';
        } else if(response.status === 401){
          throw 'Unauthorised';
        } else if(response.status === 404){
          throw 'Not Found';
        } else {
          throw 'Server Error';
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

  unfavouriteLocation = async (locationID) => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locationID + "/favourite", {
      method: 'DELETE',
      headers: {
          'X-Authorization': value,
          'Content-Type': 'application/json'
      },
    })
    .then((response) => {
        if(response.status === 200){
          ToastAndroid.show("unFav.", ToastAndroid.SHORT);
          this.getData();
        } else if(response.status === 400){
          throw 'Bad Request';
        } else if(response.status === 401){
          throw 'Unauthorised';
        } else if(response.status === 404){
          throw 'Not Found';
        } else {
          throw 'Server Error';
        }
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={global_styles.background}>
          <ActivityIndicator  size="large" animating />
        </View>
      )
    } else {
      return (
        <View style={global_styles.background}>
          <Text>Coffee Stores:</Text>
          <FlatList
            horizontal
            data={this.state.coffeeData}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item: location }) => {
              return ( 
                <TouchableOpacity
                  style = {global_styles.coffeeInfoContainer}
                  onPress={() => this.locationInfo(location.location_id) }
                >
                  <View style={global_styles.itemInfo}>
                    <Text>
                      {`${location.location_name}`}
                    </Text>
                    <Text>
                    {`${location.location_town}`}
                    </Text>
                    <Text>
                      Rating: {`${location.avg_overall_rating}`}
                    </Text>
                    <Icon.Button
                      name = {(this.state.favLocationIDs.includes(location.location_id) ? "heart" : "heart-outline")} color = {"black"}  size = {26} backgroundColor="transparent" 
                      onPress= {() => {
                          if(this.state.favLocationIDs.includes(location.location_id))
                          {
                            this.unfavouriteLocation(location.location_id)
                          } else {
                            this.favouriteLocation(location.location_id)
                          }
                        }
                      }></Icon.Button>
                  </View>
                </TouchableOpacity>
                
            )
            }}
          />
          <Text>Reviews:</Text>
          <FlatList
            horizontal
            data={this.state.locReviews}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item: review }) => {
              return ( 
                <TouchableOpacity
                  style = {global_styles.reviewsInfoContainer}
                  onPress={() => this.locationInfo(review.location_id) }
                >
                  <View style={global_styles.itemInfo}>
                    <Text>
                    Overall Rating: {`${review.overall_rating}`}
                    </Text>
                    <Text>
                    Price rating: {`${review.price_rating}`}
                    </Text>
                    <Text>
                    Quality Rating: {`${review.quality_rating}`}
                    </Text>
                    <Text>
                    Clenliness rating: {`${review.clenliness_rating}`}
                    </Text>
                    <Text>
                      {`${review.review_body}`}
                    </Text>
                    <Icon.Button
                      name = "thumbs-up-down" color = {"black"}  size = {26} backgroundColor="transparent" 
                      onPress= {() => {
                        console.log(review.review_id)
                        if(this.state.likedLocations.includes(review.location_id, review.review_id))
                        {
                          this.likeReview(review.location_id, review.review_id)
                        } else {
                          this.unlikeReview(review.location_id, review.review_id)
                        }
                      }
                    }
                      ></Icon.Button>
                  </View>
                </TouchableOpacity>
              )
            }}
            >
          </FlatList>
          <Button
            title = "Add Review"
            onPress={() =>
              this.props.navigation.navigate('createReviews')
            }
          />
        </View>
      );
    }
  }
}

export default HomeScreen;