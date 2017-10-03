/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View
 } from 'react-native';
 import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

 export default class pingit extends Component {
   render() {
     return (
       <MapView
         provider = {PROVIDER_GOOGLE}
         style = {styles.map}
         initialRegion={{
           latitude: 39.7392,
           longitude: -104.9903,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}
         />
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     justifyContent: 'flex-end',
     alignItems: 'center',
   },
    map: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
   },
 });
AppRegistry.registerComponent('pingit', () => pingit);
