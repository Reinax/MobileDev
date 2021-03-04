import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, ActivityIndicator, ToastAndroid, PermissionsAndroid, FlatList} from 'react-native';
import { global_styles } from '../GblStyle/GlobalStyle';
import Geolocation from '@react-native-community/geolocation';


class HomeScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: "",
      coffeeData: [],
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
        .then((responseJson) => {
          this.setState({
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
      console.log(json);
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
          <FlatList
            data={this.state.coffeeData}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) => {
              return ( 
                <View style={global_styles.itemView}>
                  <View>
                    
                  </View>
                  <View style={global_styles.itemInfo}>
                    <Text>
                      {`${item.location_name.toString()} `}
                    </Text>
                    <Text>
                    {`${item.location_town.toString()}`} 
                    </Text>
                  </View>
                </View>
            )
            }}
          />
        </View>
      );
    }
  }
}

export default HomeScreen;