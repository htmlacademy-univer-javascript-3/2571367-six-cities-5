import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../mocks/login';

export const redirectToRoute = createAction<AppRoute>('city/redirectToRoute');
export const fillUserEmail = createAction<string>('user/FillEmail');
