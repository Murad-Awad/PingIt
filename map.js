
import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableOpacity
 } from 'react-native';
 import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
 import OneSignal from 'react-native-onesignal';
 import * as firebase from 'firebase';
 import RNGooglePlaces from 'react-native-google-places';
 import reactCreateClass from 'create-react-class';
 var {width, height} = Dimensions.get('window');
const Aspect_Ratio = width/height;
const LATITUDE = 37.8715926;
const LONGITUDE = -122.27274699999998;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA*Aspect_Ratio;
var SelectedLongitude;
var SelectedLatitude;
var setMarker = function(place){
  return{
    latitude: place.latitude,
    longitude: place.longitude
  }
};
var CustomMap = reactCreateClass( {  


  getInitialState() {  
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      marker:{
        latitude:LATITUDE,
        longitude: LONGITUDE,
      },
      DestinationMarker:{
        latitude: LATITUDE,
        longitude: LONGITUDE
      }
    };
  },
  componentDidMount: function() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(2);
    RNGooglePlaces.openPlacePickerModal({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      radius: 0.1
     })
    .then((place) => {
    console.log(place);
      SelectedLatitude = place.latitude;
      SelectedLongitude = place.longitude;
      this.onPlaceSelection({latitude:place.latitude, longitude: place.longitude});
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  
    navigator.geolocation.getCurrentPosition( 
      (position) => { 
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
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          marker:{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
          }
        });
       },
      (error) => alert('Restart Dingo and Enable Location Tracking'),
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
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.onRegionChange(newRegion);
    });
  },
onNotificationOpened: function(message, data, isActive) {
  if (data.p2p_notification) {
    for (var num in data.p2p_notification) {
      // console.log(data.p2p_notification[num]);
    }
  }
},
  componentWillUnmount: function() {
     OneSignal.removeEventListener('received', this.onReceived);
     OneSignal.removeEventListener('opened', this.onOpened);
     OneSignal.removeEventListener('registered', this.onRegistered);
     OneSignal.removeEventListener('ids', this.onIds);
    navigator.geolocation.clearWatch(this.watchID);
  },
  onReceived: function(notification){
    console.log("Notification received: ", notification);
  },
  onOpened: function(openResult){
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  },
  onRegistered:function(notifData){
    console.log("Device had been registered for push notifications!", notifData);

  },
  onIds:function(device){
    console.log('Device info: ', device);
  },
  onRegionChange(region) {
    this.setState({ region });
  },
  onPlaceSelection(DestinationMarker){
    this.setState({ DestinationMarker });
    console.log('WOW THIS WORKS');
  },

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        <MapView.Marker
            coordinate = {this.state.marker}>
        <View style = {styles.radius}>
        <View style = {styles.marker}/>
        </View>
          </MapView.Marker>
        <MapView.Marker
        coordinate={this.state.DestinationMarker}/>
        </MapView>

      </View>
    );
  },
});
 var styles = StyleSheet.create({
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
   radius:{
     height: 50,
     width: 50,
     borderRadius: 50/2,
     overflow:'hidden',
     backgroundColor:'rgba(0,122,255,0.1)',
     borderWidth: 1,
     borderColor:'rgba(0,112,255,0.3)',
     alignItems:'center',
     justifyContent:'center'
   },
   marker:{
     height: 20,
     width: 20,
     borderWidth: 3,
     borderColor: '#ffffff',
     borderRadius: 20 / 2,
     overflow: 'hidden',
     backgroundColor:'#007AFF'

   }
 });
 module.exports = CustomMap;