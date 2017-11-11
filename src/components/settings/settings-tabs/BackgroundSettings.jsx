import React from 'react';
import Likeheart from 'Components/Likeheart.jsx';
import 'Images/technology.svg';
import '../css/backgroundSettings.css';

export default class BackgroundSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  wallpapersList(arrLikedWallpapers) {
    const wallpapersList = arrLikedWallpapers.map(wallpaper => (
      <div key={wallpaper.id} className="wallpaper-item">
        <img className="wallpaper-img" src={wallpaper.urls.small} />
        <div className="wallpaper-icons-container">
          <div className="transparency2" title="Remove">
            <Likeheart
              toggleLike={this.props.toggleLike.bind(this)}
              liked={wallpaper.wallpaperLiked}
              type='wallpaper'
              id={wallpaper.id} />
          </div>
          <div className="transparency2" title="Display" onClick={() => this.props.displayFavWallpaper(this.props.wallpaperData, wallpaper.id)}>
            <img className="display-img" src='./assets/images/technology.svg' />
          </div>
        </div>
      </div>
    ));
    return (
      <ul className="wallpapers-container">
        {wallpapersList}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h1>Background</h1>
        <p className="catchphrase">Ignite inspiration with your favorites places</p>
        <div>
          {this.wallpapersList(this.props.arrLikedWallpapers)}
        </div>
        <div className="label-end tip">Tip: Hover to manage your favorites from our daily backgrounds</div>
      </div>
    );
  }
}
