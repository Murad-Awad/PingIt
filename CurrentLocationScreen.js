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

export default class CurrentLocationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate('Sidebar')}
          style={styles.footer}
          title='Back'
        />
        <Button
          onPress={() => this.props.navigation.navigate('AddLocation')}
          style={styles.footer}
          title='Change Location'
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
  searchText: {

  },
});
