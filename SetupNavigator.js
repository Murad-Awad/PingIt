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
var HomeScreen = require('./home.js');
var AddFriends = require('./AddFriends.js');
var CustomMap = require('./map.js');
var FacebookLoginScreen = require('./LoginComplete.js');
var SplashScreen = require('./SplashScreen.js');
const SetupNavigator = StackNavigator({
  Home: {screen: LoginPage},
  LoginConfirm: {screen: FacebookLoginScreen},
  AddFriends: {screen: AddFriends},
  HomeScreen: {screen: HomeScreen}
});
module.exports = SetupNavigator;