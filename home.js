
import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions,
  Button
} from 'react-native';
import reactCreateClass from 'create-react-class';
import OneSignal from 'react-native-onesignal';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const LATITUDE = 37.8715926;
const LONGITUDE = -122.27274699999998;
export default class HomeScreen extends Component {  
      static navigationOptions = {
          latitude: LATITUDE,
          longitude: LONGITUDE
      };

  state = {
      DestinationMarker:{  
        latitude: LATITUDE,
        longitude: LONGITUDE
      }
    }

  componentDidMount() { 
    console.log(this.state.latitude);
    console.log(this.state.longitude);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(2);
        navigator.geolocation.getCurrentPosition( 
      (position) => { 
        var latitude = parseInt(JSON.stringify(position.coords.latitude));
        var longitude = parseInt(JSON.stringify(position.coords.longitude));
        if (latitude > this.state.latitude-0.001 && latitude<this.state.latitude+0.001 && longitude> this.state.longitude-0.001 && longitude<this.state.longitude+0.001) {
        let data = [1,2] // some array as payload
        let contents = { 
        'en': 'has gotten home'
        }
        playerId = '55920dd3-d936-476d-860e-09c4cca02f5e';
        OneSignal.postNotification(contents, data, playerId);
      }   
    },
    (error) => { 
      console.log(this.state.latitude);
      if (LATITUDE > LATITUDE-1 && LATITUDE<LATITUDE+1 && LONGITUDE> LONGITUDE-1 && LONGITUDE<LONGITUDE+1) { 
        let data = [1,2] // some array as payload
        let contents = {
        'en': 'has gotten home'
        }
        playerId = '55920dd3-d936-476d-860e-09c4cca02f5e';
        OneSignal.postNotification(contents, data, playerId);
        }},
  );
   this.watchID = navigator.geolocation.watchPosition((position) => { 
      var latitude = parseInt(JSON.stringify(position.coords.latitude));
        var longitude = parseInt(JSON.stringify(position.coords.longitude));
        if (latitude > LATITUDE-1 && latitude<LATITUDE+1 && longitude> LONGITUDE-1 && longitude<LONGITUDE+1) {
        let data = [1,2] // some array as payload
        let contents = {
        'en': 'has gotten home'
        }
        playerId = '55920dd3-d936-476d-860e-09c4cca02f5e';
        OneSignal.postNotification(contents, data, playerId);
        }
      });
    }
componentWillUnmount(){
     OneSignal.removeEventListener('received', this.onReceived);
     OneSignal.removeEventListener('opened', this.onOpened);
     OneSignal.removeEventListener('registered', this.onRegistered);
     OneSignal.removeEventListener('ids', this.onIds);
    navigator.geolocation.clearWatch(this.watchID);
}
onNotificationOpened(message, data, isActive) { 
  if (data.p2p_notification) {
    for (var num in data.p2p_notification) {
      // console.log(data.p2p_notification[num]);
    }
  }
}
 onReceived(notification){
    console.log("Notification received: ", notification);
  }
  onOpened(openResult){  
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }
  onRegistered(notifData){
    console.log("Device had been registered for push notifications!", notifData);

  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.homeText}>Tap the dingo</Text>
        <Text style={styles.homeText}>to go home.</Text>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Progress')}>
          <Image style = {styles.homePhoto}
                 source={require('./img/dingo_circle.png')} />
        </TouchableHighlight>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Sidebar')}>
        <Image style = {styles.menuPhoto}
               source={require('./img/menu.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191979',
    padding: window.height / 12,
    paddingTop: window.height / 10,
    alignItems: 'center',
  },
  homeText: {
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  homePhoto: {
    marginTop: window.height / 12,
    marginBottom: window.height / 12,
    width: window.width / 2,
    height: window.width / 2,
  },
  menuPhoto: {
    width: window.width / 10,
    height: window.width / 10,
    margin: window.width / 14,
    tintColor: '#fff',
  },
});

module.exports = HomeScreen;