import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import { redirect } from './middlewares/ridirect.ts';

import { rootReducer } from './rootReducer.ts';

export const api = createAPI();

export const store = configureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export type State = ReturnType<typeof store.getState>;
