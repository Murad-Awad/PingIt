import React, { Component } from 'react';
import {
 Image,
 Platform,
 ScrollView,
 StyleSheet,
 Text,
 TouchableOpacity,
 Dimensions,
 View,
 FlatList,
 Avatar,
} from 'react-native';

import FBSDK, { LoginManager } from 'react-native-fbsdk';

//https://github.com/facebook/react-native-fbsdk
const {
 LoginButton,
 AccessToken,
 GraphRequest,
 GraphRequestManager
} = FBSDK;

 export class Login extends Component {
   constructor(props) {
     super(props);
     console.log("Props are: " + this.props);
   }
     // Create response callback.
     _userFriendsResponseInfoCallback = (error: ?Object, result: ?Object) => {
       if (error) {
         alert('Error fetching data: ' + error.toString());
         console.log(Object.keys(error));// print all enumerable
         console.log(error.errorMessage); // print error message
       } else {
         console.log(Object.keys(result));
         meow_json = JSON.stringify(result); // result => JSON
         console.log(meow_json); // print JSON

         user_friends = []

         let myId = JSON.stringify(result.id);
         let myPicture = JSON.stringify(result.picture.data.url);

         let fbookFriendData = result.friends.data;

         for (var i = 0; i < fbookFriendData.length; i++) {
           let friendId = fbookFriendData[i].id;
           let friendName = fbookFriendData[i].name;
           let friendPic = 'https://graph.facebook.com/' + friendId + '/picture?type=small';
           user_friends = [...user_friends, new User(friendId, friendName, friendPic)];
          //  console.log('friendId is: ' + friendId);
          //  console.log('friendName is: ' + friendName);
          //  console.log('friendPic is: ' + friendPic);
         }

         user_friends.sort(function(a, b) {
           return (a.state.name < b.state.name) ? -1 : (a.state.name > b.state.name) ? 1 : 0;
         });

         for (var i = 0; i < user_friends.length; i++) {
           console.log(user_friends[i].state.name);
         }

         if (typeof(this.props) == 'undefined') {
            console.log("Slaughter Gang: this.props is undefined");
         }
        this.props.callbackFromParent(user_friends);
       }
     }

     _testUserFriends(accessToken) {
        const infoRequest = new GraphRequest(
          '/me',
          {
            parameters: {
              fields: {
                string: 'name,friends,picture' // what you want to get
              },
              access_token: {
                string: accessToken.toString() // put your accessToken here
              }
            }
          },
          this._userFriendsResponseInfoCallback // make sure you define _responseInfoCallback in same class
        );

        new GraphRequestManager().addRequest(infoRequest).start();
     }

     render() {
         return (
           <View>
             <LoginButton
//               publishPermissions={["publish_actions"]}
               readPermissions={["public_profile", "email", "user_friends"]}
               onLoginFinished={
                 (error, result) => {
                   if (error) {
                     alert("login has error: " + result.error);
                   } else if (result.isCancelled) {
                     alert("login is cancelled.");
                   } else {
                     AccessToken.getCurrentAccessToken().then(
                       (data) => {
                         alert(data.accessToken.toString());

                         //Go to Login Complete Screen
                         
                         //Determine if this was their first login onto the app

                         //
                         this._testUserFriends(data.accessToken);
                       }
                     )
                   }
                 }
               }
               onLogoutFinished={() => alert("logout.")} />
           </View>
         );
     }

 }

 export default class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {data: []};
  }

  myCallback = (dataFromChild) => {
    this.setState({ data: dataFromChild });
    for (var i = 0; i < this.state.data.length; i++) {
      console.log("name is: " + this.state.data[i].state.name);
    }
  }


   render() {
     return (
       <View style={styles.container}>
         <View style={styles.whiteBox}>
          <Image style={styles.dingoCircle}
                source={require('./img/dingo_circle.png')} />
          <Text style={styles.description}>Logging in with</Text>
          <Text style={styles.description}>Facebook lets</Text>
          <Text style={styles.description}>you easily add</Text>
          <Text style={styles.description}>friends to notify.</Text>
          <View style={styles.loginButton}>
            <Login callbackFromParent={this.myCallback.bind(this)} />
          </View>
          <View style={styles.userList}>
            <FlatList
              data={this.state.data}
            />
          </View>
        </View>
       </View>
     );
   }

 }

 const window = Dimensions.get('window');

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#191979',
   },
   statusBarUnderlay: {
     height: 24,
     backgroundColor: 'rgba(0,0,0,0.2)',
   },
   userList: {
     margin: 40,
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
   loginButton: {
     marginTop: window.height / 15
   }
 });
module.exports = Login;