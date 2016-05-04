import React, {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import vagueTime from 'vague-time';

const formatTime = time => vagueTime.get({
  from: new Date(),
  to: time
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: {
    fontSize: 25,
    flex: 2.5,
    fontWeight: 'bold'
  },
  date: {
    flex: 1,
    textAlign: 'left'
  },
  verticalStack: {
    flex: 2.5,
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});

const EventListItem = props =>
  <TouchableHighlight onPress={() => props.eventClicked(props.event)}
            underlayColor='#dddddd'>
    <View style={styles.container}>
      <Text style={styles.date}>
        {formatTime(props.event.date)}
      </Text>
      <View style={styles.verticalStack}>
        <Text>{props.event.venue}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {props.event.name}
        </Text>
        <Text>{props.event.headcount} members</Text>
      </View>
    </View>
  </TouchableHighlight>;

module.exports = EventListItem;
