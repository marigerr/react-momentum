import React, { Component } from 'react';
import axios from 'axios';
import { addToLocalStorage, localStorageKeyExists, getFromLocalStorage, getCurrentTime } from 'Scripts/utilities';
import 'Stylesheets/quote.css';
import TwitterLink from './twitter.jsx';
import LikeHeart from './likeheart.jsx';

class Quote extends Component {
  constructor(props) {
    super(props);
    if (localStorageKeyExists('quote')) {
      const currentQuote = getFromLocalStorage('quote');
      this.state = {
        quote: currentQuote.quote,
        author: currentQuote.author,
      };
    } else {
      this.state = {
        quote: 'Dream big dreams. Small dreams have no magic.',
        author: 'Dottie Boreyko',
      };
    }
  }

  check60Min() {
    const currentTime = getCurrentTime();
    const quoteTimeStamp = getFromLocalStorage('quoteTimeStamp');
    const timeInterval = currentTime - quoteTimeStamp;
    console.log(timeInterval);
    return timeInterval >= 30000;
  }

  componentDidMount() {
    const URL = 'https://random-quote-generator.herokuapp.com/api/quotes/random';
    const over60Min = this.check60Min();
    console.log(over60Min);
    if (localStorageKeyExists('quote') && !over60Min) {
      const currentQuote = getFromLocalStorage('quote');
      this.setState({
        quote: currentQuote.quote,
        author: currentQuote.author,
      });
    } else {
      axios.get(URL)
        .then((response) => {
          this.setState({
            quote: response.data.quote,
            author: response.data.author,
          });
          const fetchQuote = {
            quote: this.state.quote,
            author: this.state.author,
          };
          addToLocalStorage('quote', fetchQuote);
          addToLocalStorage('quoteTimeStamp', getCurrentTime());
        });
    }
  }

  render() {
    return (
      <div className='quote-container'>
        <div>{this.state.quote}</div>
        <div className='author-container'>
          <div>{this.state.author}</div>
          <LikeHeart
            quote={this.state.quote}
            author={this.state.author}
          />
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
