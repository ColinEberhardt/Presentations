/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Text,
  View,
  TouchableHighlight
} = React;

var style = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 20,
    backgroundColor: '#4c9689',
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    color: 'white'
  }
}

class ClickCounterApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { numberOfClicks: 0 };
  }

  buttonClicked() {
    this.setState({ numberOfClicks: this.state.numberOfClicks + 1 });
  }

  render() {
    var buttonColor = this.state.numberOfClicks > 5 ? '#ed5f98' : '#9ccc65';
    style.button.backgroundColor = buttonColor;

    return (
      <View style={style.container}>
        <TouchableHighlight
                underlayColor={buttonColor}
                style={style.button}
                onPress={this.buttonClicked.bind(this)}>
          <Text style={style.text}>You have clicked me {this.state.numberOfClicks} times</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('ClickCounter', () => ClickCounterApp);
