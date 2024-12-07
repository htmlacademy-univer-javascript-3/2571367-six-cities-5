import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/points';
import { CityOfferDescription } from '../types/offerDescription';

export const changeCityAction = createAction<City>('city/Change');
export const offerFillAction = createAction<CityOfferDescription>('offer/Fill');
