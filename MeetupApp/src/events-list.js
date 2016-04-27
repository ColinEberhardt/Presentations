import React, {
  StyleSheet,
  Text,
  Component,
  ListView,
  View
} from 'react-native';

import EventListItem from './event-list-item';
import EventView from './event-view';

class EventsList extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.group.events)
    };
  }

  _renderRow(event) {
    return <EventListItem event={event} eventClicked={this._navigateToEvent.bind(this)}/>;
  }

  _navigateToEvent(event) {
    this.props.navigator.push({
      title: 'Event',
      component: EventView,
      passProps: {event}
    });
  }

  render() {
    return (
      <ListView
        pageSize={10}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}/>
    );
  }
}

module.exports = EventsList;
