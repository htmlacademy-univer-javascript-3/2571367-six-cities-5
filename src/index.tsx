
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/App.tsx';
import {guestReview} from './mocks/review.js';
import {store} from './store';
import { fetchOffers } from './store/apiActions.ts';
import { checkAuthAction } from './store/apiActions.ts';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App guestReview={guestReview}/>
    </Provider>
  </React.StrictMode>
);
