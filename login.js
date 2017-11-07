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
var registerUser = function(token){
  auth.signInWithCredential(token);
}

var setUserMobile = function(userId, name, onesignalid, friends) {

        let testpath = "/user/" + userId + "/details";

        return firebase.database().ref(testpath).set({
            name: name,
            onesignalid: 1,
            setup: false,
            friends: friends,
            logged_in: true
        })

    };


export default class LoginPage extends React.Component {   
  static navigationOptions = {   
    header: null,
   }
      
  constructor(props){   
    super(props);
    this.state = {logged_in: false, signed_up: false};
  }

    render() { 
      const { navigate } = this.props.navigation;
    async function login(credential, name, friends) {  
        
        try {  
            await firebase.auth()
                .signInWithCredential(credential);

            console.log("Logged In!");
            setUserMobile(firebase.auth().currentUser.uid, name, friends);
            navigate('LoginConfirm', {name: name, id: firebase.auth().currentUser.uid});
            // Navigate to the Home page

        } catch (error) {
            console.log(error.toString())
        }

    }

    async function logout() {  

        try { 

            await firebase.auth().signOut();

            // Navigate to login view

        } catch (error) {
            console.log(error);
        }

    }
    return ( 
      <View style={styles.container}>
        <View style={styles.whiteBox}>
          <Image style={styles.dingoCircle}
                 source={require('./img/dingo_circle.png')} />
          <Text style={styles.description}>Logging in with</Text>
          <Text style={styles.description}>Facebook lets</Text>
          <Text style={styles.description}>you easily add</Text>
          <Text style={styles.description}>friends to notify.</Text>
          <View style={styles.login}>
            <LoginButton
            readPermissions={["public_profile, email, user_friends"]}
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
                    friends = json.friends.data;
                      // Some user object has been set up somewhere, build that user here
                    name = json.name;
                    id = json.id;
                    console.log(json);
                    const credential = provider.credential(accessToken);
                    navigate('LoginConfirm',{name: name, id: firebase.auth().currentUser.uid});
                    login(credential, name, friends);
                    
                    } )
                })
              }
              }
            }
            onLogoutFinished={() => {logout();}, alert("User logged out")}/>
          </View>
        </View>
      </View>
          //<Image style={styles.facebookButton}
                 //source={require('./facebook_button.png')} />
    );
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
    margin: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 30,
  },
  dingoCircle: {
    marginTop: window.height/6,
    marginBottom: window.height/15,
    width: window.width/3,
    height: window.width/3,
  },
  description: {
    fontFamily: 'Avenir',
    fontSize: window.width / 15,
    alignItems: 'center',
    color: '#353535',
  },
  facebookButton: {
    marginTop: 25,
    width: 200,
    height: 31,
  },
  loginB: {
     marginTop: window.height / 15,
  },
 }  );
export{fbapp};
export{LoginPage};

