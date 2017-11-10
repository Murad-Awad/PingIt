import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button
} from 'react-native';

export default class FeedbackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')}>
          <Image style = {styles.backButton}
                 source={require('./img/back.png')} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.header}>CONTACT US</Text>
          <Text style={styles.description}>Let us know how we can help.</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedbackDone')}>
            <View style={styles.submitButton}>
              <Text style={styles.submitText}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
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
    padding: 30,
  },
  content: {
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    fontSize: 40,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#fff',
  },
  homePhoto: {
    marginTop: 40,
    width: 92,
    height: 137,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  submitButton: {
    marginTop: 30,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    width: window.width / 2,
    alignItems: 'center',
  },
  submitText: {
    color: '#171797',
  },
});
