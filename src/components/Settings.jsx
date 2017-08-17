import React from 'react';
import 'Stylesheets/settings.css';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: 'Settings',
    };
  }

  render() {
    return (
      <div className="bottom-left">
        <div>{this.state.settings}</div>
      </div>
    );
  }
}
