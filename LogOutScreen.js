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

export default class LogOutScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logText}>You have</Text>
        <Text style={styles.logText}>successfully</Text>
        <Text style={styles.logText}>logged out.</Text>
        <Image style = {styles.dingo}
               source={require('./dingotransparent.png')} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginConfirm')}>
          <Image style={styles.facebookButton}
                 source={require('./img/facebook_button.png')} />
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
  logText: {
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  dingo: {
    marginTop: 40,
    marginBottom: 20,
    width: 92,
    height: 137,
  },
  loginButton: {
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
  loginText: {
    color: '#171797',
  },
  facebookButton: {
    marginTop: 20,
    width: 200,
    height: 31,
  },
});
