import React from 'react';
import Toggle from 'react-toggle';
import '../css/react-toggle.css';
import '../css/generalSettings.css';

export default class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props;
  }

  render() {
    return (
      <div>
        <h1>Show</h1>
        <label className="show-option">
          <span>Chrome Tab</span>
          <Toggle
            id="showChromeTab"
            icons={false}
            defaultChecked={this.state.showFeatures.showChromeTab}
            onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Apps</span>
          <Toggle
            id="showApps"
            icons={false}
            defaultChecked={this.state.showFeatures.showApps}
            onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Search</span>
          <Toggle
            id="showSearch"
            icons={false}
            defaultChecked={this.state.showFeatures.showSearch}
            onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Weather</span>
          <Toggle
            id="showWeather"
            icons={false}
            defaultChecked={this.state.showFeatures.showWeather}
            onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Focus</span>
          <Toggle
            id="showFocus"
            icons={false}
            defaultChecked={this.state.showFeatures.showFocus}
            onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Quote</span>
          <Toggle
            id="showQuote"
            icons={false}
            defaultChecked={this.state.showFeatures.showQuote}
            onChange={this.props.toggleFeature.bind(this)} />
        </label>
        <label className="show-option">
          <span>Todo</span>
          <Toggle
            id="showTodo"
            icons={false}
            defaultChecked={this.state.showFeatures.showTodo}
            onChange={this.props.toggleFeature.bind(this)} />
        </label>
      </div>
    );
  }
}
