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
import { initializeLocalStorage, localStorageKeyExists, addToLocalStorage, getFromLocalStorage, updateLocalStorageObjProp, addToLocalStorageArray, removeFromLocalStorageArray } from 'Scripts/utilities';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorageKeyExists('localStorageInitialized')) {
      initializeLocalStorage();
    }
    const savedUsername = localStorageKeyExists('username');
    const username = getFromLocalStorage('username');
    const userSettings = getFromLocalStorage('userSettings');
    const currentQuote = getFromLocalStorage('quote') || {};
    const arrLikedQuotes = getFromLocalStorage('arrLikedQuotes') || [];

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
      currentQuote,
      arrLikedQuotes,
      showFeatures: userSettings.showFeatures,
      options: userSettings.options,
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

  changeOption(e) {
    const optionArr = e.target.id.split('-');
    const userSettings = getFromLocalStorage('userSettings');
    userSettings.options[optionArr[0]] = optionArr[1];
    addToLocalStorage('userSettings', userSettings);
    this.setState({
      options: userSettings.options,
    });
  }

  updateQuoteInfo(currentQuote) {
    this.setState({
      currentQuote,
    });
  }

  displayFavQuote(currentDisplayedQuote, selectedQuoteId) {
    if (currentDisplayedQuote.id !== selectedQuoteId) {
      const newDisplayQuote = this.state.arrLikedQuotes.find(quote => quote.id === selectedQuoteId);
      const currentQuote = newDisplayQuote;
      addToLocalStorage('quote', newDisplayQuote);
      this.setState({
        currentQuote,
      });
    }
  }

  toggleLike(likeStatus, quoteId) {
    const currentQuote = updateLocalStorageObjProp('quote', 'liked', likeStatus);
    if (currentQuote.id === quoteId) {
      this.setState({ currentQuote }, () => {
        if (likeStatus) {
          const arrLikedQuotes = addToLocalStorageArray('arrLikedQuotes', this.state.currentQuote);
          this.setState({
            arrLikedQuotes,
          });
        } else {
          const arrLikedQuotes = removeFromLocalStorageArray('arrLikedQuotes', 'id', quoteId);
          this.setState({
            arrLikedQuotes,
          });
        }
      });
    } else {
      const arrLikedQuotes = removeFromLocalStorageArray('arrLikedQuotes', 'id', quoteId);
      this.setState({
        arrLikedQuotes,
      });
    }
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
              options={this.state.options}
              changeOption={e => this.changeOption(e)}
              toggleLike={this.toggleLike.bind(this)}
              displayFavQuote={this.displayFavQuote.bind(this)}
              quote={this.state.currentQuote}
              arrLikedQuotes={this.state.arrLikedQuotes}
            />
          }
          <div className="row top-row">
            <div className="top-left-flex">
              <SettingsIcon toggleSettingsModal={this.toggleSettingsModal.bind(this)} />
              <TopLeft showFeatures={this.state.showFeatures} />
            </div>
            <Weather
              showWeather={this.state.showFeatures.showWeather}
              tempScale={this.state.options.tempScale}
            />
          </div>
          <div className="row middle-row">
            <Center
              showFocus={this.state.showFeatures.showFocus}
              clockFormat={this.state.options.clockFormat} />
          </div>
          <div className="row bottom-row">
            {this.state.wallpaperData &&
              <WallpaperInfo wallpaperData={this.state.wallpaperData} /> }
            {this.state.showFeatures.showQuote &&
              <Quote
                updateQuoteInfo={this.updateQuoteInfo.bind(this)}
                toggleLike={this.toggleLike.bind(this)}
                quote={this.state.currentQuote}
                quoteFrequency={this.state.options.quoteFrequency}
              />
            }
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

