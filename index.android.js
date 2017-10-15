import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Dimensions
 } from 'react-native';
 import {
  StackNavigator,
} from 'react-navigation';
 import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
 import OneSignal from 'react-native-onesignal';
 import * as firebase from 'firebase';
var CustomMap = require('./map.js');
var LoginPage = require('./login.js');
const App = StackNavigator({
  Home: { screen: CustomMap },
  Map: {screen: LoginPage}

});

AppRegistry.registerComponent('pingit',()=> App);
