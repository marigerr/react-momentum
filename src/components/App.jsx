import React from 'react';
import SettingsIcon from 'Settings/SettingsIcon.jsx';
import SettingsModal from 'Settings/SettingsModal.jsx';
import TopLeft from 'Components/TopLeft.jsx';
import Wallpaper from 'Components/Wallpaper.jsx';
import WallpaperInfo from 'Components/WallpaperInfo.jsx';
import Weather from 'Components/Weather.jsx';
import Center from 'Components/center/Center.jsx';
import Quote from 'Components/random-quote/Quote.jsx';
import ToDoList from 'Components/toDo/ToDoList.jsx';
import AskInput from 'Components/askInput.jsx';
import 'Stylesheets/index.css';
import { initializeLocalStorage, localStorageKeyExists, addToLocalStorage, getFromLocalStorage } from 'Scripts/utilities';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorageKeyExists('localStorageInitialized')) {
      initializeLocalStorage();
    }
    const savedUsername = localStorageKeyExists('username');
    const username = getFromLocalStorage('username');
    const userSettings = getFromLocalStorage('userSettings');

    this.state = {
      usernameStatus: {
        username: savedUsername === true ? username : '',
        existName: savedUsername,
        askName: 'Hello, what\'s your name?',
      },
      askNameStyle: {
        label: 'askName-label',
        input: 'askName-input',
      },
      showFeatures: userSettings.showFeatures,
    };
  }

  addInput(e) {
    if (e.key === 'Enter') {
      addToLocalStorage('username', this.state.usernameStatus.username);
      this.setState({
        usernameStatus: {
          existName: true,
        },
      });
    }
  }

  updateInputValue(e) {
    this.setState({
      usernameStatus: {
        username: e.target.value,
        existName: false,
        askName: 'Hello, what\'s your name?',
      },
    });
  }

  toggleSettingsModal() {
    this.setState({
      showSettingsModal: !this.state.showSettingsModal,
    });
  }

  toggleFeature(e) {
    const feature = e.target.id;
    const userSettings = getFromLocalStorage('userSettings');
    userSettings.showFeatures[feature] = !this.state.showFeatures[feature];
    addToLocalStorage('userSettings', userSettings);
    this.setState({
      showFeatures: userSettings.showFeatures,
    });
  }

  updateWallpaperInfo(wallpaperData) {
    this.setState({
      wallpaperData,
    });
  }

  render() {
    if (this.state.usernameStatus.existName) {
      return (
        <main id="main">
          <Wallpaper updateWallpaperInfo={this.updateWallpaperInfo.bind(this)} />
          {this.state.showSettingsModal &&
            <SettingsModal
              closeModal={this.toggleSettingsModal.bind(this)}
              toggleFeature={e => this.toggleFeature(e)}
              showFeatures={this.state.showFeatures}
            />
          }
          <div className="row top-row">
            <div className="top-left-flex">
              <SettingsIcon toggleSettingsModal={this.toggleSettingsModal.bind(this)} />
              <TopLeft
                showFeatures={this.state.showFeatures}
              />
            </div>
            {this.state.showFeatures.showWeather && <Weather />}
          </div>
          <div className="row middle-row">
            <Center showFocus={this.state.showFeatures.showFocus} />
          </div>
          <div className="row bottom-row">

            {this.state.wallpaperData &&
              <WallpaperInfo wallpaperData={this.state.wallpaperData} /> }
            {this.state.showFeatures.showQuote && <Quote />}
            <div className="todo-list-container">
              {this.state.showFeatures.showTodo && <ToDoList />}
            </div>
          </div>
        </main>
      );
    }
    return (
      <main id="main">
        <Wallpaper updateWallpaperInfo={this.updateWallpaperInfo.bind(this)} />
        <div className="row top-row">
        </div>
        <div className="row middle-row">
          <AskInput
            labelStyle={this.state.askNameStyle.label}
            inputStyle={this.state.askNameStyle.input}
            addInput={e => this.addInput(e)}
            updateInputValue={e => this.updateInputValue(e)}
            value={this.state.usernameStatus.username}
            askInput={this.state.usernameStatus.askName}
          />
        </div>
        <div className="row bottom-row">
          {this.state.wallpaperData &&
            <WallpaperInfo wallpaperData={this.state.wallpaperData} /> }
        </div>
      </main>
    );
  }
}

