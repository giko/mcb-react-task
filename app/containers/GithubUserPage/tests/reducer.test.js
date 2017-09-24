
import { fromJS } from 'immutable';
import githubUserContainerReducer from '../reducer';

describe('githubUserContainerReducer', () => {
  it('returns the initial state', () => {
    expect(githubUserContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
