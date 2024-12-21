
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {OfferDescription, OfferIdDescription} from '../types/offerDescription.js';
import {redirectToRoute} from './cityAction.js';
import {APIRoute} from '../mocks/apiRoutes.js';
import {saveToken, dropToken, getToken} from '../services/token.ts';
import { AuthData } from '../types/authData.ts';
import {loginVerification, UserData} from '../types/userData.ts';
import {AppRoute} from '../mocks/login.ts';
import { Comment, CommentList, CommentPost } from '../types/comment.ts';

export const fetchOffers = createAsyncThunk<OfferDescription[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferList',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferDescription[]>(APIRoute.OfferList);
    return data;
  },
);

export const fetchOffer = createAsyncThunk<OfferIdDescription, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferId',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferIdDescription>(`${APIRoute.OfferList}/${id}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<string, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (token, {extra: api}) => {
    const {data: {email}} = await api.get<loginVerification>(APIRoute.Login,{params:{'X-Token':token}});
    return email;
  },
);

export const getFavourites = createAsyncThunk<OfferDescription[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getFavourites',
  async(token, {extra : api}) => {
    const {data} = await api.get<OfferDescription[]>(APIRoute.FavouriteList, {params : {'X-Token' : token}});
    return (data);
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(checkAuthAction(getToken()));
    dispatch(getFavourites(getToken()));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (token, {extra: api}) => {
    dropToken();
    await api.delete(APIRoute.Logout,
      {headers: {'X-Token' : token}});
  },
);

export const fetchOfferNeibourhood = createAsyncThunk<OfferDescription[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferNearby',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferDescription[]>(`${APIRoute.OfferList}/${id}/nearby`);
    return data;
  },
);

export const fetchComments = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (id, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const postComment = createAsyncThunk<void, CommentPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    await api.post<CommentList>(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch(fetchComments(id));
  },
);

type setFavourite = {
  offerId: string;
  status:number;
  isOfferPage: boolean;
}
export const setFavourites = createAsyncThunk<void, setFavourite, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/setFavourites',
  async({offerId, status, isOfferPage}, {dispatch, extra : api}) => {
    await api.post<OfferDescription[]>(`${APIRoute.FavouriteList}/${offerId}/${status}`);
    dispatch(fetchOffers());
    dispatch(getFavourites(getToken()));
    if (isOfferPage){
      dispatch(fetchOffer(offerId));
    }
  }
);
