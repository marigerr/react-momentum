import React, { Component } from 'react';
import 'Images/001-heart-shape-silhouette.svg';
import 'Images/002-heart.svg';
import { addToLocalStorage, localStorageKeyExists, getFromLocalStorage } from 'Scripts/utilities';

class LikeHeart extends Component {
  constructor(props) {
    super(props);
    // state will be initialized if the array with liked quotes has already been stored in localstorage
    // before (if the heart icon has been clicked before). 
    if (localStorageKeyExists('arrLikedQuotes')) {
      const arrLikedQuotes = getFromLocalStorage('arrLikedQuotes');
      const currentQuote = getFromLocalStorage('quote').quote;
      if (this.quoteInLikeArr(currentQuote, arrLikedQuotes)) {
        this.state = {
          likedQuote: true,
          arrLikedQuotes: getFromLocalStorage('arrLikedQuotes'),
        };
        // console.log(this.state.likedQuote);
        // console.log(this.state.arrLikedQuotes);
      } else {
        this.state = {
          likedQuote: false,
          arrLikedQuotes: getFromLocalStorage('arrLikedQuotes'),
        };
        // console.log(this.state.likedQuote);
        // console.log(this.state.arrLikedQuotes);
      }
    } else {
      // this will run the first time the extension is run and subsequent loadings until any quote is liked.
      this.state = {
        likedQuote: false,
        arrLikedQuotes: [],
      };
      // console.log(this.state.likedQuote);
    }
  }

  // this serves the case when the extension is reloaded and a new quote will be fetched, but the state above
  // was already initialized for the stored quote. State regarding the "liking"
  // of the new quote has to be updated to re-render the correct icon. 
  componentWillReceiveProps(nextProps) {
    if (this.quoteInLikeArr(nextProps.quote, this.state.arrLikedQuotes)) {
      this.setState({ likedQuote: true });
      console.log('previously liked');
    } else {
      this.setState({ likedQuote: false });
      console.log('not-liked');
    }
  }

  // check if the quote to test is already liked or not. 
  quoteInLikeArr(currentQuote, arrLikedQuotes) {
    const cQuote = currentQuote;
    return arrLikedQuotes.find(quote => quote.quote === cQuote);
  }

  showIcon() {
    if (this.state.likedQuote) {
      return <img className="icon-quote expand" src='../assets/images/001-heart-shape-silhouette.svg'/>;
    }
    return <img className="icon-quote" src='../assets/images/002-heart.svg'/>;
  }

  // take the current array with liked quotes and add the new obj containing current quote and author.
  addLikedQuote() {
    const { arrLikedQuotes } = this.state;
    const quoteObj = {
      quote: this.props.quote,
      author: this.props.author,
    };
    arrLikedQuotes.push(quoteObj);
    this.setState({ arrLikedQuotes });
    // console.log(arrLikedQuotes);
    // console.log(quoteObj);
    return arrLikedQuotes;
  }

  // take the current array with liked quotes, check where is the quote obj to remove and delete it.
  removeDislikedQuote() {
    const { arrLikedQuotes } = this.state;
    const targetQuote = this.props.quote;
    const index = arrLikedQuotes.findIndex(quote => quote.quote === targetQuote);
    if (index !== -1) {
      arrLikedQuotes.splice(index, 1);
    }
    this.setState({ arrLikedQuotes });
    // console.log(index);
    // console.log(targetQuote);
    // console.log(arrLiked);
    return arrLikedQuotes;
  }

  // this sets the new liked state of the current quote to update the heart icon. 
  // Adds/removes the quote from the liked quotes array accordingly and saves to localstorage.
  changeLike() {
    if (this.state.likedQuote === true) {
      this.setState({ likedQuote: false }, () => {
        addToLocalStorage('arrLikedQuotes', this.removeDislikedQuote());
      });
    } else {
      this.setState({ likedQuote: true }, () => {
        addToLocalStorage('arrLikedQuotes', this.addLikedQuote());
        // console.log(this.state.liked);
        // console.log(getFromLocalStorage('liked'));
        // console.log(localStorageKeyExists('liked'));
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
