import React, { Component } from 'react';
import 'Stylesheets/likeheartReusable.css';
import 'Images/001-heart-shape-silhouette.svg';
import 'Images/002-heart.svg';

class Likeheart extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: this.props.liked };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state !== nextProps.liked) {
      this.setState({
        liked: nextProps.liked,
      });
    }
  }

  showIcon() {
    if (this.props.liked) {
      return <img className="icon-heart expand" src='../assets/images/001-heart-shape-silhouette.svg' />;
    }
    return <img className="icon-heart" src='../assets/images/002-heart.svg' />;
  }

  changeLike() {
    if (this.props.liked === true) {
      this.props.toggleLike(false, this.props.id, this.props.type);
      this.setState({ liked: false });
    } else {
      this.props.toggleLike(true, this.props.id, this.props.type);
      this.setState({ liked: true });
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

export default Likeheart;
