import React, { Component } from 'react';
import 'Stylesheets/likeheartReusable.css';
import 'Images/001-heart-shape-silhouette.svg';
import 'Images/002-heart.svg';

class LikeheartReusable extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: props.liked };
  }

  showIcon() {
    if (this.state.liked) {
      return <img className="icon-heart expand" src='../assets/images/001-heart-shape-silhouette.svg' />;
    }
    return <img className="icon-heart" src='../assets/images/002-heart.svg' />;
  }

  changeLike() {
    if (this.state.liked === true) {
      this.props.toggleLike(false);
      this.setState({ liked: false });
    } else {
      this.props.toggleLike(true);
      this.setState({ liked: true });
    }
  }

  render() {
    return (
      <div onClick={this.changeLike.bind(this)}>
        {this.showIcon()}
      </div>
    );
  }
}

export default LikeheartReusable;
