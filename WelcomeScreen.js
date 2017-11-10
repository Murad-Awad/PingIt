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

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.welcomeText}>to Dingo.</Text>
            <Image style = {styles.welcomePhoto}
                   source={require('./dingotransparent.png')} />
            <Text style={styles.welcomeDescription}>Let{`'`}s make sure</Text>
            <Text style={styles.welcomeDescription}>your friends get</Text>
            <Text style={styles.welcomeDescription}>home safe.</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>JOIN THE PACK</Text>
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
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    paddingTop: 80,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  welcomeText: {
    alignItems: 'center',
    fontSize: 54,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  welcomePhoto: {
    marginTop: 40,
    marginBottom: 40,
    width: 92,
    height: 137,
  },
  welcomeDescription: {
    color: '#fff',
    fontSize: 28,
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
});
