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
 import {LoginPage} from './login.js';
var CustomMap = require('./map.js');
var FacebookLoginScreen = require('./LoginComplete.js');
const App = StackNavigator({
  Home: { screen: LoginPage },
  Map: {screen: CustomMap},
  LoginConfirm: {screen: FacebookLoginScreen}
});

AppRegistry.registerComponent('pingit',()=> App);
