import React from 'react';
// import SettingsIcon from 'Settings/SettingsIcon.jsx';
import 'Stylesheets/top-left.css';
import 'Images/settings.svg';
import 'Images/chrome.svg';
import 'Images/search.svg';
import 'Images/nine-squares.svg';


export default class TopLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      showSearch: this.props.showFeatures.showSearch,
      showChromeTab: this.props.showFeatures.showChromeTab,
      showApps: this.props.showFeatures.showApps,
    };
  }

  showSearchInput() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  googleSearch(e) {
    if (e.key === 'Enter') {
      const searchString = this.state.inputValue.split(' ').join('+');
      chrome.tabs.update({ url: `http://www.google.com/search?q=${searchString}` });
    }
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showChromeTab: nextProps.showFeatures.showChromeTab,
      showApps: nextProps.showFeatures.showApps,
      showSearch: nextProps.showFeatures.showSearch,
    });
  }


  render() {
    return (
      <div>
        {this.state.showChromeTab &&
        <a href="#" id="chrome-tab-link" title="Chrome Tab" onClick={openChromeTab}><img className="icon-top-left" src="./assets/images/chrome.svg" alt="Chrome Tab" /></a>
        }
        {this.state.showApps &&
        <a href="#" id="chrome-apps-link" title="Apps" onClick={openChromeApps}><img className="icon-top-left" src="./assets/images/nine-squares.svg" alt="Chrome Apps" /></a>
        }
        {this.state.showSearch &&
        <a href="#" id="chrome-search-link" onClick={this.showSearchInput.bind(this)} title="Search"><img className="icon-top-left" src="./assets/images/search.svg" alt="Search" /></a>
        }
        {this.state.isHidden &&
          <input type="text" id="chrome-search-input" value={this.state.inputValue} onChange={this.updateInputValue.bind(this)} autoFocus name="search" onKeyPress={this.googleSearch.bind(this)} />
        }
      </div>
    );
  }
}

function openChromeTab() {
  chrome.tabs.update({ url: 'chrome-search://local-ntp/local-ntp.html' });
}

function openChromeApps() {
  chrome.tabs.update({ url: 'chrome://apps/' });
}
