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

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'Notifications',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonAndHeader}>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')}>
              <Image style = {styles.backButton}
                     source={require('./img/back.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.notificationHeader}>Notifications</Text>
          </View>
        </View>
        <View style={styles.notifications}>
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
  rest: {
    alignItems: 'center',
    margin: 50,
  },
  notificationHeader: {
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  buttonAndHeader: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  backButton: {
    width: 24,
    height: 24,
    margin: 10,
    marginRight: 20,
  },
});
