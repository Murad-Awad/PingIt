import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button
} from 'react-native';
import * as firebase from 'firebase';
import {fbapp} from './login.js';
import RNGooglePlaces from 'react-native-google-places';
import OneSignal from 'react-native-onesignal';
const LATITUDE = 37.8715926;
const LONGITUDE = -122.27274699999998;
const LATITUDE_DELTA = 0.01;
var setHomeBase = function(latitude, userId, longitude, navigate) {

        let testpath = "/user/" + userId + "/details/" + "/home";

        return  firebase.database().ref(testpath).set({
            latitude: latitude,
            longitude: longitude
        })
    };
var setOneSignalID = function(userId, onesignalid) {

        let testpath = "/user/" + userId + "/details/"+"/OneSignalId";

        return firebase.database().ref(testpath).set({
            ID: onesignalid
        })
    };
var setLocation= function(navigate, userId){
    RNGooglePlaces.openPlacePickerModal({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      radius: 0.1
     })
    .then((place) => {
    console.log(place);
      SelectedLatitude = parseInt(JSON.stringify(place.latitude));
      SelectedLongitude = parseInt(JSON.stringify(place.longitude));
      setHomeBase(place.latitude, userId, place.longitude);
      navigate('AddFriendsSetUp');
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  };


export default class FacebookLoginScreen extends React.Component { 
  state = {name: 'Joe', id: 'swag'}
  static navigationOptions = { 
    header: null,
  };
  componentDidMount(){
    OneSignal.configure();
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(2);
  }
  componentWillUnmount(){
     OneSignal.removeEventListener('received', this.onReceived);
     OneSignal.removeEventListener('opened', this.onOpened);
     OneSignal.removeEventListener('registered', this.onRegistered);
     OneSignal.removeEventListener('ids', this.onIds);
  }
  onIds = (device) => {
        console.log(device.userId);
        setOneSignalID(this.props.navigation.state.params.id, device.userId);
    }
  render() {  
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome, {params.name}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>Dingo automatically</Text>
          <Text style={styles.bodyText}>notifies your friends</Text>
          <Text style={styles.bodyText}>when you get home</Text>
          <Text style={styles.bodyText}>so that you do not</Text>
          <Text style={styles.bodyText}>have to.</Text>
        </View>
        <TouchableOpacity onPress={() => {setLocation(navigate, params.id);}}
                          style={styles.button}>
          <Text style={styles.buttonText}>Add Your Home Base</Text>
        </TouchableOpacity>
        <Image style={styles.dingoCircle}
               source={require('./img/dingo_circle.png')} />
      </View>
    );
  }
  }

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191979',
  },
  header: {
    flex: 1
  },
  body: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: window.height / 8,
  },
  headerText: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 28,
    alignSelf: 'flex-end',
    marginTop: window.height / 14,
    marginRight: 10,
  },
  bodyText: {
    color: '#171797',
    fontFamily: 'Avenir',
    fontSize: 20,
    fontStyle: 'italic',
  },
  dingoCircle: {
    position: 'absolute',
    marginTop: window.height / 8,
    marginLeft: 20,
    width: 80,
    height: 80,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    top: window.height / 3 * 2,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#171797',
    width: window.width / 2,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: '#000000',
  },
  buttonText: {
    color: '#ffffff',
  },
});
module.exports = FacebookLoginScreen;
