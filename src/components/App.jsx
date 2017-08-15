import React from 'react';
import axios from 'axios';
import TopLeft from 'Components/TopLeft.jsx';
import Weather from 'Components/Weather.jsx';
import Center from 'Components/Center.jsx';
import Settings from 'Components/Settings.jsx';
import Quote from 'Components/Quote.jsx';
import ToDoList from 'Components/ToDoList.jsx';
import { titleCase, getCurrentTime, localStorageKeyExists, addToLocalStorage, getFromLocalStorage, isNotANewDay } from 'Scripts/utilities';

export default class Wallpaper extends React.Component {
  constructor(props) {
    super(props);
    if (localStorageKeyExists('wallpaper')) {
      const wallpaperData = getFromLocalStorage('wallpaper');

      this.state = {
        divStyle: {
          backgroundImage: `url(${wallpaperData.urls.full})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no - repeat',
          backgroundSize: 'cover',
        },
        wallpaperAttribution: titleCase(`${wallpaperData.user.first_name} ${wallpaperData.user.last_name}`),
        wallpaperLocation: titleCase(`${wallpaperData.location.title}`),
      };
    }
  }

  componentDidMount() {
    const haveDaysPhoto = this.state && isNotANewDay(localStorage.wallpaperTimestamp, getCurrentTime());

    if (!haveDaysPhoto) {
      const unsplashBaseUrl = 'https://api.unsplash.com/photos/random?';
      const myClientId = 'client_id=4469e676a2a92f3481a1546533824178cbf5eed9d773394924d93a70e77c6ab8';
      const collectionNumber = 'collections=1065861';
      const urlString = [unsplashBaseUrl, myClientId, collectionNumber].join('&');
      axios.get(urlString)
        .then((result) => {
          console.log(result);
          const imgUrl = result.data.urls.full;
          this.setState({
            divStyle: {
              backgroundImage: `url(${imgUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no - repeat',
              backgroundSize: 'cover',
            },
            wallpaperAttribution: titleCase(`${result.data.user.first_name} ${result.data.user.last_name}`),
            wallpaperLocation: titleCase(`${result.data.location.title}`),
          });

          addToLocalStorage('wallpaper', result.data);
          addToLocalStorage('wallpaperTimestamp', getCurrentTime());
          //   // console.log(response.location.hasOwnProperty("country"));
          //   // if (typeof response.location.city != 'undefined' ) {
          //   //   $("#wallpaper-location").text(response.location.city);
          //   // }
        });
    }
  }

  render() {
    if (this.state) {
      return (
        <main id="main" style={this.state.divStyle}>
          <div className="row top-row">
            <TopLeft/>
            <Weather/>
          </div>
          <div id="photo-author-location">
            <div>{this.state.wallpaperAttribution}</div>
            <div>{this.state.wallpaperLocation}</div>
          </div>
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
    return (
      <div>Loading...</div>
    );
  }
}

