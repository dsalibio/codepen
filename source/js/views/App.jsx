import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { routeCodes } from '../constants/routeCodes';
import Home from './Home';

import '../../assets/css/global-style.css';
import Layout from '../components/global/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path={ routeCodes.HOME } component={ Home } />
        </Switch>
      </Layout>
    );
  }
}

export default hot(module)(App);
