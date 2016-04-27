import React, { Component } from 'react-native';
import _ from 'underscore';

import LoadingScreen from './loading-screen';
import HomeScreen from './home-screen';
import { getGroupInfo, getGroupEvents } from './api';

const sideEffect = fn => data => {
  fn(data);
  return data;
};

const mapEvent = e => {
  return {
    name: e.name,
    description: e.description,
    date: new Date(e.time),
    headcount: e.yes_rsvp_count,
    id: e.id,
    venue: e.venue.name
  };
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      loadingMessage: 'loading meetup details'
    };

    getGroupInfo('BristolJS')
      .then(sideEffect(d => {
        this.setState({
          loadingMessage: 'loading event listings',
          group: {
            members: d.members
          }
        });
      }))
      .then(() => getGroupEvents('BristolJS', 'upcoming,past'))
      .then(d => {
        this.setState({
          loading: false,
          group: {
            events: _.sortBy(d.results.map(mapEvent), e => -e.date)
          }
        });
      })
      .catch(console.error);
  }
  render() {
    return this.state.loading
      ? <LoadingScreen message={this.state.loadingMessage}/>
      : <HomeScreen group={this.state.group}/>;
  }
}

module.exports = App;
