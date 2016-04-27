import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333'
  }
});

const LoadingScreen = props =>
  <View style={styles.container}>
    <Text style={styles.title}>
      Loading ...
    </Text>
    <Text style={styles.message}>
      {props.message}
    </Text>
  </View>;

module.exports = LoadingScreen;
