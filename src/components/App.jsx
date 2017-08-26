import React from 'react';
import TopLeft from 'Components/TopLeft.jsx';
import Wallpaper from 'Components/Wallpaper.jsx';
import Weather from 'Components/Weather.jsx';
import Center from 'Components/center/Center.jsx';
import Quote from 'Components/random-quote/Quote.jsx';
import ToDoList from 'Components/ToDoList.jsx';
import AskInput from 'Components/askInput.jsx';
import { getUnsplashPhoto } from 'Scripts/apiCalls';
import 'Stylesheets/index.css';
import { getCurrentTime, initializeLocalStorage, localStorageKeyExists, addToLocalStorage, getFromLocalStorage, isNotANewDay, objIsInArray } from 'Scripts/utilities';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const savedUsername = localStorageKeyExists('username');
    const username = getFromLocalStorage('username');
    if (!localStorageKeyExists('localStorageInitialized')) {
      initializeLocalStorage();
    }
    const haveTodaysPhoto = isNotANewDay(localStorage.wallpaperTimestamp, getCurrentTime());
    if (haveTodaysPhoto) {
      const wallpaperData = getFromLocalStorage('wallpaper');
      this.state = {
        wallpaperData,
        divStyle: {
          backgroundImage: `url(${wallpaperData.urls.full})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no - repeat',
          backgroundSize: 'cover',
        },
        haveTodaysPhoto: true,
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
    } else {
      this.state = {
        divStyle: {},
        haveTodaysPhoto: false,
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
  }

  componentDidMount() {
    if (!this.state.haveTodaysPhoto) {
      getUnsplashPhoto()
        .then((result) => {
          const wallpaperData = result.data;
          wallpaperData.wallpaperLiked = localStorageKeyExists('wallpaper') &&
            objIsInArray(getFromLocalStorage('arrLikedWallpapers'), 'id', wallpaperData.id);
          console.log('wallpaperData.wallpaperLiked', wallpaperData.wallpaperLiked);
          this.setState({
            wallpaperData,
            divStyle: {
              backgroundImage: `url(${wallpaperData.urls.full})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no - repeat',
              backgroundSize: 'cover',
            },
          });
          addToLocalStorage('wallpaper', wallpaperData);
          addToLocalStorage('wallpaperTimestamp', getCurrentTime());
        });
    }
  }

  addInput(e) {
    if (e.key === 'Enter') {
      addToLocalStorage('username', this.state.usernameStatus.username);
      const wallpaperData = getFromLocalStorage('wallpaper');
      this.setState({
        wallpaperData,
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

  render() {
    if (this.state.usernameStatus.existName) {
      return (
        <main id="main" style={this.state.divStyle}>
          <div className="row top-row">
            <TopLeft/>
            <Weather/>
          </div>
          <div className="row middle-row">
            <Center/>
          </div>
          <div className="row bottom-row">

            { this.state.wallpaperData &&

              <Wallpaper
                location={ this.state.wallpaperData.location }
                photographer={ this.state.wallpaperData.user }
                id={this.state.wallpaperData.id}
                urls={this.state.wallpaperData.urls}
                wallpaperLiked={this.state.wallpaperData.wallpaperLiked} />

            }
            <Quote/>
            <ToDoList/>
          </div>
        </main>
      );
    }
    return (
      <main id="main" style={this.state.divStyle}>
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

          { this.state.wallpaperData &&

            <Wallpaper
              location={ this.state.wallpaperData.location }
              photographer={ this.state.wallpaperData.user }
              id={this.state.wallpaperData.id}
              urls={this.state.wallpaperData.urls}
              wallpaperLiked={this.state.wallpaperData.wallpaperLiked} />

          }

        </div>
      </main>
    );
  }
}

