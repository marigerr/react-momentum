import React from 'react';
import { getCurrentTime, localStorageKeyExists, addToLocalStorage, getFromLocalStorage, isNotANewDay, objIsInArray } from 'Scripts/utilities';
import { getUnsplashPhoto } from 'Scripts/apiCalls';
import 'Stylesheets/wallpaper.css';
import 'Images/photo-1476616853026-24c1f0309646.jpg';
import 'Images/photo-1476616853026-24c1f0309646-thumb.jpg';

export default class WallpaperInfo extends React.Component {
  constructor(props) {
    super(props);
    const haveTodaysPhoto = isNotANewDay(localStorage.wallpaperTimestamp, getCurrentTime());
    if (localStorage.wallpaperTimestamp === '0' || haveTodaysPhoto) {
      this.state = {
        wallpaperData: props.wallpaperData,
        haveTodaysPhoto: true,
        showThumb: true,
      };
      if (localStorage.wallpaperTimestamp === '0') addToLocalStorage('wallpaperTimestamp', getCurrentTime());
      this.preLoadImages(this.props.wallpaperData.urls.regular, this.props.wallpaperData.urls.thumb);
    } else {
      this.state = {
        divStyle: {},
        haveTodaysPhoto: false,
        showThumb: true,
      };
    }
  }

  preLoadImages(regularPic, thumbnail) {
    // 1: load lowres and show it
    const img = new Image();
    img.src = thumbnail;
    img.onload = () => {
      this.setState({
        thumbdDivStyle: {
          backgroundImage: `url(${img.src})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        },
      });
      this.props.showText();
    };

    // 2: load large image
    const imgLarge = new Image();
    imgLarge.src = regularPic;
    imgLarge.onload = () => {
      this.setState({
        divStyle: {
          backgroundImage: `url(${imgLarge.src})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        },
        showThumb: false,
      });
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wallpaperData && this.state.wallpaperData.id !== nextProps.wallpaperData.id) {
      this.setState({
        wallpaperData: nextProps.wallpaperData,
      });
      this.preLoadImages(nextProps.wallpaperData.urls.regular, nextProps.wallpaperData.urls.thumb);
    }
  }

  componentDidMount() {
    if (!this.state.haveTodaysPhoto) {
      getUnsplashPhoto()
        .then((result) => {
          const wallpaperData = result.data;
          wallpaperData.wallpaperLiked = localStorageKeyExists('wallpaper') &&
            objIsInArray(getFromLocalStorage('arrLikedWallpapers'), 'id', wallpaperData.id);
          this.preLoadImages(wallpaperData.urls.regular, wallpaperData.urls.thumb);
          this.setState({
            wallpaperData,
          });
          addToLocalStorage('wallpaper', wallpaperData);
          addToLocalStorage('wallpaperTimestamp', getCurrentTime());
          this.props.updateWallpaperInfo(wallpaperData);
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            divStyle: {
              backgroundImage: 'url(./assets/images/photo-1476616853026-24c1f0309646.jpg)',
            },
          });
        });
    }
  }


  render() {
    if (this.state.showThumb) {
      return (
        <div className="wallpaper-container" style={this.state.thumbdDivStyle}>
        </div>
      );
    }
    return (
      <div className="wallpaper-container" style={this.state.divStyle}>
      </div>
    );
  }
}
