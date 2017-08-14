import React from 'react';
import 'Stylesheets/center.css';


export default class CenterLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 'Time',
      greeting: 'Greeting',
      mainFocus: 'Main Focus',

    };
  }

  render() {
    return (
      <div>
        <div>{this.state.time}</div>
        <div>{this.state.greeting}</div>
        <div>{this.state.mainFocus}</div>
      </div>
    );
  }
}
