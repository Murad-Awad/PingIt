
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
  Button,
  BackHandler
} from 'react-native';
import reactCreateClass from 'create-react-class';
import OneSignal from 'react-native-onesignal';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import * as firebase from 'firebase';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
const LATITUDE = 37.8715926;
const LONGITUDE = -122.27274699999998;
 const {
   LoginButton,
   AccessToken,
   GraphRequest,
   GraphRequestManager
 } = FBSDK;

var getTestPath= function(userId){
  return testpath = "/user/" + userId + "/details/" + "/home"; 
};
var setOneSignalID = function(userId, onesignalid) {

        let testpath = "/user/" + userId + "/details/"+"/OneSignalId";

        return firebase.database().ref(testpath).set({
            ID: onesignalid
        })
    };
export default class HomeScreen extends Component {  
  constructor(props){  
        super(props);
            }
      static navigationOptions = {
          latitude: LATITUDE,
          longitude: LONGITUDE
      };

  state = { 
      position:{
        latitude: LATITUDE,
        longitude: LONGITUDE
      },
      DestinationMarker:{  
        latitude: LATITUDE,
        longitude: LONGITUDE
      }
    }
 async ConfirmLogIn(navigate){   
  try{ 
   await firebase.auth().onAuthStateChanged( function(user) { 
  if (user) { 
   this.state= {isLoggedIn: true};
     } else {
      console.log('xd');
    navigate('Login');
  }}); 
 }
 catch(error){}
}
setHome() {
   AccessToken.getCurrentAccessToken().then(
         (data) => {
           //Determine if this was their first login onto the app
           const {accessToken} = data;
            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
                .then((response) => response.json())
                .then((json) => {
            firebase.database().ref(getTestPath(json.id)).on("value", (snap) => {  lat = snap.val();
                  this.setState({
                                  DestinationMarker:{ 
                                  latitude: snap.val().latitude,
                                  longitude: snap.val().longitude
                                  }
                });
          });
        })
     }
    )
 }

  componentDidMount() {
    OneSignal.configure();
    navigator.geolocation.getCurrentPosition((position) => { 
              let initialPosition = JSON.stringify(position);
              this.setState({ position });
              }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
    BackHandler.addEventListener('hardwareBackPress', () => {
               LocationServicesDialogBox.forceCloseDialog();
        });
    this.watchID = navigator.geolocation.watchPosition((position) => { 
      var latitude = parseInt(JSON.stringify(position.coords.latitude));
        var longitude = parseInt(JSON.stringify(position.coords.longitude));
      });
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
    navigator.geolocation.clearWatch(this.watchID);
}
  onIds = (device) => {
        console.log(device.userId);
         AccessToken.getCurrentAccessToken().then(
         (data) => {
           //Determine if this was their first login onto the app
           const {accessToken} = data;
            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
                .then((response) => response.json())
                .then((json) => {
        setOneSignalID(json.id, device.userId);
                    } );
          } );
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
      OneSignal.configure();
      this.setHome();
      const { navigate } = this.props.navigation;
      console.log(this.state.DestinationMarker);
      this.ConfirmLogIn(navigate);
    return (
      <View style={styles.container}>
        <Text style={styles.homeText}>Tap the dingo</Text>
        <Text style={styles.homeText}>to go home.</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Progress', {latitude:this.state.DestinationMarker.latitude, longitude:this.state.DestinationMarker.longitude})}>
          <Image style = {styles.homePhoto}
                 source={require('./img/dingo_circle.png')} />
        </TouchableOpacity>
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