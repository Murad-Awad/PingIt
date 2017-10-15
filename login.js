import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
 import * as firebase from 'firebase';
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
 var config = {
    apiKey: "AIzaSyA_Jn8KsODb12GkJWAJqU1Df0QfHpcEGLY",
    authDomain: "pingit-9dbc3.firebaseapp.com",
    databaseURL: "https://pingit-9dbc3.firebaseio.com",
    projectId: "pingit-9dbc3",
    storageBucket: "pingit-9dbc3.appspot.com",
    messagingSenderId: "106743397571"
  };
  firebase.initializeApp(config);
var LoginPage = React.createClass ({

  render() {
    var _this = this;
    return (
      <View style={styles.container}>
        <View style={styles.whiteBox}>
          <View style={styles.dingoCircle}>
            <Image style={styles.dingoPic}
                   source={require('./dingotransparent.png')} />
          </View>
          <Text style={styles.description}>Logging in with</Text>
          <Text style={styles.description}>Facebook lets</Text>
          <Text style={styles.description}>you easily add</Text>
          <Text style={styles.description}>friends to notify.</Text>
          <View style = {styles.login}>
          </View>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191979',
  },
  whiteBox: {
    flex: 1,
    margin: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderRadius: 30,
  },
  dingoCircle: {
    backgroundColor: '#D0D1D4',
    width: 150,
    height: 150,
    shadowColor: '#000',
    borderRadius: 100,
    shadowOffset: {width: 0, height: 2},
  },
  dingoPic: {
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  login: {
    alignItems: 'center',
    height: 40, 
  },
  description: {
    //width: 233px,
    //height: 166px,
    //left: calc(50% - 233px/2),
    //top: calc(50% - 166px/2 + 77.5px),
    fontFamily: 'Avenir',
    fontSize: 30,
    alignItems: 'center',
    color: '#353535',
  },
});
 module.exports = LoginPage;