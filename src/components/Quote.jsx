import React from 'react';
import 'Stylesheets/quote.css';


export default class CenterLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: `Cherish your visions and your dreams as they are the 
      children of your soul; the blueprints of your ultimate achievements.`,
    };
  }

  render() {
    return (
      <div>
        <div>{this.state.quote}</div>
      </div>
    );
  }
}
