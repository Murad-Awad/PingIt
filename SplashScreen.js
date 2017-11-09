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
var SetupNavigator = require('./SetupNavigator.js');

export default class SplashScreen extends React.Component { 
  constructor(props) { 
    super(props);
   this.state = {isLoggedIn: false}
  }

  async ConfirmLogIn(navigate){   
  try{ 
   await firebase.auth().onAuthStateChanged( function(user) { 
  if (user) { 
   this.state= {isLoggedIn: true};
   navigate('HomeScreen');
   console.log(this.state);
     } else { 
    navigate('LoginPage');
  }}); 
 }
  catch(error){}
  };
  componentDidMount() { 
    console.log(this.state.isLoggedIn);
     LocationServicesDialogBox.checkLocationServicesIsEnabled({ 
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
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

  render() {  
    const { navigate } = this.props.navigation;
    this.ConfirmLogIn(navigate);
    if (this.state.isLoggedIn === true) {
       return <HomeScreen/>
    }
    else if (this.state.isLoggedIn === null) {
     return <SetupNavigator/>
    }
 
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