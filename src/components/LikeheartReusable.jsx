import React, { Component } from 'react';
import 'Stylesheets/likeheartReusable.css';
import 'Images/001-heart-shape-silhouette.svg';
import 'Images/002-heart.svg';

class LikeheartReusable extends Component {
  showIcon() {
    if (this.props.liked) {
      return <img className="icon-heart expand" src='../assets/images/001-heart-shape-silhouette.svg' />;
    }
    return <img className="icon-heart" src='../assets/images/002-heart.svg' />;
  }

  changeLike() {
    if (this.props.liked === true) {
      this.props.toggleLike(false, this.props.id);
    } else {
      this.props.toggleLike(true, this.props.id);
    }
  }

  render() {
    return (
      <div onClick={this.changeLike.bind(this, this.props.id)}>
        {this.showIcon()}
      </div>
    );
  }
}

export default LikeheartReusable;
