import React, { Component } from 'react';
import 'Stylesheets/center.css';
import Greeting from 'Components/center/greeting.jsx';
import FocusToDo from 'Components/center/focusTodo.jsx';

export default class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.currentMinSecs(),
    };
  }

  currentMinSecs() {
    const currentTime = new Date();
    const hrs = currentTime.getHours().toString(10);
    const displayHrs = hrs.length === 1 ? `0${hrs}` : hrs;
    const min = currentTime.getMinutes().toString(10);
    const displayMin = min.length === 1 ? `0${min}` : min;
    const time = `${displayHrs}:${displayMin}`;
    return time;
    // console.log(currentTime);
    // console.log(hrs);
    // console.log(min);
    // console.log(displayHrs);
    // console.log(displayMin);
  }

  updateTime() {
    this.setState({ time: this.currentMinSecs() }, () => {
    });
  }

  componentDidMount() {
    setInterval(this.updateTime.bind(this), 1000);
  }

  render() {
    return (
      <div id="center">
        <div className="time">{this.state.time}</div>
        <Greeting
          time={this.state.time}
        />
        <FocusToDo />
      </div>
    );
  }
}
