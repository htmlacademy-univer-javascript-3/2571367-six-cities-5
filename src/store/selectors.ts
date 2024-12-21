import {State} from './index.ts';
import { AuthorizationStatus } from '../mocks/login';
import { NAMESPACE } from '../mocks/sliceHeaders';
import { OfferDescription, OfferIdDescription } from '../types/offerDescription.ts';
import { CommentList } from '../types/comment.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NAMESPACE.USER].authorizationStatus;
export const getUserEmail = (state : State) : string => state[NAMESPACE.USER].userEmail;
export const getOfferList = (state : State) : OfferDescription[] => state[NAMESPACE.DATA].offerlist;
export const getComments = (state : State) : CommentList => state[NAMESPACE.DATA].comments;
export const getOffer = (state : State) : OfferIdDescription => state[NAMESPACE.DATA].offer;
const offerIsLoadingStatus = (state : State) : boolean => state[NAMESPACE.DATA].isOffersLoading;
const userDataIsLoading = (state : State) : boolean => state[NAMESPACE.USER].isUserDataLoading;
export const isLoading = offerIsLoadingStatus || userDataIsLoading;
export const getCity = (state : State) : string => state[NAMESPACE.CITY].city;
export const getOffersNearby = (state : State) : OfferDescription[] => state[NAMESPACE.DATA].nearbyOffers;
