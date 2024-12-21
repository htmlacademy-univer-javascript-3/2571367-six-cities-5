import { changeCityAction, cityProcess } from '../cityProcess';
import { address } from 'faker';

describe('City slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {city: 'Paris'};

    const result = cityProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {city: 'Paris'};

    const result = cityProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should change city with changeCityAction action', () => {

    const expectedResult = {city: address.city()};
    const initialState = {city: 'Paris'};

    const result = cityProcess.reducer(initialState, changeCityAction(expectedResult.city));

    expect(result).toEqual(expectedResult);

  });
});
