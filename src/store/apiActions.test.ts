import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes } from '../utils/mocks.ts';
import { APIRoute } from '../mocks/apiRoutes';
import { checkAuthAction, fetchComments, fetchOffer, fetchOfferNeibourhood, fetchOffers, getFavourites, loginAction, logoutAction, postComment, setFavourites } from './apiActions';
import { datatype, internet } from 'faker';
import { State } from '../types/state.ts';
import { commentMock, dataProcessInitialStateMock, initialStateUserMock, mockOffer, mockOfferList, setFavouriteMock } from '../mocks/storeMock.ts';
import { redirectToRoute } from './cityAction.ts';
import * as tokenStorage from '../services/token';


describe('Async actions',()=>{
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  beforeEach(() => {
    store = mockStoreCreator({ User: initialStateUserMock, Data:dataProcessInitialStateMock, City:{city:'Paris'}});
  });
  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when server response 200', async () => {
      const expectedEmail = datatype.string();
      const expectedPayload = { email: expectedEmail };
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, expectedPayload);

      await store.dispatch(checkAuthAction(expectedEmail));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const checkAuthActionFulfilled = emittedActions.at(1) as ReturnType<typeof checkAuthAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
      expect(checkAuthActionFulfilled.payload)
        .toEqual(expectedEmail);
    });


    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuthAction(datatype.string()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetch offers',()=>{
    it('should dispatch "fetchOffers.pending" and "fetchOffers.fulfilled" when server response 200', async() => {
      const expectedPayload = mockOfferList;
      mockAxiosAdapter.onGet(APIRoute.OfferList).reply(200, expectedPayload);

      await store.dispatch(fetchOffers());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type,
      ]);
      expect(fetchOffersFulfilled.payload)
        .toEqual(expectedPayload);
    });
    it('should dispatch "fetchOffers.pending" and "fetchOffers.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.OfferList).reply(400);

      await store.dispatch(fetchOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type,
      ]);
    });
  });
  describe('fetch offer',()=>{
    it('should dispatch "fetchOffer.pending" and "fetchOffer.fulfilled" when server response 200', async() => {
      const expectedPayload = mockOffer;
      const offerIdMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.OfferList}/${offerIdMock}`).reply(200, expectedPayload);

      await store.dispatch(fetchOffer(offerIdMock));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffer.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffer.pending.type,
        fetchOffer.fulfilled.type,
      ]);
      expect(fetchOfferFulfilled.payload)
        .toEqual(expectedPayload);
    });
    it('should dispatch "fetchOffer.pending" and "fetchOffer.rejected" when server response 400', async() => {
      const offerIdMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.OfferList}/${offerIdMock}`).reply(400);

      await store.dispatch(fetchOffer(offerIdMock));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffer.pending.type,
        fetchOffer.rejected.type,
      ]);
    });
  });
  describe('get favourites',()=>{
    it('should dispatch "getFavourites.pending" and "getFavourites.fulfilled" when server response 200', async() => {
      const expectedPayload = mockOfferList;
      const tokenMock = datatype.string();
      mockAxiosAdapter.onGet(APIRoute.FavouriteList).reply(200, expectedPayload);

      await store.dispatch(getFavourites(tokenMock));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getFavouritesFulfilled = emittedActions.at(1) as ReturnType<typeof getFavourites.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getFavourites.pending.type,
        getFavourites.fulfilled.type,
      ]);
      expect(getFavouritesFulfilled.payload)
        .toEqual(expectedPayload);
    });
    it('should dispatch "getFavourites.pending" and "getFavourites.rejected" when server response 400', async() => {
      const tokenMock = datatype.string();
      mockAxiosAdapter.onGet(APIRoute.FavouriteList).reply(401);

      await store.dispatch(getFavourites(tokenMock));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavourites.pending.type,
        getFavourites.rejected.type,
      ]);
    });
  });

  describe('login',()=>{
    it('should dispatch "loginAction.pending", "checkAuthAction.pending", "getFavourites.pending", "redirectToRoute.type" ,"loginAction.fulfilled" when server response 200', async() => {
      const expectedPayload = datatype.string();
      const loginMock = internet.email();
      const password = internet.password();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, expectedPayload);

      await store.dispatch(loginAction({login: loginMock, password: password}));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        loginAction.pending.type,
        checkAuthAction.pending.type,
        getFavourites.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });
    it('should dispatch "loginAction.pending" and "loginAction.rejected" when server response 400', async() => {
      const loginMock = internet.email();
      const password = internet.password();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction({login: loginMock, password: password}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
    it('should call "saveToken" once with the received token', async () => {
      const fakeUser = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });
  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const tokenMock = datatype.string();

      await store.dispatch(logoutAction(tokenMock));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
      const tokenMock = datatype.string();

      await store.dispatch(logoutAction(tokenMock));

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
  it('should dispatch "logoutAction.pending", "logoutAction.rejected" when server response 400', async() => {
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(400);
    const tokenMock = datatype.string();

    await store.dispatch(logoutAction(tokenMock));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.rejected.type,
    ]);
  });
  describe('fetch OfferNeibourhood',()=>{
    it('should dispatch "fetchOfferNeibourhood.pending" and "fetchOfferNeibourhood.fulfilled" when server response 200', async() => {
      const expectedPayload = mockOfferList;
      const idMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.OfferList}/${idMock}/nearby`).reply(200, expectedPayload);

      await store.dispatch(fetchOfferNeibourhood(idMock));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferNeibourhoodFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferNeibourhood.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferNeibourhood.pending.type,
        fetchOfferNeibourhood.fulfilled.type,
      ]);
      expect(fetchOfferNeibourhoodFulfilled.payload)
        .toEqual(expectedPayload);
    });
    it('should dispatch "fetchOfferNeibourhood.pending" and "fetchOfferNeibourhood.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Nearby).reply(400);

      await store.dispatch(fetchOfferNeibourhood(datatype.string()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferNeibourhood.pending.type,
        fetchOfferNeibourhood.rejected.type,
      ]);
    });
  });
  describe('fetch Comments',()=>{
    it('should dispatch "fetchComments.pending" and "fetchComments.fulfilled" when server response 200', async() => {
      const expectedPayload = mockOfferList;
      const idMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${idMock}`).reply(200, expectedPayload);

      await store.dispatch(fetchComments(idMock));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchComments.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchComments.pending.type,
        fetchComments.fulfilled.type,
      ]);
      expect(fetchCommentsFulfilled.payload)
        .toEqual(expectedPayload);
    });
    it('should dispatch "fetchComments.pending" and "fetchComments.rejected" when server response 400', async() => {
      const idMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${idMock}`).reply(400);
      await store.dispatch(fetchComments(datatype.string()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchComments.pending.type,
        fetchComments.rejected.type,
      ]);
    });
  });
  describe('post Comment',()=>{
    it('should dispatch "postComment.pending" and "postComment.fulfilled" + fetchComments.pending.type when server response 200', async() => {
      const comment = commentMock;
      const idMock = commentMock.id;
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${idMock}`).reply(200);

      await store.dispatch(postComment(comment));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postComment.pending.type,
        fetchComments.pending.type,
        postComment.fulfilled.type,
      ]);

    });
    it('should dispatch "postComment.pending" and "postComment.rejected" when server response 400', async() => {
      const comment = commentMock;
      const idMock = commentMock.id;
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${idMock}`).reply(400);

      await store.dispatch(postComment(comment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postComment.pending.type,
        postComment.rejected.type,
      ]);
    });
  });
  describe('set Favourites',()=>{
    it('should dispatch "setFavourites.pending", "fetchOffers.pending", "setFavourites.fulfilled.type", "setFavourites.fulfilled"  when server response 200', async() => {
      const setFavouriteParam = setFavouriteMock;
      mockAxiosAdapter.onPost(`${APIRoute.FavouriteList}/${setFavouriteParam.offerId}/${setFavouriteParam.status}`).reply(200);

      await store.dispatch(setFavourites(setFavouriteParam));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        setFavourites.pending.type,
        fetchOffers.pending.type,
        getFavourites.pending.type,
        setFavourites.fulfilled.type,
      ]);

    });
    it('should dispatch "setFavourites.pending" and "setFavourites.rejected" when server response 400', async() => {
      const setFavouriteParam = setFavouriteMock;
      mockAxiosAdapter.onPost(`${APIRoute.FavouriteList}/${setFavouriteParam.offerId}/${setFavouriteParam.status}`).reply(400);

      await store.dispatch(setFavourites(setFavouriteParam));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        setFavourites.pending.type,
        setFavourites.rejected.type,
      ]);
    });
  });
});
