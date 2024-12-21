import {createSlice} from '@reduxjs/toolkit';
import { NAMESPACE } from '../../mocks/sliceHeaders.ts';
import {DataProcess, } from '../../types/state';
import { emptyOffer } from '../../mocks/offer.ts';
import { fetchComments, fetchOffer, fetchOfferNeibourhood, fetchOffers, postComment } from '../apiActions.ts';

const initialState: DataProcess = {
  offerlist: [],
  isOffersLoading: false,
  offer:emptyOffer,
  nearbyOffers:[],
  comments:[]
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
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isOffersLoading = true;
      })

      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offerlist = action.payload;
      })
      .addCase(fetchOfferNeibourhood.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.comments = [];
      })
      .addCase(fetchComments.pending, (state) => {
        state.isOffersLoading = true;
      })

      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postComment.rejected, (state) => {
        state.comments = [];
      })
      .addCase(postComment.pending, (state) => {
        state.isOffersLoading = true;
      });
  }
});
