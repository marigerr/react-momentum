import React from 'react';
import 'Stylesheets/top-left.css';
import 'Images/chrome-grey.svg';
import 'Images/search-grey.svg';
import 'Images/nine-squares-grey.svg';


export default class TopLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  openChromeTab() {
    chrome.tabs.update({ url: 'chrome-search://local-ntp/local-ntp.html' });
  }

  openChromeApps() {
    chrome.tabs.update({ url: 'chrome://apps/' });
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


  render() {
    return (
      <div className="top-left-flex">
        <a href="#" id="chrome-tab-link" title="Chrome Tab" onClick={this.openChromeTab.bind(this)}><img className="icon-top-left" src="./assets/images/chrome-grey.svg" alt="Chrome Tab"/></a>

        <a href="#" id="chrome-apps-link" title="Apps" onClick={this.openChromeApps.bind(this)}><img className="icon-top-left" src="./assets/images/nine-squares-grey.svg" alt="Chrome Apps"/></a>

        <a href="#" id="chrome-search-link" onClick={this.showSearchInput.bind(this)} title="Search"><img className="icon-top-left" src="./assets/images/search-grey.svg" alt="Search"/></a>
        {this.state.isHidden && <input type="text" id="chrome-search-input" value={this.state.inputValue} onChange={this.updateInputValue.bind(this)} autoFocus name="search" onKeyPress={this.googleSearch.bind(this)}/>}
      </div>
    );
  }
}
