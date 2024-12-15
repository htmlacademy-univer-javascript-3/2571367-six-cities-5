
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {OfferDescription, OfferIdDescription} from '../types/offerDescription.js';
import {loadOfferList,setDataLoadingStatus, loadOffer, requireAuthorization, redirectToRoute, loadOfferNearby, loadComments} from './cityAction.js';
import {APIRoute} from '../mocks/apiRoutes.js';
import {AuthorizationStatus} from '../mocks/login.js';
import {saveToken, dropToken} from '../services/token.ts';
import { AuthData } from '../types/authData.ts';
import { UserData } from '../types/userData.ts';
import {AppRoute} from '../mocks/login.ts';
import { Comment, CommentPost } from '../types/comment.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferList',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<OfferDescription[]>(APIRoute.OfferList);
    dispatch(loadOfferList(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const fetchOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferId',
  async (id, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<OfferIdDescription>(`${APIRoute.OfferList}/${id}`);
    dispatch(loadOffer(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
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
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));

  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const fetchOfferNeibourhood = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferNearby',
  async (id, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<OfferDescription[]>(`${APIRoute.OfferList}/${id}/nearby`);
    dispatch(loadOfferNearby(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const fetchComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (id, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadComments(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const postComment = createAsyncThunk<void, CommentPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'post/Comment',
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch (loadComments(data));
  },
);
