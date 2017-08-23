import React from 'react';
// import SettingsModal from 'Settings/SettingsModal.jsx';
import 'Images/settings.svg';
import './css/settings.css';


export default class SettingsIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <div>
        <a href="#" title="Settings" onClick={this.props.toggleSettingsModal.bind(this)}><img className="icon-top-left" src="./assets/images/settings.svg" alt="Settings" /></a>
      </div>
    );
  }
}

