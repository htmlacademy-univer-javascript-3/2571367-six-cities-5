import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { dataProcessInitialStateMock, mockUser } from '../mocks/storeMock';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  User: mockUser,
  Data: dataProcessInitialStateMock,
  City: {city: 'Paris'},
  ...initialState ?? {},
});
