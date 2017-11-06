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
import reactCreateClass from 'create-react-class';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;
 var config = {
    apiKey: "AIzaSyA_Jn8KsODb12GkJWAJqU1Df0QfHpcEGLY",
    authDomain: "pingit-9dbc3.firebaseapp.com",
    databaseURL: "https://pingit-9dbc3.firebaseio.com",
    projectId: "pingit-9dbc3",
    storageBucket: "pingit-9dbc3.appspot.com",
    messagingSenderId: "106743397571"
  };
var fbapp =  firebase.initializeApp(config);
  var setUser = function(name, id){
    return {
      name: name,
      id: id
    }
  };

const auth = fbapp.auth();
const provider = firebase.auth.FacebookAuthProvider;
var user = auth.currentUser;
var registerUser = function(token){
  auth.signInWithCredential(token);
  user = auth.currentUser;
}

var setUserMobile = function(userId, name, onesignalid) {

        let testpath = "/user/" + userId + "/details";

        return firebase.database().ref(testpath).set({
            name: name,
            onesignalid: 1,
            setup: false
        })

    };
export default class LoginPage extends React.Component {  
  static navigationOptions = {
    header: null,
  };
    render() {  
    const { navigate } = this.props.navigation;
    if (auth.currentUser==null){
    return (
      <View style={styles.container}>
        <View style={styles.whiteBox}>
          <Image style={styles.dingoCircle}
                 source={require('./img/dingo_circle.png')} />
          <Text style={styles.description}>Logging in with</Text>
          <Text style={styles.description}>Facebook lets</Text>
          <Text style={styles.description}>you easily add</Text>
          <Text style={styles.description}>friends to notify.</Text>
          <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={ 
            (error, result) => {
              console.log(result);
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {  
                AccessToken.getCurrentAccessToken().then((data) => {
                  const { accessToken } = data;
                  fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
                    .then((response) => response.json())
                    .then((json) => {
                    // Some user object has been set up somewhere, build that user here
                  name = json.name;
                  id = json.id;
                  console.log(name);
                  const credential = provider.credential(accessToken);
                  registerUser(credential);
                  var user = auth.currentUser;
                  setUserMobile(user.uid, name, id);
                  navigate('LoginConfirm', {name: name, id: user.uid});   
                  }  )
              })
            }
            }
          }
          onLogoutFinished={() => {auth.signOut()}, alert("User logged out")}/>
        </View>
      </View>
          //<Image style={styles.facebookButton}
                 //source={require('./facebook_button.png')} />
    );
  }
}
}

const window = Dimensions.get('window');

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
    marginTop: 30,
    marginBottom: 25,
    width: 133,
    height: 133,
  },
  description: {
    //width: 233px,
    //height: 166px,
    //left: calc(50% - 233px/2),
    //top: calc(50% - 166px/2 + 77.5px),
    fontFamily: 'Avenir',
    fontSize: 22,
    alignItems: 'center',
    color: '#353535',
  },
  facebookButton: {
    marginTop: 25,
    width: 200,
    height: 31,
  },
});
export{fbapp};
export{LoginPage};

