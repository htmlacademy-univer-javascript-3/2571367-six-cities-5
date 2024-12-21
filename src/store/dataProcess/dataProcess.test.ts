import { emptyOffer } from '../../mocks/offer.ts';
import { dataProcessInitialStateMock, mockCommentList, mockOffer, mockOfferList } from '../../mocks/storeMock.ts';
import {dataProcess} from './dataProcess.ts';
import '@testing-library/jest-dom';
import { fetchComments, fetchOffer, fetchOfferNeibourhood, fetchOffers, getFavourites } from '../apiActions.ts';
import { datatype } from 'faker';

describe('Data slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = dataProcessInitialStateMock;

    const result = dataProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = dataProcessInitialStateMock;

    const result = dataProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should return store with filled offers list with fetch offer action', () => {
    const offerlist = mockOfferList;
    const expectedResult = {
      offerlist: mockOfferList,
      isOffersLoading: false,
      offer:emptyOffer,
      nearbyOffers:[],
      comments:[],
      favouriteList: []
    };

    const result = dataProcess.reducer(
      undefined,
      fetchOffers.fulfilled(
        offerlist, '', undefined)
    );

    expect(result).toEqual(expectedResult);

  });
  it('should return store with filled offer with fetch offer action', () => {
    const offer = mockOffer;

    const expectedResult = {
      offerlist: [],
      isOffersLoading: false,
      offer: mockOffer,
      nearbyOffers:[],
      comments:[],
      favouriteList: []
    };


    const result = dataProcess.reducer(
      undefined,
      fetchOffer.fulfilled(
        offer, '', datatype.string())
    );

    expect(result).toEqual(expectedResult);

  });

  it('should return store with filled offers in neibourhood with fetchOfferNeibourhood', () => {
    const offerNeibourhood = mockOfferList;

    const expectedResult = {
      offerlist: [],
      isOffersLoading: false,
      offer: emptyOffer,
      nearbyOffers:offerNeibourhood,
      comments:[],
      favouriteList: []
    };

    const result = dataProcess.reducer(
      undefined,
      fetchOfferNeibourhood.fulfilled(
        offerNeibourhood, '', datatype.string())
    );

    expect(result).toEqual(expectedResult);

  });

  it('should return store with filled comments with fetchOfferNeibourhood', () => {
    const commentList = mockCommentList;

    const expectedResult = {
      offerlist: [],
      isOffersLoading: false,
      offer: emptyOffer,
      nearbyOffers:[],
      comments:commentList,
      favouriteList: []
    };

    const result = dataProcess.reducer(
      undefined,
      fetchComments.fulfilled(
        commentList, '', datatype.string())
    );

    expect(result).toEqual(expectedResult);

  });

  it('should return store with filled favourites with getFavourites', () => {
    const favouriteList = mockOfferList;
    const expectedResult = {
      offerlist: [],
      isOffersLoading: false,
      offer: emptyOffer,
      nearbyOffers:[],
      comments:[],
      favouriteList: favouriteList
    };

    const result = dataProcess.reducer(
      undefined,
      getFavourites.fulfilled(
        favouriteList, '', datatype.string())
    );

    expect(result).toEqual(expectedResult);

  });

});
