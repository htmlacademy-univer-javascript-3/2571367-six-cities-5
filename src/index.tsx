
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/App.tsx';
import {store} from './store/index.ts';
import { checkAuthAction, fetchOffers, getFavourites } from './store/apiActions.ts';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from './services/token.ts';
import browserHistory from './services/browserHistory.ts';
import HistoryRouter from './components/HistoryRouter/HistoryRouter.tsx';

store.dispatch(checkAuthAction(getToken()));
store.dispatch(fetchOffers());
store.dispatch(getFavourites(getToken()));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer/>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
