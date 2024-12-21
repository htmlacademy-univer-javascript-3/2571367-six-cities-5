
import {createSlice} from '@reduxjs/toolkit';
import { NAMESPACE } from '../../mocks/sliceHeaders.ts';
import {DataProcess, } from '../../types/state';
import { emptyOffer } from '../../mocks/offer.ts';
import { fetchComments, fetchOffer, fetchOfferNeibourhood, fetchOffers, getFavourites, postComment, setFavourites } from '../apiActions.ts';

const initialState: DataProcess = {
  offerlist: [],
  isOffersLoading: false,
  offer:emptyOffer,
  nearbyOffers:[],
  comments:[],
  favouriteList: []
};

export const dataProcess = createSlice({
  name: NAMESPACE.DATA,
  initialState,
  reducers: {
  },
  extraReducers (builder) {
    builder
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.offer = emptyOffer;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isOffersLoading = true;
      })

      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offerlist = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOfferNeibourhood.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isOffersLoading = false;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.comments = [];
        state.isOffersLoading = false;
      })
      .addCase(fetchComments.pending, (state) => {
        state.isOffersLoading = true;
      })

      .addCase(postComment.fulfilled, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(postComment.pending, (state) => {
        state.isOffersLoading = true;
      })

      .addCase(getFavourites.fulfilled, (state,action) => {
        state.favouriteList = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(getFavourites.pending, (state) => {
        state.isOffersLoading = true;
      })

      .addCase(setFavourites.fulfilled, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(setFavourites.pending, (state) => {
        state.isOffersLoading = true;
      });
  }
});
