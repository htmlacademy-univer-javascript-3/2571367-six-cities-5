
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/App.tsx';
import {store} from './store';
import { checkAuthAction, fetchOffers } from './store/apiActions.ts';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from './services/token.ts';

store.dispatch(fetchOffers());
store.dispatch(checkAuthAction(getToken()));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App/>
    </Provider>
  </React.StrictMode>
);
