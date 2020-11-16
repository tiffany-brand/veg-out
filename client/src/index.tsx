import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="vegemon.us.auth0.com"
      clientId="Zs5GycXDlzEbTqtTInwuIqRIAz1CTkeH"
      redirectUri={window.location.origin}>

      <BrowserRouter>
        <App />
      </BrowserRouter>

    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
