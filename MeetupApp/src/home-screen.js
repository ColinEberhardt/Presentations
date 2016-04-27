import React, {
  NavigatorIOS,
  StyleSheet,
  Text
} from 'react-native';

import EventsList from './events-list';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const HomeScreen = (props) =>
  <NavigatorIOS
    style={styles.container}
    barTintColor='#E0393E'
    titleTextColor='white'
    tintColor='white'
    initialRoute={{
      title: 'Bristol JS',
      component: EventsList,
      passProps: props
    }}/>;

module.exports = HomeScreen;
