import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    BackHandler
} from 'react-native';

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

class SampleApp extends Component {
    state = {
        initialPosition: 'unknown',
    };

    componentDidMount() {
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
        return (
            <View>
                <Text>
                    Geolocation: {this.state.initialPosition}
                </Text>
            </View>
        );
    }
}
AppRegistry.registerComponent('SampleApp', () => SampleApp);