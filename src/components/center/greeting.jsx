import React, { Component } from 'react';
import 'Stylesheets/center.css';
import { localStorageKeyExists, getFromLocalStorage } from 'Scripts/utilities';

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeGreeting: this.typeGreeting(this.props.time),
    };
  }

  typeGreeting(time) {
    let currentGreeting = '';
    // console.log(time);
    // console.log(this.props);
    switch (true) {
      case (time >= '00:00' && time < '12:00'):
        currentGreeting = 'Good morning';
        return currentGreeting;
      case (time >= '12:00' && time < '18:00'):
        currentGreeting = 'Good afternoon';
        return currentGreeting;
      case (time >= '18:00' && time <= '23:59'):
        currentGreeting = 'Good evening';
        return currentGreeting;
      default:
        currentGreeting = 'Hello';
        return currentGreeting;
    }
  }

  updateGreetingType() {
    this.setState({ typeGreeting: this.typeGreeting(this.props.time) });
    // console.log(this.state.typeGreeting);
  }

  // update greeting every 20min
  componentDidMount() {
    setInterval(this.updateGreetingType.bind(this), 1200000);
  }

  render() {
    if (localStorageKeyExists('username')) {
      return (
        <div className="greeting">{`${this.state.typeGreeting}, ${getFromLocalStorage('username')}.`}</div>
      );
    }
    return (
      <div className="greeting">{this.state.typeGreeting}</div>
    );
  }
}

export default Greeting;
