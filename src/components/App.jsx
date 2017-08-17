import React from 'react';
import TopLeft from 'Components/TopLeft.jsx';
import Wallpaper from 'Components/Wallpaper.jsx';
import Weather from 'Components/Weather.jsx';
import Center from 'Components/Center.jsx';
import Settings from 'Components/Settings.jsx';
import Quote from 'Components/random-quote/Quote.jsx';
import ToDoList from 'Components/ToDoList.jsx';
import { getCurrentTime, isNotANewDay, localStorageKeyExists, getFromLocalStorage } from 'Scripts/utilities';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    const haveDaysPhoto = localStorageKeyExists('wallpaper') && isNotANewDay(localStorage.wallpaperTimestamp, getCurrentTime());

    if (haveDaysPhoto) {
      const wallpaperData = getFromLocalStorage('wallpaper');
      console.log(wallpaperData);
      this.state = {
        divStyle: {
          backgroundImage: `url(${wallpaperData.urls.full})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no - repeat',
          backgroundSize: 'cover',
        },
      };
    } else {
      this.state = {
        divStyle: {},
      };
    }
  }

  wallpaperDataCallback(wallpaperData) {
    console.log('in parent callback', wallpaperData);
    const imgUrl = wallpaperData.data.urls.full;

    this.setState({
      divStyle: {
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no - repeat',
        backgroundSize: 'cover',
      },
    });
  }

  render() {
    return (
      <main id="main" style={this.state.divStyle}>
        <div className="row top-row">
          <TopLeft/>
          <Weather/>
        </div>
        <Wallpaper transferDataChildtoParent={this.wallpaperDataCallback.bind(this)} />
        <div className="row middle-row">
          <Center/>
        </div>
        <div className="row bottom-row">
          <Settings/>
          <Quote/>
          <ToDoList/>
        </div>
      </main>
    );
  }
}

