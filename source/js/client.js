import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'views/App';

// When used with server dehydrated state "ReactDOM.hydrate" should be called
const renderMethod = process.env.HYDRATE ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('root')
);
