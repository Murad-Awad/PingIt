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
var SelectLocation = require('./map.js');

export default class AddFriends extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Add Your Friends!</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
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
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff',
  },
  button: {
    margin: 20,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    width: window.width / 2,
    alignItems: 'center',
  },
  buttonText: {
    color: '#171797',
    fontSize: 16
  },
})
module.exports = AddFriends;