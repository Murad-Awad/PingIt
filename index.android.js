import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Dimensions
 } from 'react-native';
 import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
 var {width, height} = Dimensions.get('window');
 const Aspect_Ratio = width/height;
const LATITUDE = 37.8715926;
const LONGITUDE = -122.27274699999998;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA*Aspect_Ratio;
var CustomMap = React.createClass({
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
      }
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
      (error) => alert(error.message),
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.onRegionChange(newRegion);
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  onRegionChange(region) {
    this.setState({ region });
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
AppRegistry.registerComponent('pingit',()=> CustomMap);
