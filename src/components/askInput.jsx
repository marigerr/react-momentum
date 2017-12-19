import React, { Component } from 'react';
import 'Stylesheets/askInput.css';

class AskInput extends Component {
  render() {
    if (this.props.askInput) {
      return (
        <div className="flex-column-center">
          <div className={this.props.labelStyle}>{this.props.askInput}</div>
          <input className={this.props.inputStyle} type="text" value={this.props.value} onChange={this.props.updateInputValue.bind(this)} onKeyPress={this.props.addInput.bind(this)}></input>
        </div>
      );
    }
    return (
      <input placeholder={this.props.placeholder} className={this.props.inputStyle} type="text" value={this.props.value} onChange={this.props.updateInputValue.bind(this)} onKeyPress={this.props.addInput.bind(this)}></input>
    );
  }
}

export default AskInput;
