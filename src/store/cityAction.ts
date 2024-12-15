import {createAction} from '@reduxjs/toolkit';
import { OfferDescription, OfferIdDescription } from '../types/offerDescription';

export const changeCityAction = createAction<string>('city/Change');
export const offerFillAction = createAction<OfferDescription[]>('offer/Fill');
export const loadOfferList = createAction<OfferDescription[]>('data/loadOfferList');
export const loadOffer = createAction<OfferIdDescription >('data/loadOffer');
export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');
