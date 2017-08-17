import React, { Component } from 'react';
import axios from 'axios';
import { addToLocalStorage, localStorageKeyExists, getFromLocalStorage, getCurrentTime } from 'Scripts/utilities';
import 'Stylesheets/quote.css';
import TwitterLink from './twitter.jsx';
import LikeHeart from './likeheart.jsx';

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: 'Dream big dreams. Small dreams have no magic.',
      author: 'Dottie Boreyko',
    };
  }

  check60Min() {
    const currentTime = getCurrentTime();
    const fetchTime = getFromLocalStorage('fetchTime');
    const timeInterval = currentTime - fetchTime;
    console.log(timeInterval);
    return timeInterval >= 3600000;
  }

  componentDidMount() {
    const URL = 'https:\//random-quote-generator.herokuapp.com/api/quotes/random';
    const over60Min = this.check60Min();
    console.log(over60Min);
    if (localStorageKeyExists('quote') && !over60Min) {
      this.setState({
        quote: getFromLocalStorage('quote'),
        author: getFromLocalStorage('author'),
      });
    } else {
      axios.get(URL)
        .then((response) => {
          this.setState({
            quote: response.data.quote,
            author: response.data.author,
          });
          addToLocalStorage('quote', this.state.quote);
          addToLocalStorage('author', this.state.author);
          addToLocalStorage('fetchTime', getCurrentTime());
        });
    }
  }

  render() {
    return (
      <div className='quote-container'>
        <div>{this.state.quote}</div>
        <div className='author-container'>
          <div>{this.state.author}</div>
          <LikeHeart />
          <TwitterLink
            quote={this.state.quote}
            author={this.state.author}
          />
        </div>
      </div>
    );
  }
}

export default Quote;
