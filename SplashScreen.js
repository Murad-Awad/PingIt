import React, { Component } from 'react';
 import {
 AsyncStorage,
 Image,
 Platform,
 ScrollView,
 StyleSheet,
 Text,
 TouchableOpacity,
 Dimensions,
 View,
 BackHandler
} from 'react-native';
 import {
  StackNavigator,
} from 'react-navigation';
 import * as firebase from 'firebase';
import {LoginPage} from './login.js';
import {fbapp} from './login.js';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
var HomeScreen = require('./home.js');
const FBSDK = require('react-native-fbsdk');
 const {
   AccessToken,
   GraphRequest,
 } = FBSDK;
export default class SplashScreen extends React.Component { 
  constructor(props) { 
    super(props);
   this.state = {isLoggedIn: false}
  }
    static navigationOptions = { 
    header: null,
  };

  componentDidMount() {
    console.log(this.state.isLoggedIn);
     LocationServicesDialogBox.checkLocationServicesIsEnabled({ 
            message: "<h2>Use Location?</a>",
            ok: "YES",
            cancel: "NO",
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true // false => Directly catch method is called if location services are turned off
        }).then(function(success) { 
            // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
                navigator.geolocation.getCurrentPosition((position) => { 
                    let initialPosition = JSON.stringify(position);
                    this.setState({ initialPosition });
                }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
            }.bind(this)
        ).catch((error) => { 
            console.log(error.message);
        });
        BackHandler.addEventListener('hardwareBackPress', () => { 
               LocationServicesDialogBox.forceCloseDialog();
        });
  }
  componentWillUnmount() {

  }

  render() {  
     const { navigate } = this.props.navigation;
    firebase.auth().onAuthStateChanged( function(user) { 
  if (user) { 
        AccessToken.getCurrentAccessToken().then((data) => {
                    const { accessToken } = data;
                    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
                      .then((response) => response.json())
                      .then((json) => {
                    var testPath =  "/user/" + json.id + "/details/" + "/setup";
                    firebase.database().ref(testPath).on("value", (snap) => {
                  if (snap.val()==true){ 
                    navigate("HomeScreen");
                  }
                else{
                  navigate('Login');
                }

          });
                    
                    } )
                });
     } else {
   navigate('Login');
  }}); 
    return ( 
        <View style={styles.container}>
           <Image style = {styles.splashPhoto}
           source={require('./dingotransparent.png')}
           />
     </View> );
  }
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   backgroundColor: '#191979',
 },

 splashPhoto: {
   position: 'absolute',
   width: 68,
   height: 101,
   alignItems: 'center',
   justifyContent: 'center',
   marginTop: 250,
 }
 
});
module.exports = SplashScreen;