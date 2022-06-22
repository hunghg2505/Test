import React from 'react';
import ReactDOM from 'react-dom';
// add redux store
import { Provider } from 'react-redux';
// router config
import { BrowserRouter } from 'react-router-dom';
// add locale config
import 'utils/i18n';
// import UI
import 'styles/global.scss';

import store from 'utils/redux-store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';

ReactDOM.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </ReactKeycloakProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
