import {createReducer} from '@reduxjs/toolkit';
import {changeCityAction, fillUserEmail, loadComments, loadOffer, loadOfferList, loadOfferNearby} from './cityAction';
import { offerFillAction,setDataLoadingStatus, requireAuthorization } from './cityAction';
import { OfferDescription, OfferIdDescription } from '../types/offerDescription';
import { emptyOffer } from '../mocks/offer';
import {AuthorizationStatus} from '../mocks/login';
import { Comment } from '../types/comment';

type InitialOfferState = {
  offerlist : OfferDescription[];
  city: string;
  isDataLoading : boolean;
  offer: OfferIdDescription ;
  authorizationStatus: AuthorizationStatus;
  userEmail:string;
  nearbyOffers: OfferDescription[];
  comments:Comment[];
}

const initialCityState:InitialOfferState = {
  offerlist: [],
  city : 'Paris',
  isDataLoading: false,
  offer:emptyOffer,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail:'',
  nearbyOffers:[],
  comments:[]
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(fillUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(loadOfferNearby, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    });
});

export {reducer};
