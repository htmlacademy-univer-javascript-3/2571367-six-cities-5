import {createReducer} from '@reduxjs/toolkit';
import {changeCityAction, loadOffer, loadOfferList} from './cityAction';
import { offerFillAction,setDataLoadingStatus } from './cityAction';
import { OfferDescription, OfferIdDescription } from '../types/offerDescription';
import { emptyOffer } from '../mocks/offer';

type InitialOfferState = {
  offerlist : OfferDescription[];
  city: string;
  isDataLoading : boolean;
  offer: OfferIdDescription ;
}

const initialCityState:InitialOfferState = {
  offerlist: [],
  city : 'Paris',
  isDataLoading: false,
  offer:emptyOffer
};

const reducer = createReducer(initialCityState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offerFillAction, (state,action) => {
      const cityOffer = action.payload.filter((i)=>i.city.name === state.city);
      state.offerlist = cityOffer;
    })
    .addCase(loadOfferList,(state,action) => {
      state.offerlist = action.payload;
    })
    .addCase(setDataLoadingStatus,(state,action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(loadOffer,(state,action)=>{
      state.offer = action.payload;
    });
});

export {reducer};
