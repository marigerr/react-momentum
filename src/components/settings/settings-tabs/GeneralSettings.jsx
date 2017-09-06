import React from 'react';
import Toggle from 'react-toggle';
import '../css/react-toggle.css';
import '../css/generalSettings.css';

export default class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  changeOption(e) {
    this.props.changeOption(e);
    const optionArr = e.target.id.split('-');
    const newOptions = this.state.options;
    newOptions[optionArr[0]] = optionArr[1];
    this.setState({ options: newOptions });
  }

  activeTempScale(value) {
    return `option-${(value === this.state.options.tempScale) ? 'active' : 'default'}`;
  }
  activeClockFormat(value) {
    return `option-${(value === this.state.options.clockFormat) ? 'active' : 'default'}`;
  }

  render() {
    return (
      <div>
        <h1>Show</h1>
        <label className="show-option">
          <span>Chrome Tab</span>
          <Toggle id="showChromeTab" defaultChecked={this.state.showFeatures.showChromeTab}
            icons={false} onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Search</span>
          <Toggle id="showSearch" defaultChecked={this.state.showFeatures.showSearch}
            icons={false} onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Weather</span>
          <Toggle id="showWeather" defaultChecked={this.state.showFeatures.showWeather}
            icons={false} onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Focus</span>
          <Toggle id="showFocus" defaultChecked={this.state.showFeatures.showFocus}
            icons={false} onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Quote</span>
          <Toggle id="showQuote" defaultChecked={this.state.showFeatures.showQuote}
            icons={false} onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Todo</span>
          <Toggle id="showTodo" defaultChecked={this.state.showFeatures.showTodo}
            icons={false} onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <br/>
        <h1>Options</h1>
        <label className="show-option">
          <span>Temperature Scale</span>
          <div className="units-toggle-container">
            <span id="tempScale-F" className={this.activeTempScale('F')} onClick={this.changeOption.bind(this)}>{String.fromCharCode(176)}F</span>
            <span>|</span>
            <span id="tempScale-C" className={this.activeTempScale('C')} onClick={this.changeOption.bind(this)}>{String.fromCharCode(176)}C</span>
          </div>
        </label>
        <label className="show-option">
          <span>Clock Format</span>
          <div className="units-toggle-container">
            <span id="clockFormat-12hour" className={this.activeClockFormat('12hour')} onClick={this.changeOption.bind(this)}>12 hr</span>
            <span>|</span>
            <span id="clockFormat-24hour" className={this.activeClockFormat('24hour')} onClick={this.changeOption.bind(this)}>24 hr</span>
          </div>
        </label>
      </div>
    );
  }
}
