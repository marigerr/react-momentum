import React from 'react';
import GeneralSettings from 'Settings/settings-tabs/GeneralSettings.jsx';
import ToDoSettings from 'Settings/settings-tabs/ToDoSettings.jsx';
import BackgroundSettings from 'Settings/settings-tabs/BackgroundSettings.jsx';
import QuotesSettings from 'Settings/settings-tabs/QuotesSettings.jsx';
import BalanceSettings from 'Settings/settings-tabs/BalanceSettings.jsx';
import About from 'Settings/settings-tabs/About.jsx';
import './css/settings.css';

export default class SettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      generalSettings: true,
      toDoSettings: false,
      backgroundSettings: false,
      quotesSettings: false,
      balanceSettings: false,
      aboutPane: false,
      showFeatures: this.props.showFeatures,
      options: this.props.options,
      selected: 'generalSettings',
    };
  }

  changeTab(e) {
    const targetPane = e.target.id;
    this.setState({
      generalSettings: false,
      toDoSettings: false,
      backgroundSettings: false,
      quotesSettings: false,
      balanceSettings: false,
      aboutPane: false,
    }, () => {
      this.setState({
        [targetPane]: true,
        selected: targetPane,
      });
    });
  }

  isActive(value) {
    return `menu-${(value === this.state.selected) ? 'active' : 'default'}`;
  }


  render() {
    return (
      <div className="settings-modal">
        <div className="settings-panes">
          <div className="settings-side-menu">
            <ul>
              <li id="generalSettings" className={this.isActive('generalSettings')} onClick={this.changeTab.bind(this)}>General</li>
              <li id="toDoSettings" className={this.isActive('toDoSettings')} onClick={this.changeTab.bind(this)}>ToDo</li>
              <li id="backgroundSettings" className={this.isActive('backgroundSettings')} onClick={this.changeTab.bind(this)}>Background</li>
              <li id="quotesSettings" className={this.isActive('quotesSettings')} onClick={this.changeTab.bind(this)}>Quotes</li>
              <li id="balanceSettings" className={this.isActive('balanceSettings')} onClick={this.changeTab.bind(this)}>Balance</li>
              <li id="aboutPane" className={this.isActive('aboutPane')} onClick={this.changeTab.bind(this)}>About</li>
            </ul>
          </div>
          <div className="settings-main-pane">
            {this.state.generalSettings && <GeneralSettings
              toggleFeature={this.props.toggleFeature.bind(this)}
              showFeatures={this.state.showFeatures}
              options={this.state.options}
              changeOption={this.props.changeOption.bind(this)} />}
            {this.state.toDoSettings && <ToDoSettings />}
            {this.state.backgroundSettings && <BackgroundSettings />}
            {this.state.quotesSettings &&
              <QuotesSettings
                toggleLike={this.props.toggleLike.bind(this)}
                options={this.state.options}
                changeOption={this.props.changeOption.bind(this)}
                displayFavQuote={this.props.displayFavQuote.bind(this)}
                quote={this.props.quote}
                arrLikedQuotes={this.props.arrLikedQuotes}
              />}
            {this.state.balanceSettings && <BalanceSettings />}
            {this.state.aboutPane && <About />}
          </div>
          <div className="close" onClick={this.props.closeModal.bind(this)}>&times;</div>
        </div>
      </div>
    );
  }
}

