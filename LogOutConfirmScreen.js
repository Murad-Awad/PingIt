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
        <Image style = {styles.dingo}
               source={require('./dingotransparent.png')} />
        <Text style={styles.logText}>You are about to log out.</Text>
        <Text style={styles.logText}>Are you sure?</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('LogOut')}>
          <View style={styles.logOutButton}>
            <Text style={styles.logOutText}>LOG OUT</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelText}>CANCEL</Text>
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
    backgroundColor: '#C4C4C4',
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
  },
  logText: {
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  dingo: {
    marginTop: 40,
    marginBottom: 20,
    width: 92,
    height: 137,
  },
  logOutButton: {
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
  cancelButton: {
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
  logOutText: {
    color: '#171797',
  },
  cancelText: {
    color: '#FFFFFF',
  },
});
