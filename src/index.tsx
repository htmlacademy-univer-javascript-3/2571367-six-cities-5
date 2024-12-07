import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/App.tsx';
import { guestReview } from './mocks/review.ts';
import { store } from './store/index.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App guestReview={guestReview}/>
    </Provider>
  </React.StrictMode>
);
