import React from 'react';
import { updateLocalStorageObjProp, addToLocalStorageArray, removeFromLocalStorageArray, titleCase } from 'Scripts/utilities';
import LikeheartReusable from 'Components/LikeheartReusable.jsx';
import 'Stylesheets/wallpaper-info.css';

export default class WallpaperInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.wallpaperData;
  }

  toggleLike(likeStatus) {
    updateLocalStorageObjProp('wallpaper', 'wallpaperLiked', likeStatus);
    this.setState({ wallpaperLiked: likeStatus }, () => {
      if (likeStatus) {
        addToLocalStorageArray('arrLikedWallpapers', this.state);
      } else {
        removeFromLocalStorageArray('arrLikedWallpapers', 'id', this.state.id);
      }
    });
  }

  render() {
    const photographer = titleCase(`${this.state.user.first_name} ${this.state.user.last_name}`);
    const location = titleCase(`${this.state.location.title}`);
    const unsplashUTM = '?utm_source=turtle-team-5.surge.sh&utm_medium=referral&utm_campaign=api-credit';

    return (
      <div className="wallpaper-info-container">
        <div>{location}</div>
        <div className="photographer-container">
          <div>
            <a target='_blank' rel="noopener noreferrer" href={`${this.state.user.links.html}${unsplashUTM}`}>{photographer} / </a><a target='_blank' rel="noopener noreferrer" href={`https://unsplash.com${unsplashUTM}`}>Unsplash</a>
          </div>
          <LikeheartReusable
            toggleLike={this.toggleLike.bind(this)}
            liked={this.state.wallpaperLiked} />
        </div>
      </div>
    );
  }
}
