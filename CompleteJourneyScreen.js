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

export default class CompleteJourneyScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.doneText}>Got home--</Text>
        <Text style={styles.doneText}>notified [Name]!</Text>
        <Image style = {styles.dingo}
               source={require('./dingotransparent.png')} />
        <Button
         onPress={() => this.props.navigation.navigate('HomeScreen')}
         style={styles.homeButton}
         title='Home -->'
        />
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
  doneText: {
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  dingo: {
    marginTop: 40,
    width: 92,
    height: 137,
  },
});