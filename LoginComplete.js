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
import {fbapp} from './login.js';


export default class FacebookLoginScreen extends React.Component {
  state = {name: 'Joe'}
  static navigationOptions = {
    header: null,
  };
   getUser(){  
    auth.currentUser();
  }
  render() {  
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome, {params.name}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>Dingo automatically</Text>
          <Text style={styles.bodyText}>notifies your friends</Text>
          <Text style={styles.bodyText}>when you get home</Text>
          <Text style={styles.bodyText}>so that you do not</Text>
          <Text style={styles.bodyText}>have to.</Text>
        </View>
        <TouchableOpacity onPress={() => {console.log(fbapp.auth().currentUser.uid);}}
                          style={styles.button}>
          <Text style={styles.buttonText}>Finish Setup</Text>
        </TouchableOpacity>
        <Image style={styles.dingoCircle}
               source={require('./img/dingo_circle.png')} />
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
  header: {
    flex: 1
  },
  body: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: window.height / 8,
  },
  headerText: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 28,
    alignSelf: 'flex-end',
    marginTop: window.height / 14,
    marginRight: 10,
  },
  bodyText: {
    color: '#171797',
    fontFamily: 'Avenir',
    fontSize: 20,
    fontStyle: 'italic',
  },
  dingoCircle: {
    position: 'absolute',
    marginTop: window.height / 8,
    marginLeft: 20,
    width: 80,
    height: 80,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    top: window.height / 3 * 2,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#171797',
    width: window.width / 2,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: '#000000',
  },
  buttonText: {
    color: '#ffffff',
  },
});
module.exports = FacebookLoginScreen;
