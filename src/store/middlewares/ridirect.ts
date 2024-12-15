import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../../services/browserHistory.ts';
import {Middleware} from 'redux';
import {reducer} from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'city/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
