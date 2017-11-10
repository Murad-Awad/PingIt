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
   Avatar
 } from 'react-native';


 //Object for each user
 export default class User extends React.Component {
   constructor(fbookId, name, profPic) {
     super();
     this.state = {
       facebookId: fbookId,
       name: name,
       picture: profPic,
     }

   }

   render() {  
     return (
       <View>
       </View>
     );
   }
 }
module.exports = User;