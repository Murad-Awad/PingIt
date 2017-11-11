import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button
} from 'react-native';
import * as firebase from 'firebase';
import OneSignal from 'react-native-onesignal';
const FBSDK = require('react-native-fbsdk');
 const {
   AccessToken,
   GraphRequest,
 } = FBSDK;


const LATITUDE = 37.8715926;
const LONGITUDE = -122.27274699999998;
var getTestPath= function(userId){
  return testpath = "/user/" + userId+ "/details/" + "/home/"; 
};
export default class ProgressScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){  
        super(props);
            }
  state = { 
      position:{
        latitude: LATITUDE,
        longitude: LONGITUDE
      },
      DestinationMarker:{  
        latitude: this.props.navigation.state.params.latitude,
        longitude: this.props.navigation.state.params.longitude
      },
      Friends:[],
      OneSignalIdList: []
    }
  OneSignalIdList = []
  FriendsUserList = []
  GetFriendsSignalID = function(userId){
  console.warn(userId);
  var testpath = "/user/"+userId +"/details/";
     firebase.database().ref(testpath).on("value", (snap) => {  
    id = snap.val().OneSignalId.ID;
    name = snap.val().name
        let data = [1,2] // some array as payload
        let contents = { 
        'en': name+' has gotten home'
        }
        OneSignal.postNotification(contents, data, id);
        this.props.navigation.navigate('CompleteJourneyScreen');
    this.state.OneSignalIdList.push(id);
  });
}
  sendMessages = function(userId){ 
  var testpath = "/user/"+userId +"/details/" + "/friends/"+"/myPack";
     firebase.database().ref(testpath).on("value", (snap) => {  
    this.state.Friends = snap.val();
    for (var friends in this.state.Friends){
      console.warn(this.state.Friends[friends]);
      this.GetFriendsSignalID(parseInt(this.state.Friends[friends]));
    }
  });
}


   sendMessagesfromUsers(token){  
    fetch('https://graph.facebook.com/v2.5/me?fields=id&access_token=' + token)
                        .then((response) => response.json())
                        .then((json) => {
                          console.warn(json.id);
                      this.sendMessages(json.id);
                    })
  }
  componentDidMount() { 
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
    navigator.geolocation.getCurrentPosition((position) => { 
              let initialPosition = JSON.stringify(position);
              this.setState({ position });
              }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
    this.watchID = navigator.geolocation.watchPosition((position) => { 
      var latitude = parseInt(JSON.stringify(position.coords.latitude));
      var longitude = parseInt(JSON.stringify(position.coords.longitude));
      if (latitude > this.state.DestinationMarker.latitude-0.0001 && latitude<this.state.DestinationMarker.latitude+0.0001 && longitude> this.state.DestinationMarker.longitude-0.0001 && longitude<this.state.DestinationMarker.longitude+0.0001){
    
    AccessToken.getCurrentAccessToken().then(
     (data) => {
       //Determine if this was their first login onto the app
       const {accessToken} = data;

       this.sendMessagesfromUsers(accessToken);
     });
      }
      });

    this.watchID = navigator.geolocation.watchPosition((position) => { 
      var latitude = parseInt(JSON.stringify(position.coords.latitude));
      var longitude = parseInt(JSON.stringify(position.coords.longitude));
      if (latitude > this.state.DestinationMarker.latitude-0.0001 && latitude<this.state.DestinationMarker.latitude+0.0001&& longitude> this.state.DestinationMarker.longitude-0.0001 && longitude<this.state.DestinationMarker.longitude+0.0001){
    
    AccessToken.getCurrentAccessToken().then(
     (data) => {
       //Determine if this was their first login onto the app
       const {accessToken} = data;

       this.sendMessagesfromUsers(accessToken);
     });
      }
      });
    }
componentWillUnmount(){
    OneSignal.removeEventListener('ids', this.onIds);
    navigator.geolocation.clearWatch(this.watchID);
}
  async ConfirmLogIn(navigate){   
  try{ 
   await firebase.auth().onAuthStateChanged( function(user) { 
  if (user) { ;
     } else {
      console.log('xd');
    navigate('Login');
  }}); 
 }
  catch(error){}
  };

onIds = (device) => {
        console.log(device.userId);
    }
   
 onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onRegistered(notifData) {
        console.log("Device had been registered for push notifications!", notifData);
    }

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    this.ConfirmLogIn(navigate);
    return (
      <View style={styles.container}>
        <Text style={styles.progressText}>Heading home...</Text>
        <Image style = {styles.dingo}
               source={require('./img/dingotransparent.png')} />

        <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')}>
         <View style={styles.cancelButton}>
           <Text style={styles.cancelText}>Cancel</Text>
         </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191979',
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
  },
  progressText: {
    marginTop: 50,
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  dingo: {
    marginTop: 40,
    marginBottom: 20,
    width: 82,
    height: 122,
  },
  cancelButton: {
    margin: 20,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    width: window.width / 2,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: '#000000',
  },
  cancelText: {
    color: '#171797',
    fontSize: 15
  },
});
