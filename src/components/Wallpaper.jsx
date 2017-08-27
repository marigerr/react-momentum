import React from 'react';
import { getCurrentTime, localStorageKeyExists, addToLocalStorage, getFromLocalStorage, isNotANewDay, objIsInArray } from 'Scripts/utilities';
import { getUnsplashPhoto } from 'Scripts/apiCalls';
import 'Stylesheets/wallpaper.css';

export default class WallpaperInfo extends React.Component {
  constructor(props) {
    super(props);
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
    this.props.updateWallpaperInfo(this.state.wallpaperData);
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
          this.props.updateWallpaperInfo(wallpaperData);
        });
    }
  }


  render() {
    return (
      <div className="wallpaper-container" style={this.state.divStyle}>
      </div>
    );
  }
}
