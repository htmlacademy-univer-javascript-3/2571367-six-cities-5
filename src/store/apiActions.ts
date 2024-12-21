
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {OfferDescription, OfferIdDescription} from '../types/offerDescription.js';
import {redirectToRoute, fillUserEmail} from './cityAction.js';
import {APIRoute} from '../mocks/apiRoutes.js';
import {saveToken, dropToken} from '../services/token.ts';
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
    try {
      const {data: {email}} = await api.get<loginVerification>(APIRoute.Login,{params:{'X-Token':token}});
      return email;
    } catch (error){
      return 'error';
    }
  },
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
    dispatch(fillUserEmail(email));
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

export const postComment = createAsyncThunk<Comment[], CommentPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'post/Comment',
  async ({comment, rating, id}, {extra: api}) => {
    const {data} = await api.post<CommentList>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  },
);
