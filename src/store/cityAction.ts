import {createAction} from '@reduxjs/toolkit';
import { OfferDescription, OfferIdDescription } from '../types/offerDescription';
import {AppRoute, AuthorizationStatus} from '../mocks/login';

export const changeCityAction = createAction<string>('city/Change');
export const offerFillAction = createAction<OfferDescription[]>('offer/Fill');
export const loadOfferList = createAction<OfferDescription[]>('data/loadOfferList');
export const loadOffer = createAction<OfferIdDescription >('data/loadOffer');
export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>('city/redirectToRoute');
export const fillUserEmail = createAction<string>('user/FillEmail');
