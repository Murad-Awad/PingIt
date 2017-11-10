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

export default class FeedbackDoneScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainThanks}>Thank you for</Text>
        <Text style={styles.mainThanks}>your feedback!</Text>
        <Text style={styles.smallThanks}>We will take your feedback</Text>
        <Text style={styles.smallThanks}>and get to you shortly.</Text>
        <Image style = {styles.dingo}
               source={require('./dingotransparent.png')} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <View style={styles.homeButton}>
            <Text style={styles.homeText}>Home</Text>
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
    alignItems: 'center',
    padding: 30,
  },
  mainThanks: {
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  smallThanks: {
    color: '#fff',
  },
  dingo: {
    marginTop: 40,
    width: 76,
    height: 113,
  },
  homeButton: {
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
  homeText: {
    color: '#171797',
  },
});
