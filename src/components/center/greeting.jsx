import React, { Component } from 'react';
import 'Stylesheets/center.css';
import { localStorageKeyExists, getFromLocalStorage } from 'Scripts/utilities';

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeGreeting: this.typeGreeting(),
    };
  }

  typeGreeting() {
    const hrs = new Date().getHours();
    switch (true) {
      case (hrs >= 0 && hrs < 12):
        return 'Good morning';
      case (hrs >= 12 && hrs < 18):
        return 'Good afternoon';
      case (hrs >= 18 && hrs <= 23):
        return 'Good evening';
      default:
        return 'Hello';
    }
  }

  updateGreetingType() {
    this.setState({ typeGreeting: this.typeGreeting() });
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
