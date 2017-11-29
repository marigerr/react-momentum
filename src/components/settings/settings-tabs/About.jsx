import React from 'react';
import '../css/about.css';

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="about-settings-tab">
        <h1>About</h1>
        <p>Clone of the Momentum chrome extension for desktop.<br></br>
        Developed for <a target='_blank' rel="noopener noreferrer" href="https://chingu-cohorts.github.io/chingu-directory/">Chingu Cohort</a> &#34;Build to Learn&#34; project
        </p>
        <p>Team Members:</p>
        <p><a target='_blank' rel="noopener noreferrer" href="https://github.com/jrpcoder">@jrpcoder </a></p>
        <p><a target='_blank' rel="noopener noreferrer" href="https://github.com/marigerr">@marigerr</a></p>
      </div>
    );
  }
}
