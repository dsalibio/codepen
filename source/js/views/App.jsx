import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { routeCodes } from '../constants/routeCodes';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='page'>
          <Switch>
            <Route exact path={ routeCodes.HOME } component={ Home } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
