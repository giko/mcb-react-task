
import { fromJS } from 'immutable';
import githubRepoListReducer from '../reducer';

describe('githubRepoListReducer', () => {
  it('returns the initial state', () => {
    expect(githubRepoListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
