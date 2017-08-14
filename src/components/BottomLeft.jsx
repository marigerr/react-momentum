import React from 'react';
import 'Stylesheets/bottom-left.css';

export default class CenterLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: 'Settings',
      wallpaperDesc: 'Wallpaper Description',
      mainFocus: 'Main Focus',

    };
  }

  render() {
    return (
      <div className="bottom-left">
        <div>{this.state.settings}</div>
        <div>{this.state.wallpaperDesc}</div>
      </div>
    );
  }
}
