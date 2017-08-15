import React from 'react';
import TopLeft from 'Components/TopLeft.jsx';
import Wallpaper from 'Components/Wallpaper.jsx';
import Weather from 'Components/Weather.jsx';
import Center from 'Components/Center.jsx';
import Settings from 'Components/Settings.jsx';
import Quote from 'Components/Quote.jsx';
import ToDoList from 'Components/ToDoList.jsx';
import { localStorageKeyExists, getFromLocalStorage } from 'Scripts/utilities';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    if (localStorageKeyExists('wallpaper')) {
      const wallpaperData = getFromLocalStorage('wallpaper');

      this.state = {
        divStyle: {
          backgroundImage: `url(${wallpaperData.urls.full})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no - repeat',
          backgroundSize: 'cover',
        },
      };
    } else {
      this.state = {
        divStyle: {
          backgroundImage: '',
          backgroundPosition: 'center',
          backgroundRepeat: 'no - repeat',
          backgroundSize: 'cover',
        },
      };
    }
  }

  myCallback(dataFromChild) {
    console.log('in parent callback', dataFromChild);
    const imgUrl = dataFromChild.data.urls.full;

    this.setState({
      divStyle: {
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no - repeat',
        backgroundSize: 'cover',
      },
    });
  }

  render() {
    if (this.state) {
      return (
        <main id="main" style={this.state.divStyle}>
          <div className="row top-row">
            <TopLeft/>
            <Weather/>
          </div>
          <Wallpaper callbackFromParent={this.myCallback.bind(this)} />
          <div className="row middle-row">
            <Center/>
          </div>
          <div className="row bottom-row">
            <Settings/>
            <Quote/>
            <ToDoList/>
          </div>
        </main>
      );
    }
    return (
      <div>...Loading</div>
    );
  }
}

