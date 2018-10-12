import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import indexRoutes from '../constants/indexRoutes';
import '../../assets/css/global-style.sass';
import Layout from '../components/global/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          {indexRoutes.map((prop) => {
            return <Route path={ prop.path } component={ prop.component } />;
          })}
        </Switch>
      </Layout>
    );
  }
}

export default hot(module)(App);
