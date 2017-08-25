import React from 'react';
import TopLeft from 'Components/TopLeft.jsx';
import Wallpaper from 'Components/Wallpaper.jsx';
import Weather from 'Components/Weather.jsx';
import Center from 'Components/Center.jsx';
import Quote from 'Components/random-quote/Quote.jsx';
import ToDoList from 'Components/ToDoList.jsx';
import { getUnsplashPhoto } from 'Scripts/apiCalls';
import 'Stylesheets/index.css';
import { getCurrentTime, initializeLocalStorage, localStorageKeyExists, addToLocalStorage, getFromLocalStorage, isNotANewDay, objIsInArray } from 'Scripts/utilities';

export default class App extends React.Component {
  constructor(props) {
    super(props);

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
      };
    } else {
      this.state = {
        divStyle: {},
        haveTodaysPhoto: false,
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

  render() {
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
}

