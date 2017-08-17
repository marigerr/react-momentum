import React from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

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
        wallpaperAttribution: titleCase(`Photo by: ${wallpaperData.user.first_name} ${wallpaperData.user.last_name}`),
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
          this.setState({
            wallpaperAttribution: titleCase(`Photo by: ${result.data.user.first_name} ${result.data.user.last_name}`),
            wallpaperLocation: titleCase(`${result.data.location.title}`),
          });

          addToLocalStorage('wallpaper', result.data);
          addToLocalStorage('wallpaperTimestamp', getCurrentTime());
          this.props.transferDataChildtoParent(result);
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
        <div id="photo-author-location">
          <div>{this.state.wallpaperAttribution}</div>
          <div>{this.state.wallpaperLocation}</div>
        </div>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}

// Wallpaper.propTypes = {
//   callbackFromParent: PropTypes.func,
// };

