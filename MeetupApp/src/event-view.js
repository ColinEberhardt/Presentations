import React, {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import HTMLView from 'react-native-htmlview';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  childContainer: {
    margin: 10
  },
  title: {
    fontSize: 25,
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 20
  }
});

const EventView = props =>
  <ScrollView style={styles.container}>
    <View style={styles.childContainer}>
      <Text style={styles.title}>
        {props.event.name}
      </Text>
      <HTMLView value={props.event.description}/>
    </View>
  </ScrollView>;

module.exports = EventView;
