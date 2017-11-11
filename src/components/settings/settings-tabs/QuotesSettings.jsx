import React from 'react';
import Likeheart from 'Components/Likeheart.jsx';
import 'Images/technology.svg';
import '../css/quoteSettings.css';

export default class QuotesSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  quotesList(arrLikedQuotes) {
    const quotesList = arrLikedQuotes.map(quote => (
      <div key={quote.id} className="show-option2">
        <div className="quoteListItem-container">{`"${quote.quote}" `}<span className="author-style"> — {quote.author}</span></div>
        <div className="transparency" title="Remove">
          <Likeheart
            toggleLike={this.props.toggleLike.bind(this)}
            liked={quote.liked}
            type='quote'
            id={quote.id} />
        </div>
        <div className="transparency" title="Display">
          <div onClick={() => this.props.displayFavQuote(this.props.quote, quote.id)}>
            <img className="display-img" src='./assets/images/technology.svg' />
          </div>
        </div>
      </div>
    ));
    return (
      <ul>
        {quotesList}
      </ul>
    );
  }

  changeOption(e) {
    this.props.changeOption(e);
    const optionArr = e.target.id.split('-');
    const newOptions = this.state.options;
    newOptions[optionArr[0]] = optionArr[1];
    this.setState({ options: newOptions });
  }

  activeQuoteFrequency(value) {
    return `option-${(value === this.state.options.quoteFrequency) ? 'active' : 'default'}`;
  }

  render() {
    return (
      <div>
        <h1>Quotes</h1>
        <p className="catchphrase">Your favorite inspirational and motivational gems</p>
        <div className="quote-list-container2">
          {this.quotesList(this.props.arrLikedQuotes)}
        </div>
        <label className="show-option2">
          <span>Quote Frequency</span>
          <div className="units-toggle-container">
            <span id="quoteFrequency-2hour" className={this.activeQuoteFrequency('2hour')} onClick={this.changeOption.bind(this)}>2 hr</span>
            <span>|</span>
            <span id="quoteFrequency-6hour" className={this.activeQuoteFrequency('6hour')} onClick={this.changeOption.bind(this)}>6 hr</span>
            <span>|</span>
            <span id="quoteFrequency-12hour" className={this.activeQuoteFrequency('12hour')} onClick={this.changeOption.bind(this)}>12 hr</span>
          </div>
        </label>
      </div>
    );
  }
}

