import React from 'react';
import ReactDOM from 'react-dom';
import 'Src/manifest.json';
import 'Src/index.html';
import 'Stylesheets/index.css';
import 'Images/sea-turtle16.png';
import 'Images/sea-turtle128.png';
import Weather from 'Components/Weather.jsx';
import TopLeft from 'Components/TopLeft.jsx';
import Center from 'Components/Center.jsx';
import BottomLeft from 'Components/BottomLeft.jsx';
import Quote from 'Components/Quote.jsx';
import ToDoList from 'Components/ToDoList.jsx';
import { getCurrentTime, getUserLocation } from 'Scripts/utilities';

if (getCurrentTime() - localStorage.userLocationTimestamp < 60000) {
  ReactDOM.render(<Weather />, document.getElementById('top-right-weather'));
} else {
  getUserLocation().then(() => {
    ReactDOM.render(<Weather />, document.getElementById('top-right-weather'));
  });
}

ReactDOM.render(<TopLeft />, document.getElementById('top-left'));
ReactDOM.render(<Center />, document.getElementById('center'));
ReactDOM.render(<BottomLeft />, document.getElementById('bottom-left'));
ReactDOM.render(<Quote />, document.getElementById('quote'));
ReactDOM.render(<ToDoList />, document.getElementById('to-do-list'));
