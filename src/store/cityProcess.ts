import {createSlice} from '@reduxjs/toolkit';
import { NAMESPACE } from '../mocks/sliceHeaders.ts';
import { CityProcess } from '../types/state.ts';
const initialState: CityProcess = {
  city: 'Paris',
};

export const cityProcess = createSlice({
  name: NAMESPACE.CITY,
  initialState,
  reducers: {
    changeCityAction : (state, action : {payload:string}) => {
      state.city = action.payload;
    },
  },
});

export const {changeCityAction} = cityProcess.actions;
