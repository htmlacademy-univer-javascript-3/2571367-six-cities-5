import { AuthorizationStatus } from '../mocks/login.js';
import {store} from '../store/index.js';
import { CommentList } from './comment.js';
import { OfferDescription } from './offerDescription.js';
import { OfferIdDescription } from './offerDescription.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userEmail : string;
  isUserDataLoading : boolean;
}
export type CityProcess = {
  city : string;
}

export type DataProcess = {
  offerlist : OfferDescription[];
  isOffersLoading : boolean;
  offer: OfferIdDescription ;
  nearbyOffers: OfferDescription[];
  comments:CommentList;
  favouriteList: OfferDescription[];
}
