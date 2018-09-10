import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { routeCodes } from '../constants/routeCodes';
import Home from './Home';

import '../../assets/css/global-style.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={ routeCodes.HOME } component={ Home } />
      </Switch>
    );
  }
}

export default hot(module)(App);
