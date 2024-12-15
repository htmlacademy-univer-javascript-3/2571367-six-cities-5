
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {OfferDescription, OfferIdDescription} from '../types/offerDescription.js';
import {loadOfferList,setDataLoadingStatus, loadOffer} from './cityAction.js';
import {APIRoute} from '../mocks/apiRoutes.js';


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
