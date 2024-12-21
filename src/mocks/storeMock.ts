import { AuthorizationStatus } from './login';
import { emptyOffer } from './offer';
import {datatype, internet} from 'faker';

export const dataProcessInitialStateMock = {
  offerlist: [],
  isOffersLoading: false,
  offer:emptyOffer,
  nearbyOffers:[],
  comments:[],
  favouriteList: []
};

export const mockOfferList = [
  {
    id: datatype.string(),
    title: datatype.string(),
    type: datatype.string(),
    price: datatype.number(),
    city: {
      name: datatype.string(),
      location: {
        latitude: datatype.number(),
        longitude: datatype.number(),
        zoom: datatype.number(),
      }
    },
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number(),
    },
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number(),
    previewImage: datatype.string(),
  }
];
function createStringTuple(str: string): [string] {
  return [str];
}
export const mockOffer = {
  id: datatype.string(),
  title: datatype.string(),
  type: datatype.string(),
  price: datatype.number(),
  city: {
    name: datatype.string(),
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number(),
    }
  },
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  description: datatype.string(),
  bedrooms: datatype.number(),
  goods: createStringTuple(datatype.string()),
  host: {
    name: datatype.string(),
    avatarUrl: datatype.string(),
    isPro: datatype.boolean(),
  },
  images: createStringTuple(datatype.string()),
  maxAdults: datatype.number(),
};

export const mockCommentList = [{
  id: datatype.string(),
  date: datatype.string(),
  user: {
    name: datatype.string(),
    avatarUrl: datatype.string(),
    isPro: datatype.boolean()
  },
  comment: datatype.string(),
  rating: datatype.number(),
}];

export const mockUser = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userEmail: internet.email(),
  isUserDataLoading: false
};

export const initialStateUserMock = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  isUserDataLoading: false
};

export const fakeUser = {
  login: datatype.string(),
  password: datatype.string(),
};

export const commentMock = {
  id: datatype.string(),
  rating: datatype.number(),
  comment: datatype.string()
};

export const setFavouriteMock = {
  offerId: datatype.string(),
  status: 1,
  isOfferPage: false
};
