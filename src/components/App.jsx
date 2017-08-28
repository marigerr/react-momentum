import React from 'react';
import TopLeft from 'Components/TopLeft.jsx';
import Wallpaper from 'Components/Wallpaper.jsx';
import WallpaperInfo from 'Components/WallpaperInfo.jsx';
import Weather from 'Components/Weather.jsx';
import Center from 'Components/center/Center.jsx';
import Quote from 'Components/random-quote/Quote.jsx';
import ToDoList from 'Components/ToDoList.jsx';
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
    };
  }

  addInput(e) {
    if (e.key === 'Enter') {
      addToLocalStorage('username', this.state.usernameStatus.username);
      this.setState({
        usernameStatus: {
          existName: true,
        },
      }, () => console.log(this.state));
      console.log('saved');
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

  updateWallpaperInfo(wallpaperData) {
    this.setState({
      wallpaperData,
    }, () => { console.log(this.state); });
  }

  render() {
    if (this.state.usernameStatus.existName) {
      return (
        <main id="main">
          <Wallpaper updateWallpaperInfo={this.updateWallpaperInfo.bind(this)} />
          <div className="row top-row">
            <TopLeft />
            <Weather />
          </div>
          <div className="row middle-row">
            <Center />
          </div>
          <div className="row bottom-row">
            {this.state.wallpaperData &&
              <WallpaperInfo wallpaperData={this.state.wallpaperData} /> }
            <Quote />
            <ToDoList />
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

