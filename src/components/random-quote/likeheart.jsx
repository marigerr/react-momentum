import React, { Component } from 'react';
import 'Images/001-heart-shape-silhouette.svg';
import 'Images/002-heart.svg';
import { addToLocalStorage, localStorageKeyExists, getFromLocalStorage } from 'Scripts/utilities';

class LikeHeart extends Component {
  constructor(props) {
    super(props);
    if (localStorageKeyExists('liked')) {
      this.state = { liked: getFromLocalStorage('liked') };
    } else {
      this.state = { liked: false };
      console.log(this.state.liked);
    }
  }

  showIcon() {
    if (this.state.liked) {
      return <img className="icon-quote expand" src='../assets/images/001-heart-shape-silhouette.svg'/>;
    }
    return <img className="icon-quote" src='../assets/images/002-heart.svg'/>;
  }

  changeLike() {
  	console.log(this.state.liked);
    if (this.state.liked === true) {
      this.setState({ liked: false }, () => {
        addToLocalStorage('liked', this.state.liked);
      });
    } else {
      this.setState({ liked: true }, () => {
        addToLocalStorage('liked', this.state.liked);
        console.log(this.state.liked);
        console.log(getFromLocalStorage('liked'));
        console.log(localStorageKeyExists('liked'));
      });
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

export default LikeHeart;
