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

export default class ProgressScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.progressText}>Heading home...</Text>
        <Image style = {styles.dingo}
               source={require('./img/dingotransparent.png')} />

        <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')}>
         <View style={styles.cancelButton}>
           <Text style={styles.cancelText}>Cancel</Text>
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
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
  },
  progressText: {
    marginTop: 50,
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  dingo: {
    marginTop: 40,
    marginBottom: 20,
    width: 82,
    height: 122,
  },
  cancelButton: {
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
  cancelText: {
    color: '#171797',
    fontSize: 15
  },
});
