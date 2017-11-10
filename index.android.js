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
import CompleteJourneyScreen from './CompleteJourneyScreen';
import CurrentLocationScreen from './CurrentLocationScreen';
import FeedbackDoneScreen from './FeedbackDoneScreen';
import FeedbackScreen from './FeedbackScreen';
import LogOutConfirmScreen from './LogOutConfirmScreen';
import LogOutScreen from './LogOutScreen';
import NotificationsScreen from './NotificationsScreen';
import ProgressScreen from './ProgressScreen';
import SidebarScreen from './SidebarScreen';
import WelcomeScreen from './WelcomeScreen';
var AddFriends = require('./AddFriends.js');
var HomeScreen = require('./home.js');
var CustomMap = require('./map.js');
var FacebookLoginScreen = require('./LoginComplete.js');
var SplashScreen = require('./SplashScreen.js');

const App = StackNavigator({
    SplashScreen: {screen: SplashScreen},
    Map: {screen: CustomMap},
    Login:{screen: LoginPage},
    LoginConfirm: {screen: FacebookLoginScreen},
    AddFriends: {screen: AddFriends},
    HomeScreen: {screen: HomeScreen},
    Progress: {screen: ProgressScreen},
    CompleteJourney: { screen: CompleteJourneyScreen },
    CurrentLocation: { screen: CurrentLocationScreen },
    Feedback: { screen: FeedbackScreen },
    FeedbackDone: { screen: FeedbackDoneScreen },
    LogOut: { screen: LogOutScreen },
    LogOutConfirm: { screen: LogOutConfirmScreen },
    Notifications: { screen: NotificationsScreen },
    Sidebar: { screen: SidebarScreen },
    Welcome: { screen: WelcomeScreen },
});

AppRegistry.registerComponent('pingit',()=> App);