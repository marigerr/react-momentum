import React from 'react';
import { updateLocalStorageObjProp, addToLocalStorageArray, removeFromLocalStorageArray, titleCase } from 'Scripts/utilities';
import LikeheartReusable from 'Components/LikeheartReusable.jsx';
import 'Stylesheets/wallpaper-info.css';

export default class Wallpaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentWillReceiveProps(nextProps) {
    this.setState = { nextProps };
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
    const photographer = titleCase(`By: ${this.state.photographer.first_name} ${this.state.photographer.last_name}`);
    const location = titleCase(`${this.state.location.title}`);

    return (
      <div className="wallpaper-info-container">
        <div>{location}</div>
        <div className="photographer-container">
          <div>{photographer}</div>
          <LikeheartReusable
            toggleLike={this.toggleLike.bind(this)}
            liked={this.state.wallpaperLiked} />
        </div>
      </div>
    );
  }
}
