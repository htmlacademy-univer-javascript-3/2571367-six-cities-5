import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../../services/browserHistory.ts';
import {Middleware} from 'redux';
import { rootReducer } from '../rootReducer.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'city/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
