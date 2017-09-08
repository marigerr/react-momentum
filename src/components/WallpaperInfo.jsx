import React from 'react';
import { titleCase } from 'Scripts/utilities';
import Likeheart from 'Components/Likeheart.jsx';
import 'Stylesheets/wallpaper-info.css';

export default class WallpaperInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.wallpaperData;
  }

  componentWillReceiveProps(nextProps) {
    if (this.state !== nextProps.wallpaperData) {
      this.setState({
        wallpaperLiked: nextProps.wallpaperData.wallpaperLiked,
        user: nextProps.wallpaperData.user,
        location: nextProps.wallpaperData.location,
      });
    }
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
          <Likeheart
            toggleLike={this.props.toggleLike.bind(this)}
            liked={this.state.wallpaperLiked}
            id={this.props.wallpaperData.id}
            type='wallpaper' />
        </div>
      </div>
    );
  }
}
